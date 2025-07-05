import { Router } from "express";
const router = Router();
import * as postController from "../controllers/post.controller.js";

// BASE API -> /api/v1/posts

// GET -> all the posts(image, category and title) + upvote & comment count
router.route("/get/all/posts").get(postController.getPost); 

// GET -> filtered post(image, category and title) by category(beginner/intermediate/advanced)
router
  .route("/get/by/category/:categoryId")
  .get(postController.getPostByCategory); 

// GET -> a single post -> post(image, category and title), upvote and comment count for that post
router.route("/roadmap/:postId").get(postController.getSinglePost); 


// These operations can be used from the backend only
// POST -> create a post(image, category and title)
router.route("/create-post").post(postController.createPost);

// PATCH -> update a post(image, category and title)
router.route("/update-post/:postId").patch(postController.updatePost);

// DELETE -> delete a post by post id
router.route("/delete-post/:postId").delete(postController.deletePost);

export default router;
