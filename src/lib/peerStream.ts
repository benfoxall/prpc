import { PeerServer, PeerClient } from "./peerBase";
import { PRPCStreamChunk } from "./protos/generated/peer-rpc_pb";
import { Dispatch } from "redux";
import SimplePeer from "simple-peer";

export type Meta = { serviceName: string; fnName: string; peerId: string };
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
class Socket extends ReadableStream<Uint8Array> {
  /** Send a message back */
  send: (payload: Uint8Array) => void;

  constructor(
    private readonly _peer: Promise<SimplePeer.Instance> | SimplePeer.Instance,
  ) {
    super({
      start: (controller) => {
        Promise.resolve(_peer).then((peer) => {
          peer.addListener("data", (payload) => {
            const chunk = PRPCStreamChunk.deserializeBinary(payload);

            switch (chunk.getType()) {
              case PRPCStreamChunk.Type.DATA:
                controller.enqueue(chunk.getPayload_asU8());
                break;

                // case PRPCStreamChunk.Type.PING:
                //   // reply
                //   peer.send(pong.getPayload_asU8());
                //   break;

                // case PRPCStreamChunk.Type.PONG:
                //   break;
            }
          });

          peer.addListener("close", () => {
            controller.close();
          });

          this.send = (payload) => {
            const chunk = new PRPCStreamChunk();
            chunk.setType(PRPCStreamChunk.Type.DATA);
            chunk.setPayload(payload);

            peer.send(chunk.serializeBinary());
          };
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
    super(new PeerClient(room, dispatch).peer);
  }
}

/** Maintains a peer-to-peer stream */
export class PeerStreamServer extends PeerServer {
  constructor(room: string, handler: Handler, dispatch?: Dispatch) {
    super(room, dispatch);

    this.onConnect = (peer, id) => {
      // wrap this peer in a socket
      const sock = new Socket(peer);

      // pass it to the handler
      // (would be nice to have this via async iterator)
      // (before, this was .on("data"))
      handler(id, sock);
    };
  }

  on() {}
  send() {}
}
