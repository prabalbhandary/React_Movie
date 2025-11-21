import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = () => {
      const user = localStorage.getItem("user");
      if (user) {
        setUser(JSON.parse(user));
      }
      setLoading(false);
    };
    fetchUser();
  }, []);
  const login = async (email, password) => {
    try {
      const response = await api.post("/api/v1/auth/login", { email, password });
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      setUser(response.data.user);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post("/api/v1/auth/register", userData);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      toast.success("User Logged out successfully!");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
