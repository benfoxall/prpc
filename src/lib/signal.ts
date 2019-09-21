import WebSocket from './reconnecting-ws'

const BACKEND = 'wss://i0eiyzqlwl.execute-api.eu-west-1.amazonaws.com/dev'
const TOKEN_KEY_PREFIX = '{{tok=>'
const TWILLIO_KEY = '{{twillio}}'

interface CallbackMap {
    data: (body: any, from: string) => void;
}

const log = (...message: any[]) => {
    console.log.apply(console, ['%c[ws]', 'color:#08f'].concat(message))
}

export enum Events {
    START = 'WS:START',
    WS_OPEN = 'WS:WS_OPEN',
    WS_CLOSE = 'WS:WS_CLOSE',
    WS_MESSAGE = 'WS:WS_MESSAGE',
    AUTH_OK = 'WS:AUTH_OK', // payload=uuid
    AUTH_FAIL = 'WS:AUTH_FAIL', // payload=error
    TWILLIO_OK = 'WS:TWILLIO_OK',
    DISCONNECT = 'WS:DISCONNECT',
}

type Dispatch = (event: Events, payload?: any) => void;

export class SignalClient {

    public error: string = null;
    public twillio: Promise<any>;
    public auth: Promise<string>;

    private ws: WebSocket;
    private dataListeners = new Set<CallbackMap['data']>();

    constructor(
        public readonly uuid: string,
        private dispatch: Dispatch = (event: Events, payload?: any) => log(event, payload)
    ) {
        dispatch(Events.START)

        this.ws = new WebSocket(BACKEND)

        const ping = () => {
            setTimeout(() => {
                this._send({ type: 'ping' }, 0)

                ping()
            }, 5 * 60 * 1000)
        }
        ping();

        let twRes;
        this.twillio = new Promise(res => twRes = res);

        let authRes, authRej;
        this.auth = new Promise((res, rej) => { authRes = res; authRej = rej });

        const token = sessionStorage.getItem(TOKEN_KEY_PREFIX + uuid)
        const twillio = sessionStorage.getItem(TWILLIO_KEY)

        if (twillio) {
            try {
                twRes(JSON.parse(twillio))

                dispatch(Events.TWILLIO_OK)
            } catch (e) { }

        }

        const open = () => {
            dispatch(Events.WS_OPEN)

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
            dispatch(Events.WS_MESSAGE, m.data)
            try {
                const data = JSON.parse(m.data);

                if (data.type === 'setup') {

                    if (data.token) {
                        log("Token updated")
                        sessionStorage.setItem(TOKEN_KEY_PREFIX + uuid, data.token)

                        dispatch(Events.AUTH_OK, uuid)
                        authRes(uuid)
                    }

                    if (data.error) {
                        this.error = data.error;

                        dispatch(Events.AUTH_FAIL, data.error)

                        authRej(new Error(data.error))
                    }

                }

                if (data.type === 'twillio' && data.token) {
                    sessionStorage.setItem(TWILLIO_KEY, JSON.stringify(data.token))
                }

                if (data.type === 'send' && data.to === this.uuid) {
                    console.log("SEND====", data.to)
                    this.dataListeners.forEach(cb => {
                        cb(data.body, data.from)
                    })
                }

            } catch (e) {
                console.error(e);
            }

        }

        const close = () => {
            dispatch(Events.WS_CLOSE)
            log("CLOSE")
        }

        this.ws.addEventListener('message', message);
        this.ws.addEventListener('open', open);
        this.ws.addEventListener('close', close);
    }

    // this could be better
    on<T extends keyof CallbackMap>(data: T, callback: CallbackMap[T]) {
        if (data === 'data') {
            this.dataListeners.add(callback)
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
        log("disconnect")
        this.dispatch(Events.DISCONNECT);
        this.ws.close()
    }

    /** Try and send to the underlying connection */
    private _send(message: any, retries = 3) {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message))
            return true

        } else if (retries > 0) {
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
