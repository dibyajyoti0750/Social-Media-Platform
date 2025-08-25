import { useEffect, useState } from "react";
import PostCard from "../Components/PostCard";

export default function Home() {
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

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <div>
      {posts.map((post, idx) => (
        <PostCard
          key={idx}
          id={post._id}
          content={post.content}
          image={post.image}
          createdAt={post.createdAt}
        />
      ))}
    </div>
  );
}
