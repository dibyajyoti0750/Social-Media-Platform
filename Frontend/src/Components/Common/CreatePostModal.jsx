import { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets";
import { MyContext } from "../../context/MyContext";

export default function CreatePostModal({
  onPostModalClose,
  userName,
  profilePic,
}) {
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
        onPostModalClose();
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
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-white/20 backdrop-blur-xs">
      <div className="bg-neutral-900 w-full max-w-lg p-4 rounded-xl shadow-lg border border-neutral-800">
        {/* Header */}
        <div className="mb-2 flex justify-between items-center">
          <h2 className="text-xl font-bold text-center flex-1 text-white">
            Create post
          </h2>

          <button
            onClick={onPostModalClose}
            className="w-10 h-10 flex justify-center items-center cursor-pointer rounded-full bg-neutral-800 hover:bg-neutral-700"
          >
            <i className="fas fa-xmark text-gray-300"></i>
          </button>
        </div>

        <hr className="border-neutral-700 my-2" />

        {/* User Info */}
        <div className="flex items-center gap-3 py-4">
          <img
            src={profilePic || assets.user}
            alt="Profile picture"
            className="h-12 w-12 rounded-full object-cover"
          />

          <div className="flex flex-col">
            <p className="font-medium text-white">{userName || "Username"}</p>
            <button className="w-fit flex gap-1 items-center text-xs px-2 py-1 bg-neutral-800 text-gray-300 rounded-md hover:bg-neutral-700">
              <i className="fas fa-earth-asia"></i>
              <span>Public</span>
            </button>
          </div>
        </div>

        {/* Post Data */}
        <form onSubmit={handleSubmit}>
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            ref={textareaRef}
            placeholder="What's on your mind today?"
            className="w-full min-h-[200px] resize-none p-2 outline-none text-xl placeholder:text-gray-500 text-white bg-transparent"
          />

          {/* Temp Image upload */}
          {showImageInput && (
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              type="url"
              placeholder="Paste image link here"
              className="outline-none border border-neutral-700 bg-neutral-800 text-white w-full p-2 rounded-lg mb-4 placeholder:text-gray-500"
            />
          )}

          <div className="flex justify-between items-center rounded-lg w-full border border-neutral-700 p-3 mb-4 shadow-sm">
            <span className="font-medium text-gray-300">Add to your post</span>
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
            className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition-colors cursor-pointer disabled:bg-neutral-800 disabled:text-neutral-600"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
