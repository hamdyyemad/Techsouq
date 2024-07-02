import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
export default function CartButton({ cart }) {
  const { t } = useTranslation();
  return (
    <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100 dark:hover:bg-[#242635]">
      <Link to="/cart" className="flex items-center gap-x-1">
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white ">
            {cart?.length}
          </span>
        </div>
        <span className="text-sm font-medium dark:text-white">
          {t("homepage.cart")}
        </span>
      </Link>
    </div>
  );
}
