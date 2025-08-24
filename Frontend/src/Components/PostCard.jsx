import { useState } from "react";
import { assets } from "../assets/assets.js";
import { timeAgo } from "../utils.js";

export default function PostCard({
  profilePic,
  userName,
  content,
  image,
  likes,
  comments,
  shares,
  createdAt,
}) {
  const [randomStats] = useState({
    likes: Math.floor(Math.random() * 100) + 1,
    comments: Math.floor(Math.random() * 100) + 1,
    shares: Math.floor(Math.random() * 100) + 1,
  });

  return (
    <div className="flex flex-col bg-white my-4 rounded-xl shadow-[0px_0px_10px_-2px_#00000024]">
      {/* Header */}
      <div className="flex justify-between items-center pt-4 px-4">
        <div className="flex items-center gap-4">
          <a href="#">
            <img
              src={profilePic || assets.user}
              alt={`${userName || "Demo User"} profile`}
              className="h-10 rounded-full"
            />
          </a>

          <div>
            <p>
              <a href="#">{userName || "Demo User"}</a>
            </p>
            <span>{timeAgo(createdAt)}</span>
          </div>
        </div>

        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-full cursor-pointer">
          <i className="fas fa-ellipsis"></i>
        </button>
      </div>

      {/* Content */}
      <div className="py-3 px-4">{content}</div>

      {image && (
        <a href="#">
          <img
            src={image}
            alt="Post content"
            className="w-full object-cover max-h-96"
          />
        </a>
      )}

      {/* Stats */}
      <div className="flex justify-between items-center py-3 px-4">
        <div>
          <i className="fas fa-thumbs-up text-indigo-400"></i>
          &nbsp;
          <span className="text-gray-500 font-light">
            {likes || randomStats.likes}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-500 font-light">
          <span>{comments || randomStats.comments} comments</span>
          <span>{shares || randomStats.shares} shares</span>
        </div>
      </div>

      <hr className="mx-4 text-center text-gray-200" />

      {/* Actions */}
      <div className="flex justify-between items-center text-xl text-gray-400 p-4 mx-20">
        <button>
          <i className="far fa-thumbs-up"></i>
        </button>
        <button>
          <i className="far fa-comment"></i>
        </button>
        <button>
          <i className="far fa-share-from-square"></i>
        </button>
      </div>
    </div>
  );
}
