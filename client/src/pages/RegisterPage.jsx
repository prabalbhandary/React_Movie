import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, CheckCircle, Film, Lock, Mail, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const password = watch("password");

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError("");
    try {
      await registerUser(data);
      navigate("/login", {
        state: { message: "Registration successful! Please log in." },
      });
    } catch (err) {
      setServerError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-md p-8 bg-gray-900/90 border border-gray-700 rounded-2xl shadow-2xl text-white">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <Film className="h-10 w-10 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold">Create Account</h2>
          <p className="text-gray-400 mt-1">
            Join MovieHub to explore endless entertainment.
          </p>
        </div>

        {serverError && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded flex items-center gap-2 text-red-200 text-sm">
            <AlertCircle size={16} />
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="John Doe"
                className={`w-full pl-10 pr-4 py-2.5 bg-gray-800 border ${
                  errors.name ? "border-red-500" : "border-gray-700"
                } rounded-lg focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all`}
              />
            </div>
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
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
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
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
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <CheckCircle className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
              <input
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (val) =>
                    val === password || "Passwords do not match",
                })}
                type="password"
                placeholder="••••••••"
                className={`w-full pl-10 pr-4 py-2.5 bg-gray-800 border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-700"
                } rounded-lg focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all`}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-red-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-red-500 hover:text-red-400 font-medium hover:underline"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
