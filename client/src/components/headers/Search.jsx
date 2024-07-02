import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import i18n from "../../i18n";

export default function Search() {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleSearch = () => {
    if (keyword.trim() !== "") {
      // products/search/:keyword/page/:pageNumber
      navigate(`/products/search/${encodeURIComponent(keyword)}/page/1`);
      setKeyword("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="ml-6 flex flex-1 gap-x-3 relative block">
      <input
        type="text"
        className="w-full rounded-md border border-[#DDE2E4] px-3 py-2 text-sm"
        placeholder={i18n.dir() === "rtl" ? "ابحث عن منتج" : "Search a product"}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button
        className={
          i18n.dir() === "rtl"
            ? "rtl absolute left-0 top-0 bottom-0  border text-black px-4 py-2 rounded-md"
            : "absolute right-0 top-0 bottom-0  border text-black px-4 py-2 rounded-md"
        }
        onClick={handleSearch}
      >
        {t("homepage.search")}
      </button>
    </div>
  );
}
