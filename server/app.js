import {
  DefaultErrorHandler,
  NotFoundError,
} from "./src/utilities/errorHandler.utility.js";
import hpp from "hpp";
import cors from "cors";
import rateLimiter from "express-rate-limit";
import helmet from "helmet";
import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors());
app.use(helmet());
app.use(hpp());
const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});
app.use(limiter);

//Not Found Error Handler
app.use(NotFoundError);
// Default Error Handler
app.use(DefaultErrorHandler);

export default app;
