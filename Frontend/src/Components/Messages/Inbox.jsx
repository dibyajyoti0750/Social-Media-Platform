import ConversationList from "./ConversationList";

export default function Inbox() {
  return (
    <div className="flex h-screen bg-black">
      {/* Conversation List */}
      <div className="w-full md:w-80 md:border-r border-neutral-800">
        <ConversationList />
      </div>

      {/* Chat Area */}
      <div className="flex-1"></div>
    </div>
  );
}
