import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/UserContextProvider";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticate, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return isAuthenticate ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
