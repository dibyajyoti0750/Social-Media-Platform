import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    content: { type: String, required: true },
    image: {
      type: String,
      default:
        "https://images.pexels.com/photos/14036568/pexels-photo-14036568.jpeg",
      set: (v) =>
        v === ""
          ? "https://images.pexels.com/photos/14036568/pexels-photo-14036568.jpeg"
          : v,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
