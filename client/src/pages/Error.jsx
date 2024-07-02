import { Link, useRouteError } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function Error() {
  const error = useRouteError();
  const { t } = useTranslation();
  return (
    <>
      <>
        <div className="h-screen w-fit mx-auto flex items-center bg-white dark:bg-[#1C1E2D]">
          <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
            <div className="max-w-md">
              <div className="text-5xl font-dark font-bold dark:text-white">
                {error?.status}
              </div>
              <p className="text-2xl md:text-3xl font-light leading-normal dark:text-gray-200">
                {"Sorry there's an error, but don't worry."}{" "}
              </p>
              <p className="mb-8 dark:text-gray-400 ">
                {error?.status === 400
                  ? t("error_component.reconnect")
                  : error?.data?.message ||
                    error?.error ||
                    error?.data?.msg ||
                    error?.error ||
                    error?.statusText}
              </p>

              <Link
                to="/"
                className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700"
              >
                back to homepage
              </Link>
            </div>
            <div className="max-w-lg animate-bounce text-red-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-ban-fill h-[200px] w-[200px]"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M2.71 12.584q.328.378.706.707l9.875-9.875a7 7 0 0 0-.707-.707l-9.875 9.875Z" />
              </svg>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
