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
        <div className="h-screen w-full ">
          <div className="grid grid-cols-5 md:grid-cols-5  w-full h-min ">
            {!isMobile && (
              <div className="flex flex-col justify-start items-start min-w-max space-y-4 md:space-y-6 xl:space-y-8 col-span-4">
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
              } auto-cols-max auto-rows-max grid-flow-row justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ${
                isMobile ? "w-screen h-screen" : "min-w-fit"
              } `}
            >
              <Customer user={user} subs={subs} />
              <Shipping subs={subs} />
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-700"
                onClick={placeOrderHandler}
              >
                {t("homepage.placeOrder")}
              </button>
              {isLoading && <CustomSpinner />}
            </div>
          </div>
        </div>
        {/* Sub total */}
      </div>
    </div>
  );
}
// function Cart({ cart }) {
//   const mappedElements = cart.map((c) => (
//     <div key={c._id}>
//       <div className="mt-6 md:mt-0 flex justify-start flex-col md:flex-row items-start md:items-center space-y-4 md:space-x-6 xl:space-x-8 w-full py-4 border-b border-gray-200">
//         <div className="w-full md:w-40">
//           <img className="w-full hidden md:block" src={c.image} alt={c.name} />
//         </div>
//         <div className="flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0">
//           <div className="w-full flex flex-col justify-start items-start space-y-8">
//             <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
//               {c.name}
//             </h3>
//             <div className="flex justify-start items-start flex-col space-y-2">
//               <p className="text-sm dark:text-white leading-none text-gray-800">
//                 <span className="dark:text-gray-400 text-gray-300">
//                   Brand:{" "}
//                 </span>{" "}
//                 {c.brand}
//               </p>
//               <p className="text-sm dark:text-white leading-none text-gray-800">
//                 <span className="dark:text-gray-400 text-gray-300">
//                   Category:{" "}
//                 </span>{" "}
//                 {c.category}
//               </p>
//             </div>
//           </div>
//           <div className="flex justify-between space-x-8 items-start w-full">
//             <p className="text-base dark:text-white xl:text-lg leading-6">
//               ${c.price}{" "}
//             </p>
//             <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
//               {c.qty}
//             </p>
//             <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
//               ${(c.price * c.qty).toFixed(2)}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   ));
//   return mappedElements;
// }
