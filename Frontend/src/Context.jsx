import { createContext, useEffect, useState } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const API = import.meta.env.VITE_API_BASE_URL;
  const [posts, setPosts] = useState([]);

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

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const contextValue = { posts, setPosts, addPost };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};
