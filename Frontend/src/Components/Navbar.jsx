import { assets } from "../assets/assets";
import NavIcons from "./NavIcons";

export default function Navbar() {
  return (
    <div className="grid grid-cols-3 items-center px-2 bg-white fixed top-0 left-0 w-full z-50 shadow-[0px_0px_5px_-1px_#00000024]">
      {/* Left */}
      <aside className="flex items-center">
        <a href="/">
          <img src={assets.logo} alt="logo" className="h-15" />
        </a>

        <input
          placeholder="Search Glowup"
          className="px-3 py-2 bg-gray-100 rounded-full outline-none"
        />
      </aside>

      {/* Center */}
      <div className="flex justify-center gap-20 text-2xl text-gray-500">
        {["fa-house", "fa-people-group", "fa-user-group"].map((item, idx) => (
          <button key={idx}>
            <i className={`fas ${item}`}></i>
          </button>
        ))}
      </div>

      {/* Right */}
      <aside className="flex justify-end items-center gap-2">
        <NavIcons />
      </aside>
    </div>
  );
}
