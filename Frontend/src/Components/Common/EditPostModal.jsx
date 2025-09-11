import { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { MyContext } from "../../context/MyContext";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditPostModal({
  postId,
  closeEditModal,
  closeDropDown,
  isOnShowPage,
}) {
  const [newContent, setNewContent] = useState("");
  const [newImage, setNewImage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { posts, updatePost } = useContext(MyContext);
  const post = posts.find((item) => item._id == postId);

  const API = import.meta.env.VITE_API_BASE_URL;

  const handleEdit = async (e) => {
    e.preventDefault();
    setError("");

    const body = {
      content: newContent,
      image: newImage,
    };

    try {
      const { data } = await axios.patch(`${API}/post/${postId}`, body);

      if (!data.success) {
        setError(data.error);
        return;
      }

      if (isOnShowPage) {
        navigate("/");
        return;
      }

      updatePost(data.data);
      closeEditModal();
      closeDropDown();
      toast.success(data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error);
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

        <hr className="border-neutral-800 my-2" />

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
            placeholder="What's on your mind today?"
            className={`w-full min-h-[200px] resize-none p-2 outline-none text-xl placeholder:text-gray-500 text-white bg-transparent ${
              !newContent.trim() ? "rounded-lg border border-rose-600" : ""
            }`}
          />

          {error && (
            <p className="text-rose-600 text-sm font-medium mb-2">{error}</p>
          )}

          {/* Temp Image upload */}
          {post.image && newImage && (
            <div className="relative">
              <button
                type="button"
                title="Remove image"
                onClick={() => setNewImage("")}
                className="absolute top-2 right-2 flex items-center justify-center rounded-full bg-white w-6 h-6 cursor-pointer"
              >
                <MinusCircleIcon className="h-5 w-5 text-red-600" />
              </button>

              {/* Image preview */}
              <img
                src={post.image}
                alt="Post"
                className="w-full max-h-80 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Post Button */}
          <button
            disabled={!newContent.trim() && !newImage.trim()}
            type="submit"
            className="w-full bg-sky-600 text-white py-2 mt-4 rounded-lg hover:bg-sky-700 transition-colors cursor-pointer disabled:bg-neutral-800 disabled:text-neutral-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
