import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";

// describing the structure of the state that is describing the return type of this reducer
interface BundlesState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
}

// set our initial state to be empty
const initialState: BundlesState = {};

// remember produce allows us to mutate our state
const reducer = produce(
  (state: BundlesState = initialState, action: Action): BundlesState => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        state[action.payload.cellId] = {
          loading: true,
          code: "",
          err: "",
        };
        return state;
      case ActionType.BUNDLE_COMPLETE:
        state[action.payload.cellId] = {
          loading: false,
          code: action.payload.bundle.code,
          err: action.payload.bundle.err,
        };
        return state;
      default:
        return state;
    } // end of switch
  }
);

export default reducer;
