import express from "express";
const router = express.Router({ mergeParams: true });
import wrapAsync from "../utils/wrapAsync.js";
import { ExpressError } from "../utils/ExpressError.js";
import { commentSchema } from "../schema.js";
import CommentCollection from "../models/comment.js";
import Post from "../models/post.js";

const validateComment = (req, res, next) => {
  let { error } = commentSchema.validate(req.body);

  if (error) {
    console.log(error.details[0].message);

    throw new ExpressError(400, error.details[0].message);
  } else {
    next();
  }
};

// Create comment route
router.post(
  "/",
  validateComment,
  wrapAsync(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
      throw new ExpressError(404, "Post not found");
    }

    const newComment = new CommentCollection(req.body);
    const savedComment = await newComment.save();

    post.comments.push(savedComment._id);
    await post.save();

    res.status(201).json({
      success: true,
      message: "New comment added",
    });
  })
);

// Destroy comment route
router.delete(
  "/:commentId",
  wrapAsync(async (req, res) => {
    const { id, commentId } = req.params;

    const post = await Post.findById(id);
    if (!post) throw new ExpressError(404, "Post not found");

    const comment = await CommentCollection.findById(commentId);
    if (!comment) throw new ExpressError(404, "Comment not found");

    // Remove the comment reference from the Post document
    await Post.findByIdAndUpdate(id, { $pull: { comments: commentId } });

    // Delete the actual Comment document
    await CommentCollection.findByIdAndDelete(commentId);

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  })
);

export default router;
