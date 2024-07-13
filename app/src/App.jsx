import "./App.css";
import LoginPage from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
