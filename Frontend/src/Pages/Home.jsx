import { useEffect, useState } from "react";

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
        <div key={idx} className="">
          <p>
            {idx}. {post.content}
          </p>
          {post.image && (
            <img className="h-50" src={post.image} alt="post_image" />
          )}
        </div>
      ))}
    </div>
  );
}
