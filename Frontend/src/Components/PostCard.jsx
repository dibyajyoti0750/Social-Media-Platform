import { Link } from "react-router-dom";
import PostHeader from "./PostHeader.jsx";
import Reactions from "./Reactions.jsx";
import Actions from "./Actions.jsx";

export default function PostCard({
  id,
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
        userName={userName}
        profilePic={profilePic}
        createdAt={createdAt}
      />

      <div className="py-3 px-4">{content}</div>

      {image && (
        <Link to={`/post/${id}`}>
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
      <hr className="mx-4 text-center text-gray-200" />
      <Actions />
    </div>
  );
}
