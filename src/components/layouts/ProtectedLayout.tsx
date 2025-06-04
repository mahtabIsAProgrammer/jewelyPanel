import { Navigate } from "react-router-dom";

export const ProtectedLayout = ({ children }: TAny) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
};
