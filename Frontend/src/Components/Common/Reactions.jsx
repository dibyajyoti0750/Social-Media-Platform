import { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";

export default function Reactions({ likes, comments, shares }) {
  const [randomStats] = useState({
    likes: Math.floor(Math.random() * 1000) + 1,
    comments: Math.floor(Math.random() * 50) + 1,
    shares: Math.floor(Math.random() * 50) + 1,
  });

  return (
    <div className="flex justify-between items-center py-3 px-4">
      <div className="flex items-center gap-1 text-sm font-light text-gray-500">
        <HeartIcon className="h-4 w-4" />
        <span>{likes || randomStats.likes}</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500 font-light">
        <span>{comments || randomStats.comments} comments</span>
        <span>{shares || randomStats.shares} shares</span>
      </div>
    </div>
  );
}
