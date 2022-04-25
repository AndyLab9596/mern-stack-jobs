import axiosClient from "./axiosClient";
import { UpdatedUserInfo, UserRegister } from "../models";

const userApi = {
    updateUser(updatedUserInfo: UpdatedUserInfo): Promise<UserRegister> {
        const url = '/auth/updateUser';
        return axiosClient.patch(url, updatedUserInfo)
    }
}

export default userApi