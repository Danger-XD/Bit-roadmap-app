import { Router } from "express";
const router = Router();
import * as commentController from "../controllers/comment.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

router.use(verifyToken);
router.route("/c/create/:postId").post(commentController.commentPost);
router.route("/c/delete/:postId").delete(commentController.deleteCommentPost);

export default router;
