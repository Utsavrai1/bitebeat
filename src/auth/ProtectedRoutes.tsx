import { useUserAuthState } from "@/api/AuthApi";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { isAuthenticated } = useUserAuthState();
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};
export default ProtectedRoutes;
