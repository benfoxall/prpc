// import signalhub from 'signalhub'
import Peer from 'simple-peer'
import { SignalClient } from './signal';
import { Dispatch } from 'redux';

type Listener = (id: string, payload: Uint8Array) => void;

export enum Events {
  PEER_SERVER_START = '[peer-base] PEER_SERVER_START',
  PEER_SERVER_CONNECT = '[peer-base] PEER_SERVER_CONNECT',
  PEER_SERVER_CLOSE = '[peer-base] PEER_SERVER_CLOSE',
  // PEER_SERVER_DATA = '[peer-base] PEER_SERVER_DATA',

  PEER_CLIENT_START = '[peer-base] PEER_CLIENT_START',
  PEER_CLIENT_CONNECT = '[peer-base] PEER_CLIENT_CONNECT',
  PEER_CLIENT_CLOSE = '[peer-base] PEER_CLIENT_CLOSE',
  // PEER_CLIENT_DATA = '[peer-base] PEER_CLIENT_DATA',
}

export class PeerServer {

  private listeners: Set<Listener>;
  private peers: any;

  constructor(room: string, private dispatch?: Dispatch) {
    this.listeners = new Set
    this.peers = new Map

    this.notify(Events.PEER_SERVER_START)

    const client = new SignalClient(room, dispatch);

    client.on('data', (message, remoteId) => {

      // if we haven't see this connection before
      if (!this.peers.has(remoteId)) {
        const peer = new Peer({ initiator: false })

        peer.on('error', err => console.log('error', err))

        peer.on("signal", data => client.send(remoteId, data))

        peer.on("connect", () => {
          this.notify(Events.PEER_SERVER_CONNECT, remoteId)
        })

        peer.on('close', () => {
          this.notify(Events.PEER_SERVER_CLOSE, remoteId)
          this.peers.delete(remoteId)
        })

        peer.on('data', data => {
          this.listeners.forEach(fn => {
            fn(remoteId, data);
          })
        })

        this.peers.set(remoteId, peer);
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


  private notify(type: Events, payload?: any) {
    if (this.dispatch) {
      this.dispatch({
        type,
        payload
      })
    } else {
      console.log(type, payload)
    }
  }
}

export class PeerClient {

  private listeners = new Set<(d: Uint8Array) => void>();
  private peer: any;

  constructor(room: string, private dispatch?: Dispatch) {

    this.notify(Events.PEER_CLIENT_START)

    const connect = async (room: string) => {

      let LOCAL = sessionStorage.getItem('LOCAL_ID') || Math.random().toString(36).slice(1)
      sessionStorage.setItem('LOCAL_ID', LOCAL)

      // delay for live-reload
      if (['127.0.0.1', 'localhost'].includes(document.location.hostname)) {
        await new Promise(r => setTimeout(r, 700))
      }

      const client = new SignalClient(room + LOCAL, dispatch)

      const peer = new Peer({ initiator: true })

      peer.on('error', err => console.log('error', err))

      peer.on('signal', data => client.send(room, data))

      client.on('data', (payload, clientId) => {
        if (clientId == room) {
          peer.signal(payload)
        } else {
          console.error("WRONG PEER: ", clientId, payload)
        }
      });

      peer.on("connect", () => {
        this.notify(Events.PEER_CLIENT_CONNECT, room)
      })
      peer.on("close", () => {
        // never seems to fire
        this.notify(Events.PEER_CLIENT_CLOSE, room)
      })


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


  private notify(type: Events, payload?: any) {

    if (this.dispatch) {
      this.dispatch({
        type,
        payload
      })
    } else {
      console.log(type, payload)
    }

  }

}
