import WebSocket from './reconnecting-ws'

const BACKEND = 'wss://i0eiyzqlwl.execute-api.eu-west-1.amazonaws.com/dev'
const TOKEN_KEY_PREFIX = '{{tok=>'
const TWILLIO_KEY = '{{twillio}}'

type dataBack = (body: any, from: string) => void;

export class SignalClient {
    private ws: WebSocket;
    private listeners = new Set<dataBack>();

    constructor(public readonly uuid: string) {
        this.ws = new WebSocket(BACKEND)

        this.ws.addEventListener('message', (m) => {
            try {
                const data = JSON.parse(m.data);

                console.log(">>>>", data);

                if (data.type === 'setup' && data.token) {
                    // this.handleSetup(data);

                    sessionStorage.setItem(TOKEN_KEY_PREFIX + uuid, data.token)

                    console.log("SET TOKEN")
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
        })

        const token = sessionStorage.getItem(TOKEN_KEY_PREFIX + uuid)
        const twillio = sessionStorage.getItem(TWILLIO_KEY)

        this.ws.addEventListener("close", () => {
            console.log("CLOSE")

        })

        this.ws.addEventListener("open", () => {
            console.log("OPEN!!")
            
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

            const ping = () => {
                setTimeout(() => {
                    if (this.ws.readyState === WebSocket.OPEN) {
                        this.ws.send(JSON.stringify({
                            type: 'ping',
                        }))
                        ping()
                    }
                }, 5 * 60 * 1000)
            }
            ping();
        })


    }

    on(data: "data", callback: dataBack) {
        if (data === 'data') {
            this.listeners.add(callback)
        }
    }

    send(target: string, message: any) {

        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({
                type: 'send',
                from: this.uuid,
                to: target,
                body: message
            }))
        } else {
            throw new Error("WebSocket Closed")
        }

    }

    disconnect() {
        throw new Error("Not Implemented")
    }

    

}
