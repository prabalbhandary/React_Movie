import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  Calendar,
  Clock,
  Play,
  ArrowLeft,
  Film,
  Share2,
} from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleShare = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    alert("URL copied to clipboard!");
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await api.get(`/api/v1/movies/details/${id}`);
        setMovie(data.movie);
      } catch (error) {
        toast.error(error.data?.message || "Error fetching movie");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-bold mb-4">Movie not found</h2>
        <button
          onClick={() => navigate("/")}
          className="text-red-500 hover:underline cursor-pointer"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans pb-12">
      <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center blur-xl opacity-50 scale-110"
          style={{ backgroundImage: `url(${movie.poster})` }}
        ></div>
        <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/80 to-transparent"></div>

        <div className="relative container mx-auto px-6 h-full flex flex-col justify-center">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 bg-black/50 p-2 rounded-full hover:bg-red-600 transition text-white cursor-pointer z-10"
          >
            <ArrowLeft size={24} />
          </button>

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-end">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-48 md:w-64 rounded-lg shadow-2xl border-4 border-gray-800 hidden md:block"
            />
            <div className="max-w-3xl space-y-4 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm font-medium text-red-500 uppercase tracking-wider">
                <span className="bg-red-500/10 px-3 py-1 rounded border border-red-500/20">
                  {movie.genre}
                </span>
                <span className="flex items-center gap-1 text-yellow-400">
                  <Star size={16} fill="currentColor" /> {movie.rating}/10
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
                {movie.title}
              </h1>

              <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 text-gray-300 text-sm md:text-base">
                <span className="flex items-center gap-2">
                  <Calendar size={18} /> {movie.year}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={18} /> {movie.runTime}
                </span>
                <span className="flex items-center gap-2">
                  <Film size={18} /> {movie.directorName}
                </span>
              </div>

              <div className="flex gap-4 mt-6 justify-center md:justify-start">
                <a
                  href={movie.url}
                  target="_blank"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition shadow-lg shadow-red-600/30"
                >
                  <Play size={20} fill="currentColor" /> Watch Movie
                </a>
                <button
                  onClick={handleShare}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition border border-gray-700 cursor-pointer"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <div className="md:hidden flex justify-center -mt-20 relative z-10 mb-8">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-48 rounded-lg shadow-2xl border-4 border-gray-800"
            />
          </div>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4 border-l-4 border-red-600 pl-3">
              Storyline
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              {movie.description || "No description available for this movie."}
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-red-600 pl-3">
              Top Cast
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {movie.cast.map((actor, index) => (
                <div
                  key={index}
                  className="bg-gray-900 p-4 rounded-xl border border-gray-800 flex flex-col items-center text-center hover:border-gray-700 transition"
                >
                  <div className="w-16 h-16 bg-gray-800 rounded-full mb-3 flex items-center justify-center text-gray-500">
                    <img
                      src={actor.picture}
                      alt=""
                      className="w-16 h-16 rounded-full"
                    />
                  </div>
                  <h4 className="font-bold text-white">{actor.name}</h4>
                  <p className="text-sm text-gray-500">{actor.role}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-red-600 pl-3">
              Download Links
            </h3>
            <div className="flex flex-wrap gap-4">
              {movie.download.map((link) =>
                Object.entries(link)
                  .filter(([res]) => res !== "_id")
                  .map(([res, url]) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      className="bg-linear-to-r from-red-600 to-pink-500 hover:from-pink-500 hover:to-red-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2"
                    >
                      {res.toUpperCase()}
                    </a>
                  ))
              )}
            </div>
          </section>
          <section className="lg:col-span-3">
            <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-red-600 pl-3">
              Movie Trailer
            </h3>
            {movie.trailer && (
              <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-lg">
                <div className="relative aspect-video bg-black flex items-center justify-center group cursor-pointer">
                  <img
                    src={movie.poster}
                    alt="Trailer"
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                  <div className="absolute w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition z-10">
                    <a
                      href={movie.trailer}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Play size={32} color="white" />
                    </a>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-lg text-white">
                    Official Trailer
                  </h4>
                  <p className="text-sm text-gray-500">
                    Watch the official trailer for {movie.title}
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>

        <div className="space-y-8">
          <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-lg">
            <div className="relative aspect-video bg-black flex items-center justify-center group cursor-pointer">
              <img
                src={movie.poster}
                alt="Trailer"
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
              <div className="absolute w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition z-10">
                <a href={movie.url} target="_blank" rel="noopener noreferrer">
                  <Play size={32} color="white" />
                </a>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-lg text-white">Official Movie</h4>
              <p className="text-sm text-gray-500">
                Watch the official movie for {movie.title}
              </p>
            </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-4">Movie Info</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-500">Release Date</span>
                <span className="text-white">{movie.year}</span>
              </li>
              <li className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-500">Language</span>
                <span className="text-white">{movie.language}</span>
              </li>
              <li className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-500">Budget</span>
                <span className="text-white">$ {movie.budget}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Production</span>
                <span className="text-white">{movie.production}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
