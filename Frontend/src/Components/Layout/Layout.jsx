import Home from "../../Pages/Home";
import Sidebar from "./Sidebar";
import Message from "../Messages/Message";

export default function Layout() {
  return (
    <div className="flex justify-center bg-black h-screen">
      <div className="flex justify-between w-full max-w-7xl">
        {/* Sidebar */}
        <aside className="w-1/5 py-4 overflow-hidden">
          <Sidebar />
        </aside>

        {/* Main Feed */}
        <main className="overflow-y-auto scrollbar-hide flex flex-col items-center border-x border-neutral-700">
          <div className="w-full max-w-2xl">
            <Home />
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-1/4 py-4 overflow-hidden">
          <Message />
        </aside>
      </div>
    </div>
  );
}
