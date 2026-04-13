import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

function Reset() {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const reset = async () => {
    await axios.post(`http://localhost:5000/api/auth/reset/${token}`, {
      password,
    });
    alert("Password reset successful");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 bg-white shadow">
        <h2>Reset Password</h2>
        <input
          className="border p-2"
          placeholder="New Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={reset} className="bg-green-500 text-white p-2 mt-2">
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default Reset;