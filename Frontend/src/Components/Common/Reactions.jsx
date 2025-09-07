import { useState } from "react";
import { HeartIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/20/solid";
import { Link, useLocation } from "react-router-dom";

export default function Reactions({ likes, comments, postId }) {
  const [randomStats] = useState({
    likes: Math.floor(Math.random() * 1000) + 1,
  });

  const location = useLocation();
  const isOnShowPage = location.pathname === `/post/${postId}`;

  return (
    <div className="flex items-center gap-2 px-2 py-3 text-xs text-gray-400">
      <div className="flex items-center gap-1">
        <HeartIcon className="w-4 h-4" />
        <span>{likes || randomStats.likes}</span>
        <span>Likes</span>
      </div>

      {isOnShowPage ? (
        <button to={`/post/${postId}`} className="flex items-center gap-1">
          <ChatBubbleOvalLeftIcon className="w-4 h-4" />
          <span>{comments.length}</span>
          <span>{comments.length === 1 ? "comment" : "comments"}</span>
        </button>
      ) : (
        <Link to={`/post/${postId}`} className="flex items-center gap-1">
          <ChatBubbleOvalLeftIcon className="w-4 h-4" />
          <span>{comments.length}</span>
          <span>{comments.length === 1 ? "comment" : "comments"}</span>
        </Link>
      )}
    </div>
  );
}
