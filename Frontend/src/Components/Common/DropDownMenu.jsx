import { useContext, useEffect, useRef, useState } from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import EditPostModal from "./EditPostModal";
import { MyContext } from "../../context/MyContext";
import { useNavigate } from "react-router-dom";

export default function DropDownMenu({
  postId,
  dropDownOpen,
  closeDropDown,
  isOnShowPage,
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [openEditPost, setOpenEditPost] = useState(false);
  const { removePost } = useContext(MyContext);
  const navigate = useNavigate();

  const dropDownRef = useRef(null);

  // runs when dropDownOpen changes
  useEffect(() => {
    function handleClickOutside(e) {
      // if click is outside the dropdown -> close it
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        closeDropDown();
      }
    }

    // add listener only when dropdown is open
    if (dropDownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // clean up: remove listener when dropdown closes or component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownOpen, closeDropDown]);

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
        setConfirmDelete(false);
        closeDropDown();

        if (isOnShowPage) {
          // redirect
          navigate("/");
        } else {
          // or just remove from the list
          removePost(data.data._id);
        }
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      ref={dropDownRef}
      className="absolute top-14 right-2 w-60 px-2 py-3 bg-black border border-neutral-700 rounded-lg z-50"
    >
      <div className="absolute -top-2 right-4 w-4 h-4 bg-black border-l border-t border-neutral-700 rotate-45"></div>

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
