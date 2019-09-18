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
                    sessionStorage.setItem(TOKEN_KEY_PREFIX + uuid, data.token)

                    console.log("SET TOKEN")
                }

                if (data.type === 'twillio' && data.token) {
                    sessionStorage.setItem(TWILLIO_KEY, data.token)
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

        this.ws.addEventListener("open", () => {
            this.ws.send(JSON.stringify({
                type: 'setup',
                uuid: uuid,
                token
            }))

            if (!twillio) {
                this.ws.send(JSON.stringify({
                    type: 'twillio',
                }))
            }
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
        }
    }

    disconnect() {
        throw new Error("Not Implemented")
    }


    private handle(message: any) {

    }

}
