import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import LoaderScreen from "../other/LoaderScreen";

export default function SellerRoutes() {
  const { role, loadingUser } = useContext(UserContext);
  return (
    <>
      {loadingUser ? (
        <LoaderScreen />
      ) : [2, 3].includes(role) ? (
        <Outlet />
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
