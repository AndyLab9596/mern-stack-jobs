import { InitialStateType } from "./appContext";
import ActionTypes from "./actions";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: M[Key] };
};

type AlertPayload = {
  [ActionTypes.DISPLAY_ALERT]: undefined;
  [ActionTypes.CLEAR_ALERT]: undefined;
};

type AlertActions = ActionMap<AlertPayload>[keyof AlertPayload];

const reducer = (state: InitialStateType, action: AlertActions) => {
  switch (action.type) {
    case ActionTypes.DISPLAY_ALERT: {
      return {
        ...state,
        showAlert: true,
        alertType: "danger",
        alertText: "Please provide all values",
      };
    }
    case ActionTypes.CLEAR_ALERT: {
      return {
        ...state,
        showAlert: false,
        alertText: "",
        alertType: "",
      };
    }
    default:
      //   throw new Error(`No such action: ${action.type}`);
      return state;
  }
};

export default reducer;
