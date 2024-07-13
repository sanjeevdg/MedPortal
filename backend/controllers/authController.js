import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const registerUser = async (req, res) => {
  const { name, email, password, userType, specialty } = req.body;
  try {
    const hashedPassword = await hash(password, 10);
    let user;
    if (userType === "doctor") {
      user = await prisma.doctor.create({
        data: {
          name,
          email,
          password: hashedPassword,
          specialty,
        },
      });
    } else if (userType === "patient") {
      user = await prisma.patient.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
    } else {
      return res.status(400).json({ error: "Invalid user type" });
    }
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ error: "Email already exists or invalid data" });
  }
};
const login = async (req, res) => {
  const { email, password, userType } = req.body;
  let user;
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
  if (!user || !(await compare(password, user.password))) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET);
  res.json({ token });
};
export { registerUser, login };
