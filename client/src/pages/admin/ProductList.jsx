import axios from "axios";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Card } from "@material-tailwind/react";
import { BASE_URL } from "../../constants";
import CustomSpinner from "../../components/CustomSpinner";
import ErrorComponent from "../../components/ErrorComponent";
export default function ProductList() {
  const { t } = useTranslation();
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const product = products?.data?.products;

  const user = useSelector((store) => store.auth.userInfo);
  const token = user.token;
  const headers = {
    Authorization: `Bearer ${token}`,
    authorization: `Bearer ${token}`,
  };
  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        const res = await axios.post(`${BASE_URL}/products`, null, {
          headers: headers,
        });
        console.log(res);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  const deleteProductHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        // Use the product ID to construct the URL
        const url = `${BASE_URL}/products/${id}`;

        // Send the DELETE request
        const res = await axios.delete(url, { headers });

        console.log(res);

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
              type="button"
              onClick={createProductHandler}
              className=" m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {t("productlist_tables.Add_Product")}
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path stroke="currentColor" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </button>

            {/* <div className="p-4">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
              />
            </div>
          </div> */}
            <Card className="h-full w-full overflow-y-auto max-h-96">
              {" "}
              {/* Set max height here */}
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
                      {t("productlist_tables.PRODUCT_NAME")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("productlist_tables.BRAND")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("productlist_tables.CATEGORY")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("productlist_tables.PRICE")}
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
                  {product?.map((p) => (
                    <tr
                      key={p._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4">
                        <Link
                          className="text-blue-600"
                          to={`/products/${p._id}`}
                        >
                          {p._id}
                        </Link>
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                      >
                        {p.name}
                      </th>
                      <td className="px-6 py-4">{p.brand}</td>
                      <td className="px-6 py-4">{p.category}</td>
                      <td className="px-6 py-4">${p.price}</td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          to={`/admin/product/${p._id}/edit`}
                          className="font-medium text-blue-500 hover:underline"
                        >
                          {t("productlist_tables.EDIT")}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => deleteProductHandler(p._id)}
                          className="pointer font-medium text-red-600 dark:text-blue-red hover:underline"
                        >
                          {t("productlist_tables.DELETE")}
                        </button>
                      </td>
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
