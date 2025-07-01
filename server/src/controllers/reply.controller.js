import commentModel from "./../models/comment.model.js";
import replyModel from "./../models/reply.model.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export const replyComment = async (req, res) => {
  try {
    // get post id
    const { commentId } = req.params;
    // check comment exist
    const checkComment = await commentModel.findOne({ _id: commentId });
    if (!checkComment) {
      return res
        .status(200)
        .json({ status: "failed", message: "Reply: Post not found!" });
    }
    // count comments reply
    const countReply = await replyModel.countDocuments({
      commentId: new ObjectId(commentId),
    });
    if (countReply > 3) {
      return res.status(200).json({
        status: "failed",
        message: "Reply: Reply limit reached on comment!",
      });
    }
    // get reply from user
    const { reply } = req.body;
    if (!reply) {
      return res.status(200).json({
        status: "failed",
        message: "Reply: Reply field required!",
      });
    }
    const { _id } = req.user;
    const createReply = await replyModel.create({
      reply,
      userId: _id,
      commentId,
    });
    return res
      .status(200)
      .json({
        status: "success",
        message: "Reply: Replied to comment!",
        reply: createReply,
      });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};
