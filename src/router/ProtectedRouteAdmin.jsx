import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticatedAdmin } from "../utils/Auth";

export default function ProtectedRouteAdmin() {
  if (isAuthenticatedAdmin()) {
    return <Navigate to='/admin/Kelola-Materi' replace />;
  }

  return <Outlet />;
}
