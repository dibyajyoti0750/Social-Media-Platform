import { useContext, useState } from "react";
import CreatePostModal from "../Common/CreatePostModal";
import {
  UserCircleIcon,
  VideoCameraIcon,
  PhotoIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
import { MyContext } from "../../context/MyContext";

export default function CreatePost({ profilePic }) {
  const { isPostModalOpen, setIsPostModalOpen } = useContext(MyContext);

  return (
    <div className="w-full max-w-2xl p-4 bg-black flex flex-col gap-2">
      <div className="flex items-center">
        {profilePic ? (
          <img
            src={profilePic}
            alt="Profile picture"
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <UserCircleIcon className="h-12 w-12 text-neutral-500" />
        )}

        <input
          onClick={() => setIsPostModalOpen(true)}
          type="text"
          readOnly
          placeholder="What's on your mind today?"
          className="outline-none w-full py-2 px-4 placeholder-neutral-500 cursor-pointer text-2xl"
        />
      </div>

      <div className="flex items-center justify-between">
        <div
          onClick={() => setIsPostModalOpen(true)}
          className="flex w-fit gap-2 text-sky-500"
        >
          <PhotoIcon className="h-5 w-5 cursor-pointer hover:text-sky-400" />
          <VideoCameraIcon className="h-5 w-5 cursor-pointer hover:text-sky-400" />
          <FaceSmileIcon className="h-5 w-5 cursor-pointer hover:text-sky-400" />
        </div>

        <div>
          <button
            onClick={() => setIsPostModalOpen(true)}
            className="bg-gray-300 hover:bg-white font-semibold rounded-full text-sm px-6 py-2 cursor-pointer transition-colors duration-200"
          >
            Post
          </button>
        </div>
      </div>
      {isPostModalOpen && (
        <CreatePostModal onPostModalClose={() => setIsPostModalOpen(false)} />
      )}
    </div>
  );
}
