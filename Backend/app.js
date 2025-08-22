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

// Test Routes
app.get("/", (req, res) => {
  res.status(200).json("Hi, I'm root");
});

app.get("/test", async (req, res) => {
  try {
    const samplePost = new Post({ content: "Hello World!" });
    const savedPost = await samplePost.save();
    res.status(201).json({ message: "Post created", post: savedPost });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
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
