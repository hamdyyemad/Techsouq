import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../slices/cartSlice";
import { useTranslation } from "react-i18next";
export default function Payment() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const { t } = useTranslation();
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const dispatch = useDispatch();

  function paypalHandler() {
    dispatch(savePaymentMethod("PayPal"));
    navigate("/placeorder");
  }
  return (
    <div className="bg-gray-100 dark:bg-[#1C1E2D] h-screen w-full">
      <div className="w-full max-w-3xl mx-auto p-8">
        <div className="bg-white dark:bg-[#1C1E2D] p-8 rounded-lg shadow-md border dark:border-[#242635] flex flex-col">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {t("order.payment")}
          </h1>
          <ShippingSteps />
          <div className="mt-8 flex justify-center items-center">
            <button
              type="submit"
              className="items-center text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mr-2 mb-2"
              onClick={paypalHandler}
            >
              <svg
                className="mr-2 -ml-1 w-4 h-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="paypal"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"
                ></path>
              </svg>
              <span className="px-1">{t("order.check_out_with_payPal")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function ShippingSteps() {
  return (
    <div className="flex items-center justify-center mb-3">
      <Link
        to="/cart"
        className="flex text-sm text-blue-500 focus:outline-none"
      >
        <span className="flex items-center justify-center text-white bg-blue-500 rounded-full h-5 w-5 mr-2">
          1
        </span>{" "}
        Cart
      </Link>
      <Link
        to="/shipping"
        className="flex text-sm text-blue-500 ml-8 focus:outline-none"
      >
        <span className="flex items-center justify-center text-white bg-blue-500 rounded-full h-5 w-5 mr-2">
          2
        </span>{" "}
        Shipping
      </Link>
      <button
        className="flex text-sm text-gray-700 ml-8 focus:outline-none"
        disabled
      >
        <span className="flex items-center justify-center border-2 border-blue-500 rounded-full h-5 w-5 mr-2">
          3
        </span>{" "}
        Payments
      </button>
      <button
        className="flex text-sm text-gray-500 ml-8 focus:outline-none"
        disabled
      >
        <span className="flex items-center justify-center border-2 border-gray-500 rounded-full h-5 w-5 mr-2">
          4
        </span>{" "}
        Place Order
      </button>
    </div>
  );
}

// function PaymentInfo() {
//   return (
//     <div>
//       <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
//         Payment Information
//       </h2>
//       <div className="mt-4">
//         <label
//           htmlFor="card_number"
//           className="block text-gray-700 dark:text-white mb-1"
//         >
//           Card Number
//         </label>
//         <input
//           type="text"
//           id="card_number"
//           className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-4 mt-4">
//         <div>
//           <label
//             htmlFor="exp_date"
//             className="block text-gray-700 dark:text-white mb-1"
//           >
//             Expiration Date
//           </label>
//           <input
//             type="text"
//             id="exp_date"
//             className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
//           />
//         </div>
//         <div>
//           <label
//             htmlFor="cvv"
//             className="block text-gray-700 dark:text-white mb-1"
//           >
//             CVV
//           </label>
//           <input
//             type="text"
//             id="cvv"
//             className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
