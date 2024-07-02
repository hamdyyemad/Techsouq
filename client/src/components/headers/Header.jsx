import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/userApiSlice";
import TopHeader from "./TopHeader";
// const navLinks = [
//   {
//     id: "/",
//     title: "Home",
//   },
//   {
//     id: "/products",
//     title: "Shop",
//   },
//   {
//     id: "/cart",
//     title: "Cart",
//   },
// ];

export default function Header({ isDarkMode, setIsDarkMode }) {
  const cart = useSelector((store) => store.cart.cardItems);
  const user = useSelector((store) => store.auth.userInfo);

  const [showProfile, setShowProfile] = useState(true);

  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();

  return (
    <div className={`flex flex-col justify-center`}>
      <TopHeader
        user={user}
        cart={cart}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        dispatch={dispatch}
        logoutApiCall={logoutApiCall}
      />
    </div>
  );
}
