import { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets";
import { MyContext } from "../../context/MyContext";

export default function CreatePostModal({ onClose, userName, profilePic }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);
  const { addPost } = useContext(MyContext);
  const API = import.meta.env.VITE_API_BASE_URL;

  function handleImageClick() {
    setShowImageInput((prev) => !prev);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = { content };
    if (image) body.image = image;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    try {
      const response = await fetch(`${API}/post`, options);
      const data = await response.json();
      console.log(data);

      if (data.success) {
        setContent("");
        setImage("");
        addPost(data.data);
        onClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const textareaRef = useRef(null);

  const icons = [
    { icon: "fa-images", color: "text-green-500" },
    { icon: "fa-user-tag", color: "text-blue-500" },
    { icon: "fa-face-grin", color: "text-yellow-400" },
    { icon: "fa-location-dot", color: "text-rose-500" },
    { icon: "fa-ellipsis", color: "text-gray-500" },
  ];

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50">
      <div className="bg-white w-full max-w-lg p-4 rounded-xl shadow-lg">
        {/* Header */}
        <div className="mb-2 flex justify-between items-center">
          <h2 className="text-xl font-bold text-center flex-1">Create post</h2>

          <button
            onClick={onClose}
            className="w-10 h-10 flex justify-center items-center cursor-pointer rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <i className="fas fa-xmark text-gray-500"></i>
          </button>
        </div>

        <hr className="border-gray-200" />

        {/* User Info */}
        <div className="flex items-center gap-3 py-4">
          <img
            src={profilePic || assets.user}
            alt="Profile picture"
            className="h-12 w-12 rounded-full object-cover"
          />

          <div className="flex flex-col">
            <p className="font-medium">{userName || "Username"}</p>
            <button className="w-fit flex gap-1 items-center text-xs px-2 py-1 bg-gray-200 rounded-md">
              <i className="fas fa-earth-asia"></i>
              <span>Public</span>
            </button>
          </div>
        </div>

        {/* Post Data */}
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            ref={textareaRef}
            placeholder={`What's on your mind, ${userName || "User"}`}
            className="w-full min-h-[200px] resize-none p-2 outline-none text-xl placeholder:text-xl"
          />

          {/* Temp Image upload */}
          {showImageInput && (
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              type="url"
              placeholder="paste image link here"
              className="outline-none border w-full p-2 rounded-lg mb-4"
            />
          )}

          <div className="flex justify-between items-center rounded-lg w-full border border-gray-300 p-3 mb-4 shadow-sm">
            <span className="font-medium">Add to your post</span>
            <div className="flex items-center gap-3">
              {icons.map((item, idx) => (
                <i
                  onClick={idx === 0 ? handleImageClick : undefined}
                  key={idx}
                  className={`fas ${item.icon} ${item.color} text-xl cursor-pointer`}
                ></i>
              ))}
            </div>
          </div>

          {/* Post Button */}
          <button
            disabled={!content.trim()}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer disabled:bg-gray-200 disabled:text-gray-300"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
