import Home from "../Pages/Home";
import Sidebar from "./Sidebar";
import Message from "./Message";

export default function Layout() {
  return (
    <div className="grid grid-cols-12 gap-2 h-screen bg-gray-50 pt-[4rem]">
      <aside className="col-span-3 p-4 overflow-hidden">
        <Sidebar />
      </aside>

      <main className="col-span-6 p-4 overflow-y-auto scrollbar-hide">
        <Home />
      </main>

      <aside className="col-span-3 p-4 overflow-hidden">
        <Message />
      </aside>
    </div>
  );
}
