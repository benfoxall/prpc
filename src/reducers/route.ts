import { Reducer } from "redux";

export interface State {
  path: string;
}

const initState: State = {
  path: "/Space",
};

export enum Actions {
  SET_PATH = "[route] SET_PATH",
}

const reducer: Reducer<State> = (state = initState, action) => {
  if (action.type === Actions.SET_PATH) {
    return { path: action.payload };
  }

  return state;
};

export default reducer;
