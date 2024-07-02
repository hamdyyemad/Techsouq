import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import i18n from "../i18n";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-white border shadow dark:bg-[#242635] bottom-0 z-1000 dark:border-none">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <Link href="/" className="hover:underline">
            TechSouq™
          </Link>
          . {t("homepage.rights")}.
        </span>
        <ul className="ml-3 flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link
              to="/"
              className={
                i18n.dir() === "rtl"
                  ? "rtl ml-4 hover:underline md:mr-6"
                  : "mr-4 hover:underline md:mr-6"
              }
            >
              {t("homepage.about")}
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:underline">
              {t("homepage.contact")}
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
