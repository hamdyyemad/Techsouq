import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function CartCheckout({ subs }) {
  const { t } = useTranslation();
  return (
    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 dark:bg-[#151725]">
      <div className="mb-2 flex justify-between">
        <p className="text-gray-700 dark:text-white">{t("order.subtotal")}</p>
        <p className="text-gray-700 dark:text-white">${subs.itemsPrice}</p>
      </div>
      <div className="mb-2 flex justify-between">
        <p className="text-gray-700 dark:text-white">{t("order.shipping")}</p>
        <p className="text-gray-700 dark:text-white">${subs.shippingPrice}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-700 dark:text-white">{t("order.tax")}</p>
        <p className="text-gray-700 dark:text-white">${subs.taxPrice}</p>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold dark:text-white">{t("order.total")}</p>
        <div className="">
          <p className="mb-1 text-lg font-bold dark:text-white">
            ${subs.totalPrice} {t("order.USD")}
          </p>
          <p className="text-sm text-gray-700 dark:text-white">
            {t("order.vat")}
          </p>
        </div>
      </div>
      <Link
        to="/shipping"
        className="block text-center mt-6 w-full rounded-md  py-1.5 font-semibold text-blue-50 bg-blue-500 hover:bg-blue-700 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-700"
      >
        {t("order.checkout")}
      </Link>
    </div>
  );
}
