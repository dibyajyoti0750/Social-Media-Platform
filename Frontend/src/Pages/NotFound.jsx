import Footer from "../Components/Layout/Footer";
import Sidebar from "../Components/Layout/Sidebar";

export default function NotFound() {
  const currPath = window.location.pathname;

  return (
    <div className="flex bg-black text-white min-h-screen">
      {/* Sidebar */}
      <div className="w-1/5">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Centered message */}
        <div className="flex-1 flex flex-col justify-center items-center px-4">
          <p className="text-2xl font-semibold text-center mb-4">
            Sorry, this page isn't available.
          </p>

          <p className="text-center text-gray-300">
            The link <span className="text-sky-400 font-mono">{currPath}</span>{" "}
            you followed may be broken, or the page may have been removed. Go
            back to{" "}
            <a href="/" className="text-sky-500 hover:underline">
              GlowUp.
            </a>
          </p>
        </div>

        {/* Footer stays at bottom */}
        <Footer />
      </div>
    </div>
  );
}
