import { Request, Response } from "express";

const createJob = async (req: Request, res: Response) => {
  res.send("create job");
};

const deleteJob = async (req: Request, res: Response) => {
  res.send("deleteJob");
};

const updateJob = async (req: Request, res: Response) => {
  res.send("updateJob");
};

const getAllJobs = async (req: Request, res: Response) => {
  res.send("Get All Jobs");
};

const showStats = async (req: Request, res: Response) => {
  res.send("show stats");
};

export { createJob, deleteJob, updateJob, getAllJobs, showStats };
