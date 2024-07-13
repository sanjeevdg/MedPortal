import { useEffect, useState } from "react";
import PatientCard from "../components/PatientCard";
import instance from "../utils/axios";
import { getToken } from "../utils/tokenHelpers";

const Dashboard = () => {
  const [patients, setPatients] = useState();
  useEffect(() => {
    document.title = "Dashboard";
    try {
      instance
        .get("patients", {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        .then((response) => {
          setPatients(response.data);
          console.log(response.data);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);
  return (
    <div className="mt-16">
      <span className="text-2xl mb-16">Dashboard</span>
      <div className="flex justify-between mt-4 ">
        <button className="btn btn-primary sm:btn-sm ">Link Patient</button>
        <button className="btn btn-primary ml-4 sm:btn-sm">Upload PDF</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mt-4">
        {patients && patients.length != 0 ? (
          patients.map((patient) => (
            <PatientCard patient={patient} key={patient.patientId} />
          ))
        ) : (
          <div className="flex justify-center items-center text-sm"></div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
