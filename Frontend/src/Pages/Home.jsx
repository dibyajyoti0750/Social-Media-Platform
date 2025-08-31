import { useContext } from "react";
import PostCard from "../Components/Posts/PostCard";
import CreatePost from "../Components/Actions/CreatePost";
import { MyContext } from "../context/MyContext";

export default function Home() {
  const { posts } = useContext(MyContext);

  return (
    <div>
      <CreatePost />

      {posts.map((post, idx) => (
        <PostCard
          key={idx}
          postId={post._id}
          content={post.content}
          image={post.image}
          createdAt={post.createdAt}
        />
      ))}
    </div>
  );
}
