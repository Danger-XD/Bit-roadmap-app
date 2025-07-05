import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = Router();
import * as replyController from "../controllers/reply.controller.js";

// BASE API -> /api/v1/post/comment/reply

// GET -> to get all the reply of a comment
router.route("/r/get/:commentId").get(replyController.getReplies);

// GET -> number of reply to a comment reach limit
router.route("/r/number/:commentId").get(replyController.getRepliesNumber);

// POST -> To reply to a comment
router
  .route("/r/:commentId")
  .post(verifyToken, replyController.postReplyComment);

// PATCH -> To update a reply
router
  .route("/r/update/:replyId")
  .patch(verifyToken, replyController.replyUpdate);

// DELETE -> To delete a reply
router
  .route("/r/delete/:replyId")
  .delete(verifyToken, replyController.deleteReply);

  
export default router;
