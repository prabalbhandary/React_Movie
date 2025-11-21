import dotenv from "dotenv";
dotenv.config();

import express from "express";
import "colors";
import morgan from "morgan";
import cors from "cors";
import path from "path";

import connectDB from "./server/config/db.js";
import authRoutes from "./server/routes/authRoutes.js";
import userRoutes from "./server/routes/userRoutes.js";
import movieRoutes from "./server/routes/movieRoutes.js";

const app = express();

const __dirname = path.resolve();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/movies", movieRoutes);

const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(port, () => {
  connectDB();
  console.log(`Server running on http://localhost:${port}`.bgCyan.white);
});
