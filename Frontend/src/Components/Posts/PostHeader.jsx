import { useState } from "react";
import { assets } from "../../assets/assets.js";
import { timeAgo } from "../../utils.js";
import DropDownMenu from "../Common/DropDownMenu.jsx";
import { useLocation } from "react-router-dom";

export default function PostHeader({
  postId,
  userName,
  profilePic,
  createdAt,
}) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const location = useLocation();
  const isOnShowPage = location.pathname === `/post/${postId}`;

  return (
    <div className="relative flex justify-between items-center text-gray-100 pt-4 px-4">
      {/* Profile & User Info */}
      <div className="flex items-center gap-3">
        <a href="#">
          <img
            src={profilePic || assets.user}
            loading="lazy"
            alt={`${userName || "Demo User"} profile`}
            className="h-10 w-10 rounded-full object-cover"
          />
        </a>

        <div className="flex flex-col leading-tight">
          <a href="#" className="font-medium hover:underline">
            {userName || "Demo User"}
          </a>
          <span className="text-xs text-gray-500">{timeAgo(createdAt)}</span>
        </div>
      </div>

      {/* Dropdown Button */}
      <button
        onClick={() => setIsDropDownOpen(!isDropDownOpen)}
        className="w-8 h-8 flex items-center justify-center hover:bg-zinc-800 rounded-full cursor-pointer"
      >
        <i className="fas fa-ellipsis"></i>
      </button>

      {isDropDownOpen && (
        <DropDownMenu
          postId={postId}
          dropDownOpen={isDropDownOpen}
          isOnShowPage={isOnShowPage}
          closeDropDown={() => setIsDropDownOpen(false)}
        />
      )}
    </div>
  );
}
