import { Request, Response } from "express";
import isEmail from "validator/lib/isEmail";
import User from "../models/User";
import CustomError from "../errors";
import { StatusCodes } from "http-status-codes";

const register = async (req: Request, res: Response) => {
  const { email } = req.body;

  const isEmailExist = await User.findOne({ email });
  if (isEmailExist)
    throw new CustomError.BadRequestError("Email is already exist");

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req: Request, res: Response) => {
  res.send("Login ");
};

const updateUser = async (req: Request, res: Response) => {
  res.send("Update user");
};

export { register, login, updateUser };
