import Home from "../Pages/Home";
import Sidebar from "./Sidebar";
import Message from "./Message";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="flex justify-center bg-black pt-[4rem] h-screen">
      <Navbar />

      <div className="grid grid-cols-12 w-full max-w-7xl">
        {/* Sidebar */}
        <aside className="col-span-2 py-4 overflow-hidden">
          <Sidebar />
        </aside>

        {/* Main Feed */}
        <main className="col-span-6 overflow-y-auto scrollbar-hide flex flex-col items-center border-[1px] border-neutral-700">
          <div className="w-full max-w-2xl">
            <Home />
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="col-span-4 py-4 overflow-hidden">
          <Message />
        </aside>
      </div>
    </div>
  );
}
