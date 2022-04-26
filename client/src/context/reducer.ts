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
  },
  [ActionTypes.LOGIN_USER_BEGIN]: undefined,
  [ActionTypes.LOGIN_USER_SUCCESS]: {
    user: IUser,
    token: string,
    location: string
  },
  [ActionTypes.LOGIN_USER_ERROR]: {
    msg: string,
  }
  [ActionTypes.LOGOUT_USER]: undefined,

  [ActionTypes.UPDATE_USER_BEGIN]: undefined,
  [ActionTypes.UPDATE_USER_SUCCESS]: {
    user: IUser,
    token: string,
    location: string
  },
  [ActionTypes.UPDATE_USER_ERROR]: {
    msg: string,
  }
}

type DashboardPayload = {
  [ActionTypes.TOGGLE_SIDEBAR]: undefined,

  [ActionTypes.CREATE_JOB_BEGIN]: undefined,
  [ActionTypes.CREATE_JOB_SUCCESS]: undefined,
  [ActionTypes.CREATE_JOB_ERROR]: {
    msg: string
  }
}

type AuthActions = ActionMap<AuthPayload>[keyof AuthPayload];

type AlertActions = ActionMap<AlertPayload>[keyof AlertPayload];

type DashboardActions = ActionMap<DashboardPayload>[keyof DashboardPayload];


const reducer = (state: InitialStateType, action: AlertActions | AuthActions | DashboardActions) => {
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

    case ActionTypes.LOGIN_USER_BEGIN: {
      return {
        ...state,
        isLoading: true
      }
    }

    case ActionTypes.LOGIN_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        showAlert: true,
        alertType: "success",
        alertText: "Login successfully! Redirecting...",
      }
    }

    case ActionTypes.LOGIN_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      }
    }

    case ActionTypes.LOGOUT_USER: {
      return {
        ...state,
        user: null,
        token: null,
        userLocation: "",
        jobLocation: "",
      }
    }

    case ActionTypes.TOGGLE_SIDEBAR: {
      return {
        ...state,
        showSidebar: !state.showSidebar
      }
    }

    case ActionTypes.UPDATE_USER_BEGIN: {
      return {
        ...state,
        isLoading: true
      }
    }

    case ActionTypes.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        showAlert: true,
        alertType: "success",
        alertText: "User profile updated",
      }
    }

    case ActionTypes.UPDATE_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      }
    }

    case ActionTypes.CREATE_JOB_BEGIN: {
      return {
        ...state,
        isLoading: true
      }
    }

    case ActionTypes.CREATE_JOB_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'New Job created'
      }
    }

    case ActionTypes.CREATE_JOB_ERROR: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg
      }
    }

    default:
      //   throw new Error(`No such action: ${action.type}`);
      return state;
  }
};

export default reducer;
