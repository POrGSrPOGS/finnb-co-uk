import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard.jsx"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
<Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
