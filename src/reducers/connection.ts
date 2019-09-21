import { Reducer } from "redux";

export interface State {
    error: false | string;
    wsState: number;
    dcState: number;
    uuid: false | string;
}

const initState: State = {
    error: false,
    wsState: 0,
    dcState: 0,
    uuid: false
}


export const SET_ERROR = 'CONNECTION/SET_ERROR'
export const SET_WS_STATE = 'CONNECTION/SET_WS_STATE'
export const SET_DC_STATE = 'CONNECTION/SET_DC_STATE'
export const SET_UUID = 'CONNECTION/SET_DC_STATE'


const reducer: Reducer<State> = (state = initState, action) => {

    console.log(action)

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

