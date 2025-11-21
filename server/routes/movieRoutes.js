import express from "express";
import {
  getAllMovies,
  getMovieDetails,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/all", getAllMovies);

router.get("/details/:id", getMovieDetails);

router.post("/add", protect, admin, addMovie);

router.put("/update/:id", protect, admin, updateMovie);

router.delete("/delete/:id", protect, admin, deleteMovie);

export default router;
