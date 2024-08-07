import express, { json } from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";

const app = express();
const port = 3000;

//middleware
app.use(cors());
app.use(json());

app.use("/auth", authRoutes);
app.use("/", doctorRoutes);

app.listen(port, () => {
  console.log(`MedPortal app backend listening on port ${port}`);
});
