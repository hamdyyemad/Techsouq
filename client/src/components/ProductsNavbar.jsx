import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function ProductsNavbar({ product }) {
  const { t } = useTranslation();
  return (
    <nav aria-label="Breadcrumb">
      <ol
        role="list"
        className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        <li>
          <div className="flex items-center">
            <Link
              to="/"
              className="mr-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {t("filter.home")}
            </Link>
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="currentColor"
              aria-hidden="true"
              className="h-5 w-4 text-gray-300"
            >
              <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
            </svg>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <Link
              to="/products/page/1"
              className="mr-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {t("filter.products")}
            </Link>
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="currentColor"
              aria-hidden="true"
              className="h-5 w-4 text-gray-300"
            >
              <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
            </svg>
          </div>
        </li>

        {product && (
          <li className="text-sm">
            <Link
              to="."
              className="font-medium text-gray-500 hover:text-gray-600 dark:text-white"
            >
              {product.name}
            </Link>
          </li>
        )}
      </ol>
    </nav>
  );
}
