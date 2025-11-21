import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await api.get(`/api/v1/movies/all`);
      setMovies(data.movies);
    };
    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 bg-gray-950 text-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Movies</h1>
        <input
          type="text"
          placeholder="Search movies..."
          className="border p-2 rounded w-64"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Link key={movie._id} to={`/movie/${movie._id}`}>
              <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
                <img
                  src={movie.poster || "https://via.placeholder.com/300"}
                  alt={movie.title}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg">{movie.title}</h3>
                  <p className="text-sm text-gray-500">
                    {movie.genre} • {movie.year}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="flex gap-2 bg-yellow-400 px-2 py-1 rounded text-xs font-bold text-black">
                      <FaStar /> {movie.rating}/10
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No movies found.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
