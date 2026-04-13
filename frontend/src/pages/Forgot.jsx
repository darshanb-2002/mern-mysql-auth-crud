import axios from "axios";
import { useState } from "react";

function Forgot() {
  const [email, setEmail] = useState("");

  const sendLink = async () => {
    const res = await axios.post("http://localhost:5000/api/auth/forgot", { email });
    alert(res.data);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 bg-white shadow">
        <h2>Forgot Password</h2>
        <input
          className="border p-2"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={sendLink} className="bg-blue-500 text-white p-2 mt-2">
          Send Reset Link
        </button>
      </div>
    </div>
  );
}

export default Forgot;