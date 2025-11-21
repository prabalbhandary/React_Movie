import mongoose from "mongoose";

const castSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  picture: { type: String, default: "" },
});

const downloadSchema = new mongoose.Schema({
  "480p": { type: String, default: "" },
  "720p": { type: String, default: "" },
  "1080p": { type: String, default: "" },
  "4k": { type: String, default: "" },
});

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: Number, required: true },
    poster: { type: String, default: "" },
    url: { type: String, default: "" },
    trailer: { type: String, default: "" },
    rating: { type: Number, default: 0 },
    runTime: { type: String, required: true },
    directorName: { type: String, required: true },
    cast: [castSchema],
    language: { type: String, required: true },
    budget: { type: String, default: "" },
    production: { type: String, default: "" },
    download: [downloadSchema],
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
