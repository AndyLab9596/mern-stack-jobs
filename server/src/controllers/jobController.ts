import { Request, Response } from "express";
import CustomError from "../errors";
import { StatusCodes } from "http-status-codes";
import Job from '../models/Job';
import checkPermission from "../utls/checkPermission";

const createJob = async (req: Request, res: Response) => {
  const { position, company } = req.body;

  if (!position || !company) throw new CustomError.BadRequestError('Please provide all values');

  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job })
};

const deleteJob = async (req: Request, res: Response) => {
  const { params: { id: jobId } } = req;
  const job = await Job.findOne({ _id: jobId });

  if (!job) throw new CustomError.NotFoundError(`No job with ${jobId}`)

  await Job.findOneAndDelete({ _id: jobId })
  res.status(StatusCodes.OK).json({ msg: 'Delete job successfully' });
};

const updateJob = async (req: Request, res: Response) => {
  const { params: { id: jobId }, body: { company, position } } = req;

  if (!company || position) throw new CustomError.BadRequestError('Please provide all values');

  const job = await Job.findOne({ _id: jobId });

  if (!job) throw new CustomError.NotFoundError(`No job with ${jobId}`)

  console.log(typeof req.user.userId);
  console.log(typeof job.createdBy);
  checkPermission(req.user.userId, job.createdBy)

  const updateJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    runValidators: true,
    new: true
  })

  res.status(StatusCodes.OK).json({ updateJob })
};

const getAllJobs = async (req: Request, res: Response) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  console.log(jobs.length)
  res.status(StatusCodes.OK).json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};

const showStats = async (req: Request, res: Response) => {
  res.send("show stats");
};

export { createJob, deleteJob, updateJob, getAllJobs, showStats };
