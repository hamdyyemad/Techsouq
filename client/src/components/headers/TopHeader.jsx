import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../slices/authSlice";
import { resetCart } from "../../slices/cartSlice";
import { useScreenWidth } from "../../hooks/useScreenWidth";

import Logo from "./Logo";
import Search from "./Search";
import CartButton from "./CartButton";
import BottomHeader from "./BottomHeader";
import UserHamburger from "./UserHamburger";
import AdminDropDown from "../admin/AdminDropDown";
import SellerDropDown from "../seller/SellerDropDown";
import FavoritesButton from "./FavoritesButton";

export default function TopHeader({
  user,
  cart,
  isDarkMode,
  setIsDarkMode,
  showProfile,
  setShowProfile,
  dispatch,
  logoutApiCall,
}) {
  const navigate = useNavigate();
  const isMobile = useScreenWidth();

  useEffect(() => {
    // Apply or remove 'dark' class to #root based on darkMode state
    document.body.classList.toggle("dark", isDarkMode);
    // Save the dark mode preference to localStorage
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      // NOTE: here we need to reset cart state for when a user logs out so the next
      // user doesn't inherit the previous users cart and shipping
      dispatch(resetCart());
      navigate("/");
      setShowProfile(false);
    } catch (err) {
      console.error(err);
    }
  };
  if (isMobile) {
    return (
      <header className="bg-white dark:bg-[#242635]">
        <div className="border py-3 px-6 dark:border-none">
          <div className="flex justify-between">
            <div className="flex items-center justify-center ">
              <Logo />
            </div>

            <div className="ml-2 flex items-center justify-center">
              {(!user?.token || user?.role === "USER") && (
                <UserHamburger
                  user={user}
                  showProfile={showProfile}
                  setShowProfile={setShowProfile}
                  handleLogout={handleLogout}
                />
              )}
              {user?.role === "ADMIN" && (
                <AdminDropDown user={user} handleLogout={handleLogout} />
              )}
              {user?.role === "SELLER" && (
                <SellerDropDown user={user} handleLogout={handleLogout} />
              )}
            </div>
          </div>
          <BottomHeader setIsDarkMode={setIsDarkMode} />
        </div>
      </header>
    );
  }
  return (
    <header className="bg-white dark:bg-[#242635]">
      <div className="border py-3 px-6 dark:border-none">
        <div className="flex justify-between xs:flex-col">
          <Logo />

          <Search />
          <div className="ml-2 flex">
            {(user?.role === "USER" || !user?.token) && (
              <>
                <CartButton cart={cart} />
                <FavoritesButton />
              </>
            )}
            {(!user?.token || user?.role === "USER") && (
              <UserHamburger
                user={user}
                showProfile={showProfile}
                setShowProfile={setShowProfile}
                handleLogout={handleLogout}
              />
            )}
            {user?.role === "ADMIN" && (
              <AdminDropDown user={user} handleLogout={handleLogout} />
            )}
            {user?.role === "SELLER" && (
              <SellerDropDown user={user} handleLogout={handleLogout} />
            )}
          </div>
        </div>
        <BottomHeader setIsDarkMode={setIsDarkMode} />
      </div>
    </header>
  );
}
{
  /* <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                  <path d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                </svg>
                <span className="text-sm font-medium">Orders</span>
              </div>
   */
}
