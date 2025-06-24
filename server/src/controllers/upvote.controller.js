import mongoose from "mongoose";
import postModel from "./../models/post.model.js";

export const togglePostUpvote = async (req, res) => {
  try {
    // get post id
    const { postId } = req.params;
    // get user info
    const { _id } = req.user;
    const userId= _id.toString()
    // check post exist
    const checkPost = await postModel.findOne({ _id: postId });
    if (!checkPost) {
      return res
        .status(400)
        .json({ status: "failed", message: "Upvote: Post not found!" });
    }
    // check if post is liked by user and if not then make it true
    const postUpvoted = checkPost.upvotes.includes(userId);
    if (postUpvoted) {
      const userIndex = checkPost.upvotes.indexOf(userId);
      checkPost.upvotes.splice(userIndex, 1);
      const updatedPost = await postModel.findOne({ _id: postId });
      return res
        .status(200)
        .json({
          status: "success",
          message: "Toggle: Upvote removed successfully!",
          post: updatedPost,
        });
    }
    checkPost.upvotes.push(userId)
    const updatedPost = await postModel.findOne({ _id: postId });
      return res
        .status(200)
        .json({
          status: "success",
          message: "Toggle: Upvoted post successfully!",
          post: updatedPost,
        });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};
// export const getPostUpvote = async (req, res) => {
//   try {
//     return res.status(200).json({status:"success",message:"Initiated"})
//   } catch (error) {
//     return res.status(500).json({ status: "failed", message: error.message });
//   }
// };
