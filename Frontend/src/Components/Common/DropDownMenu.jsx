import { useContext, useState } from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import EditPostModal from "./EditPostModal";
import { MyContext } from "../../context/MyContext";

export default function DropDownMenu({ postId, closeDropDown }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [openEditPost, setOpenEditPost] = useState(false);
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
        closeDropDown();
      } else {
        // TODO: show error to user
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="absolute top-14 right-2 w-60 px-2 py-3 bg-black border border-zinc-600 rounded-lg z-50">
      <div className="absolute -top-2 right-4 w-4 h-4 bg-black border-l border-t border-zinc-600 rotate-45"></div>

      <button
        onClick={() => setOpenEditPost(true)}
        className="flex items-center gap-2 p-2 w-full rounded-lg hover:bg-zinc-800 cursor-pointer"
      >
        <i className="fas fa-pencil"></i>
        <span>Edit post</span>
      </button>

      <button
        onClick={() => setConfirmDelete(true)}
        className="flex items-center gap-2 p-2 w-full rounded-lg hover:bg-zinc-800 cursor-pointer"
      >
        <i className="fas fa-trash"></i>
        <span>Delete post</span>
      </button>

      {openEditPost && (
        <EditPostModal
          postId={postId}
          closeEditModal={() => setOpenEditPost(false)}
          closeDropDown={closeDropDown}
        />
      )}

      {confirmDelete && (
        <ConfirmDeleteModal
          onCancelDelete={() => setConfirmDelete(false)}
          onAction={handleDelete}
        />
      )}
    </div>
  );
}
