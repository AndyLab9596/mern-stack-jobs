import { IUser } from "../context/appContext";
import { UserRegister } from "../models";
import axiosClient from "./axiosClient";

const authApi = {
  register(currentUser: IUser): Promise<UserRegister> {
    const url = "/auth/register";
    return axiosClient.post(url, currentUser);
  },
};

export default authApi;
