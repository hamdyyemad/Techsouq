import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import CustomSpinner from "./CustomSpinner";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const languageSwitcherRef = useRef(null);
  const changeLanguage = async (lang) => {
    setLoading(true);

    await i18n.changeLanguage(lang);

    setLoading(false);
    setShowOptions(false); // Close the dropdown after selecting a language
  };
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleClickOutside = (event) => {
    if (
      languageSwitcherRef.current &&
      !languageSwitcherRef.current.contains(event.target)
    ) {
      setShowOptions(false);
    }
  };
  useEffect(() => {
    const dir = i18n.dir(i18n.language);
    document.documentElement.dir = dir;

    // Add event listener to handle clicks outside the dropdown
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [i18n, i18n.language]);

  return (
    <div
      ref={languageSwitcherRef}
      className={`relative  ${
        loading ? "opacity-50 pointer-events-none" : ""
      } ml-2`}
    >
      <button onClick={toggleOptions}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          className="bi bi-translate dark:text-white pointer"
          viewBox="0 0 16 16"
        >
          <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z" />
          <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31" />
        </svg>
      </button>
      {loading && <CustomSpinner />}
      {showOptions && (
        <div
          className={`absolute top-8  bg-white p-4 shadow-md z-10 ${
            i18n.dir() === "rtl" ? "rtl left-0" : "right-0"
          }`}
        >
          <button
            className="flex justify-center items-center p-1 w-full border-b mb-1"
            onClick={() => changeLanguage("en")}
          >
            <span className="">English</span>
            <img
              src="/flags/usa-flag.svg"
              alt="USA Flag"
              className="w-6 h-6 "
            />
          </button>

          <button
            className="flex justify-center items-center p-1 w-full"
            onClick={() => changeLanguage("ar")}
          >
            <span className="">العربية</span>
            <img
              src="/flags/egypt-flag.svg"
              alt="Egypt Flag"
              className="w-6 h-6 "
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
