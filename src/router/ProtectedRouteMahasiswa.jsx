import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticatedUser } from "../utils/Auth";

export default function ProtectedRouteMahasiswa() {
  if (isAuthenticatedUser()) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
}
