import express from "express";
import {
  linkPatientToDoctor,
  getAllPatients,
  searchPatients,
} from "../controllers/doctorController.js";
import { authorizeUser } from "../middleware/middleware.js";
const doctorRoutes = express.Router();

doctorRoutes.post("/linkpatient", authorizeUser, linkPatientToDoctor);
doctorRoutes.get("/patients", authorizeUser, getAllPatients);
doctorRoutes.get("/patients/search", authorizeUser, searchPatients);

export default doctorRoutes;
