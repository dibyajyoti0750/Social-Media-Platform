import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    content: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
