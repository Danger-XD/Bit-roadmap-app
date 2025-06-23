import { Router } from "express";
const router = Router();
import * as postController from "../controllers/post.controller.js";

router.route("/get/all/posts").get(postController.getPost);// for home page
router.route("/get/by/category/:categoryId").get(postController.getPostByCategory);// for home page filter
router.route("/roadmap/:postId").get(postController.getSinglePost);// for a single post clicked by user

// these operations can be used from the backend only
router.route("/create-post").post(postController.createPost);
router.route("/update-post/:postId").patch(postController.updatePost);
router.route("/delete-post/:postId").delete(postController.deletePost);

export default router;
