import NavIcons from "./NavIcons";
import PostHeader from "./PostHeader";
import Reactions from "./Reactions";
import Actions from "./Actions";

export default function ShowPost({
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
            userName={userName}
            profilePic={profilePic}
            createdAt={createdAt}
          />

          <div className="py-3 px-4">{content}</div>

          <Reactions />
          <hr className="mx-4 text-center text-gray-200" />
          <Actions />
          <hr className="mx-4 text-center text-gray-200" />
        </div>
      </div>
    </div>
  );
}
