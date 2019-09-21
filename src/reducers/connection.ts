import { Reducer } from "redux";
import { Events } from "../lib/signal";

export interface State {
    active: boolean;
    error: false | string;
    wsState: number;
    dcState: number;
    uuid: false | string;
}

const initState: State = {
    active: false,
    error: false,
    wsState: 0,
    dcState: 0,
    uuid: false
}


const reducer: Reducer<State> = (state = initState, action) => {

    if (action.type === Events.START) {
        return {
            ...state,
            active: true
        }
    }

    if (action.type === Events.AUTH_FAIL) {
        return {
            ...state,
            error: String(action.payload)
        }
    }

    if (action.type === Events.AUTH_OK) {
        return {
            ...state,
            uuid: String(action.payload)
        }
    }

    if (action.type === Events.WS_OPEN) {
        return {
            ...state,
            wsState: 1
        }
    }

    return state;
}


export default reducer

