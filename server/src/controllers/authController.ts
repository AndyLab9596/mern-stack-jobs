import { Request, Response } from "express";
import User from "../models/User";
import CustomError from "../errors";
import { StatusCodes } from "http-status-codes";

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    throw new CustomError.BadRequestError("Please provide all values");

  const isEmailExist = await User.findOne({ email });
  if (isEmailExist)
    throw new CustomError.BadRequestError("Email is already exist");

  const user = await User.create(req.body);
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({
      user: {
        email: user.email,
        lastName: user.lastName,
        name: user.name,
        location: user.location,
      },
      token,
      location: user.location,
    });
};

const login = async (req: Request, res: Response) => {
  res.send("Login ");
};

const updateUser = async (req: Request, res: Response) => {
  res.send("Update user");
};

export { register, login, updateUser };
