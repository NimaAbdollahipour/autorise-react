import PublicHeader from "./PublicHeader";
import BuyerHeader from "./BuyerHeader";
import SellerHeader from "./SellerHeader";
import AdminHeader from "./AdminHeader";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
export default function UniversalHeader() {
  const { role } = useContext(UserContext);
  const allHeaders = [
    <PublicHeader />,
    <BuyerHeader />,
    <SellerHeader />,
    <AdminHeader />,
  ];
  return <>{allHeaders[role]}</>;
}
