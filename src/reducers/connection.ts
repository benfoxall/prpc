import { Reducer } from "redux";

export interface State {
    error: boolean;
    wsState: number;
    dcState: number;
    uuid: string;
}

const initState: State = {
    error: false,
    wsState: 0,
    dcState: 0,
    uuid: '23456'
}


export const SET_ERROR = 'CONNECTION/SET_ERROR'
export const SET_WS_STATE = 'CONNECTION/SET_WS_STATE'
export const SET_DC_STATE = 'CONNECTION/SET_DC_STATE'
export const SET_UUID = 'CONNECTION/SET_DC_STATE'


const reducer: Reducer<State> = (state = initState, action) => {

    if (action.type === SET_ERROR) {
        return {
            ...state,
            error: action.payload
        }
    }

    if (action.type === SET_WS_STATE) {
        return {
            ...state,
            wsState: action.payload
        }
    }

    return state;
}


export default reducer

