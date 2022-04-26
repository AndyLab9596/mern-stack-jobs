import { IJobAdd } from "../models";
import axiosClient from "./axiosClient";

const jobApi = {
    createJob(createdJob: IJobAdd) {
        const url = '/jobs';
        return axiosClient.post(url, createdJob)
    }
}

export default jobApi;