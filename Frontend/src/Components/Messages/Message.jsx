import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default function Message() {
  return (
    <div className="flex flex-col gap-4 px-2 text-gray-400">
      <h3 className="text-xl font-bold">Messages</h3>

      <div className="flex items-center gap-3 cursor-pointer p-2 rounded-lg border border-transparent hover:border-gray-400 hover:text-gray-300">
        <PlusCircleIcon className="h-8 w-8" />
        <span className="text-sm font-medium">Send new message</span>
      </div>
    </div>
  );
}
