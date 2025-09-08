import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { assets } from "../../assets/assets";

const conversations = [
  {
    name: "Olivia Wilson",
    lastMessage: "Hey! How was your day?",
    time: "2m",
    unread: 2,
    avatar: assets.tempUser1,
    online: true,
  },
  {
    name: "Emma Johnson",
    lastMessage: "Thanks for the help earlier!",
    time: "1h",
    unread: 0,
    avatar: assets.tempUser2,
    online: false,
  },
  {
    name: "Sophia Gracia",
    lastMessage: "Alex: The new mockups look great",
    time: "3h",
    unread: 5,
    avatar: assets.tempUser3,
    online: true,
  },
  {
    name: "Ava Miller",
    lastMessage: "See you tomorrow!",
    time: "1d",
    unread: 0,
    avatar: assets.tempUser4,
    online: false,
  },
  {
    name: "Isabella Davis",
    lastMessage: "Perfect, let's do it",
    time: "2d",
    unread: 1,
    avatar: assets.tempUser5,
    online: true,
  },
];

export default function ConversationList() {
  return (
    <div className="h-full flex flex-col overflow-y-auto">
      {/* Upper */}
      <div className="flex justify-between items-center mt-8 px-6">
        <h4 className="text-2xl font-semibold text-white">Username</h4>
        <PencilSquareIcon className="h-7 w-7 text-zinc-400 cursor-pointer" />
      </div>

      <div className="px-6 py-8">
        <div className="flex items-center gap-3 bg-neutral-800 rounded-lg px-4 py-3">
          <MagnifyingGlassIcon className="h-6 w-6 text-zinc-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="bg-transparent outline-none text-base text-white placeholder-neutral-500 w-full"
          />
        </div>
      </div>

      {/* Lower */}
      <div className="px-6 space-y-4">
        {conversations.map((c, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 rounded-xl hover:bg-neutral-800 cursor-pointer transition"
          >
            {/* Avatar */}
            <div className="relative">
              <img
                src={c.avatar}
                alt={c.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              {c.online && (
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-600 border-2 border-neutral-900 rounded-full" />
              )}
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h4 className="text-white font-medium truncate text-lg">
                  {c.name}
                </h4>
                <span className="text-sm text-gray-400">{c.time}</span>
              </div>
              <p className="text-base text-gray-400 truncate">
                {c.lastMessage}
              </p>
            </div>

            {/* Unread badge */}
            {c.unread > 0 && (
              <span className="flex justify-center items-center h-7 w-7 text-sm bg-sky-600 text-white rounded-full">
                {c.unread}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
