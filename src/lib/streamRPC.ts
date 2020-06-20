

/*
const client = new Client('id')

const stream = client.call("service/method")

for await(message of stream) {
  stream.send(message)
}

const server = new Server('id')

for await (stream of server) {
  for(message of stream) {
    stream.send(message)
  }
}
*/

import { PeerClient } from "./peerBase";

export class Client {

  private base: PeerClient;

  constructor(id: string) {
    this.base = new PeerClient(id);
    
  }

  call(method: string) {

    // start call
    this.base.send(new Uint8Array([100]))

    const str = new ReadableStream();
    

    return {
      [Symbol.asyncIterator]() {
        return {
          value: 

        }

      }
    }
  }
}
