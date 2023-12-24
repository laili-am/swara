import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticatedAdmin } from "../utils/Auth";

export default function PrivateRouteAdmin() {
  if (!isAuthenticatedAdmin()) {
    return <Navigate to='/admin/Login' replace />;
  }

  return <Outlet />;
}
