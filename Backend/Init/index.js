import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import mongoose from "mongoose";
import { postData } from "./data.js";
import Post from "../models/post.js";
import Comment from "../models/comment.js";

const initDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await Post.deleteMany({});
    await Post.insertMany(postData);

    console.log("DB was initialized with sample posts ✅");
  } catch (err) {
    console.error("Error initializing DB:", err);
  } finally {
    mongoose.connection.close();
  }
};

initDB();

// const deleteComments = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("DB connected");
//     await Comment.deleteMany({});
//     console.log("comments deleted");
//   } catch (err) {
//     console.log(err);
//   } finally {
//     mongoose.connection.close();
//   }
// };
// deleteComments();
