import { Request, Response } from "express";
import User, { IUser } from "../models/User";
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
  const { email, password } = req.body;

  if (!email || !password) throw new CustomError.UnauthenticatedError('Please provide all values');

  const user = await User.findOne({ email }).select('+password');

  if (!user) throw new CustomError.UnauthenticatedError('Invalid credential');
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) throw new CustomError.UnauthenticatedError('Invalid credential');
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      name: user.name,
      location: user.location,
    }, token, location: user.location
  })

};

const updateUser = async (req: Request, res: Response) => {
  const { email, name, lastName, location } = req.body;

  if (!email || !name || !lastName || !location) {
    throw new CustomError.BadRequestError('Please provide all values')
  }

  const user = await User.findOne<IUser>({ email });

  if (!user) throw new CustomError.NotFoundError('User not found');

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user,
    token,
    location: user.location
  })
};

export { register, login, updateUser };
