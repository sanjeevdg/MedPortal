import express from "express";
import {
  linkPatientToDoctor,
  getAllPatients,
} from "../controllers/doctorController.js";
const doctorRoutes = express.Router();

doctorRoutes.post("/linkpatient", linkPatientToDoctor);
doctorRoutes.get("/patients", getAllPatients);

export default doctorRoutes;
