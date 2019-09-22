import { combineReducers } from "redux";
import { TypedUseSelectorHook, useSelector as useSelectorOriginal } from 'react-redux'
import connection from './connection';
import route from './route';


const root = combineReducers({
    connection,
    route
})

export type RootState = ReturnType<typeof root>;
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorOriginal

export default root;
