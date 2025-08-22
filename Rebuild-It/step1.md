Create a project folder (Social-Media-Platform) and open it in VS Code.

```sh
git init
mkdir Backend
cd Backend
npm init -y
npm i express mongoose cors dotenv
```

package.json

```json
"type": "module",
"main": "app.js",
```

app.js

```js
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
```

models/post.js

```js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    content: { type: String, required: true },
    image: {
      type: String,
      default:
        "https://images.pexels.com/photos/14036568/pexels-photo-14036568.jpeg",
      set: (v) =>
        v === ""
          ? "https://images.pexels.com/photos/14036568/pexels-photo-14036568.jpeg"
          : v,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
```

Init/data.js

```js
export const postData = [
  {}, {}, {} ... // Init data objects
]
```

Init/index.js

```js
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import mongoose from "mongoose";
import { postData } from "./data.js";
import Post from "../models/post.js";

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
```
