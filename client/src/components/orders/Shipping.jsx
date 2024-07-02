import { useTranslation } from "react-i18next";
export default function Shipping({ subs, order }) {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex justify-center flex-col md:flex-row flex-col items-stretch max-h-fit  space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
        {/*  */}
        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-[#151725] space-y-6">
          <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
            {t("payment.summary")}
          </h3>
          <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4 ">
            <div className="flex justify-between w-full ">
              <p className="text-base dark:text-white leading-4 text-gray-800">
                {t("order.subtotal")}
              </p>
              <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                ${order?.itemsPrice || subs?.itemsPrice}
              </p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-base dark:text-white leading-4 text-gray-800">
                <div className="flex flex-col justify-between items-between">
                  {t("order.tax")}{" "}
                  <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">
                    +{t("order.vat")}
                  </span>
                </div>
              </p>
              <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                ${order?.itemsPrice || subs?.taxPrice}
              </p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-base dark:text-white leading-4 text-gray-800">
                {t("order.shipping")}
              </p>
              <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                ${order?.shippingPrice || subs?.shippingPrice}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
              {t("order.total")}
            </p>
            <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
              ${order?.totalPrice || subs.totalPrice}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
