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
import dotenv from "dotenv";
const app = express();
dotenv.config();

app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(helmet());
app.use(hpp());
app.use(cookieParser());
const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});
app.use(limiter);

// Base API routes
import userApi from "./src/routes/user.route.js";
import postApi from "./src/routes/post.route.js";
import upvoteApi from "./src/routes/upvote.route.js";
import commentApi from "./src/routes/comment.route.js";
import replyApi from "./src/routes/reply.route.js";

app.use("/api/v1/users", userApi);
app.use("/api/v1/posts", postApi);
app.use("/api/v1/post/upvote", upvoteApi);
app.use("/api/v1/post/comment", commentApi);
app.use("/api/v1/post/comment/reply", replyApi);

// Not Found Error Handler
app.use(NotFoundError);
// Default Error Handler
app.use(DefaultErrorHandler);

export default app;
