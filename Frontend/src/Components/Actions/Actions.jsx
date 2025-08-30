import {
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

const actionIcons = [
  { icon: HeartIcon, label: "Like" },
  { icon: ChatBubbleOvalLeftIcon, label: "Comment" },
  { icon: ShareIcon, label: "Share" },
];

export default function Actions() {
  return (
    <div className="flex justify-around items-center text-zinc-600 p-2">
      {actionIcons.map(({ icon: Icon, label }) => (
        <Icon
          key={label}
          title={label}
          className="h-6 w-6 cursor-pointer hover:text-zinc-300"
        />
      ))}
    </div>
  );
}
