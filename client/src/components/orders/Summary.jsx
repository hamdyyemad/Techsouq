import { PayPalButtons } from "@paypal/react-paypal-js";
import CustomSpinner from "../CustomSpinner";
import Cart from "./Cart";
import Customer from "./Customer";
import Shipping from "./Shipping";
import i18n from "../../i18n";

export default function Summary({
  cart,
  subs,
  user,
  order,
  loadingPay,
  isPending,
  createOrder,
  onApprove,
  onError,
  // loadingDeliver,

  // onApproveTest,
}) {
  const isRtl = i18n.dir() === "rtl";
  return (
    <div className="bg-gray-100 min-w-full max-h-90 overflow-auto dark:bg-[#1C1E2D] ">
      <div className=" min-w-full justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="h-screen w-full ">
          <div className="grid grid-cols-5 md:grid-cols-5  w-full h-min ">
            <div className="flex flex-col justify-start items-start min-w-max space-y-4 md:space-y-6 xl:space-y-8 col-span-4">
              <div
                className={`bg-white dark:bg-[#1C1E2D] py-8 px-20 rounded-lg shadow-md border dark:border-[#242635] flex flex-col m-auto z-0 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 dark:scrollbar-thumb-blue-500 dark:scrollbar-track-gray-700`}
              >
                <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                  Customer’s Cart
                </p>

                <Cart cart={cart} />
              </div>
              {/*  */}
            </div>
            <div
              className={`bg-gray-50 dark:bg-[#151725] flex ${
                isRtl ? " mr-auto" : "ml-auto"
              } auto-cols-max auto-rows-max grid-flow-row	  	 justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col min-w-fit `}
            >
              <Customer user={user} subs={subs} order={order} />
              <Shipping subs={subs} order={order} />

              {!order.isPaid && user.role !== "ADMIN" && (
                <>
                  {loadingPay && <CustomSpinner />}
                  {isPending ? (
                    <CustomSpinner />
                  ) : (
                    <div>
                      {/* <button
                          onClick={onApproveTest}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-700"
                        >
                          test pay order
                        </button> */}
                      <div>
                        <PayPalButtons
                          style={{
                            shape: "rect",
                            layout: "vertical",
                          }}
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                          fundingSource="paypal"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        {/* Sub total */}
      </div>
    </div>
  );
}
