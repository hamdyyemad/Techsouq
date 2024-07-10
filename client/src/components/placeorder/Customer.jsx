import { useTranslation } from "react-i18next";

export default function Customer({ user, subs }) {
  const { t } = useTranslation();
  console.log(subs);
  return (
    <>
      <h3 className="text-xl dark:text-white  font-semibold  text-gray-800">
        {t("homepage.customer")}
      </h3>
      <div className="flex justify-center flex-col md:flex-row  flex-col items-stretch  ">
        <div className="flex flex-col justify-start items-start  ">
          <div className=" flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
            <div className="flex flex-col">
              <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                {user.firstname} {user.lastname}
              </p>
              <p className="cursor-pointer text-sm leading-5 ">{user.email}</p>
              <p className="cursor-pointer text-sm leading-5 text-left">
                {subs?.shippingAddress?.phoneNumber}
              </p>
            </div>
          </div>
          <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8 mt-6">
            <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
              {t("order.shipping_address")}
            </p>
            <p className="w-50 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600 pb-4 border-b border-gray-200">
              {subs?.shippingAddress?.address} /{" "}
              {subs.shippingAddress.selectedCity.label
                ? subs?.shippingAddress?.selectedCity?.label
                : subs?.shippingAddress?.selectedCity}{" "}
              /{" "}
              {subs.shippingAddress.selectedCountry.label
                ? subs?.shippingAddress?.selectedCountry?.label
                : subs?.shippingAddress?.selectedCountry}
            </p>
          </div>
          <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8 mt-6 w-full">
            <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
              {t("payment.payment_method")}
            </p>
            <p className="w-50 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600 pb-4 border-b border-gray-200 w-full">
              {subs.paymentMethod}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
