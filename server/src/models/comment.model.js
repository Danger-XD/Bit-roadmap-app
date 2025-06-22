import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    comment: { type: String, required: true, maxLength: 200 },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const commentModel = mongoose.model("Comment", commentSchema);
export default commentModel;
