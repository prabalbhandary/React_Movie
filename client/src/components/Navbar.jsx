import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-white flex items-center gap-1 mb-4"
        >
          Movie<span className="text-red-600">Hub</span>
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-red-500">
            Home
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-red-500">
                Dashboard
              </Link>
              {user.role === "admin" && (
                <Link to="/users" className="hover:text-red-500">
                  Users
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-600 px-3 py-1 rounded cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-red-500">
                Login
              </Link>
              <Link to="/register" className="bg-red-600 px-3 py-1 rounded">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
