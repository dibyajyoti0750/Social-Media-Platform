import { useState } from "react";
import { useEffect } from "react";
import "./Home.css";

export default function Home() {
  const [posts, setPosts] = useState([]);

  const fetchAllPosts = async () => {
    try {
      const response = await fetch("http://localhost:8080/");
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
        <div key={idx}>
          <p>{post.content}</p>
          <img src={post.image} alt="post_image" />
        </div>
      ))}
    </div>
  );
}
