import Movie from "../models/Movie.js";
import cloudinary from "../config/cloudinary.js";

const addMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      genre,
      year,
      poster,
      url,
      rating,
      runTime,
      directorName,
      cast,
      language,
      budget,
      production,
      download,
    } = req.body;

    if (
      !title ||
      !description ||
      !genre ||
      !year ||
      !runTime ||
      !directorName ||
      !language
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    let posterUrl = poster;

    if (poster && poster.startsWith("data:image")) {
      const uploadResponse = await cloudinary.uploader.upload(poster, {
        folder: "movies",
      });
      posterUrl = uploadResponse.secure_url;
    }

    const movie = await Movie.create({
      title,
      description,
      genre,
      year: Number(year),
      poster: posterUrl,
      url,
      rating: Number(rating),
      runTime,
      directorName,
      cast,
      language,
      budget,
      production,
      download,
    });

    return res
      .status(201)
      .json({ success: true, message: "Movie added successfully", movie });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, movies });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie)
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    return res.status(200).json({ success: true, movie });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (updatedData.poster && updatedData.poster.startsWith("data:image")) {
      const uploadResponse = await cloudinary.uploader.upload(
        updatedData.poster,
        { folder: "movies" }
      );
      updatedData.poster = uploadResponse.secure_url;
    }

    const movie = await Movie.findByIdAndUpdate(id, updatedData, { new: true });

    if (!movie)
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });

    res.status(200).json({ success: true, message: "Movie updated", movie });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByIdAndDelete(id);

    if (!movie)
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });

    return res.status(200).json({ success: true, message: "Movie deleted" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

export { addMovie, getAllMovies, getMovieDetails, updateMovie, deleteMovie };
