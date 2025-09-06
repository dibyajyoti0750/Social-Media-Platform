import { assets } from "../../assets/assets";

const suggestedUsers = [
  { name: "Olivia Wilson", avatar: assets.tempUser1 },
  { name: "Emma Johnson", avatar: assets.tempUser2 },
  { name: "Sophia Gracia", avatar: assets.tempUser3 },
  { name: "Ava Miller", avatar: assets.tempUser4 },
  { name: "Isabella Davis", avatar: assets.tempUser5 },
];

export default function FollowSuggestions() {
  return (
    <div className="h-dvh">
      <div className="flex flex-col gap-3 m-5 h-[50%] text-neutral-500">
        {/* Section Title */}
        <p className="font-semibold text-sm mb-2">Suggested for you</p>

        {/* User Row */}
        {suggestedUsers.map((user, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center w-full text-sm"
          >
            <div className="flex items-center gap-2">
              <img
                src={user.avatar}
                className="h-8 w-8 rounded-full object-cover"
                alt="User avatar"
              />
              <span className="text-gray-200">{user.name}</span>
            </div>

            <button className="flex items-center justify-center px-3 py-1 rounded-md font-semibold text-sky-600 hover:bg-sky-900/20 transition">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
