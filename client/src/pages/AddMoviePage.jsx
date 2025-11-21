import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import MovieForm from "../components/MovieForm";
import toast from "react-hot-toast";

const AddMoviePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAddMovie = async (data) => {
    setLoading(true);
    try {
      await api.post("/api/v1/movies/add", data);
      navigate("/dashboard", {
        state: { message: "Movie added successfully!" },
      });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4">
      <MovieForm
        pageTitle="Add New Movie"
        onSubmit={handleAddMovie}
        isLoading={loading}
      />
    </div>
  );
};

export default AddMoviePage;
