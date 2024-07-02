import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
export default function FavoritesButton() {
  const { t } = useTranslation();
  return (
    <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100">
      <Link to="/favorites" className="flex items-center gap-x-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
        </svg>

        <span className="text-sm font-medium dark:text-white">
          {t("favorutes.favorite")}
        </span>
      </Link>
    </div>
  );
}
