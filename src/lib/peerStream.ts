import { PeerServer, PeerClient, Events } from "./peerBase";
import { RPCWrapper, PRPCStreamChunk } from "./protos/generated/peer-rpc_pb";
import { Dispatch } from "redux";

export type Meta = { serviceName: string; fnName: string; peerId: string };
export type Handler = (
  peerId: string,
  socket: Socket,
) => Uint8Array | Promise<Uint8Array>;

// todo: use polyfill
class Socket extends ReadableStream<Uint8Array> {
  remoteEnqueue: (payload: Uint8Array) => void;
  remoteClose: () => void;
  send: (payload: Uint8Array) => void;

  constructor() {
    super({
      start: (controller) => {
        this.remoteEnqueue = (chunk) => {
          controller.enqueue(chunk);
        };
        this.remoteClose = () => {
          controller.close();
        };
      },
      cancel: () => {
      },
    });
  }
}

/** Maintains a peer-to-peer stream */
export class PeerStreamServer extends PeerServer {
  private sockets: Map<string, Socket> = new Map();

  constructor(room: string, handler: Handler, dispatch?: Dispatch) {
    super(room);

    this.onConnect = (peer) => {
      // wrap this P
    };

    super.on("data", (id, payload) => {
      // init new stream if needed
      if (!this.sockets.has(id)) {
        const s = new Socket();

        this.sockets.set(id, s);

        // function for user to send something back
        s.send = (payload) => {
          const chunk = new PRPCStreamChunk();
          chunk.setType(PRPCStreamChunk.Type.DATA);
          chunk.setPayload(payload);

          super.send(id, chunk.serializeBinary());
        };

        // pass it to the handler
        handler(id, s);
      }

      const stream = this.sockets.get(id);

      const chunk = PRPCStreamChunk.deserializeBinary(payload);

      switch (chunk.getType()) {
        case PRPCStreamChunk.Type.DATA:
          stream.remoteEnqueue(chunk.getPayload_asU8());
          break;

        case PRPCStreamChunk.Type.PING:
          const pong = new PRPCStreamChunk();
          pong.setType(PRPCStreamChunk.Type.PONG);
          super.send(id, pong.getPayload_asU8());
          break;

        case PRPCStreamChunk.Type.PONG:
          break;

        case PRPCStreamChunk.Type.CLOSE:
          stream.remoteClose();
          stream.send = () => {
            console.warn("called .send on closed socket");
          };
          this.sockets.delete(id);
          break;
      }
    });
  }

  on() {}
  send() {}
}

export class PeerStreamClient extends PeerClient {
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

    super.send(this.wrapper.serializeBinary());

    // return promise of response
    return new Promise((resolve) => {
      this.pending.set(requestId, resolve);
    });
  }

  send() {}
}
