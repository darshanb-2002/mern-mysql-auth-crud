import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleForgot = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

      setMessage("Token sent: " + res.data.token);
    } catch (err) {
      setMessage("Error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full md:w-1/2 lg:w-1/3 bg-white p-6 rounded shadow">

        <h2 className="text-xl font-bold mb-4 text-center">
          Forgot Password
        </h2>

        {message && <p className="text-center mb-2">{message}</p>}

        <input
          className="border p-2 mb-3 w-full rounded"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleForgot}
          disabled={loading}
          className="bg-blue-500 text-white p-2 w-full rounded"
        >
          {loading ? "Sending..." : "Send Token"}
        </button>

      </div>
    </div>
  );
}

export default ForgotPassword;