import { combineReducers } from "redux";
import { TypedUseSelectorHook, useSelector as useSelectorOriginal } from 'react-redux'
import connection from './connection';


const root = combineReducers({
    connection
})


export type RootState = ReturnType<typeof root>;
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorOriginal

export default root;
