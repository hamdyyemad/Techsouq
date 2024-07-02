import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function NotFound() {
  const { t } = useTranslation();
  return (
    <>
      <div className="h-screen w-fit mx-auto flex items-center bg-white dark:bg-[#1C1E2D]">
        <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700 xs:p-20 xs:flex-row">
          <div className="max-w-md xs:max-w-screen xs:p-10">
            <div className="text-5xl font-dark font-bold dark:text-white">
              404
            </div>
            <p className="text-2xl md:text-3xl font-light leading-normal dark:text-gray-200 mb-5">
              {t("error_component.page_not_exist")}.
            </p>

            <Link
              to="/"
              className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700 xs:px-10 xs:m-auto xs:flex"
            >
              {t("error_component.go_home")}.
            </Link>
          </div>
          <div className="max-w-lg animate-bounce text-red-700 px-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-ban-fill h-[200px] w-[200px] xs:h-[100px] xs:w-[100px]"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M2.71 12.584q.328.378.706.707l9.875-9.875a7 7 0 0 0-.707-.707l-9.875 9.875Z" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
