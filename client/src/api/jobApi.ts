import { IAllJobs, IJobAdd, IStatus, ListParams } from "../models";
import axiosClient from "./axiosClient";

const jobApi = {
    createJob(createdJob: IJobAdd): Promise<IJobAdd> {
        const url = '/jobs';
        return axiosClient.post(url, createdJob)
    },
    getAllJobs(params?: ListParams): Promise<IAllJobs> {
        const url = '/jobs';
        return axiosClient.get(url, { params })
    },
    updateJob(job: IJobAdd): Promise<IJobAdd> {
        const url = `jobs/${job._id}`;
        return axiosClient.patch(url, job)
    },
    deleteJob(jobId: string) {
        const url = `jobs/${jobId}`;
        return axiosClient.delete(url);
    },
    showStats(): Promise<IStatus> {
        const url = `jobs/stats`;
        return axiosClient.get(url)
    }
}

export default jobApi;