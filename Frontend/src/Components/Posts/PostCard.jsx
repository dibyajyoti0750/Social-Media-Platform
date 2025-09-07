import { Link } from "react-router-dom";
import PostHeader from "./PostHeader.jsx";
import Reactions from "../Common/Reactions.jsx";
import Actions from "../Actions/Actions.jsx";

export default function PostCard({
  postId,
  profilePic,
  userName,
  content,
  image,
  likes,
  comments,
  createdAt,
}) {
  return (
    <div className="flex flex-col bg-black text-gray-100 border-t border-neutral-800 mb-2">
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
      <Reactions likes={likes} comments={comments} postId={postId} />
      <hr className="border-neutral-800" />
      <Actions postId={postId} />
    </div>
  );
}
