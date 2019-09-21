import { Reducer } from "redux";

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

export const IS_ACTIVE = 'CONNECTION/IS_ACTIVE'
export const SET_ERROR = 'CONNECTION/SET_ERROR'
export const SET_WS_STATE = 'CONNECTION/SET_WS_STATE'
export const SET_DC_STATE = 'CONNECTION/SET_DC_STATE'
export const SET_UUID = 'CONNECTION/SET_DC_STATE'


const reducer: Reducer<State> = (state = initState, action) => {

    if (action.type === IS_ACTIVE) {
        return {
            ...state,
            active: true
        }
    }

    if (action.type === SET_ERROR) {
        return {
            ...state,
            error: String(action.payload)
        }
    }

    if (action.type === SET_WS_STATE) {
        return {
            ...state,
            wsState: action.payload
        }
    }

    if (action.type === SET_UUID) {
        return {
            ...state,
            uuid: action.payload
        }
    }

    return state;
}


export default reducer

