import express from "express";
import {
  login,
  registerDoctor,
  registerPatient,
} from "../controllers/authController.js";
const authRoutes = express.Router();

authRoutes.post("/login", login);
authRoutes.post("/register-doctor", registerDoctor);
authRoutes.post("/register-patient", registerPatient);
export default authRoutes;
