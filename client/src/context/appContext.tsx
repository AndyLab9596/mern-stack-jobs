import React, {
  createContext,
  ReactChild,
  useContext,
  useReducer
} from "react";
import authApi from "../api/authentication";
import ActionTypes from "./actions";
import reducer from "./reducer";

interface IAppProvider {
  children: ReactChild;
}

export interface IUser {
  name?: string;
  email: string;
  password?: string;
  location?: string;
}

export type InitialStateType = {
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: string;
  displayAlert: () => void;

  user: IUser | null;
  token: string | null;
  userLocation: string;
  jobLocation: string;
  registerUser: (currentUser: IUser) => void;
};

const initialState: InitialStateType = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  displayAlert: () => null,
  user: null,
  token: null,
  userLocation: "",
  jobLocation: "",
  registerUser: () => null,
};

const AppContext = createContext<InitialStateType>(initialState);

const AppProvider = ({ children }: IAppProvider) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Alert Fnc
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: ActionTypes.CLEAR_ALERT });
    }, 3000);
  };
  const displayAlert = () => {
    dispatch({ type: ActionTypes.DISPLAY_ALERT });
    clearAlert();
  };

  // Authentication Fnc
  const registerUser = async (currentUser: IUser) => {
    dispatch({ type: ActionTypes.REGISTER_USER_BEGIN });
    try {
      const response = await authApi.register(currentUser);
      const { user, token, location } = response;
      dispatch({ type: ActionTypes.REGISTER_USER_SUCCESS, payload: { user, token, location } })
      // localStorage
    } catch (error: any) {
      // localStorage
      console.log(error.response)
      dispatch({ type: ActionTypes.REGISTER_USER_ERROR, payload: { msg: error.response.data.msg } })
    }
    clearAlert()
  };

  return (
    <AppContext.Provider value={{ ...state, displayAlert, registerUser }}>
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => {
  return useContext(AppContext);
};
export { AppProvider, initialState };


