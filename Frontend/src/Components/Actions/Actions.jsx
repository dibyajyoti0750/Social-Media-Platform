import {
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

import { Link, useLocation } from "react-router-dom";

export default function Actions({ postId, focusInput }) {
  const location = useLocation();
  const isOnShowPage = location.pathname === `/post/${postId}`;

  return (
    <div className="flex justify-around items-center px-4 py-2 text-sm text-gray-600">
      {/* Like Button */}
      <button className="flex items-center gap-2 px-3 py-2 hover:text-gray-300 cursor-pointer">
        <HeartIcon className="h-5 w-5" />
        <span>Like</span>
      </button>

      {/* Comment Button */}
      {isOnShowPage ? (
        <button
          onClick={focusInput}
          className="flex items-center gap-2 px-3 py-2 hover:text-gray-300 cursor-pointer"
        >
          <ChatBubbleOvalLeftIcon className="h-5 w-5" />
          <span>Comment</span>
        </button>
      ) : (
        <Link
          to={`/post/${postId}`}
          className="flex items-center gap-2 px-3 py-2 hover:text-gray-300 cursor-pointer"
        >
          <ChatBubbleOvalLeftIcon className="h-5 w-5" />
          <span>Comment</span>
        </Link>
      )}

      {/* Share Button */}
      <button className="flex items-center gap-2 px-3 py-2 hover:text-gray-300 cursor-pointer">
        <ShareIcon className="h-5 w-5" />
        <span>Share</span>
      </button>
    </div>
  );
}
