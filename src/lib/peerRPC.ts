import { PeerServer, PeerClient } from './peerBase'
import { RPCWrapper } from './protos/generated/peer-rpc_pb'


export type Meta = { serviceName: string; fnName: string; peerId: string }
export type Handler = (meta: Meta, payload: Uint8Array) => Uint8Array | Promise<Uint8Array>;

export class PeerRPCServer extends PeerServer {

  constructor(room: string, handler: Handler) {
    super(room);

    super.on("data", (id, payload) => {

      const request = RPCWrapper.deserializeBinary(payload);

      const resp = handler({
        serviceName: request.getServicename(),
        fnName: request.getMethodname(),
        peerId: id,
      }, request.getPayload_asU8())


      Promise.resolve(resp)
        .then(data => {
          request.setPayload(data);
          super.send(id, request.serializeBinary());
        })

    })


  }

  on() { }
  send() { }

}

export class PeerRPCClient extends PeerClient {

  private requestCount = 0;
  private wrapper = new RPCWrapper;
  private pending = new Map<number, Function>()

  constructor(room: string) {
    super(room);

    this.on('data', (data) => {
      const response = RPCWrapper.deserializeBinary(data);

      const rId = response.getRequestid();
      if (this.pending.has(rId)) {
        const fn = this.pending.get(rId)

        fn(response.getPayload_asU8())
      }
    })
  }

  call(serviceName: string, methodName: string, payload: Uint8Array): Promise<Uint8Array> {

    const requestId = this.requestCount++

    this.wrapper.setRequestid(requestId)

    this.wrapper.setMethodname(methodName)
    this.wrapper.setServicename(serviceName)

    this.wrapper.setPayload(payload)

    super.send(this.wrapper.serializeBinary())

    // return promise of response
    return new Promise((resolve) => {
      this.pending.set(requestId, resolve)
    })
  }

  send() { }
}

