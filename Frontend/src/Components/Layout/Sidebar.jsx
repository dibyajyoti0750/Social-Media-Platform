import { assets } from "../../assets/assets";

import {
  HomeIcon,
  MagnifyingGlassIcon,
  BellIcon,
  ChatBubbleLeftEllipsisIcon,
  UserIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

const sidebarLinksOutline = [
  { icon: HomeIcon, title: "Home" },
  { icon: assets.circle, title: "ChatBot" },
  { icon: MagnifyingGlassIcon, title: "Explore" },
  { icon: BellIcon, title: "Notifications" },
  { icon: ChatBubbleLeftEllipsisIcon, title: "Message" },
  { icon: UserIcon, title: "Profile" },
  { icon: PencilSquareIcon, title: "Create" },
];

export default function Sidebar() {
  return (
    <div className="flex flex-col items-center gap-4 lg:items-start h-dvh overflow-y-auto p-2 text-lg font-medium text-gray-400">
      {sidebarLinksOutline.map(({ icon: Icon, title }) => (
        <div key={title}>
          <a
            href="#"
            className="flex items-center gap-3 p-2 hover:text-gray-50"
          >
            {title === "ChatBot" ? (
              <img src={Icon} alt="AI ChatBot" className="h-8 w-8" />
            ) : (
              <Icon className="h-8 w-8" />
            )}
            <span className="hidden lg:inline">{title}</span>
          </a>
        </div>
      ))}
    </div>
  );
}
