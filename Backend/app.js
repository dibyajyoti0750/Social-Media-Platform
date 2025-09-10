import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Post from "./models/post.js";
import wrapAsync from "./utils/wrapAsync.js";
import { ExpressError } from "./utils/ExpressError.js";
import { commentSchema, postSchema, updatePostSchema } from "./schema.js";
import CommentCollection from "./models/comment.js";

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

const validatePost = (schema) => (req, res, next) => {
  let { error } = schema.validate(req.body);

  if (error) {
    throw new ExpressError(400, error.details[0].message);
  } else {
    next();
  }
};

const validateComment = (req, res, next) => {
  let { error } = commentSchema.validate(req.body);

  if (error) {
    console.log(error.details[0].message);

    throw new ExpressError(400, error.details[0].message);
  } else {
    next();
  }
};

// Home Route
app.get(
  "/",
  wrapAsync(async (req, res, next) => {
    const allPosts = await Post.find({}).sort("-createdAt");

    if (!allPosts) {
      throw new ExpressError(404, "Posts not found");
    }

    res.status(200).json({ success: true, data: allPosts });
  })
);

// Show Route
app.get(
  "/post/:id",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;

    const post = await Post.findById(id).populate({ path: "comments" });

    if (!post) {
      throw new ExpressError(404, "Post not found");
    }

    res.status(200).json({ success: true, data: post });
  })
);

// Create route
app.post(
  "/post",
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

// Create route for comments
app.post(
  "/post/:id/comments",
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
app.delete(
  "/post/:id/comments/:commentId",
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

// Edit route
app.patch(
  "/post/:id",
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

// Destroy route
app.delete(
  "/post/:id",
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

// Catches every request that doesn’t match any defined route
// ...and forwards a 404 error to the global error handler
// Using /.*/ means it's a regular expression that matches any path
app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.log(err);

  if (err.name === "CastError") {
    return res.status(400).json({ success: false, error: "Invalid ID format" });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({ success: false, error: err.message });
  }

  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).json({ success: false, error: message });
});

// Server starter
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  } catch (err) {
    console.log(`MongoDB connection error ${err}`);
    process.exit(1); // force quit app with an error signal
  }
};

startServer();
