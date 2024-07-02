import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function SellerRoute() {
  const { userInfo } = useSelector((state) => state?.auth);

  return userInfo && userInfo?.role === "SELLER" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ message: "You must be a Seller" }} />
  );
}
