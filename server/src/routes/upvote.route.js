import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import * as upvoteController from "../controllers/upvote.controller.js";
const router = Router();

router.use(verifyToken);
// GET -> get the condition of user upvoted post
router.route("/check/boolean/:postId").get(upvoteController.getPostUpvote)

// POST -> Up vote a post with toggle
router.route("/toggle/:postId").post(upvoteController.togglePostUpvote);

export default router;
