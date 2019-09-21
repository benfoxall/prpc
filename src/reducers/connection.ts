import { Reducer } from "redux";
import { Events } from "../lib/signal";
import { Events as PeerBaseEvents } from "../lib/peerBase";

export interface State {
    active: boolean;
    error: false | string;
    wsState: boolean;
    dcState: boolean;
    uuid: false | string;
    connectionType: 'server' | 'client' | 'unknown';
    connections: number;
}

const initState: State = {
    active: false,
    error: false,
    wsState: false,
    dcState: false,
    uuid: false,
    connectionType: 'unknown',
    connections: 0
}


const reducer: Reducer<State> = (state = initState, action) => {

    switch (action.type) {
        case Events.START:
            return {
                ...state,
                active: true
            }


        case Events.AUTH_FAIL:
            return {
                ...state,
                error: String(action.payload)
            }


        case Events.AUTH_OK:
            return {
                ...state,
                uuid: String(action.payload)
            }


        case Events.WS_OPEN:
            return {
                ...state,
                wsState: true
            }


        case Events.WS_CLOSE:
            return {
                ...state,
                wsState: false
            }

        case PeerBaseEvents.PEER_CLIENT_START:
            return {
                ...state,
                connectionType: 'client',
            }


        case PeerBaseEvents.PEER_SERVER_START:
            return {
                ...state,
                connectionType: 'server',
            }


        case PeerBaseEvents.PEER_CLIENT_CONNECT:
            return {
                ...state,
                dcState: true
            }


        case PeerBaseEvents.PEER_SERVER_CONNECT:
            return {
                ...state,
                connections: state.connections + 1
            }
    }



    return state;
}


export default reducer

