import postModel from "../models/post.model.js";

export const createPost = async (req, res) => {
  try {
    // get information from body
    const { postImg, title, category } = req.body; // "Beginner", "Intermediate", "Advanced"
    // validate for empty fields
    if (!postImg || !category || !title) {
      return res
        .status(400)
        .json({ status: "failed", message: "Post: Field cannot be empty!" });
    }
    // create data in DB
    const post = await postModel.create({
      postImg,
      category,
      title,
      upvotes: [],
      comments: [],
    });
    // check data created or not
    if (!post) {
      return res.status(400).json({
        status: "failed",
        message: "Post: Something went wrong while creating post!",
      });
    }
    // return data
    return res.status(200).json({
      status: "success",
      message: "Post: Post created successfully!",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};
export const getPost = async (req, res) => {
  try {
    // get all the post
    const posts = await postModel.find();
    // return post
    return res.status(200).json({
      status: "success",
      message: "Post: Post fetched successfully!",
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};
export const getPostByCategory = async (req, res) => {
  try {
    // get category name
    const { categoryId } = req.params;
    const categoryInLower = categoryId.toLowerCase();
    const validCategories = ["beginner", "intermediate", "advanced"];
    if (!validCategories.includes(categoryInLower)) {
      return res
        .status(400)
        .json({ status: "failed", message: "Post: Wrong category!" });
    }
    // get all the post
    const posts = await postModel.find({ category: categoryInLower });
    if (posts.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "Post: No Post found of the category!",
      });
    }
    // return post
    return res.status(200).json({
      status: "success",
      message: "Post: Post fetched successfully!",
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};
export const updatePost = async (req, res) => {
  try {
    // get post id
    const { postId: _id } = req.params;
    // search if post exist
    const postCheck = await postModel.find({ _id });
    if (postCheck.length === 0) {
      return res
        .status(400)
        .json({ status: "failed", message: "Post: Post does not exist!" });
    }
    // get update info
    const { postImg, title, category } = req.body;
    // update info
    const updatedPost = await postModel.findByIdAndUpdate(
      { _id },
      { postImg, title, category },
      { new: true }
    );
    // return updated info
    return res
      .status(200)
      .json({
        status: "success",
        message: "Post: Post updated successfully!",
        post: updatedPost,
      });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};
export const deletePost = async (req, res) => {
  try {
    // get post id
    const { postId: _id } = req.params;
    // search if post exist
    const postCheck = await postModel.find({ _id });
    if (postCheck.length === 0) {
      return res
        .status(400)
        .json({ status: "failed", message: "Post: Post does not exist!" });
    }
    // delete post
    const deletedPost = await postModel.findByIdAndDelete({ _id });
    // return updated info
    return res
      .status(200)
      .json({ status: "success", message: "Post: Post deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};
export const getSinglePost = async (req, res) => {
  try {
    // get post id
    const { postId: _id } = req.params;
    // search if post exist
    const postCheck = await postModel.findOne({ _id });
    if (postCheck.length === 0) {
      return res
        .status(400)
        .json({ status: "failed", message: "Post: Post does not exist!" });
    }
    // return post
    return res.status(200).json({ status: "success", message: "Post: Individual post found!", post: postCheck });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};
