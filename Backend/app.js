import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Post from "./models/post.js";
import wrapAsync from "./utils/wrapAsync.js";
import { ExpressError } from "./utils/ExpressError.js";

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

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

    const post = await Post.findById(id);

    if (!post) {
      throw new ExpressError(404, "Post not found");
    }

    res.status(200).json({ success: true, data: post });
  })
);

// Create route
app.post(
  "/post",
  wrapAsync(async (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      // express.json() always gives you an obj, this checks whether the object has zero own properties.

      throw new ExpressError(400, "Send valid data to post");
    }

    const newPost = new Post(req.body);
    const savedPost = await newPost.save();

    res.status(201).json({
      success: true,
      message: "New post saved",
      data: savedPost,
    });
  })
);

// Edit route
app.patch(
  "/post/:id",
  wrapAsync(async (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new ExpressError(400, "Send valid post data to update");
    }

    const { id } = req.params;
    const { content, image } = req.body;

    const updates = {};
    if (content !== undefined) updates.content = content;
    if (image !== undefined) updates.image = image;

    const editedPost = await Post.findByIdAndUpdate(id, updates, { new: true });

    if (!editedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
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
