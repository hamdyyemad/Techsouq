import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import axios from "axios";
import { useGetUsersQuery } from "../../slices/userApiSlice";
import CustomSpinner from "../../components/CustomSpinner";
import ErrorComponent from "../../components/ErrorComponent";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Card } from "@material-tailwind/react";
import { BASE_URL } from "../../constants";

export default function UserList() {
  const { t } = useTranslation();
  const { data: u, isLoading, error, refetch } = useGetUsersQuery();
  const users = u?.data?.users || [];

  //   const product = products?.data?.products;

  const user = useSelector((store) => store.auth.userInfo);
  const token = user.token;
  const headers = {
    Authorization: `Bearer ${token}`,
    authorization: `Bearer ${token}`,
  };

  const deleteUserHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        // Use the product ID to construct the URL
        const url = `${BASE_URL}/users/${id}`;

        // Send the DELETE request
        const res = await axios.delete(url, { headers });

        // Refetch the products after deletion
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <div className="min-w-fit max-h-min my-3 ml-5">
      {isLoading ? (
        <CustomSpinner />
      ) : error ? (
        <ErrorComponent />
      ) : (
        <>
          <div className="relative  shadow-md sm:rounded-lg flex justify-start items-end flex-col">
            <button
              onClick={() => refetch()}
              className="flex items-center m-2 text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            >
              <svg
                className="w-5 h-5 mx-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" />
              </svg>

              <span className="mx-1">{t("productlist_tables.REFRESH")}</span>
            </button>
            <Card className="h-full w-full overflow-y-auto max-h-96">
              <table className="w-full min-w-max table-auto text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {/* <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th> */}
                    <th scope="col" className="px-6 py-3">
                      {t("productlist_tables.ID")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("productlist_tables.FULLNAME")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("register.email")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("productlist_tables.ROLE")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">
                        {t("productlist_tables.EDIT")}
                      </span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">
                        {t("productlist_tables.DELETE")}
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* <td className="w-4 p-4">
                  <div className="flex items-center">
                  <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                  htmlFor="checkbox-table-search-1"
                  className="sr-only"
                    >
                      checkbox
                    </label>
                    </div>
                </td> */}
                  {users?.map((p) => (
                    <tr
                      key={p._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4">{p._id}</td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                      >
                        {p?.firstname || ""} {p?.lastname || ""}
                      </th>
                      <td className="px-6 py-4">{p.email}</td>
                      <td className="px-6 py-4">{p.role}</td>
                      {p.role === "ADMIN" ? (
                        <>
                          <td className="px-6 py-4"></td>
                          <td className="px-6 py-4"></td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4 text-right">
                            <Link
                              to={`/admin/user/${p._id}/edit`}
                              className="font-medium text-blue-500 hover:underline"
                            >
                              {t("productlist_tables.EDIT")}
                            </Link>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => deleteUserHandler(p._id)}
                              className="pointer font-medium text-red-600 dark:text-blue-red hover:underline"
                            >
                              {t("productlist_tables.DELETE")}
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
