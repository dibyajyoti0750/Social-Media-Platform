import { useContext, useState } from "react";
import { MyContext } from "../Context";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function DropDownMenu({ postId, onClose }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { removePost } = useContext(MyContext);

  const API = import.meta.env.VITE_API_BASE_URL;

  const handleDelete = async () => {
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    try {
      const response = await fetch(`${API}/post/${postId}`, options);
      const data = await response.json();

      if (data.success) {
        removePost(data.data._id);
        setConfirmDelete(false);
        onClose();
      } else {
        // TODO: show error to user
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="absolute top-14 right-2 w-60 px-2 py-3 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
      <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45"></div>

      <button className="flex items-center gap-2 p-2 w-full rounded-lg hover:bg-gray-100 cursor-pointer">
        <i className="fas fa-pencil"></i>
        <span>Edit post</span>
      </button>

      <button
        onClick={() => setConfirmDelete(true)}
        className="flex items-center gap-2 p-2 w-full rounded-lg hover:bg-gray-100 cursor-pointer"
      >
        <i className="fas fa-trash"></i>
        <span>Delete post</span>
      </button>

      {confirmDelete && (
        <ConfirmDeleteModal
          onCancel={() => setConfirmDelete(false)}
          onAction={handleDelete}
        />
      )}
    </div>
  );
}
