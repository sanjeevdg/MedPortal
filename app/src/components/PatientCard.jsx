const PatientCard = ({ patient }) => {
  return (
    <div className="card border shadow-2xl rounded-2xl w-72 h-32">
      <div className="card-body">
        <h2 className="card-title">{patient.name}</h2>
        <p className="text-xs">{patient.email}</p>
        <p className="text-xs">{patient.phone}</p>
        <p className="text-xs">{patient.address}</p>
      </div>
    </div>
  );
};
export default PatientCard;
