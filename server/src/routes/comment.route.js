import { Router } from "express";
const router = Router();
import * as commentController from "../controllers/comment.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

// GET -> a single post comments (not secured)
router.route("/c/comments/:postId").get(commentController.getComments);

// POST -> create a comment (secured)
router
  .route("/c/create/:postId")
  .post(verifyToken, commentController.commentPost);

// PATCH -> update a comment (secured)
router
  .route("/c/update/:commentId")
  .patch(verifyToken, commentController.updateComment);

// DELETE -> delete a comment (secured)
router
  .route("/c/delete/:commentId")
  .delete(verifyToken, commentController.deleteCommentPost);

export default router;
