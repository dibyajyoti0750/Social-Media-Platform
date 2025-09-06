import { useContext } from "react";
import { assets } from "../../assets/assets";

import {
  HomeIcon,
  MagnifyingGlassIcon,
  BellIcon,
  EnvelopeIcon,
  UserIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { MyContext } from "../../context/MyContext";
import { Link } from "react-router-dom";

const sidebarLinksOutline = [
  { icon: HomeIcon, label: "Home" },
  { icon: assets.circle, label: "ChatBot" },
  { icon: MagnifyingGlassIcon, label: "Explore" },
  { icon: BellIcon, label: "Notifications" },
  { icon: EnvelopeIcon, label: "Message" },
  { icon: UserIcon, label: "Profile" },
];

export default function Sidebar() {
  const { setIsPostModalOpen } = useContext(MyContext);

  return (
    <div
      className="flex flex-col items-center gap-4 h-dvh overflow-y-auto
      px-6 py-4 text-lg font-medium text-gray-300 border-neutral-700"
    >
      <Link to={"/"} className="w-full ms-0 lg:ms-[-1.5rem]">
        <img src={assets.logo} alt="Logo" className="h-16 w-16" />
      </Link>

      {sidebarLinksOutline.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="w-full flex justify-center lg:justify-start"
        >
          <a
            href="/"
            className="flex items-center gap-3 py-3 hover:text-gray-100"
          >
            {label === "ChatBot" ? (
              <img
                src={Icon}
                alt="AI ChatBot"
                className="h-8 w-8 bg-white rounded-full border-3 border-white"
              />
            ) : (
              <Icon className="h-8 w-8" />
            )}
            <span className="hidden lg:inline">{label}</span>
          </a>
        </div>
      ))}

      <button
        onClick={() => setIsPostModalOpen(true)}
        className="w-full bg-white text-black rounded-full py-3 font-semibold cursor-pointer"
      >
        Post
      </button>
    </div>
  );
}
