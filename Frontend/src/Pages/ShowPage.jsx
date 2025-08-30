import { useParams } from "react-router-dom";
import ShowPost from "../Components/Posts/ShowPost";
import { useEffect, useState } from "react";

export default function ShowPage() {
  const { id } = useParams();
  const API = import.meta.env.VITE_API_BASE_URL;

  const [post, setPost] = useState(null);

  const fetchPost = async () => {
    try {
      const response = await fetch(`${API}/post/${id}`);
      const data = await response.json();
      setPost(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (!post) return <p className="text-center">Loading...</p>; // This line gives React something safe to render until fetch finishes and updates post, after which React re-renders with the real data

  return (
    <>
      <ShowPost
        postId={id}
        content={post.content}
        image={post.image}
        createdAt={post.createdAt}
      />
    </>
  );
}
