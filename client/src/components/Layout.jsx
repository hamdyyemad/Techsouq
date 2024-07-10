import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../slices/authSlice";
import { resetCart } from "../slices/cartSlice";
import { useScreenWidth } from "../hooks/useScreenWidth";
import { BASE_URL } from "../constants";

import SellerSidebar from "./seller/SellerSidebar";
import Footer from "./Footer";
import Header from "./headers/Header";
import Sidebar from "./admin/Sidebar";
export default function Layout() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if there's a saved dark mode preference in localStorage
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useScreenWidth();
  useEffect(() => {
    function forceLogout() {
      toast.error("This user doesn't exist anymore");
      dispatch(logout());
      dispatch(resetCart());
      localStorage.removeItem("userInfo");
    }
    // Check if the user exists in the database
    if (!userInfo?.token) return;
    const checkUserExistence = async () => {
      try {
        // Make an API call to check user existence
        // Replace 'apiEndpoint' with your actual API endpoint
        const response = await axios.post(
          `${BASE_URL}/users/checkExistence`,
          { userId: userInfo?.id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo?.token}`, // Include the token in the headers
            },
          }
        );

        if (response.status === 200) {
          // User exists, do nothing
        } else {
          forceLogout();
        }
      } catch (error) {
        console.log(error);
        forceLogout();
      }
    };

    if (userInfo?.role !== "ADMIN") {
      checkUserExistence();
    }
  }, [dispatch, navigate, userInfo?.id, userInfo?.role, userInfo?.token]);

  if (userInfo?.role === "ADMIN") {
    return (
      <>
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <ToastContainer />

        <div className="bg-primary w-full grid grid-cols-[15rem,1fr] dark:bg-[#1C1E2D] overflow-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 dark:scrollbar-thumb-blue-500 dark:scrollbar-track-gray-700">
          {!isMobile && <Sidebar />}
          <main
            className={`min-h-screen content-start z-0 ${
              isMobile ? "w-screen" : ""
            }`}
          >
            <Outlet />
          </main>
        </div>
        <Footer />
      </>
    );
  }
  if (userInfo?.role === "SELLER") {
    return (
      <>
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <ToastContainer />
        <div className="bg-gray-100 w-full grid grid-cols-[15rem,1fr] dark:bg-[#151725] overflow-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 dark:scrollbar-thumb-blue-500 dark:scrollbar-track-gray-700">
          {!isMobile && <SellerSidebar />}
          <main
            className={`min-h-screen content-start z-0 ${
              isMobile ? "w-screen" : ""
            }`}
          >
            <Outlet />
          </main>
        </div>
        <Footer />
      </>
    );
  }
  return (
    <div className="bg-primary w-full overflow-hidden dark:bg-[#1C1E2D]">
      <div className="w-full xs:w-52">
        <ToastContainer />
      </div>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <main className="min-h-screen ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
