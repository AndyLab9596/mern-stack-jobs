import { JobType, StatusType } from "../context/appContext";

export interface IJobAdd {
    position: string;
    company: string,
    jobType: JobType,
    status: StatusType,
    jobLocation: string,
}

