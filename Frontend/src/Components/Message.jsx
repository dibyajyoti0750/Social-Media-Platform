export default function Message() {
  return (
    <div className="flex flex-col gap-4 font-semibold">
      <h3 className="text-gray-500">Messages</h3>

      <div className="py-4 px-4 ms-[-1rem] rounded-md hover:bg-gray-200 cursor-pointer">
        <span className="p-2 bg-stone-100 rounded-full">
          <i className="fas fa-plus"></i>
        </span>
        &nbsp;&nbsp;
        <span className="text-sm">Send new message</span>
      </div>
    </div>
  );
}
