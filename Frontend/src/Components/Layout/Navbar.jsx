export default function Navbar() {
  return (
    <div className="flex items-center gap-4 px-4 text-neutral-500 font-bold border-b border-neutral-700">
      <div className="py-3 px-2 cursor-pointer hover:text-neutral-100 border-b-3 border-sky-400 text-neutral-100">
        For you
      </div>
      <div className="py-3 px-2 cursor-pointer hover:text-neutral-100">
        Following
      </div>
    </div>
  );
}
