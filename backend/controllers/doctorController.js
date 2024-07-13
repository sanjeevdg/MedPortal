import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const uploadFile = async (req, res) => {
  const { fileUrl, doctorId } = req.body;
  fileUrl.trim();
  try {
    const file = await prisma.pDF.create({
      data: {
        filePath: fileUrl,
        doctorId: doctorId,
        uploadDate: new Date(),
      },
    });
    res.status(200).json(file);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload file" });
  }
};
export const getFilesByDoctor = async (req, res) => {
  const { doctorId } = req.params;
  try {
    const files = await prisma.pDF.findMany({
      where: {
        doctorId: parseInt(doctorId),
      },
    });
    res.status(200).json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch files" });
  }
};
export const getDoctorPatients = async (req, res) => {
  const { doctorId } = req.params;
  try {
    const doctorPatients = await prisma.doctorPatient.findMany({
      where: {
        doctorID: parseInt(doctorId),
      },
    });
    if (doctorPatients.length !== 0) {
      try {
        const patientPromises = doctorPatients.map(async (doctorPatient) => {
          const patient = await prisma.patient.findUnique({
            where: {
              patientId: doctorPatient.patientID,
            },
          });
          return patient;
        });

        const patients = await Promise.all(patientPromises);
        //build
        res.status(200).json(patients);
      } catch (error) {
        console.error("Error fetching patients:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch doctor patients" });
  }
};
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
export const searchPatients = async (req, res) => {
  const { email, name } = req.query;
  try {
    const patients = await prisma.patient.findMany({
      where: {
        email: {
          contains: email,
        },
        name: {
          contains: name,
        },
      },
    });
    res.status(200).json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to search patients" });
  }
};
