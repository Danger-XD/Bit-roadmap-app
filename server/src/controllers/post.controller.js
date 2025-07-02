import postModel from "../models/post.model.js";
import upvoteModel from "./../models/upvote.model.js";
import commentModel from "./../models/comment.model.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export const getPost = async (req, res) => {
  try {
    // get all the post
    const posts = await postModel.aggregate([
      {
        $lookup: {
          from: "upvotes",
          localField: "_id",
          foreignField: "postId",
          as: "upvoteInfo",
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "commentInfo",
        },
      },
      {
        $project: {
          postImg: 1,
          category: 1,
          title: 1,
          upvoteCounts: { $size: "$upvoteInfo" },
          commentCounts: { $size: "$commentInfo" },
        },
      },
    ]);
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
    const validCategories = [
      "beginner",
      "intermediate",
      "advanced",
      "popularity",
    ];
    if (!validCategories.includes(categoryInLower)) {
      return res
        .status(200)
        .json({ status: "failed", message: "Post: Wrong category!" });
    }
    // get all the post for popularity
    if (categoryInLower === "popularity") {
      const popularPost = await postModel.aggregate([
        {
          $lookup: {
            from: "upvotes",
            localField: "_id",
            foreignField: "postId",
            as: "upvoteInfo",
          },
        },
        {
          $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "postId",
            as: "commentInfo",
          },
        },
        {
          $project: {
            postImg: 1,
            category: 1,
            title: 1,
            upvoteCounts: { $size: "$upvoteInfo" },
            commentCounts: { $size: "$commentInfo" },
          },
        },
        {
          $sort: { upvoteCounts: -1 },
        },
      ]);
      if (popularPost.length === 0) {
        return res.status(200).json({
          status: "success",
          message: "Post: No Post found of the category!",
        });
      }
      // return post
      return res.status(200).json({
        status: "success",
        message: "Post: Post fetched successfully!",
        data: popularPost,
      });
    }
    // get all the post for beginner/intermediate/advanced
    const posts = await postModel.aggregate([
      {
        $match: { category: categoryInLower },
      },
      {
        $lookup: {
          from: "upvotes",
          localField: "_id",
          foreignField: "postId",
          as: "upvoteInfo",
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "commentInfo",
        },
      },
      {
        $project: {
          postImg: 1,
          category: 1,
          title: 1,
          upvoteCounts: { $size: "$upvoteInfo" },
          commentCounts: { $size: "$commentInfo" },
        },
      },
    ]);
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
export const getSinglePost = async (req, res) => {
  try {
    // get post id
    const { postId: _id } = req.params;
    // search if post exist
    const postCheck = await postModel.aggregate([
      {
        $match: { _id: new ObjectId(_id) },
      },
      {
        $lookup: {
          from: "upvotes",
          localField: "_id",
          foreignField: "postId",
          as: "upvoteInfo",
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "commentInfo",
        },
      },
      {
        $project: {
          postImg: 1,
          category: 1,
          title: 1,
          upvoteCounts: { $size: "$upvoteInfo" },
          commentCounts: { $size: "$commentInfo" },
        },
      },
    ]);
    if (postCheck.length === 0) {
      return res
        .status(200)
        .json({ status: "failed", message: "Post: Post does not exist!" });
    }
    // return post
    return res.status(200).json({
      status: "success",
      message: "Post: Individual post found!",
      post: postCheck[0],
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

// backend operations only:
export const createPost = async (req, res) => {
  try {
    // get information from body
    const { postImg, title, category } = req.body; // "Beginner", "Intermediate", "Advanced"
    // validate for empty fields
    if (!postImg || !category || !title) {
      return res
        .status(200)
        .json({ status: "failed", message: "Post: Field cannot be empty!" });
    }
    // create data in DB
    const post = await postModel.create({
      postImg,
      category,
      title,
    });
    // check data created or not
    if (!post) {
      return res.status(200).json({
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
export const updatePost = async (req, res) => {
  try {
    // get post id
    const { postId: _id } = req.params;
    // search if post exist
    const postCheck = await postModel.find({ _id });
    if (postCheck.length === 0) {
      return res
        .status(200)
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
    return res.status(200).json({
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
        .status(200)
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
