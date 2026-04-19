import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const registerUser = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match ❌");
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        phone,
        password,
      });

      setSuccess("Registered successfully ✅");

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);

    } catch (err) {
  console.log("REGISTER ERROR:", err.response?.data || err.message);
  alert(err.response?.data?.message || "Register failed ❌");
}finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full md:w-1/2 lg:w-1/3 bg-white p-6 rounded shadow">

        <h2 className="text-xl font-bold mb-4 text-center">
          Register
        </h2>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        {success && <p className="text-green-500 text-center mb-2">{success}</p>}

        <input className="border p-2 mb-2 w-full rounded" placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input className="border p-2 mb-2 w-full rounded" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input className="border p-2 mb-2 w-full rounded" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
        <input type="password" className="border p-2 mb-2 w-full rounded" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <input type="password" className="border p-2 mb-2 w-full rounded" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />

        <button
          onClick={registerUser}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white p-2 w-full rounded"
        >
          {loading ? "Loading..." : "Register"}
        </button>

        <p className="text-sm mt-3 text-center">
          Already have account? <Link to="/" className="text-blue-500">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;