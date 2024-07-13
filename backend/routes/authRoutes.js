import express from "express";
import { login, registerUser } from "../controllers/authController.js";
const authRoutes = express.Router();

authRoutes.post("/login", login);
authRoutes.post("/register", registerUser);

export default authRoutes;
