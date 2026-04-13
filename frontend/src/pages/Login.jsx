import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input
          className="border p-2 mb-3 w-full rounded"
          placeholder="Email"
        />

        <input
          type="password"
          className="border p-2 mb-3 w-full rounded"
          placeholder="Password"
        />

        <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 w-full rounded">
          Login
        </button>

        {/* 🔹 Forgot Password */}
        <p className="text-right text-sm mt-2">
          <Link to="/forgot" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </p>

        {/* 🔹 Register Link */}
        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;