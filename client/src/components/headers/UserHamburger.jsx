import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useScreenWidth } from "../../hooks/useScreenWidth";
import { Disclosure } from "@headlessui/react";
import i18n from "../../i18n";

export default function UserHamburger({
  user,
  setShowProfile,
  showProfile,
  handleLogout,
}) {
  const { t } = useTranslation();
  const isMobile = useScreenWidth();
  const isRTL = i18n.dir() === "rtl";

  if (isMobile) {
    return (
      <Disclosure
        as="div"
        className="relative flex items-center justify-center cursor-pointer dark:text-white"
      >
        {({ open, close }) => (
          <>
            <Disclosure.Button>
              {open ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-x-lg h-6 w-6"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className={`bi bi-list h-7 w-7 `}
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                </svg>
              )}
            </Disclosure.Button>

            {isMobile && (
              <Disclosure.Panel
                className={`absolute top-4 ${
                  isRTL ? "left-0" : "right-0"
                } mt-2 w-40 bg-white border rounded shadow-xl z-10`}
              >
                {user?.token ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={close}
                      className="block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white text-center"
                    >
                      {t("homepage.profile")}
                    </Link>
                    <Link
                      to="/cart"
                      onClick={close}
                      className="block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white text-center"
                    >
                      {t("homepage.cart")}
                    </Link>
                    <Link
                      to="/favorites"
                      onClick={close}
                      className="block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white text-center"
                    >
                      {t("favorutes.favorite")}
                    </Link>
                    <div className="py-2">
                      <hr />
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        close();
                      }}
                      className="block w-full px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white"
                    >
                      {t("homepage.logout")}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/register"
                      onClick={close}
                      className="block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white text-center"
                    >
                      {t("homepage.create_an_account")}
                    </Link>
                    <div className="py-2">
                      <hr />
                    </div>
                    <Link
                      to="/login"
                      onClick={close}
                      className="block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white text-center"
                    >
                      {t("homepage.sign_in")}
                    </Link>
                  </>
                )}
              </Disclosure.Panel>
            )}
          </>
        )}
      </Disclosure>
    );
  }

  return (
    <>
      {user?.token ? (
        <div className="flex cursor-pointer items-center justify-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100 dark:hover:bg-[#242635]">
          <div className="relative z-40">
            <button
              onClick={() => setShowProfile((prev) => !prev)}
              className="flex items-center justify-center rounded-full overflow-hidden focus:outline-none"
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
                {user?.firstname} {user?.lastname}
              </span>
            </button>

            {showProfile && (
              <div
                className={
                  isRTL
                    ? "rtl absolute left-0 w-40 mt-2 py-2 bg-white border rounded shadow-xl"
                    : "absolute right-0 w-40 mt-2 py-2 bg-white border rounded shadow-xl"
                }
              >
                <Link
                  to="/profile"
                  onClick={() => setShowProfile((prev) => !prev)}
                  className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white"
                >
                  {t("homepage.profile")}
                </Link>
                <div className="py-2">
                  <hr></hr>
                </div>
                <button
                  onClick={handleLogout}
                  className="transition-colors text-left w-full duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white"
                >
                  {t("homepage.logout")}
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <Link to="/register">
            <div className="ml-2 flex cursor-pointer items-center gap-x-1 border-r py-2 px-4 hover:">
              <span className="relative text-sm font-medium w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left dark:text-white dark:after:bg-white">
                {t("homepage.create_an_account")}
              </span>
            </div>
          </Link>
          <Link to="/login">
            <div className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 hover:bg-gray-100 dark:hover:bg-[#242635]">
              <span className="text-sm font-medium dark:text-white ">
                {t("homepage.sign_in")}
              </span>
            </div>
          </Link>
        </>
      )}
    </>
  );
}
