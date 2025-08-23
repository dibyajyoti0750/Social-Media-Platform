import { assets } from "../assets/assets";

export default function Navbar() {
  return (
    <div className="grid grid-cols-3 items-center px-2 bg-white fixed top-0 left-0 w-full z-50 shadow-[0px_0px_5px_-1px_#00000024]">
      {/* Left */}
      <aside className="flex items-center">
        <img src={assets.logo} alt="logo" className="h-15" />
        <input
          placeholder="Search Glowup"
          className="px-3 py-2 bg-gray-100 rounded-full outline-none"
        />
      </aside>

      {/* Center */}
      <div className="flex justify-center gap-20 text-2xl text-gray-500">
        <i className="fas fa-house"></i>
        <i className="fas fa-people-group"></i>
        <i className="fas fa-user-group"></i>
      </div>

      {/* Right */}
      <aside className="flex justify-end items-center gap-2 text-xl">
        <button className="px-3 py-2 bg-gray-200 rounded-full text-sm">
          Find friends
        </button>
        <span className="navRightIcons">
          <i className="fas fa-grip-vertical"></i>
        </span>
        <span className="navRightIcons">
          <i className="fas fa-message"></i>
        </span>
        <span className="navRightIcons">
          <i className="fas fa-bell"></i>
        </span>
        <span className="navRightIcons">
          <i className="fas fa-user"></i>
        </span>
      </aside>
    </div>
  );
}
