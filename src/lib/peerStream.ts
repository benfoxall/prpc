import { PeerServer, PeerClient } from "./peerBase";
import { Dispatch } from "redux";
import SimplePeer from "simple-peer";

export type Handler = (
  peerId: string,
  socket: Socket,
) => void;

// meta
// service/method/$id

// const ping = new PRPCStreamChunk();
// ping.setType(PRPCStreamChunk.Type.PING);

// const pong = new PRPCStreamChunk();
// pong.setType(PRPCStreamChunk.Type.PONG);

// todo: use polyfill
/** Wrap a peer socket in a readable stream (including ping/pong) */
export class Socket extends ReadableStream<Uint8Array> {
  // queue up packets before join
  private queue = [] as Uint8Array[];

  /** Send a message back */
  send(payload: Uint8Array) {
    this.queue.push(payload);
  }

  constructor(
    public readonly peerId: string,
    private readonly _peer: Promise<SimplePeer.Instance> | SimplePeer.Instance,
  ) {
    super({
      start: (controller) => {
        Promise.resolve(_peer).then((peer) => {
          peer.addListener("data", (payload) => {
            controller.enqueue(payload);
          });

          peer.addListener("close", () => {
            controller.close();
          });

          // replace the send function
          this.send = (payload) => {
            peer.send(payload);
          };

          // process any waiting messsages
          for (const u8 of this.queue) {
            peer.send(u8);
          }
          this.queue = [];
        });
      },
    });
  }

  async close() {
    (await this._peer).destroy();
  }
}

export class PeerStreamClient extends Socket {
  constructor(room: string, dispatch?: Dispatch) {
    super(room, new PeerClient(room, dispatch).peer);
  }
}

/** Maintains a peer-to-peer stream */
export class PeerStreamServer implements AsyncIterable<Socket> {
  private base: PeerServer;

  constructor(room: string, dispatch?: Dispatch) {
    this.base = new PeerServer(room, dispatch);

    this.base.onConnect = (peer) => {
      console.error("Missed connection");
    };
  }

  async *[Symbol.asyncIterator]() {
    while (true) {
      const [peerId, peer] = await new Promise<[string, SimplePeer.Instance]>((
        res,
      ) => this.base.onConnect = res);

      yield new Socket(peerId, peer);
    }
  }
}
