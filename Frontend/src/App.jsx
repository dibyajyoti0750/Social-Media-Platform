import { Route, Routes } from "react-router-dom";
import Layout from "../src/Components/Layout/Layout";
import ShowPage from "./Pages/ShowPage";
import NotFound from "./Pages/NotFound";
import Inbox from "./Components/Messages/Inbox";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useState } from "react";

export default function App() {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <div>
      {isMobileView && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/80">
          <div className="bg-white rounded-lg p-6 max-w-[80%] text-center shadow-lg">
            <h2 className="text-xl font-semibold mb-2">
              😅 Not Responsive Yet
            </h2>
            <p className="text-gray-700">
              Please open this site on a computer.
            </p>
          </div>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/post/:id" element={<ShowPage />} />
        <Route path="/inbox" element={<Inbox />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
