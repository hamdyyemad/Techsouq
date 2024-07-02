import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useRedirect } from "../hooks/useRedirect";
import { useTranslation } from "react-i18next";

import CartSummary from "../components/cart/CartSummary";
import CartCheckout from "../components/cart/CartCheckout";
export default function Cart() {
  const cart = useSelector((store) => store.cart.cardItems);
  const subs = useSelector((store) => store.cart);
  const [current, setCurrent] = useState(0);
  const [qt] = useState(cart[current]?.qty || 1);
  const { t } = useTranslation();
  useRedirect();
  if (subs.cardItems.length <= 0) {
    return (
      <div className="grid h-screen px-4 bg-white dark:bg-[#1C1E2D] place-content-center ">
        <div className="text-center flex flex-col justify-center items-center dark:text-white">
          {/* <h1 className="font-black text-gray-200 text-5xl">!</h1> */}
          <div className="animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              fill="currentColor"
              className="bi bi-cart-x my-2"
              viewBox="0 0 16 16"
            >
              <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793z" />
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
            </svg>
          </div>
          <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            {t("cart.empty")}
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
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cart.map((c, i) => {
            return (
              <CartSummary
                qt={qt}
                key={c._id}
                c={c}
                ind={i}
                setCurrent={setCurrent}
              />
            );
          })}
        </div>
        {/* Sub total */}
        <CartCheckout subs={subs} />
      </div>
    </div>
  );
}
