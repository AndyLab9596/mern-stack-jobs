import { IAllJobs, IJobAdd, ListParams } from "../models";
import axiosClient from "./axiosClient";

const jobApi = {
    createJob(createdJob: IJobAdd): Promise<IJobAdd> {
        const url = '/jobs';
        return axiosClient.post(url, createdJob)
    },
    getAllJobs(params?: ListParams): Promise<IAllJobs> {
        const url = '/jobs';
        return axiosClient.get(url, { params })
    }
}

export default jobApi;