import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

   
    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        username,
        email,
        password,
      });

      if (response.data && response.data.message === "Registration successful") {
        // Handle success response
        console.log(response.data);  // Log the response to check

        // Redirect user to login page after successful registration
        navigate("/");  
      }
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md my-7 mx-auto p-6 bg-inherit rounded-xl shadow-sm text-center">
      <div className="bg-[#eeeeee] p-6 rounded shadow-md w-96">
        <div className="text-center">
          <span className="italic text-[#c4458f] font-thin text-base">
            <span className="font-bold text-3xl"> F</span>ashion
          </span>
          <span className="text-[#46249c] font-bold text-2xl">
            <span className="font-bold text-3xl">E</span>ra
          </span>
        </div>
        <h2 className="text-xl font-normal text-[#c4458f] text-center my-7">
          Register
        </h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded-xl mb-3"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-xl mb-3"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-xl my-3"
            required
          />
          <button
            type="submit"
            className="w-1/2 bg-blue-500 mt-6 text-white p-2 rounded-2xl hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
