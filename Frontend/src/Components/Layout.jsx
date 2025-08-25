import Home from "../Pages/Home";
import Sidebar from "./Sidebar";
import Message from "./Message";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="grid grid-cols-12 gap-2 h-screen bg-gray-50 pt-[4rem]">
      <Navbar />

      <aside className="col-span-3 p-4 overflow-hidden">
        <Sidebar />
      </aside>

      <main className="col-span-6 p-4 overflow-y-auto scrollbar-hide flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <Home />
        </div>
      </main>

      <aside className="col-span-3 p-4 overflow-hidden">
        <Message />
      </aside>
    </div>
  );
}
