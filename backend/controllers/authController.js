import prisma from "@prisma/client";
import { hash } from "bcrypt";
import jwt from "jsonwebtoken";

const { PrismaClient } = prisma;
const prismaClient = new PrismaClient();

const registerDoctor = async (req, res) => {
  const { name, email, password, specialty } = req.body;
  try {
    const hashedPassword = await hash(password, 10);
    const doctor = await prismaClient.doctor.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
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
    const patient = await prismaClient.patient.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
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
    user = await prismaClient.patient.findUnique({
      where: {
        email,
      },
    });
  } else {
    user = await prismaClient.doctor.findUnique({
      where: {
        email,
      },
    });
  }
  if (!user) {
    return res.status(400).json({ error: "Invalid email or password" });
  }
  const isValid = await compare();
  if (!(hash(password, 10) == user.passwordHash)) {
    return res.status(400).json({ error: "Invalid email or password" });
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.json({ token });
};
export { registerDoctor, registerPatient, login };
