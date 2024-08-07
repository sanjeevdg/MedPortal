import { useState } from "react";
import instance from "../utils/axios";
import validator from "validator";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("doctor"); // Default to "patient"
  const [specialty, setSpecialty] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    switch (event.target.name) {
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "name":
        setName(event.target.value);
        break;
      case "specialty":
        setSpecialty(event.target.value);
        break;
      case "userType":
        setUserType(event.target.value);
        break;
      default:
        break;
    }
  };
  const validate = (value, type) => {
    if (type === "password") {
      if (
        !validator.isStrongPassword(value, {
          minLength: 8,
          minUppercase: 1,
        })
      ) {
        setErrorMessage(
          "Passwords must have at least 8 characters and contain at least one uppercase letter"
        );
      } else {
        setErrorMessage("");
      }
    }
    if (type === "email") {
      if (!validator.isEmail(value)) {
        setErrorMessage("Invalid Email");
      } else {
        setErrorMessage("");
      }
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = { name, email, password, userType };
    if (userType === "doctor") {
      data.specialty = specialty;
    }
    try {
      const response = await instance.post("auth/register", data);
      console.log(response.data);
      alert("User registered successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      alert("Unable to register user");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="card card-side bg-base-100 max-w-sm w-full">
          <div className="card-body ">
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            <form>
              <div className="flex  justify-between mb-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="userType"
                    value="patient"
                    className="radio radio-xs"
                    checked={userType === "patient"}
                    onChange={(e) => handleChange(e)}
                  />
                  <span className="ml-2">Patient</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="userType"
                    value="doctor"
                    className="radio radio-xs"
                    checked={userType === "doctor"}
                    onChange={(e) => handleChange(e)}
                  />
                  <span className="ml-2">Doctor</span>
                </label>
              </div>
              <label className="input input-bordered flex items-center gap-2 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  type="text"
                  name="name"
                  className="grow"
                  placeholder="Enter name"
                  onChange={(e) => handleChange(e)}
                />
              </label>

              <label className="input input-bordered flex items-center gap-2 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  name="email"
                  required
                  placeholder="Enter email"
                  className="grow"
                  onChange={(e) => {
                    validate(e.target.value, "email");
                    handleChange(e);
                  }}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  className="grow"
                  name="password"
                  placeholder="Enter password"
                  onChange={(e) => {
                    validate(e.target.value, "password");
                    handleChange(e);
                  }}
                />
              </label>

              {userType === "doctor" && (
                <label className="input input-bordered flex items-center gap-2 mb-4">
                  <input
                    type="text"
                    name="specialty"
                    className="grow"
                    placeholder="Enter specialty"
                    onChange={(e) => handleChange(e)}
                  />
                </label>
              )}
              {errorMessage === "" ? null : (
                <div className="text-red-500 font-bold text-xs">
                  {errorMessage}
                </div>
              )}
              <button className="btn btn-primary btn-md" onClick={handleSubmit}>
                Register
              </button>
            </form>
            <p className="text-center mt-8 text-lg cursor-pointer">
              {/* Redirect to signup page */}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
