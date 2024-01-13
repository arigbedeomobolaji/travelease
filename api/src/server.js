import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import expressAsyncHandler from "express-async-handler";

// My imports
import { connectDatabase } from "./utils/db.js";
import keys from "./config/keys.js";
import userRouter from "./routes.js/user.routes.js";

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

app.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    res.status(200).send({ message: `connected on port ${keys.PORT}` });
  })
);

// custom routes
app.use("/api/v1/users", userRouter);

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
