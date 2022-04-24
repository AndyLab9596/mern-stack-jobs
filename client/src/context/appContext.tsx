import React, {
  createContext,
  ReactChild,
  useContext,
  useReducer
} from "react";
import authApi from "../api/authentication";
import { UserRegister } from "../models";
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

const token = localStorage.getItem('token');
const userLocation = localStorage.getItem('location');
const user = localStorage.getItem('user')

const initialState: InitialStateType = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  displayAlert: () => null,
  user: user ? JSON.parse(user) : null,
  token: token || null,
  userLocation:  userLocation ? userLocation : '',
  jobLocation: userLocation ? userLocation : '',
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

  // localStorage setup
  const addUserToLocalStorage = ({ user, token, location }: UserRegister) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('location', location)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user')
    localStorage.removeItem('location')
  }

  // Authentication Fnc
  const registerUser = async (currentUser: IUser) => {
    dispatch({ type: ActionTypes.REGISTER_USER_BEGIN });
    try {
      const response = await authApi.register(currentUser);
      const { user, token, location } = response;
      dispatch({ type: ActionTypes.REGISTER_USER_SUCCESS, payload: { user, token, location } })
      // localStorage
      addUserToLocalStorage({ user, token, location })
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


