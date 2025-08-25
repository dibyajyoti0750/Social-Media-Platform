import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import ShowPage from "./Pages/ShowPage";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/post/:id" element={<ShowPage />} />
      </Routes>
    </div>
  );
}
