// Stream based RPC

import { PRPCStreamChunk } from "./protos/generated/peer-rpc_pb";
import { Dispatch } from "redux";
import { PeerStreamServer, PeerStreamClient, Socket } from "./peerStream";

/*
THIS ADDS MULTIPLEXED STREAMS

const s = new PeerStreamRPCServer("foo")
for await( {stream, meta, peerId} of s) {

}

const c = new Client("foo")
const stream = c.call(meta)

*/

interface Call {
  peerId: string;
  stream: ScopedStream;
  meta: string;
}

export class PeerStreamRPCServer implements AsyncIterable<Call> {
  private readonly base: PeerStreamServer;
  private emit: (stream: ScopedStream) => void;

  constructor(room: string, dispatch?: Dispatch) {
    this.base = new PeerStreamServer(room, dispatch);

    this.listen();
  }

  private async listen() {
    for await (const socket of this.base) {
      new WhatsItCalled(socket, (call) => {
        console.log("CREATED", call);
        this.emit(call);
      });
    }
  }

  async *[Symbol.asyncIterator]() {
    while (true) {
      const stream = await new Promise<ScopedStream>((resolve) =>
        this.emit = resolve
      );

      yield {
        peerId: stream.base.peerId,
        meta: stream.meta,
        stream,
      };
    }
  }
}

export class PeerStreamRPCClient {
  private base: PeerStreamClient;
  private thingy: WhatsItCalled;

  constructor(room: string, dispatch?: Dispatch) {
    this.base = new PeerStreamClient(room, dispatch);

    this.thingy = new WhatsItCalled(this.base);
  }

  call(meta: string) {
    return this.thingy.call(meta);
  }
}

export class WhatsItCalled {
  private requestID = 0;
  private streams = new Map<number, ScopedStream>();

  constructor(
    private readonly socket: Socket,
    private readonly create?: (s: ScopedStream) => void,
  ) {
    this.read();
  }

  private async read() {
    const reader = this.socket.getReader();

    while (true) {
      const { value, done } = await reader.read();

      if (done) break;

      this.route(value);
    }

    reader.releaseLock();
  }

  private route(payload: Uint8Array) {
    const chunk = PRPCStreamChunk.deserializeBinary(payload);

    if (this.create && !this.streams.has(chunk.getId())) {
      const s = this.call(chunk.getMeta(), chunk.getId());
      this.create(s);
    }

    const match = this.streams.get(chunk.getId());
    if (match) {
      if (chunk.getDone()) {
        match.close();
      } else {
        match.enqueue(chunk.getPayload_asU8());
      }
    } else {
      console.error("Couldn't find matching stream");
    }
  }

  dispose() {
    for (const s of this.streams.values()) {
      s.close();
    }
  }

  // create a stream for a given call
  call(meta: string, override?: number) {
    // create a virtual stream backed by the main one

    const id = override || this.requestID++;
    const stream = new ScopedStream(meta, id, this.socket, () => {
      this.streams.delete(id);
    });
    this.streams.set(id, stream);

    return stream;
  }
}

// A multiplexed/light stream
class ScopedStream extends ReadableStream<Uint8Array> {
  private closed = false;
  enqueue(payload: Uint8Array) {}
  send(payload: Uint8Array) {}
  close() {}

  constructor(
    public readonly meta: string,
    public readonly requestId: number,
    public readonly base: PeerStreamClient,
    onclose: () => void,
  ) {
    super({
      start(control) {
        // terrible hack
        Promise.resolve(null).then(() => {
          that.enqueue = (payload: Uint8Array) => {
            control.enqueue(payload);
          };

          const chunk = new PRPCStreamChunk();
          chunk.setMeta(meta);
          chunk.setId(requestId);

          that.send = (payload: Uint8Array) => {
            chunk.setPayload(payload);
            base.send(chunk.serializeBinary());
          };

          that.close = () => {
            if (!that.closed) {
              chunk.setPayload(null);
              chunk.setDone(true);
              base.send(chunk.serializeBinary());
              control.close();
              onclose();
              that.closed = true;
            }
          };
        });
      },
    });
    const that = this;
  }
}
