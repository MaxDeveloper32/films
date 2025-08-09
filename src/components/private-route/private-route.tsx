import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/use-app-redux/use-app-redux";
import { ReactNode } from "react";


type PrivateRouteProps = {
  children : ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuth, isLoading } = useAppSelector((state) => state.auth);
  if(isLoading) return;

  return isAuth ? children : <Navigate to="/auth" replace />;
};

export default PrivateRoute;
