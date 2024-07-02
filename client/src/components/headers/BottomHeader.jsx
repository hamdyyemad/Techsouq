import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher";
import DarkModeBtn from "./DarkModeBtn";
import CategoryDropDown from "./CategoryDropDown";
import { useScreenWidth } from "../../hooks/useScreenWidth";

// import CartButton from "./CartButton";
// import FavoritesButton from "./FavoritesButton";
import MobileCartIcon from "./MobileCartIcon";

export default function BottomHeader({ setIsDarkMode }) {
  const { t } = useTranslation();
  const isMobile = useScreenWidth();

  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="flex gap-x-8">
        <CategoryDropDown />
        <Link
          to="/products/page/1"
          className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-[#242635] xs:hidden"
        >
          <span className="relative text-sm font-medium w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left dark:text-white dark:after:bg-white">
            {t("homepage.new_releases")}
          </span>
        </Link>
        <Link
          to="/products/page/1?sort=-rating"
          className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-[#242635] xs:hidden"
        >
          <span className="relative text-sm font-medium w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left dark:text-white dark:after:bg-white">
            {t("homepage.highest_rating")}
          </span>
        </Link>
        <Link
          to="/products/page/1?sort=price"
          className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-[#242635] xs:hidden"
        >
          <span className="relative text-sm font-medium w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left dark:text-white dark:after:bg-white">
            {t("homepage.lowest_price")}
          </span>
        </Link>
      </div>
      <div className="grid grid-cols-2 items-between justify-between xs:grid-cols-2">
        <LanguageSwitcher />
        {isMobile && <MobileCartIcon />}
        {/* {isMobile && <CartButton cart={cart} />} */}
        {/* {isMobile && <FavoritesButton />} */}
        {!isMobile && <DarkModeBtn setIsDarkMode={setIsDarkMode} />}
      </div>
    </div>
  );
}
