import { useContext, useEffect } from "react";
import PostCard from "../Components/Posts/PostCard";
import CreatePost from "../Components/Actions/CreatePost";
import { MyContext } from "../context/MyContext";
import { useLocation } from "react-router-dom";

export default function Home() {
  const { posts, fetchAllPosts } = useContext(MyContext);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      fetchAllPosts();
    }
  }, [location.pathname]);

  return (
    <div>
      <CreatePost />

      {posts.map((post, idx) => (
        <PostCard
          key={idx}
          postId={post._id}
          content={post.content}
          image={post.image}
          comments={post.comments}
          createdAt={post.createdAt}
        />
      ))}
    </div>
  );
}
