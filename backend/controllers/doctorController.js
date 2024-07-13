import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const linkPatientToDoctor = async (req, res) => {
  const { doctorId, patientId } = req.body;

  try {
    const doctorPatient = await prisma.doctorPatient.create({
      data: {
        doctorID: doctorId,
        patientID: patientId,
      },
    });
    res.status(200).json(doctorPatient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to link patient to doctor" });
  }
};

export const getAllPatients = async (req, res) => {
  try {
    const patients = await prisma.patient.findMany();
    res.status(200).json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch patients" });
  }
};
