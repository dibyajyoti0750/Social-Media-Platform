import Home from "../../Pages/Home";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import FollowSuggestions from "./FollowSuggestions";
import { EnvelopeOpenIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex justify-center bg-black h-screen">
      <div className="flex justify-between w-full max-w-7xl">
        {/* Sidebar */}
        <aside className="w-1/5 overflow-hidden">
          <Sidebar />
        </aside>

        {/* Main Feed */}
        <main className="overflow-y-auto scrollbar-hide flex flex-col items-center border-x border-neutral-800">
          <div className="w-full max-w-2xl">
            <Navbar />
            <Home />
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-1/4 overflow-hidden">
          <FollowSuggestions />
        </aside>

        <Link
          to={"/inbox"}
          className="flex items-center gap-2 fixed bottom-6 right-6 w-[20%] opacity-90 bg-zinc-800 hover:opacity-100 text-white p-4 rounded-full cursor-pointer"
        >
          <EnvelopeOpenIcon className="h-6 w-6 text-white" />
          <span>Messages</span>
        </Link>
      </div>
    </div>
  );
}
