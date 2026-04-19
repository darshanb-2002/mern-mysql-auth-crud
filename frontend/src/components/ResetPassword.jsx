import { useState } from "react";
import axios from "axios";

function ResetPassword() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/reset-password", {
        token,
        password,
      });

      setMessage("Password reset successful ✅");
    } catch (err) {
      setMessage("Error ❌");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full md:w-1/2 lg:w-1/3 bg-white p-6 rounded shadow">

        <h2 className="text-xl font-bold mb-4 text-center">
          Reset Password
        </h2>

        {message && <p className="text-center mb-2">{message}</p>}

        <input className="border p-2 mb-3 w-full rounded" placeholder="Token" onChange={(e) => setToken(e.target.value)} />
        <input type="password" className="border p-2 mb-3 w-full rounded" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} />

        <button
          onClick={handleReset}
          className="bg-green-500 text-white p-2 w-full rounded"
        >
          Reset Password
        </button>

      </div>
    </div>
  );
}

export default ResetPassword;