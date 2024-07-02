// Favorites.jsx
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import EcommerceCard from "../components/EcommerceCard";
import { Link } from "react-router-dom";
import { useRedirect } from "../hooks/useRedirect";
const Favorites = () => {
  useRedirect();
  const favorites = useSelector((store) => store.favorites.favoriteItems);
  const { t } = useTranslation();

  if (favorites?.length === 0) {
    return (
      <div className="grid h-screen px-4 bg-white dark:bg-[#1C1E2D] place-content-center ">
        <div className="text-center flex flex-col justify-center items-center text-[#F7003F]">
          {/* <h1 className="font-black text-gray-200 text-5xl">!</h1> */}
          <div className="animate-jump animate-infinite animate-duration-[2000ms] animate-delay-[2000ms]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              fill="currentColor"
              className="bi bi-heartbreak"
              viewBox="0 0 16 16"
            >
              <path d="M8.931.586 7 3l1.5 4-2 3L8 15C22.534 5.396 13.757-2.21 8.931.586M7.358.77 5.5 3 7 7l-1.5 3 1.815 4.537C-6.533 4.96 2.685-2.467 7.358.77" />
            </svg>
          </div>
          <p className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            {t("favorutes.empty")}
          </p>
          <p className="text-lg font-medium tracking-tight text-gray-700 sm:text-xl dark:text-white mt-1">
            {t("cart.details")} {":)"}
          </p>
          <Link
            to="/products/page/1"
            className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700 mt-5"
          >
            {t("homepage.shop_now")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100 pt-20 overflow-y-auto dark:bg-[#1C1E2D] scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 dark:scrollbar-thumb-blue-500 dark:scrollbar-track-gray-700">
      <h1 className="mb-10 text-center text-2xl font-bold dark:text-white">
        {t("cart.items")}
      </h1>
      <div className="mx-auto max-w-5xl px-6">
        <div className="lg:col-span-3 grid grid-cols-3 p-1">
          {favorites?.map((item) => (
            <div key={item._id} className="mb-6">
              <EcommerceCard product={item} id={item._id} />
            </div>
          ))}
          {/* {cart.map((c, i) => {
            return (
              <CartSummary
                qt={qt}
                key={c._id}
                c={c}
                ind={i}
                setCurrent={setCurrent}
              />
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
