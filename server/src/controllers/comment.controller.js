import commentModel from "../models/comment.model.js";
import mongoose from "mongoose";
import postModel from "../models/post.model.js";
const ObjectId = mongoose.Types.ObjectId;

export const getComments = async (req, res) => {
  try {
    // get post Id
    const { postId } = req.params;
    // check post exist
    const checkPost = await postModel.findOne({ _id: new ObjectId(postId) });
    if (!checkPost) {
      return res
        .status(200)
        .json({ status: "success", message: "Comment: Post not found!" });
    }
    // get the comments
    const comments = await commentModel.aggregate([
      {
        $match: { postId: new ObjectId(postId) },
      },
      {
        $lookup: {
          from: "users",
          let: { userId: "$userId" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$userId"] },
              },
            },
            {
              $project: {
                username: 1,
                _id: 0,
              },
            },
          ],
          as: "User",
        },
      },
      {
        $unwind: "$User",
      },
    ]);

    if (comments.length === 0) {
      return res
        .status(200)
        .json({
          status: "success",
          message: "Comment: No comment found",
          post: [],
        });
    }
    return res.status(200).json({
      status: "success",
      message: "Comment: Commented successfully!",
      post: comments,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};
export const commentPost = async (req, res) => {
  try {
    // get userId
    const { _id } = req.user;
    // get post Id
    const { postId } = req.params;
    // check post exist
    const checkPost = await postModel.findOne({ _id: postId });
    if (!checkPost) {
      return res
        .status(200)
        .json({ status: "success", message: "Comment: Post not found!" });
    }
    // get comment from user
    const { comment } = req.body;
    if (!comment) {
      return res.status(200).json({
        status: "success",
        message: "Comment: Comment on post required!",
      });
    }
    // create post comment
    const data = {
      comment,
      userId: new ObjectId(_id),
      postId: new ObjectId(postId),
    };
    const createComment = await commentModel.create(data);
    return res.status(200).json({
      status: "success",
      message: "Comment: Commented successfully!",
      post: createComment,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};
export const deleteCommentPost = async (req, res) => {
  try {
    // get post Id
    const { postId } = req.params;
    // check post exist
    const checkPost = await commentModel.findOne({ postId });
    if (!checkPost) {
      return res.status(200).json({
        status: "success",
        message: "Comment: No comment comment on the post!",
      });
    }
    const createComment = await commentModel.deleteOne({ postId });
    return res.status(200).json({
      status: "success",
      message: "Comment: Comment deleted successfully!",
      post: createComment,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};
