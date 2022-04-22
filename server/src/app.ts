import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import connectDb from "./db/connectDb";

dotenv.config();
const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL as string);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
