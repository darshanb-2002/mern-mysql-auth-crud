function Register() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 bg-white shadow rounded">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input className="border p-2 mb-2 w-full" placeholder="Name" />
        <input className="border p-2 mb-2 w-full" placeholder="Email" />
        <input className="border p-2 mb-2 w-full" placeholder="Phone" />
        <input className="border p-2 mb-2 w-full" placeholder="Password" />
        <button className="bg-green-500 text-white p-2 w-full">
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;