import { Request, Response } from "express";

const register = async (req: Request, res: Response) => {
  res.send("Register");
};

const login = async (req: Request, res: Response) => {
  res.send("Login ");
};

const updateUser = async (req: Request, res: Response) => {
  res.send("Update user");
};

export { register, login, updateUser };
