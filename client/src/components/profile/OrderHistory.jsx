import { format } from "date-fns";
import { Link } from "react-router-dom";
import ErrorComponent from "../ErrorComponent";
import CustomSpinner from "../CustomSpinner";
import { useTranslation } from "react-i18next";

export default function OrderHistory({ order, isLoading, error }) {
  const { t } = useTranslation();
  return (
    <div className="overflow-auto max-h-full pb-3 dark:bg-[#1C1E2D]">
      {isLoading ? (
        <CustomSpinner />
      ) : error ? (
        <ErrorComponent />
      ) : (
        <>
          <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4  bg-white shadow-lg px-5 dark:bg-[#1C1E2D]">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
              <span className="text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-cash h-5 m-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                  <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z" />
                </svg>
              </span>
              <span className="tracking-wide dark:text-white">
                {t("order_history.order")}
              </span>
            </div>
          </div>
          <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg dark:bg-[#1C1E2D]">
            <table className="min-w-full dark:bg-[#151725] ">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                    {t("order_history.order_ID")}
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                    {t("order_history.paid")}
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                    {t("order_history.delivered")}
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                    {t("order_history.created_at")}
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                    {t("order_history.paid_at")}
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-[#151725]">
                {order?.map((info) => (
                  <tr key={info._id}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm leading-5 text-gray-800 dark:text-white">
                            {info._id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                      <span
                        className={`relative inline-block px-3 py-1 font-semibold ${
                          info.isPaid ? "text-green-900" : "text-red-900"
                        } leading-tight`}
                      >
                        <span
                          aria-hidden
                          className={`absolute inset-0 ${
                            info.isPaid ? "bg-green-200" : "bg-red-200"
                          } opacity-50 rounded-full`}
                        ></span>
                        <span className="relative text-xs">
                          {info.isPaid ? "paid" : "not paid"}
                        </span>
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                      <span
                        className={`relative inline-block px-3 py-1 font-semibold ${
                          info.isDelivered ? "text-green-900" : "text-red-900"
                        } leading-tight`}
                      >
                        <span
                          aria-hidden
                          className={`absolute inset-0 ${
                            info.isDelivered ? "bg-green-200" : "bg-red-200"
                          } opacity-50 rounded-full`}
                        ></span>
                        <span className="relative text-xs">
                          {info.isDelivered ? "delivered" : "not delivered"}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
                      {info.createdAt &&
                        format(new Date(info.createdAt), "yyyy-MM-dd")}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
                      {info.paidAt &&
                        format(new Date(info.paidAt), "yyyy-MM-dd")}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/order/${info._id}`}
                        className=" flex flex-col items-center justify-center p-1 text-blue-500  transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
