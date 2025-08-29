import { useState } from "react";
import CreatePostModal from "./CreatePostModal";
import {
  UserCircleIcon,
  VideoCameraIcon,
  PhotoIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";

export default function CreatePost() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full max-w-2xl p-4 bg-black flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <UserCircleIcon className="h-10 w-10 text-neutral-500" />

        <input
          onClick={() => setIsModalOpen(true)}
          type="text"
          readOnly
          placeholder="What's happening?"
          className="outline-none w-full py-2 px-4 bg-zinc-800 placeholder-neutral-500 text-white cursor-pointer text-xl rounded-full"
        />
      </div>

      <hr className="border-neutral-700 my-2" />

      <div className="flex items-center justify-between">
        <div
          onClick={() => setIsModalOpen(true)}
          className="flex w-fit gap-2 text-sky-500"
        >
          <PhotoIcon className="h-5 w-5 cursor-pointer hover:text-sky-400" />
          <VideoCameraIcon className="h-5 w-5 cursor-pointer hover:text-sky-400" />
          <FaceSmileIcon className="h-5 w-5 cursor-pointer hover:text-sky-400" />
        </div>

        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            class="bg-gray-300 hover:bg-gray-50 font-semibold rounded-full text-sm px-6 py-2 cursor-pointer"
          >
            Post
          </button>
        </div>
      </div>
      {isModalOpen && <CreatePostModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
