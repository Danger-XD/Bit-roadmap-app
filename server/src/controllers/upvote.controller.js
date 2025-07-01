import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import postModel from "./../models/post.model.js";
import upvoteModel from "../models/upvote.model.js";

export const togglePostUpvote = async (req, res) => {
  try {
    // get post id
    const { postId } = req.params;
    // get user info
    const { _id: userId } = req.user;
    // check post exist
    const checkPost = await postModel.findOne({ _id: postId });
    if (!checkPost) {
      return res
        .status(200)
        .json({ status: "failed", message: "Upvote: Post not found!" });
    }
    // check if post is liked by user and if not then make it true
    const upvoteCheck = await upvoteModel.findOne({ postId });
    if (!upvoteCheck) {
      const upvotePost = await upvoteModel.create({ postId, userId });
      return res.status(200).json({
        status: "success",
        message: "Toggle: Upvoted post successfully!",
        post: true,
      });
    }
    const removeUpvote = await upvoteModel.deleteOne({ postId });
    return res.status(200).json({
      status: "success",
      message: "Toggle: Down-voted post successfully!",
      post: false,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

// export const getPostUpvote = async (req, res) => {
//   try {
//     // get post Id
//     const { postId } = req.params;
//     // check post exist
//     const checkPost = await postModel.findOne({ _id: postId });
//     if (!checkPost) {
//       return res
//         .status(200)
//         .json({ status: "failed", message: "Upvote: Post not found!" });
//     }
//     // get all the upvote count
//     const countUpvote = await upvoteModel.countDocuments({
//       postId: new ObjectId(postId),
//     });
//     return res.status(200).json({
//       status: "success",
//       message: "Counter: Number of post upvote fetched successfully!",
//       post: countUpvote,
//     });
//   } catch (error) {
//     return res.status(500).json({ status: "failed", message: error.message });
//   }
// };
