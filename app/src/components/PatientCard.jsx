const PatientCard = ({ patient }) => {
  return (
    <div className="flex flex-row space-x-4 p-4">
      <div className="card border shadow-2xl rounded-2xl w-72 h-32 justify-start">
        <span className="card-title ">{patient.name}</span>
        <span className="text-xs text-left">{patient.email}</span>
        <span className="text-xs text-left">
          Patient ID: {patient.patientId}
        </span>
      </div>
    </div>
  );
};
export default PatientCard;
