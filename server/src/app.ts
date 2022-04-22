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

dotenv.config();
const app: Application = express();

// Middleware
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.use("/api/v1/auth", authRouter);

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
