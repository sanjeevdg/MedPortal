import { Outlet, Navigate } from "react-router-dom";
import { getToken } from "./tokenHelpers";
const PrivateRoutes = () => {
  let token = getToken();
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
