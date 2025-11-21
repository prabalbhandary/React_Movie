import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AddMoviePage from "./pages/AddMoviePage";
import EditMoviePage from "./pages/EditMoviePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import UsersPage from "./pages/UsersPage";
import Footer from "./components/Footer";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/register"
            element={!user ? <RegisterPage /> : <Navigate to="/dashboard" />}
          />
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            <Route element={<PrivateRoutes adminOnly={true} />}>
              <Route path="/add-movie" element={<AddMoviePage />} />
              <Route path="/edit-movie/:id" element={<EditMoviePage />} />
              <Route path="/users" element={<UsersPage />} />
            </Route>
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
