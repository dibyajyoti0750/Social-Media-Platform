import { useState } from "react";
import { assets } from "../assets/assets";
import { timeAgo } from "../utils.js";
import DropDownMenu from "./DropDownMenu.jsx";

export default function PostHeader({
  postId,
  userName,
  profilePic,
  createdAt,
}) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  return (
    <div className="relative flex justify-between text-gray-100 items-center pt-4 px-4">
      <div className="flex items-center gap-4">
        <a href="#">
          <img
            src={profilePic || assets.user}
            loading="lazy"
            alt={`${userName || "Demo User"} profile`}
            className="h-10 rounded-full"
          />
        </a>

        <div>
          <p>
            <a href="#">{userName || "Demo User"}</a>
          </p>
          <span className="text-xs text-gray-400">{timeAgo(createdAt)}</span>
        </div>
      </div>

      <div
        onClick={() => setIsDropDownOpen(!isDropDownOpen)}
        className="w-8 h-8 flex items-center justify-center hover:bg-zinc-800 rounded-full cursor-pointer"
      >
        <i className="fas fa-ellipsis"></i>
      </div>

      {isDropDownOpen && (
        <DropDownMenu
          postId={postId}
          closeDropDown={() => setIsDropDownOpen(false)}
        />
      )}
    </div>
  );
}
