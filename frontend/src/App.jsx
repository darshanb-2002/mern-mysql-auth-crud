import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/reset/:token" element={<Reset />} />
    </Routes>
  );
}

export default App;