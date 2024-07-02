import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
export default function AdminDropDown({ user, handleLogout }) {
  const { t } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const btnRef = useRef();
  const [showAdmin, setShowAdmin] = useState(false);
  useEffect(() => {
    const closeDropDown = (e) => {
      if (!btnRef?.current?.contains(e.target)) {
        setShowAdmin(false);
      }
    };
    document.addEventListener("click", closeDropDown);

    return () => document.removeEventListener("click", closeDropDown);
  }, [setShowAdmin]);
  return (
    <div className="flex cursor-pointer items-center justify-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100 dark:hover:bg-[#242635]">
      <div className="relative z-40">
        <button
          ref={btnRef}
          onClick={() => setShowAdmin((prev) => !prev)}
          className="flex items-center justify-center  rounded-full overflow-hidden focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <span className="text-sm font-medium dark:text-white ml-1">
            {user?.role}
          </span>
        </button>

        {showAdmin && (
          <div
            className={`absolute  w-40 mt-2 py-2 bg-white border rounded shadow-xl ${
              isRTL ? "left-0" : "right-0"
            }`}
          >
            <Link
              to="/admin"
              onClick={() => setShowAdmin(false)}
              className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white"
            >
              {t("dropdown.dashboard")}
            </Link>
            <Link
              to="/admin/orderlist"
              onClick={() => setShowAdmin(false)}
              className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white"
            >
              {t("dashboard.order_list")}
            </Link>

            <Link
              to="/admin/productlist"
              onClick={() => setShowAdmin(false)}
              className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white"
            >
              {t("dropdown.product_list")}
            </Link>
            <Link
              to="/admin/userlist"
              onClick={() => setShowAdmin(false)}
              className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white"
            >
              {t("dashboard.users")}
            </Link>
            <Link
              to="/admin/brandlist"
              onClick={() => setShowAdmin(false)}
              className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white"
            >
              {t("dashboard.brands_list")}
            </Link>
            <Link
              to="/admin/categorylist"
              onClick={() => setShowAdmin(false)}
              className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white"
            >
              {t("dashboard.category_list")}
            </Link>
            <Link
              to="/admin/pendingproduct"
              onClick={() => setShowAdmin(false)}
              className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white"
            >
              {t("dashboard.pending_products")}
            </Link>
            <Link
              to="/profile"
              onClick={() => setShowAdmin(false)}
              className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white"
            >
              {t("dashboard.setting")}
            </Link>
            <div className="py-2">
              <hr></hr>
            </div>
            <button
              //
              className={`transition-colors ${
                isRTL ? "text-right" : "text-left"
              } w-full duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white`}
              onClick={handleLogout}
            >
              {t("dropdown.logout")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
