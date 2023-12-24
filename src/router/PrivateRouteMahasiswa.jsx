import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticatedUser } from "../utils/Auth";

export default function PrivateRouteMahasiswa() {
  if (!isAuthenticatedUser()) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
}
