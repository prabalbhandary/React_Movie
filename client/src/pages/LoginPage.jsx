import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AlertCircle, Film, LogIn, Mail, Lock } from "lucide-react";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMsg(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError("");
    setSuccessMsg("");

    try {
      await login(data.email, data.password);
      navigate("/dashboard");
    } catch (err) {
      setServerError(
        err.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      <div className="relative z-10 w-full max-w-md p-8 bg-gray-900/90 border border-gray-700 rounded-2xl shadow-2xl text-white">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <Film className="h-10 w-10 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="text-gray-400 mt-1">Sign in to continue to MovieHub.</p>
        </div>
        {successMsg && (
          <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded text-green-200 text-sm text-center">
            {successMsg}
          </div>
        )}
        {serverError && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded flex items-center gap-2 text-red-200 text-sm">
            <AlertCircle size={16} />
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="you@example.com"
                className={`w-full pl-10 pr-4 py-2.5 bg-gray-800 border ${
                  errors.email ? "border-red-500" : "border-gray-700"
                } rounded-lg focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all`}
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <a href="#" className="text-xs text-gray-400 hover:text-red-500">
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="••••••••"
                className={`w-full pl-10 pr-4 py-2.5 bg-gray-800 border ${
                  errors.password ? "border-red-500" : "border-gray-700"
                } rounded-lg focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all`}
              />
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-red-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <LogIn size={20} /> Sign In
              </>
            )}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Don't have an account yet?{" "}
          <Link
            to="/register"
            className="text-red-500 hover:text-red-400 font-medium hover:underline"
          >
            Create one here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
