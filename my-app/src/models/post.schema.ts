import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    type: String,
    amount: Number,
    category: String,
    date: Date,
    userId: String,
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
