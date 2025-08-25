import { useState } from "react";

export default function Reactions({ likes, comments, shares }) {
  const [randomStats] = useState({
    likes: Math.floor(Math.random() * 1000) + 1,
    comments: Math.floor(Math.random() * 50) + 1,
    shares: Math.floor(Math.random() * 50) + 1,
  });

  return (
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
  );
}
