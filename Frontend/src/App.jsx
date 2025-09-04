import { Route, Routes } from "react-router-dom";
import Layout from "../src/Components/Layout/Layout";
import ShowPage from "./Pages/ShowPage";
import NotFound from "./Pages/NotFound";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/post/:id" element={<ShowPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
