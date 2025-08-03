import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import API from "../api";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // ✅ Password length check
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setSuccess("Login successful!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    alert("Google Login functionality to be implemented.");
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/bg.png')" }}
      />

      <div className="relative z-10 flex flex-col flex-1">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4">
          <div className="text-xl font-bold flex items-center gap-2">
            <img src="/Vector.png" alt="Logo" className="w-6 h-6 object-contain" />
            <span>Listify</span>
          </div>
          <div className="space-x-6 text-sm text-gray-600 hidden sm:block">
            <a href="#" className="hover:underline">About us</a>
            <a href="#" className="hover:underline">Contacts</a>
          </div>
        </div>

        {/* Main Login Box */}
        <div className="flex flex-1 justify-center items-center px-4">
          <div className="w-full max-w-md bg-white/40 backdrop-blur-md rounded-xl shadow-lg p-8 sm:p-10 text-center">
            <h2 className="text-2xl font-bold text-blue-600 mb-2">Login</h2>
            <p className="text-sm text-gray-700 mb-6">
              Welcome back! Sign in using your <br className="hidden sm:block" />
              social account or email to continue
            </p>

            {/* Social Logins */}
            <div className="flex justify-center gap-4 mb-6 text-xl">
              <button
                className="text-blue-600 hover:scale-110 transition duration-200"
                onClick={() => alert("Facebook login not implemented")}
              >
                <FaFacebookF />
              </button>
              <button
                onClick={handleGoogleLogin}
                className="hover:scale-110 transition duration-200"
              >
                <FcGoogle />
              </button>
              <button
                className="text-black hover:scale-110 transition duration-200"
                onClick={() => alert("Apple login not implemented")}
              >
                <FaApple />
              </button>
            </div>

            {/* Messages */}
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Email */}
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full border-b border-gray-400 bg-transparent p-2 text-sm focus:outline-none focus:border-blue-600 transition"
              />

              {/* Password with Eye Toggle */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className="w-full border-b border-gray-400 bg-transparent p-2 text-sm focus:outline-none focus:border-blue-600 transition pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-40 h-14 bg-white font-bold text-black py-2 rounded-2xl border border-gray-300 shadow-md hover:bg-gray-100 transition disabled:opacity-60"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
                <p className="mt-4 text-sm text-gray-700 text-center">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-blue-600 hover:underline font-semibold">
                    Register
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

export default Login;
