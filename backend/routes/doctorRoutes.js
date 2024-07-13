import express from "express";
import {
  linkPatientToDoctor,
  getAllPatients,
  searchPatients,
  getDoctorPatients,
  uploadFile,
  getFilesByDoctor,
} from "../controllers/doctorController.js";
import { authorizeUser } from "../middleware/middleware.js";
const doctorRoutes = express.Router();
doctorRoutes.get("/", (req, res) => {
  res.send("Everything okay").status(200);
});
doctorRoutes.post("/linkpatient", authorizeUser, linkPatientToDoctor);
doctorRoutes.get("/patients", authorizeUser, getAllPatients);
doctorRoutes.get("/patients/search", authorizeUser, searchPatients);
doctorRoutes.get("/patients/:doctorId", authorizeUser, getDoctorPatients);
doctorRoutes.post("/uploadFile", authorizeUser, uploadFile);
doctorRoutes.get("/files/:doctorId", authorizeUser, getFilesByDoctor);

export default doctorRoutes;
