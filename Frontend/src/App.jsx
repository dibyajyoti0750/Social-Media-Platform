import { Route, Routes } from "react-router-dom";
import Layout from "../src/Components/Layout/Layout";
import ShowPage from "./Pages/ShowPage";
import NotFound from "./Pages/NotFound";
import Inbox from "./Components/Messages/Inbox";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <div>
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
