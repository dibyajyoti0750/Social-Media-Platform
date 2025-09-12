import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Utils & Routes
import { ExpressError } from "./utils/ExpressError.js";
import postRoutes from "./routes/post.js";
import commentRoutes from "./routes/comment.js";

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/post", postRoutes);
app.use("/post/:id/comments", commentRoutes);

// 404 handler
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

// Server starter + connect DB
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
