import { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { MyContext } from "../../context/MyContext";

export default function EditPostModal({
  postId,
  closeEditModal,
  closeDropDown,
}) {
  const [newContent, setNewContent] = useState("");
  const [newImage, setNewImage] = useState("");

  const { posts, updatePost } = useContext(MyContext);
  const post = posts.find((item) => item._id == postId);

  const API = import.meta.env.VITE_API_BASE_URL;

  const handleEdit = async (e) => {
    e.preventDefault();
    const body = {};

    if (newContent.trim() !== "") body.content = newContent;
    if (newImage.trim() !== "") body.image = newImage;

    try {
      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };

      const response = await fetch(`${API}/post/${postId}`, options);
      const data = await response.json();

      if (data.success) {
        updatePost(data.data);
        closeEditModal();
        closeDropDown();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setNewContent(post.content || "");
    setNewImage(post.image || "");
  }, [postId, post]);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-white/20 backdrop-blur-xs">
      <div className="bg-neutral-900 w-full max-w-lg p-4 rounded-xl shadow-lg border border-neutral-800">
        {/* Header */}
        <div className="mb-2 flex justify-between items-center">
          <h2 className="text-xl font-bold text-center flex-1 text-white">
            Edit post
          </h2>

          <button
            onClick={closeEditModal}
            className="w-10 h-10 flex justify-center items-center cursor-pointer rounded-full bg-neutral-800 hover:bg-neutral-700"
          >
            <i className="fas fa-xmark text-gray-300"></i>
          </button>
        </div>

        <hr className="border-neutral-700 my-2" />

        {/* User Info */}
        <div className="flex items-center gap-3 py-4">
          <img
            src={assets.user}
            alt="Profile picture"
            className="h-12 w-12 rounded-full object-cover"
          />

          <div className="flex flex-col">
            <p className="font-medium text-white">{"Username"}</p>
            <button className="w-fit flex gap-1 items-center text-xs px-2 py-1 bg-neutral-800 text-gray-300 rounded-md hover:bg-neutral-700">
              <i className="fas fa-earth-asia"></i>
              <span>Public</span>
            </button>
          </div>
        </div>

        {/* Post Data */}
        <form onSubmit={handleEdit}>
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder={`What's on your mind, ${"User"}?`}
            className="w-full min-h-[200px] resize-none p-2 outline-none text-xl placeholder:text-gray-500 text-white bg-transparent"
          />

          {/* Temp Image upload */}
          {post.image && (
            <input
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              type="url"
              placeholder="Paste image link here"
              className="outline-none border border-neutral-700 bg-neutral-800 text-white w-full p-2 rounded-lg mb-4 placeholder:text-gray-500"
            />
          )}

          {/* Post Button */}
          <button
            disabled={!newContent.trim()}
            type="submit"
            className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition-colors cursor-pointer disabled:bg-neutral-800 disabled:text-neutral-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
