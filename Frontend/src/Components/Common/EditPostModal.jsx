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
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50">
      <div className="bg-white w-full max-w-lg p-4 rounded-xl shadow-lg">
        {/* Header */}
        <div className="mb-2 flex justify-between items-center">
          <h2 className="text-xl font-bold text-center flex-1">Edit post</h2>

          <button
            onClick={closeEditModal}
            className="w-10 h-10 flex justify-center items-center cursor-pointer rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <i className="fas fa-xmark text-gray-500"></i>
          </button>
        </div>

        <hr className="border-gray-200" />

        {/* User Info */}
        <div className="flex items-center gap-3 py-4">
          <img
            src={assets.user}
            alt="Profile picture"
            className="h-12 w-12 rounded-full object-cover"
          />

          <div className="flex flex-col">
            <p className="font-medium">{"Username"}</p>
            <button className="w-fit flex gap-1 items-center text-xs px-2 py-1 bg-gray-200 rounded-md">
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
            placeholder={`What's on your mind, ${"User"}`}
            className="w-full min-h-[200px] resize-none p-2 outline-none text-xl placeholder:text-xl"
          />

          {/* Temp Image upload */}
          {post.image && (
            <input
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              type="url"
              placeholder="paste image link here"
              className="outline-none border w-full p-2 rounded-lg mb-4"
            />
          )}

          {/* Post Button */}
          <button
            disabled={!newContent.trim()}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer disabled:bg-gray-200 disabled:text-gray-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
