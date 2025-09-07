import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
