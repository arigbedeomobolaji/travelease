import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";

// My imports
import { connectDatabase } from "./utils/db.js";
import keys from "./config/keys.js";
import userRouter from "./routes.js/user.routes.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();

// use JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// enable CORS
app.use(cors());
// Parse Cookie header and populate req.cookies
app.use(cookieParser());
// HTTP request logger middleware
app.use(morgan("dev"));
// setting HTTP response headers
app.use(helmet());

const MONGO_URL = keys.MONGO_URL;

app.get("/", async (req, res, next) => {
  try {
    res.status(200).json({ message: `connected on port ${keys.PORT}` });
  } catch (error) {
    next(error);
  }
});

// custom routes
app.use("/api/v1/users", userRouter);

// Error Middleware
app.use(errorMiddleware);

// start the server and database
async function startServer(port) {
  try {
    await connectDatabase(MONGO_URL);
    app.listen(port, () => {
      console.log(`🚀🚀🚀 Api up and running at: http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit();
  }
}

export default startServer;
