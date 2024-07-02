import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function Logo() {
  const { t } = useTranslation();
  return (
    <div className="flex items-center xs:flex-col">
      <Link to="/" className="flex  justify-between items-center navbar">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="bi bi-laptop h-6 sm:h-9 mx-2 text-[#151725] dark:text-white transform"
          viewBox="0 0 16 16"
        >
          <path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5" />
        </svg>
        {/* <img src="/assets/logo.svg" alt="Shopify Logo" className="h-6 sm:h-9" /> */}
        <span className="ml-2 font-semibold text-[#252C32] dark:text-white">
          {t("homepage.title")}
        </span>
      </Link>
    </div>
  );
}
