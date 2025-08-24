import { assets } from "../assets/assets.js";

const sidebarLinks = [
  { icon: assets.chad, label: "Adonis Chad" },
  { icon: assets.circle, label: "Glowup AI" },
  { icon: assets.friends, label: "Friends" },
  { icon: assets.memories, label: "Memories" },
  { icon: assets.saved, label: "Saved" },
  { icon: assets.groups, label: "Groups" },
  { icon: assets.video, label: "Video" },
  { icon: assets.market, label: "Market" },
  { icon: assets.feeds, label: "Feeds" },
  { icon: assets.events, label: "Events" },
  { icon: assets.down, label: "See more" },
];

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-2 h-dvh overflow-y-auto p-2">
      {sidebarLinks.map((item, idx) => (
        <a
          key={idx}
          href="#"
          className="flex items-center gap-2 p-3 font-semibold rounded-xl hover:bg-gray-200"
        >
          <img
            src={item.icon}
            alt={item.label}
            className={`h-8 ${idx === 0 ? "rounded-full" : ""}`}
          />
          <span>{item.label}</span>
        </a>
      ))}
    </div>
  );
}
