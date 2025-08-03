import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api"; // Axios instance
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (form.password !== form.confirm) {
      return setError("Passwords do not match");
    }

    if (form.password.length < 8) {
      return setError("Password must be at least 8 characters long");
    }

    try {
      await API.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      setSuccess("Registration successful! Redirecting to login...");
      setForm({ name: "", email: "", password: "", confirm: "" });

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/bg.png')" }}
      />

      <div className="relative z-10 flex flex-col flex-1">
        <div className="flex justify-between items-center px-6 py-4">
          <div className="text-xl font-bold flex items-center gap-2">
            <img src="/Vector.png" alt="Logo" className="w-6 h-6 object-contain" />
            <span>Listify</span>
          </div>
          <div className="space-x-6 text-sm text-gray-600">
            <a href="#" className="hover:underline">About us</a>
            <a href="#" className="hover:underline">Contacts</a>
          </div>
        </div>

        <div className="flex flex-1 justify-center items-center px-4 py-6">
          <div className="w-full max-w-md bg-white/40 backdrop-blur-md rounded-xl shadow-lg p-8 sm:p-10 text-center">
            <h2 className="text-xl font-bold text-blue-600 mb-1">Register</h2>
            <p className="text-sm text-gray-600 mb-6">
              Create your account to get started with <br />
              Listify task manager
            </p>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full border-b border-gray-400 bg-transparent p-2 text-sm focus:outline-none focus:border-black"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full border-b border-gray-400 bg-transparent p-2 text-sm focus:outline-none focus:border-black"
              />

              {/* Password Field */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className="w-full border-b border-gray-400 bg-transparent p-2 text-sm focus:outline-none focus:border-black pr-10"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-3 text-gray-600 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {/* Confirm Password Field */}
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirm"
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                  className="w-full border-b border-gray-400 bg-transparent p-2 text-sm focus:outline-none focus:border-black pr-10"
                />
                <span
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-2 top-3 text-gray-600 cursor-pointer"
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  className="w-full sm:w-40 h-14 bg-white font-bold text-black py-2 rounded-2xl border border-gray-300 shadow-md hover:bg-gray-100 transition"
                >
                  Sign Up
                </button>
                <p className="mt-4 text-sm text-gray-700">
                  Already have an account?{" "}
                  <Link to="/" className="text-blue-600 hover:underline font-semibold">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
