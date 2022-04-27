import { Request, Response } from "express";
import CustomError from "../errors";
import { StatusCodes } from "http-status-codes";
import Job from '../models/Job';
import checkPermission from "../utls/checkPermission";
import mongoose, { Types, Schema } from "mongoose";

interface IStats {
  stats: {
    pending: number,
    interview: number,
    declined: number,
  }
}

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
  checkPermission(req.user.userId, job.createdBy)
  await Job.findOneAndDelete({ _id: jobId })
  res.status(StatusCodes.OK).json({ msg: 'Delete job successfully' });
};

const updateJob = async (req: Request, res: Response) => {
  const { params: { id: jobId }, body: { company, position } } = req;

  if (!company || !position) throw new CustomError.BadRequestError('Please provide all values');

  const job = await Job.findOne({ _id: jobId });
  console.log(job)
  if (!job) throw new CustomError.NotFoundError(`No job with ${jobId}`)


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
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ])

  const finalStats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc
  }, {})
  // stats  = stats.reduce((acc, curr) => {
  //   const { _id: title, count } = curr;
  //   acc[title] = count;
  //   return acc
  // }, {}) 

  const defaultStats = {
    pending: finalStats.pending || 0,
    interview: finalStats.interview || 0,
    declined: finalStats.declined || 0
  }

  const monthlyApplication: number[] = [];

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplication });
};

export { createJob, deleteJob, updateJob, getAllJobs, showStats };
