import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    postImg: { type: String, required: true },
    category: {
      type: String,
      required: true,
      lowercase: true,
      enum: { values: ["beginner", "intermediate", "advanced"] },
    },
    title: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const postModel = mongoose.model("Post", postSchema);
export default postModel;
