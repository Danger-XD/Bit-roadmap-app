import {
  DefaultErrorHandler,
  NotFoundError,
} from "./src/utilities/errorHandler.utility.js";
import cookieParser from "cookie-parser";
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
app.use(cookieParser())
const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});
app.use(limiter);

// Base API routes
import userApi from "./src/routes/user.route.js";
app.use("/api/v1/users", userApi);

// Not Found Error Handler
app.use(NotFoundError);
// Default Error Handler
app.use(DefaultErrorHandler);

export default app;
