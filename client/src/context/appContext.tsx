import React, {
  createContext,
  ReactChild,
  useContext,
  useReducer,
} from "react";
import ActionTypes from "./actions";
import reducer from "./reducer";

interface IAppProvider {
  children: ReactChild;
}

export type InitialStateType = {
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: string;
  displayAlert: () => void;
};

const initialState: InitialStateType = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  displayAlert: () => null,
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

  return (
    <AppContext.Provider value={{ ...state, displayAlert }}>
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => {
  return useContext(AppContext);
};
export { AppProvider, initialState };
