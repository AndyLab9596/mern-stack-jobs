import ActionTypes from "./actions";
import { InitialStateType, IUser } from "./appContext";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
  ? { type: Key }
  : { type: Key; payload: M[Key] };
};

type AlertPayload = {
  [ActionTypes.DISPLAY_ALERT]: undefined,
  [ActionTypes.CLEAR_ALERT]: undefined
};

type AuthPayload = {
  [ActionTypes.REGISTER_USER_BEGIN]: undefined,
  [ActionTypes.REGISTER_USER_SUCCESS]: {
    user: IUser,
    token: string,
    location: string
  },
  [ActionTypes.REGISTER_USER_ERROR]: {
    msg: string
  }
}

type AuthActions = ActionMap<AuthPayload>[keyof AuthPayload];

type AlertActions = ActionMap<AlertPayload>[keyof AlertPayload];

const reducer = (state: InitialStateType, action: AlertActions | AuthActions) => {
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

    case ActionTypes.REGISTER_USER_BEGIN: {
      return {
        ...state,
        isLoading: true
      }
    }

    case ActionTypes.REGISTER_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        showAlert: true,
        alertType: "success",
        alertText: "User created! Redirecting...",
      }
    }

    case ActionTypes.REGISTER_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      }
    }

    default:
      //   throw new Error(`No such action: ${action.type}`);
      return state;
  }
};

export default reducer;
