import mongoose, { Schema } from "mongoose";

const replySchema = new Schema(
  {
    reply: { type: String, required: true, maxLength: 200 },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    commentId: { type: Schema.Types.ObjectId, ref: "Comment" },
  },
  {
    timestamps: true,
    versionKey: true,
  }
);
const replyModel = mongoose.model("Reply", replySchema);
export default replyModel;
