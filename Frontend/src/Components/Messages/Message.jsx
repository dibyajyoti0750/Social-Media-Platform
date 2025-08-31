import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default function Message() {
  return (
    <div className="flex flex-col gap-4 px-2 text-gray-100">
      <h3 className="text-xl font-bold">Messages</h3>

      <div className="flex items-center gap-3 cursor-pointer p-2 rounded-lg bg-zinc-800">
        <PlusCircleIcon className="h-8 w-8 text-gray-100" />
        <span className="text-sm font-medium text-gray-100">
          Send new message
        </span>
      </div>
    </div>
  );
}
