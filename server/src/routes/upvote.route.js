import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import * as upvoteController from "../controllers/upvote.controller.js";
const router = Router();

router.use(verifyToken);

router.route("/toggle/:postId").post(upvoteController.togglePostUpvote);// single post upvote 

export default router;
