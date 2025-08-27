import { useContext } from "react";
import PostCard from "../Components/PostCard";
import CreatePost from "../Components/CreatePost";
import { MyContext } from "../Context";

export default function Home() {
  const { posts } = useContext(MyContext);

  return (
    <div>
      <CreatePost />

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
