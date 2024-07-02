import { Link } from "react-router-dom";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";
export default function BackToAllProducts() {
  const { t } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  return (
    <>
      {isRTL ? (
        <Link
          to="/products/page/1"
          className="dark:text-white mx-auto flex max-w-2xl items-center space-x-2 px-4 pt-5 sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <span className="ml-2 dark:text-white">
            {t("products.back")}&larr;{" "}
          </span>
        </Link>
      ) : (
        <Link
          to="/products/page/1"
          className="dark:text-white mx-auto flex max-w-2xl items-center space-x-2 px-4 pt-5 sm:px-6 lg:max-w-7xl lg:px-8"
        >
          &larr;{" "}
          <span className="ml-2 dark:text-white">{t("products.back")}</span>
        </Link>
      )}
    </>
  );
}
