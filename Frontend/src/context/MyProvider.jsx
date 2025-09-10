import { useEffect, useState } from "react";
import { MyContext } from "./MyContext";

export const MyProvider = ({ children }) => {
  const API = import.meta.env.VITE_API_BASE_URL;
  const [posts, setPosts] = useState([]);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const fetchAllPosts = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();
      setPosts(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const updatePost = (updatedPost) => {
    setPosts((prev) =>
      prev.map((post) => (post._id === updatedPost._id ? updatedPost : post))
    );
  };

  const removePost = (id) => {
    setPosts((prev) => prev.filter((post) => post._id != id));
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const contextValue = {
    posts,
    fetchAllPosts,
    setPosts,
    addPost,
    updatePost,
    removePost,
    isPostModalOpen,
    setIsPostModalOpen,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};
