import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Post from "./models/post.js";

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Home Route
app.get("/", async (req, res) => {
  try {
    const allPosts = await Post.find({});
    res.status(200).json({ success: true, data: allPosts });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Show Route
app.get("/post/:id", async (req, res) => {
  let { id } = req.params;
  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ success: false, error: "Post not found" });
    }

    res.status(200).json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch post" });
  }
});

// Create route
app.post("/post", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();

    res.status(201).json({
      success: true,
      message: "New post saved",
      data: savedPost,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to save post",
      error: err.message,
    });
  }
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
