import commentModel from "./../models/comment.model.js";
import replyModel from "./../models/reply.model.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;


export const getReplies = async (req, res) => {
  try {
    // get comment id
    const { commentId } = req.params;
    // check comment exist
    const existingComment = await commentModel.findOne({
      _id: new ObjectId(commentId),
    });
    if (!existingComment) {
      return res.status(404).json({
        status: "failed",
        message: "Reply: Comment not found!",
      });
    }
    // get all the reply for that comment
    const replies = await replyModel.aggregate([
      {
        $match: { commentId: new ObjectId(commentId) },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
          pipeline: [
            {
              $project: {
                _id: 0,
                username: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$user",
      },
      {
        $sort: { createdAt: 1 },
      },
      {
        $project: {
          _id: 1,
          reply: 1,
          user: 1,
          commentId: 1,
          createdAt: 1,
        },
      },
    ]);

    if (!replies || replies.length === 0) {
      return res
        .status(200)
        .json({
          status: "success",
          message: "No replies found for this comment",
          replies: [],
        });
    }
    return res.status(200).json({
      status: "success",
      message: "Reply: Reply fetched successfully!",
      replies,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

export const getRepliesNumber = async (req, res) => {
  try {
    // get comment id
    const { commentId } = req.params;
    // check comment exist
    const existingComment = await commentModel.findOne({
      _id: new ObjectId(commentId),
    });
    if (!existingComment) {
      return res
        .status(404)
        .json({ status: "failed", message: "Reply: Comment not found!" });
    }
    // get all the reply for that comment
    const replies = await replyModel.aggregate([
      {
        $match: { commentId: new ObjectId(commentId) },
      },
      {
        $count: "replyNumber",
      },
    ]);
    if (replies.length === 0) {
      return res.status(404).json({
        status: "success",
        message: "Reply: No reply found!",
        replies: 0,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Reply: Reply fetched successfully!",
      replies,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

export const postReplyComment = async (req, res) => {
  try {
    // get post id
    const { commentId } = req.params;
    // check comment exist
    const checkComment = await commentModel.findOne({
      _id: new ObjectId(commentId),
    });
    if (!checkComment) {
      return res
        .status(404)
        .json({ status: "failed", message: "Reply: Comment not found!" });
    }
    // count comments reply
    const countReply = await replyModel.countDocuments({
      commentId: new ObjectId(commentId),
    });
    if (countReply >= 3) {
      return res.status(400).json({
        status: "failed",
        message: "Reply: Reply limit reached on comment!",
      });
    }
    // get reply from user
    const { reply } = req.body;
    if (!reply) {
      return res.status(400).json({
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
    return res.status(200).json({
      status: "success",
      message: "Reply: Replied to comment!",
      reply: createReply,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

export const replyUpdate = async (req, res) => {
  try {
    // get reply id
    const { replyId: _id } = req.params;
    // check reply exist
    const existingReply = await replyModel.findOne({
      _id: new ObjectId(_id),
    });
    if (!existingReply) {
      return res
        .status(404)
        .json({ status: "failed", message: "Reply: Reply not found!" });
    }
    // get reply from user
    const { reply } = req.body;
    if (!reply) {
      return res.status(400).json({
        status: "failed",
        message: "Reply: Reply field required!",
      });
    }
    const updateReply = await replyModel.findByIdAndUpdate(
      { _id: new ObjectId(_id) },
      { reply },
      { new: true }
    );
    if (!updateReply) {
      return res.status(400).json({
        status: "failed",
        message: "Reply: Something went wrong with reply update!",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Reply: Reply Updated successfully",
      updateReply,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

export const deleteReply = async (req, res) => {
  try {
    // get reply id
    const { replyId: _id } = req.params;
    // check reply exist
    const existingReply = await replyModel.findOne({
      _id: new ObjectId(_id),
    });
    if (!existingReply) {
      return res
        .status(404)
        .json({ status: "failed", message: "Reply: Reply not found!" });
    }
    // delete reply
    const deleteReply = await replyModel.findByIdAndDelete({ _id });
    return res.status(200).json({
      status: "success",
      message: "Reply: Reply deleted!",
      deleteReply,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};
