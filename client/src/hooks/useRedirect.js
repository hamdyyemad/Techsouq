// useRedirect.js

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export const useRedirect = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo?.role === "ADMIN") {
      navigate("/admin");
    } else if (userInfo?.role === "SELLER") {
      navigate("/seller/productlist");
    }
  }, [navigate, userInfo]);

  return userInfo; // You can return userInfo if you need it in the component using this hook
};
