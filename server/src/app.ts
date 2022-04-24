import cors from "cors";
import express, { Application, Request, Response } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import morgan from "morgan";
// db and authenticateUser
import connectDb from "./db/connectDb";

// custom middleware
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";

// routers
import authRouter from "./routes/authRoutes";
import jobRouter from "./routes/jobRoutes";

dotenv.config();
const app: Application = express();

// Middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}
app.use(cors());
app.use(express.json());
// app.use(morgan("tiny"));
console.log("Hello");
console.log("Hello");
console.log("Hello");
app.get("/api/v1", (req: Request, res: Response) => {
  res.json({ msg: "hello world" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobRouter);

// Custom Middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
