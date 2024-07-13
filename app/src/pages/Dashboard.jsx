import { useEffect } from "react";
import PatientCard from "../components/PatientCard";
import instance from "../utils/axios";

const Dashboard = () => {
  const patient = {
    name: "Das",
    email: "",
    phone: "",
    address: "",
  };
  useEffect(() => {
    document.title = "Dashboard";
    try {
      instance.get("patients").then((response) => {
        console.log(response.data);
      });
    } catch (error) {
      console.error("Error:", error);
    }
  });
  return (
    <div className="mt-16">
      <span className="text-3xl mb-16">Dashboard</span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        <PatientCard patient={patient} />
        <PatientCard patient={patient} />
        <PatientCard patient={patient} />
      </div>
    </div>
  );
};

export default Dashboard;
