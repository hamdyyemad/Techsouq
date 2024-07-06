import { useScreenWidth } from "../../hooks/useScreenWidth.js";
import { useTranslation } from "react-i18next";

import i18n from "../../i18n";
import CustomSpinner from "../CustomSpinner";
import Cart from "../orders/Cart";
import Customer from "./Customer";
import Shipping from "./Shipping";
export default function Summary({
  cart,
  subs,
  user,
  placeOrderHandler,
  isLoading,
}) {
  const isRtl = i18n.dir() === "rtl";
  const isMobile = useScreenWidth();
  const { t } = useTranslation();
  return (
    <div className="bg-gray-100 min-w-full dark:bg-[#1C1E2D] ">
      <div className=" min-w-full justify-center px-6 md:flex md:space-x-6 xl:px-0 xs:p-0">
        <div className="grid grid-cols-5 md:grid-cols-5  w-full h-min xs:grid-cols-1 xs:mx-auto">
          {!isMobile && (
            <div className="flex flex-col justify-start items-start min-w-max space-y-4 md:space-y-6 xl:space-y-8 col-span-4 xs:h-52 xs:w-full">
              <div className="bg-white dark:bg-[#1C1E2D] py-8 px-20 rounded-lg shadow-md border dark:border-[#242635] flex flex-col m-auto z-0 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 dark:scrollbar-thumb-blue-500 dark:scrollbar-track-gray-700">
                <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                  {t("homepage.customer_cart")}
                </p>

                <Cart cart={cart} />
              </div>
              {/*  */}
            </div>
          )}

          <div
            className={`bg-gray-50 dark:bg-[#151725] flex ${
              isRtl ? " mr-auto" : "ml-auto"
            } auto-cols-max auto-rows-max grid-flow-row	  	 justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col min-w-fit xs:mx-auto`}
          >
            <Customer user={user} subs={subs} />
            <Shipping subs={subs} />
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-700 xs:mt-2 mx-auto"
              onClick={placeOrderHandler}
            >
              {t("homepage.placeOrder")}
            </button>
            {isLoading && <CustomSpinner />}
          </div>
        </div>
        {/* Sub total */}
      </div>
    </div>
  );
}
