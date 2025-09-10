import mongoose from "mongoose";
const Schema = mongoose.Schema;
import CommentCollection from "./comment.js";

const postSchema = new Schema(
  {
    content: { type: String, required: true },
    image: { type: String },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

postSchema.post("findOneAndDelete", async (post) => {
  if (post) {
    await CommentCollection.deleteMany({ _id: { $in: post.comments } });
  }
});

const Post = mongoose.model("Post", postSchema);

export default Post;
