import NavIcons from "../Layout/NavIcons";
import PostHeader from "./PostHeader";
import Reactions from "../Common/Reactions";
import Actions from "../Actions/Actions";

export default function ShowPost({
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
    <div className="grid grid-cols-12 h-screen">
      {/* Left */}
      <div className="col-span-8 bg-black flex items-center justify-center h-screen">
        <img
          src={image}
          loading="lazy"
          alt={content || "Post image"}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Right */}
      <div className="col-span-4 bg-white">
        <nav className="flex justify-end gap-2 p-3 border-b-1 border-gray-200">
          <NavIcons />
        </nav>

        <div>
          <PostHeader
            postId={postId}
            userName={userName}
            profilePic={profilePic}
            createdAt={createdAt}
          />

          <div className="py-3 px-4">{content}</div>

          <Reactions likes={likes} comments={comments} shares={shares} />
          <hr className="border-gray-200 mx-4" />
          <Actions />
          <hr className="border-gray-200 mx-4" />
        </div>
      </div>
    </div>
  );
}
