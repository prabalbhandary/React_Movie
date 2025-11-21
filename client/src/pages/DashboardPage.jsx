import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import api from "../api/axios";

const DashboardPage = () => {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await api.get("/api/v1/movies/all");
      setMovies(data.movies);
    };
    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure?")) {
      await api.delete(`/api/v1/movies/delete/${id}`);
      setMovies(movies.filter((m) => m._id !== id));
    }
  };
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="flex gap-4 mb-8">
        {user.role === "admin" && (
          <div className="bg-blue-100 text-black p-4 rounded-lg w-1/3">
            <h3 className="font-bold">Total Movies</h3>
            <p className="text-2xl">{movies.length}</p>
          </div>
        )}
        <div className="bg-green-100 text-black p-4 rounded-lg w-1/3">
          <h3 className="font-bold">Role</h3>
          <p className="text-2xl capitalize">{user?.role}</p>
        </div>
      </div>

      {user.role === "admin" && (
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Manage Movies</h2>
          <Link
            to="/add-movie"
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Add New Movie
          </Link>
        </div>
      )}

      {user.role === "admin" && (
        <table className="w-full border-collapse border text-left">
          <thead className="bg-red-500">
            <tr>
              <th className="border p-2 text-white text-center">S.No.</th>
              <th className="border p-2 text-white text-center">Poster</th>
              <th className="border p-2 text-white text-center">Title</th>
              <th className="border p-2 text-white text-center">Genre</th>
              {user.role === "admin" && (
                <th className="border p-2 text-white text-center">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {movies &&
              movies.map((movie, index) => (
                <tr key={movie._id}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2 text-center">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-16 h-16 object-cover rounded mx-auto"
                    />
                  </td>
                  <td className="text-center p-2">
                    <Link
                      to={`/movie/${movie._id}`}
                      className="no-underline text-white"
                    >
                      {movie.title}
                    </Link>
                  </td>
                  <td className="border p-2 text-center">{movie.genre}</td>
                  {user.role === "admin" && (
                    <td className="border p-2 text-center space-x-4">
                      <Link
                        to={`/edit-movie/${movie._id}`}
                        className="text-white bg-green-600 px-4 py-2 rounded"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(movie._id)}
                        className="text-white bg-red-600 px-4 py-2 rounded cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DashboardPage;
