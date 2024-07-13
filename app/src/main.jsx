import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow">
        <App />
      </div>
      <Footer />
    </div>
  </React.StrictMode>
);
