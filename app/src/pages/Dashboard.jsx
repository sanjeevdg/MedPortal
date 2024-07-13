import { useEffect, useState } from "react";
import PatientCard from "../components/PatientCard";
import instance from "../utils/axios";
import { getToken } from "../utils/tokenHelpers";

const Dashboard = () => {
  const [patients, setPatients] = useState();
  const [searchEmail, setSearchEmail] = useState("");
  const [searchResults, setSearchResults] = useState();
  const [linkPatientId, setLinkPatientId] = useState();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleChange = (event) => {
    switch (event.target.name) {
      case "email":
        setSearchEmail(event.target.value);
        handleSearch();
        break;

      default:
        break;
    }
  };
  const handleSearch = async () => {
    try {
      const response = await instance.get(
        `patients/search?email=${searchEmail}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.length != 0) {
        setDropdownOpen(true);
      }
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleLinkPatient = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      await instance.post(
        "linkpatient",
        {
          doctorId: user.doctorId,
          patientId: linkPatientId,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      document.getElementById("my_modal_5").close();
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };
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
    <div className="mt-16 min-h-screen">
      <span className="text-2xl mb-16">Dashboard</span>
      <div className="flex justify-between mt-4 ">
        <button
          className="btn btn-primary sm:btn-sm "
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          Link Patient
        </button>
        <button
          className="btn btn-primary ml-4 sm:btn-sm"
          onClick={() => document.getElementById("my_modal_6").showModal()}
        >
          Upload PDF
        </button>
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
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            {/* Link Patient Modal*/}
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Link Patient</h3>
          <hr />

          <div className="mt-4 flex  flex-col">
            <label className="input input-bordered flex items-center gap-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>{" "}
              <input
                type="email"
                name="email"
                id="emailSearch"
                className="grow"
                placeholder="Add by Email"
                onChange={(e) => handleChange(e)}
              />
            </label>

            {dropdownOpen && searchResults && searchResults.length != 0 ? (
              <div className="dropdown dropdown-open">
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-96 shadow"
                >
                  {searchResults.map((patient) => (
                    <li key={patient.patientId}>
                      <a
                        onClick={() => {
                          setLinkPatientId(patient.patientId);
                          setSearchEmail(patient.email);
                          document.getElementById("emailSearch").value =
                            patient.email;

                          setDropdownOpen(false);
                        }}
                      >
                        {patient.name} | {patient.email}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {dropdownOpen}
            <div className="flex mt-2 justify-center">
              <button
                className="btn btn-primary size-sm"
                onClick={handleLinkPatient}
              >
                Link
              </button>
            </div>
          </div>
        </div>
      </dialog>
      <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            {/* Upload PDF Modal*/}

            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Upload PDF</h3>
          <hr />
          <div className="mt-4">
            <label className="input input-bordered flex">
              <input type="email" className="grow" />
            </label>
            <div className="flex mt-2 justify-center">
              <button className="btn btn-primary size-sm">Upload</button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Dashboard;
