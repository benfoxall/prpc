import { PeerServer, PeerClient } from "./peerBase";
import { RPCWrapper } from "./protos/generated/peer-rpc_pb";
import { Dispatch } from "redux";

export type Meta = { serviceName: string; fnName: string; peerId: string };

export interface Handler {
  stream: (meta: Meta, payload: Uint8Array) => AsyncGenerator<Uint8Array>;
  unary: (meta: Meta, payload: Uint8Array) => Promise<Uint8Array>;
}

const AsyncGeneratorFunction = async function* () {}.constructor;

export class PeerRPCServer extends PeerServer {
  constructor(room: string, handler: Handler, dispatch?: Dispatch) {
    super(room, dispatch);

    const send = (id: string, payload: Uint8Array) => super.send(id, payload);

    const stops = new Map<string, () => {}>();

    super.on("data", async (id, payload) => {
      const request = RPCWrapper.deserializeBinary(payload);

      // to make sure we've got the right handler
      const stream = request.getIsstream();

      const meta: Meta = {
        serviceName: request.getServicename(),
        fnName: request.getMethodname(),
        peerId: id,
      };

      const stopKey = id + " " + request.getRequestid();

      if (stream) {
        // the client stopped
        if (request.getDone()) {
          console.log("Stop requested");
          if (stops.has(stopKey)) {
            stops.get(stopKey)();
          }
          return;
        }

        const resp = handler.stream(meta, request.getPayload_asU8());

        let stop = false;
        const cb = () => stop = true;
        stops.set(stopKey, cb);

        for await (const u8 of resp) {
          if (stop) {
            break;
          }

          // reuse the request object for reply
          request.setPayload(u8);
          send(id, request.serializeBinary());
        }

        if (!stop) {
          // the server stopped
          request.setPayload(null);
          request.setDone(true);
          send(id, request.serializeBinary());
        }
        stops.delete(stopKey);
      } else {
        const u8 = await handler.unary(meta, request.getPayload_asU8());

        // reuse the request object for reply
        request.setPayload(u8);
        send(id, request.serializeBinary());
      }
    });
  }

  on() {}
  send() {}
}

export class PeerRPCClient extends PeerClient {
  private requestCount = 0;
  private wrapper = new RPCWrapper();
  private pending = new Map<number, Function>();

  constructor(room: string, dispatch?: Dispatch) {
    super(room, dispatch);

    this.on("data", (data) => {
      const response = RPCWrapper.deserializeBinary(data);

      const rId = response.getRequestid();
      if (this.pending.has(rId)) {
        const fn = this.pending.get(rId);

        fn(response.getPayload_asU8());
      } else if (this.streams.has(rId)) {
        const ctl = this.streams.get(rId);
        if (response.getDone()) {
          ctl.close();
          this.streams.delete(rId);
        } else {
          ctl.enqueue(response.getPayload_asU8());
        }
      } else {
        console.warn("promise/stream not found");
      }
    });
  }

  call(
    serviceName: string,
    methodName: string,
    payload: Uint8Array,
  ): Promise<Uint8Array> {
    const requestId = this.requestCount++;

    this.wrapper.setRequestid(requestId);
    this.wrapper.setMethodname(methodName);
    this.wrapper.setServicename(serviceName);
    this.wrapper.setPayload(payload);
    this.wrapper.setIsstream(false);

    super.send(this.wrapper.serializeBinary());

    // return promise of response
    return new Promise((resolve) => {
      this.pending.set(requestId, resolve);
    });
  }

  private streams = new Map<
    number,
    ReadableStreamDefaultController<Uint8Array>
  >();

  // make a call, but get back a stream of responses instead
  callStream(
    serviceName: string,
    methodName: string,
    payload: Uint8Array,
  ): ReadableStream<Uint8Array> {
    const requestId = this.requestCount++;

    const wrapper = new RPCWrapper();

    wrapper.setRequestid(requestId);
    wrapper.setMethodname(methodName);
    wrapper.setServicename(serviceName);
    wrapper.setPayload(payload);
    wrapper.setIsstream(true);

    const send = () => {
      super.send(wrapper.serializeBinary());
    };

    send();

    const { streams } = this;

    return new ReadableStream<Uint8Array>({
      start(control) {
        streams.set(requestId, control);
      },
      cancel() {
        console.log("cleaning up stream");
        streams.delete(requestId);

        wrapper.setDone(true);
        wrapper.setPayload(null);
        send();
      },
    });
  }

  send() {}
}
