import axiosClient from "./axiosClient";
import { UpdatedUserInfo, UserRegister } from "../models";

const userApi = {
    updateUser(updatedUserInfo: UpdatedUserInfo): Promise<UserRegister> {
        const url = '/auth/updateUser';
        return axiosClient.post(url, updatedUserInfo)
    }
}

export default userApi