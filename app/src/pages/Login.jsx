import { useState } from "react";
import Login from "../components/Login";

import Register from "../components/Register";
const LoginPage = () => {
  const [currentTab, setCurrentTab] = useState("login");

  return (
    <>
      <div className="mt-16">
        <div role="tablist" className="tabs tabs-lifted">
          <a
            role="tab"
            className={`tab ${currentTab === "login" ? "tab-active" : ""}`}
            onClick={() => setCurrentTab("login")}
          >
            Login
          </a>
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            <Login />
          </div>
          <a
            role="tab"
            className={`tab ${currentTab === "register" ? "tab-active" : ""}`}
            onClick={() => setCurrentTab("register")}
          >
            Register
          </a>

          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            <Register />
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginPage;
