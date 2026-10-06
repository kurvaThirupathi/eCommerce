import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector(s => s.auth.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
