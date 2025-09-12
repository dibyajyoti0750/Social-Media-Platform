import express from "express";
const router = express.Router();
import wrapAsync from "../utils/wrapAsync.js";
import { ExpressError } from "../utils/ExpressError.js";
import { postSchema, updatePostSchema } from "../schema.js";
import Post from "../models/post.js";

const validatePost = (schema) => (req, res, next) => {
  let { error } = schema.validate(req.body);

  if (error) {
    throw new ExpressError(400, error.details[0].message);
  } else {
    next();
  }
};

// Home route
router.get(
  "/",
  wrapAsync(async (req, res, next) => {
    const allPosts = await Post.find({}).sort("-createdAt");

    if (!allPosts) {
      throw new ExpressError(404, "Posts not found");
    }

    res.status(200).json({ success: true, data: allPosts });
  })
);

// Show post route
router.get(
  "/:id",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;

    const post = await Post.findById(id).populate({ path: "comments" });

    if (!post) {
      throw new ExpressError(404, "Post not found");
    }

    res.status(200).json({ success: true, data: post });
  })
);

// Create post route
router.post(
  "/",
  validatePost(postSchema),
  wrapAsync(async (req, res, next) => {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();

    res.status(201).json({
      success: true,
      message: "Your post was sent",
      data: savedPost,
    });
  })
);

// Update post route
router.patch(
  "/:id",
  validatePost(updatePostSchema),
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;

    const editedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!editedPost) {
      throw new ExpressError(404, "Post not found");
    }

    res.status(200).json({
      success: true,
      message: "Post edited successfully",
      data: editedPost,
    });
  })
);

// Destroy post route
router.delete(
  "/:id",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      throw new ExpressError(404, "Post not found");
    }

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      data: deletedPost,
    });
  })
);

export default router;
