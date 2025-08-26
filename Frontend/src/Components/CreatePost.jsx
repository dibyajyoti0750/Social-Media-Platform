import { useState } from "react";
import { assets } from "../assets/assets";
import CreatePostModal from "./CreatePostModal";

export default function CreatePost({ profilePic, userName }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const actions = [
    { icon: "fa-video", label: "Live video", color: "text-rose-600" },
    { icon: "fa-images", label: "Photo/video", color: "text-green-500" },
    {
      icon: "fa-face-grin",
      label: "Feeling/activity",
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="w-full max-w-2xl p-4 bg-white flex flex-col gap-2 rounded-xl shadow-[0px_0px_10px_-2px_#00000024]">
      {/* Top */}
      <div className="flex items-center gap-2">
        <img
          src={profilePic || assets.user}
          alt="Profile picture"
          className="h-8 w-8 rounded-full object-cover"
        />

        <input
          onClick={() => setIsModalOpen(true)}
          type="text"
          readOnly
          placeholder={`What's on your mind, ${userName || "User"}`}
          className="outline-none bg-gray-100 w-full rounded-full cursor-pointer p-2 ps-3 hover:bg-gray-200"
        />
      </div>

      <hr className="border-gray-200 mx-4" />

      {/* Bottom */}
      <div className="flex justify-around">
        {actions.map((item, idx) => (
          <button
            key={idx}
            type="button"
            className="flex justify-center items-center cursor-pointer w-full py-2 rounded-lg hover:bg-gray-100"
          >
            <i className={`fas ${item.icon} ${item.color} text-2xl`}></i>
            &nbsp;
            <span className="text-gray-500 font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      {isModalOpen && <CreatePostModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
