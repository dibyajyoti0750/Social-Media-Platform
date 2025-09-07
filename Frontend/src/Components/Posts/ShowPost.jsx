import PostHeader from "./PostHeader";
import Reactions from "../Common/Reactions";
import Actions from "../Actions/Actions";
import { useRef, useState } from "react";
import { assets } from "../../assets/assets";

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
    <div className="grid grid-cols-12">
      {/* Left */}
      <div className="col-span-8 bg-black flex items-center justify-center h-screen">
        <img
          src={image}
          loading="lazy"
          alt={content || "Post image"}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Right */}
      <div className="col-span-4 bg-black flex flex-col border-l border-neutral-700">
        {/* Scrollable area */}
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

          {/* Comments Section */}
          <div className="px-4 py-3 space-y-3">
            {comments.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 bg-neutral-900 p-3 rounded-2xl"
              >
                <img
                  src={item.profilePic || assets.user}
                  alt={item.username || "User"}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">
                    {item.username || "Demo user"}
                  </span>
                  <p className="text-sm text-neutral-300">{item.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section (reactions + input) */}
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
            ref={inputRef}
            value={comment}
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
