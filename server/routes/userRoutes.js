import express from "express";
import { getAllUsers, deleteUser } from "../controllers/userController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/all", protect, admin, getAllUsers);

router.delete("/delete/:id", protect, admin, deleteUser);

export default router;
