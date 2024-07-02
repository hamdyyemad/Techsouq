import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Protected() {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ message: "You must log in first" }}
    />
  );
}
