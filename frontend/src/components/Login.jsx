import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loginUser = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      setSuccess("Login successful ✅");

      // ✅ PROPER NAVIGATION (NO PAGE RELOAD)
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data || err.message);

      setError(err.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <div className="w-full md:w-1/2 lg:w-1/3 bg-white p-6 rounded shadow">

        <h2 className="text-xl font-bold mb-4 text-center">
          Login
        </h2>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-center mb-2">
            {error}
          </p>
        )}

        {/* SUCCESS */}
        {success && (
          <p className="text-green-500 text-center mb-2">
            {success}
          </p>
        )}

        {/* EMAIL */}
        <input
          className="border p-2 mb-3 w-full rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          className="border p-2 mb-3 w-full rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={loginUser}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 w-full rounded"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        {/* LINKS */}
        <div className="text-sm mt-4 flex justify-between">
          <Link to="/forgot" className="text-blue-500">
            Forgot Password?
          </Link>

          <Link to="/register" className="text-green-500">
            Register
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;