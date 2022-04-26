import { JobType, StatusType } from "../context/appContext";

export interface IJobAdd {
    position: string;
    company: string,
    jobType: JobType,
    status: StatusType,
    jobLocation: string,
    _id?: string,
    createdBy?: string,
    createdAt?: Date
}

export interface IAllJobs {
    jobs: IJobAdd[];
    totalJobs: number;
    numOfPages: number;

}