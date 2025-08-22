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
