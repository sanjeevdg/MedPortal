import { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const registerDoctor = async (req, res) => {
  const { name, email, password, specialty } = req.body;
  try {
    const hashedPassword = await hash(password, 10);
    const doctor = await prisma.doctor.create({
      data: {
        name,
        email,
        password: hashedPassword,
        specialty,
      },
    });
    res.status(201).json({ message: "Doctor registered successfully", doctor });
  } catch (error) {
    res.status(400).json({ error: "Email already exists or invalid data" });
  }
};

const registerPatient = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await hash(password, 10);
    const patient = await prisma.patient.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    res
      .status(201)
      .json({ message: "Patient registered successfully", patient });
  } catch (error) {
    res.status(400).json({ error: "Email already exists or invalid data" });
  }
};
const login = async (req, res) => {
  const { email, password, userType } = req.body;
  if (userType === "patient") {
    user = await prisma.patient.findUnique({
      where: {
        email,
      },
    });
  } else {
    user = await prisma.doctor.findUnique({
      where: {
        email,
      },
    });
  }
  if (!user || !(hash(password, 10) == user.password)) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.json({ token });
};
export { registerDoctor, registerPatient, login };
