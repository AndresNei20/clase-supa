import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Navigate } from "react-router";

export const ProtectedRoutes: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const session = useSelector((state: RootState) => state.auth.session);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  console.log("ProtectedRoutes - session:", session);
  console.log("ProtectedRoutes - isLoading:", isLoading);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (!session) {
    return <Navigate to="/" replace />;
  }

  return children;
};