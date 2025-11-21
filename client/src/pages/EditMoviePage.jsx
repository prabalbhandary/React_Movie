import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import MovieForm from "../components/MovieForm";

const EditMoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [movieData, setMovieData] = useState(null);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await api.get(`/api/v1/movies/details/${id}`);
        setMovieData(data.movie);
      } catch (error) {
        console.error(error);
        setFetchError(true);
      }
    };
    fetchMovie();
  }, [id]);

  const handleUpdateMovie = async (data) => {
    setLoading(true);
    try {
      await api.put(`/api/v1/movies/update/${id}`, data);
      navigate("/dashboard", {
        state: { message: "Movie updated successfully!" },
      });
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update.");
    } finally {
      setLoading(false);
    }
  };

  if (fetchError)
    return <div className="text-white text-center mt-20">Movie not found.</div>;
  if (!movieData)
    return (
      <div className="text-white text-center mt-20">
        Loading movie details...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4">
      <MovieForm
        pageTitle="Edit Movie"
        onSubmit={handleUpdateMovie}
        initialData={movieData}
        isLoading={loading}
      />
    </div>
  );
};

export default EditMoviePage;
