import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    postImg: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: { values: ["Beginner", "Intermediate", "Advanced"] },
    },
    upvote: [{ type: Schema.Types.ObjectId, ref: "Upvote" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const postModel = mongoose.Model("Post", postSchema);
export default postModel;
