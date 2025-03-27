import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(admin),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Registration failed");

      setSuccess("Admin registered successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-700">Admin Register</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {success && <p className="text-green-500 text-sm text-center">{success}</p>}
        <form onSubmit={handleRegister} className="mt-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={admin.name}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={admin.email}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={admin.password}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account? <a href="/admin/login" className="text-blue-600">Login</a>
        </p>
      </div>
    </div>
  );
};

export default AdminRegister;
