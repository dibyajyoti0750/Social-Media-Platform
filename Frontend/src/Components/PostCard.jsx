import { Link } from "react-router-dom";
import PostHeader from "./PostHeader.jsx";
import Reactions from "./Reactions.jsx";
import Actions from "./Actions.jsx";

export default function PostCard({
  postId,
  profilePic,
  userName,
  content,
  image,
  likes,
  comments,
  shares,
  createdAt,
}) {
  return (
    <div className="flex flex-col bg-white my-4 rounded-xl shadow-[0px_0px_10px_-2px_#00000024]">
      {/* Header */}
      <PostHeader
        postId={postId}
        userName={userName}
        profilePic={profilePic}
        createdAt={createdAt}
      />

      <div className="py-3 px-4">{content}</div>

      {image && (
        <Link to={`/post/${postId}`}>
          <img
            src={image}
            loading="lazy"
            alt="Post content"
            className="w-full object-cover max-h-96"
          />
        </Link>
      )}

      {/* Footer */}
      <Reactions likes={likes} comments={comments} shares={shares} />
      <hr className="border-gray-200 mx-4" />
      <Actions />
    </div>
  );
}
