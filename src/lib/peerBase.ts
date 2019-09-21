// import signalhub from 'signalhub'
import Peer from 'simple-peer'
import { SignalClient } from './signal';

type Listener = (id: string, payload: Uint8Array) => void;

export class PeerServer {

  private listeners: Set<Listener>;
  private peers: any;

  constructor(room: string) {
    this.listeners = new Set
    this.peers = new Map

    const client = new SignalClient(room);

    client.on('data', (message, remoteId) => {

      // debugger;

      // if we haven't see this connection before
      if (!this.peers.has(remoteId)) {
        const peer = new Peer({ initiator: false })

        peer.on('error', err => console.log('error', err))

        peer.on("signal", data => client.send(remoteId, data))

        peer.on("connect", () => {
          console.log("CONNECTED!!")
        })

        peer.on('close', () => {
          console.log("CLOSED")
          this.peers.delete(remoteId)
        })

        peer.on('data', data => {
          this.listeners.forEach(fn => {
            fn(remoteId, data);
          })
        })

        this.peers.set(remoteId, peer);

        console.log("PEERLIST", this.peers)
      }

      this.peers.get(remoteId).signal(JSON.stringify(message));

    })


  }

  on(name: string, fn: Listener) {
    if (name === 'data') {
      this.listeners.add(fn)
    }
  }

  send(id: string, payload: Uint8Array) {
    if (this.peers.has(id)) {
      this.peers.get(id).send(payload)
    }
  }

}


export class PeerClient {

  private listeners = new Set<(d: Uint8Array) => void>();
  private peer: any;

  constructor(room: string) {

    const connect = async (room: string) => {

      let LOCAL = sessionStorage.getItem('LOCAL_ID') || Math.random().toString(36).slice(1)
      sessionStorage.setItem('LOCAL_ID', LOCAL)

      // delay for live-reload
      if (['127.0.0.1', 'localhost'].includes(document.location.hostname)) {
        await new Promise(r => setTimeout(r, 750))
      }

      const client = new SignalClient(room + LOCAL)

      const peer = new Peer({ initiator: true })

      peer.on('error', err => console.log('error', err))

      peer.on('signal', data => client.send(room, data))

      client.on('data', (payload, clientId) => {

        // console.log("SURE?")

        if (clientId == room) {
          peer.signal(payload)
        } else {
          console.error("WRONG PEER: ", clientId, payload)
        }
      });

      await new Promise(resolve => peer.on("connect", resolve))

      console.log("TODO: DISCONNECTTTTT")

      peer.on('data', (data) => {
        this.listeners.forEach(fn => fn(data))
      })

      // @ts-ignore
      window.peer = peer;

      return peer;
    }

    this.peer = connect(room)

    /* TODO - exit
    window.addEventListener("beforeunload", () => {
      this.send(new Uint8Array([44]))
    })
    */
  }

  send(payload: Uint8Array) {
    this.peer.then(p => p.send(payload))
  }

  on(name: string, fn: (d: Uint8Array) => void) {
    if (name === 'data') {
      this.listeners.add(fn)
    }
  }
}
