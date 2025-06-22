import mongoose, { Schema } from "mongoose";

const upvoteSchema = new Schema(
  {
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    versionKey: true,
  }
);

const upvoteModel = mongoose.Model("Upvote", upvoteSchema);
export default upvoteModel;
