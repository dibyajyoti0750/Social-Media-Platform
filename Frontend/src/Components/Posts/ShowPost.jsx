import PostHeader from "./PostHeader";
import Reactions from "../Common/Reactions";
import Actions from "../Actions/Actions";
import { useRef, useState } from "react";
import { assets } from "../../assets/assets";
import {
  ArrowLongLeftIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/solid";
import { timeAgo } from "../../utils";

export default function ShowPost({
  postId,
  profilePic,
  userName,
  content,
  image,
  likes,
  comments,
  createdAt,
  refreshPost,
}) {
  const [comment, setComment] = useState("");
  const inputRef = useRef(null);
  const API = import.meta.env.VITE_API_BASE_URL;

  const focusInput = () => {
    inputRef.current.focus();
  };

  const addComment = async (e) => {
    e.preventDefault();

    const body = { comment };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    try {
      await fetch(`${API}/post/${postId}/comments`, options);
      setComment("");
      refreshPost();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="grid grid-cols-12 bg-black">
      {/* Left side if image exists */}
      {image && (
        <div className="col-span-8 bg-black flex items-center justify-center h-screen">
          <img
            src={image}
            loading="lazy"
            alt={content || "Post image"}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}

      {/* Right */}
      <div
        className={`${
          image
            ? "col-span-4 border-l"
            : "col-span-12 mx-auto w-6/12 h-screen border-l border-r"
        } bg-black flex flex-col border-neutral-800`}
      >
        {/* Back button */}
        <div className="flex items-center gap-2 w-fit p-4 text-xl font-semibold text-white">
          <ArrowLongLeftIcon
            title="Go back"
            onClick={() => window.history.back()}
            className="h-6 w-6 cursor-pointer"
          />
          <h3>Post</h3>
        </div>

        <hr className="border-neutral-800" />

        {/* Post contents */}
        <div className="flex-1 overflow-y-auto">
          {/* Header */}
          <PostHeader
            postId={postId}
            userName={userName}
            profilePic={profilePic}
            createdAt={createdAt}
          />

          {/* Caption */}
          <div className="py-3 px-4 text-gray-200 border-b border-neutral-800">
            {content}
          </div>

          {/* Comments Section*/}
          {comments.length ? (
            // If comments exists
            <div className="py-3">
              {comments.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-neutral-900 px-6 py-3"
                >
                  <img
                    src={item.profilePic || assets.user}
                    alt={item.username || "User"}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <div className="text-sm font-semibold text-white">
                      {item.username || "Demo user"}
                      <span className="text-neutral-500 font-normal">
                        {" "}
                        • {timeAgo(item.createdAt)}
                      </span>
                    </div>

                    <p className="text-sm text-neutral-300">{item.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // If comments doesn't exists
            <div className="px-4 py-10 h-[80%] flex flex-col items-center justify-center text-neutral-600">
              <ChatBubbleOvalLeftEllipsisIcon className="w-16 h-16 mb-2" />
              <p className="text-sm">No comments yet</p>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-800">
          <Reactions likes={likes} comments={comments} postId={postId} />
          <hr className="border-neutral-800" />
          <Actions postId={postId} focusInput={focusInput} />
        </div>

        {/* Comment input */}
        <form
          onSubmit={addComment}
          className="flex items-center justify-between gap-2 px-3 py-4 border-t border-neutral-800"
        >
          <input
            required
            ref={inputRef}
            value={comment.trim()}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Add a comment..."
            className="flex-1 bg-transparent text-sm text-neutral-200 placeholder-neutral-500 px-2 outline-none"
          />

          <button
            disabled={!comment.trim()}
            type="submit"
            className="text-sky-500 text-sm font-semibold hover:text-sky-600 disabled:text-neutral-600 cursor-pointer"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
