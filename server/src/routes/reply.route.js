import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = Router();
import * as replyController from "../controllers/reply.controller.js";

router.use(verifyToken);
router.route("/r/:commentId").post(replyController.replyComment);

export default router;
