import { ChevronUpDownIcon } from "@heroicons/react/24/outline";

export default function ChatArea() {
  return (
    <div>
      {/* Top */}
      <div className="flex justify-end items-center h-18 border-b p-4 border-neutral-800">
        <ChevronUpDownIcon
          onClick={() => window.history.back()}
          className="h-12 w-12 rotate-45 text-white cursor-pointer"
        />
      </div>
    </div>
  );
}
