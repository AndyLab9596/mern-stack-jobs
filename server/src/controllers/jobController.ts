import { Request, Response } from "express";
import CustomError from "../errors";
import { StatusCodes } from "http-status-codes";
import Job from '../models/Job';

const createJob = async (req: Request, res: Response) => {
  const { position, company } = req.body;

  if (!position || !company) throw new CustomError.BadRequestError('Please provide all values');

  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job })
};

const deleteJob = async (req: Request, res: Response) => {
  res.send("deleteJob");
};

const updateJob = async (req: Request, res: Response) => {
  res.send("updateJob");
};

const getAllJobs = async (req: Request, res: Response) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};

const showStats = async (req: Request, res: Response) => {
  res.send("show stats");
};

export { createJob, deleteJob, updateJob, getAllJobs, showStats };
