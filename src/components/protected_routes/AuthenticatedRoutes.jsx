import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import LoaderScreen from "../other/LoaderScreen";

export default function AuthenticatedRoutes() {
  const { role, loadingUser } = useContext(UserContext);
  return (
    <>
      {loadingUser ? (
        <LoaderScreen />
      ) : [1, 2, 3].includes(role) ? (
        <Outlet />
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
