import { IUser } from "../context/appContext";

export interface UserRegister {
  user: IUser;
  token: string;
  location: string;
}
