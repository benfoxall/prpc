import WebSocket from './reconnecting-ws'

const BACKEND = 'wss://i0eiyzqlwl.execute-api.eu-west-1.amazonaws.com/dev'
const TOKEN_KEY_PREFIX = '{{tok=>'
const TWILLIO_KEY = '{{twillio}}'

type dataBack = (body: any, from: string) => void;

const log = (...message: any[]) => {
    console.log.apply(console, ['%c[ws]', 'color:#08f'].concat(message))
}

export class SignalClient {

    private ws: WebSocket;
    private listeners = new Set<dataBack>();

    constructor(public readonly uuid: string) {
        this.ws = new WebSocket(BACKEND)

        const ping = () => {
            setTimeout(() => {
                this._send({type: 'ping'}, 0)

                ping()
            }, 5 * 60 * 1000)
        }
        ping();


        const token = sessionStorage.getItem(TOKEN_KEY_PREFIX + uuid)
        const twillio = sessionStorage.getItem(TWILLIO_KEY)

        const open = () => {
            log('open')
            this.ws.send(JSON.stringify({
                type: 'setup',
                uuid: uuid,
                token
            }))


            // todo - or created at is hours old
            if (!twillio) {
                this.ws.send(JSON.stringify({
                    type: 'twillio',
                }))
            }
        }

        const message = (m: MessageEvent) => {
            log("message", m.data)
            try {
                const data = JSON.parse(m.data);

                if (data.type === 'setup' && data.token) {
                    log("Token updated")
                    sessionStorage.setItem(TOKEN_KEY_PREFIX + uuid, data.token)
                }

                if (data.type === 'twillio' && data.token) {
                    sessionStorage.setItem(TWILLIO_KEY, JSON.stringify(data.token))
                }

                if (data.type === 'send') {
                    this.listeners.forEach(cb => {
                        cb(data.body, data.from)
                    })
                }

            } catch (e) {
                console.error(e);
            }

        }

        const close = () => {
            log("CLOSE")
        }

        this.ws.addEventListener('message', message);
        this.ws.addEventListener('open', open);
        this.ws.addEventListener('close', close);
    }

    on(data: "data", callback: dataBack) {
        if (data === 'data') {
            this.listeners.add(callback)
        }
    }

    send(target: string, message: any) {
        this._send({
            type: 'send',
            from: this.uuid,
            to: target,
            body: message
        }, 0)
    }

    disconnect() {
        throw new Error("Not Implemented")
    }

    /** Try and send to the underlying connection */
    private _send(message: any, retries = 3) {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message))
            return true

        } else if(retries > 0) {
            log("Retrying")
            
            setTimeout(
                this._send.bind(this),
                1500,
                message,
                retries - 1
            )
        
        }
    }
}
