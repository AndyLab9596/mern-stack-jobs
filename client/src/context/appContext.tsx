import React, {
  createContext,
  ReactChild,
  useContext,
  useReducer
} from "react";
import authApi from "../api/authentication";
import jobApi from "../api/jobApi";
import userApi from "../api/userApi";
import { IJobAdd, UpdatedUserInfo, UserRegister } from "../models";
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
  lastName?: string;
}
export type JobTypes = ['full-time', 'part-time', 'remote', 'internship'];
export type StatusTypes = ['pending', 'interview', 'declined'];
export type JobType = JobTypes[keyof JobTypes];
export type StatusType = StatusTypes[keyof StatusTypes];

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
  loginUser: (currentUser: IUser) => void;
  logoutUser: () => void;
  showSidebar: boolean;
  toggleSidebar: () => void;
  updateUser: (updatedUserInfo: UpdatedUserInfo) => void;

  isEditing: boolean;
  editJobId: string;
  position: string;
  company: string,
  // jobTypeOptions: string[],
  jobTypeOptions: JobTypes,
  jobType: JobType,
  statusOptions: StatusTypes,
  status: StatusType,
  createJob: (addJob: IJobAdd) => void
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
  userLocation: userLocation ? userLocation : '',
  jobLocation: userLocation ? userLocation : '',
  registerUser: () => null,
  loginUser: () => null,
  logoutUser: () => null,
  showSidebar: false,
  toggleSidebar: () => null,
  updateUser: () => null,

  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  //jobLocation
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['pending', 'interview', 'declined'],
  status: 'pending',
  createJob: () => null
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
      dispatch({ type: ActionTypes.REGISTER_USER_ERROR, payload: { msg: error.response.data.msg } })
    }
    clearAlert()
  };

  const loginUser = async (currentUser: IUser) => {
    dispatch({ type: ActionTypes.LOGIN_USER_BEGIN });
    try {
      const response = await authApi.login(currentUser);
      const { user, token, location } = response;
      dispatch({ type: ActionTypes.LOGIN_USER_SUCCESS, payload: { user, token, location } })
      // localStorage
      addUserToLocalStorage({ user, token, location })
    } catch (error: any) {
      // localStorage
      console.log(error)
      dispatch({ type: ActionTypes.LOGIN_USER_ERROR, payload: { msg: error.response.data.msg } })
    }
    clearAlert()
  };

  const updateUser = async (updatedUserInfo: UpdatedUserInfo) => {
    dispatch({ type: ActionTypes.UPDATE_USER_BEGIN });

    try {
      const response = await userApi.updateUser(updatedUserInfo);
      console.log(response)
      const { token, user, location } = response;
      dispatch({ type: ActionTypes.UPDATE_USER_SUCCESS, payload: { user, token, location } });
      addUserToLocalStorage({ user, token, location })
    } catch (error: any) {
      if (error.response.status !== 401) {
        dispatch({ type: ActionTypes.UPDATE_USER_ERROR, payload: { msg: error.response.data.msg } })

      }
    }
    clearAlert()
  }

  const logoutUser = () => {
    dispatch({ type: ActionTypes.LOGOUT_USER });
    removeUserFromLocalStorage()
  }

  const toggleSidebar = () => {
    dispatch({ type: ActionTypes.TOGGLE_SIDEBAR })
  }

  const createJob = async (addedJob: IJobAdd) => {
    dispatch({ type: ActionTypes.CREATE_JOB_BEGIN });

    try {
      const { position, company, jobType, status, jobLocation } = addedJob;
      await jobApi.createJob({
        position,
        company,
        jobType,
        status,
        jobLocation
      })
      dispatch({ type: ActionTypes.CREATE_JOB_SUCCESS })

    } catch (error: any) {
      console.log('error', error)
      if (error.response.status === 401) return;
      dispatch({
        type: ActionTypes.CREATE_JOB_ERROR,
        payload: {
          msg: error.msg
        }
      })
    }
    clearAlert()
  }


  return (
    <AppContext.Provider value={{
      ...state,
      displayAlert,
      registerUser,
      loginUser,
      toggleSidebar,
      logoutUser,
      updateUser,
      createJob
    }}>
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => {
  return useContext(AppContext);
};
export { AppProvider, initialState };


