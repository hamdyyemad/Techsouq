import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import CustomSpinner from "../../components/CustomSpinner";
import ErrorComponent from "../../components/ErrorComponent";
import { Card } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useGetCategoryQuery } from "../../slices/productsApiSlice";
import { BASE_URL } from "../../constants";
export default function CategoryList() {
  const { t } = useTranslation();
  const { data, isLoading, error, refetch } = useGetCategoryQuery();
  const category = data?.data?.listOfCategories;
  console.log(data);

  const user = useSelector((store) => store.auth.userInfo);
  const token = user.token;
  const headers = {
    Authorization: `Bearer ${token}`,
    authorization: `Bearer ${token}`,
  };

  const createCategoryHandler = async () => {
    if (window.confirm("Are you sure you want to create a new category?")) {
      try {
        const defaultBrandName = "Sample Category";
        const response = await axios.post(
          `${BASE_URL}/categories`,
          { name: defaultBrandName },
          { headers }
        );

        refetch();
        console.log(response);
      } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message || err.message);
      }
    }
  };
  const deleteCategoryHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const url = `${BASE_URL}/categories/${id}`;
        await axios.delete(url, { headers });
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
          <div className="relative shadow-md sm:rounded-lg flex justify-start items-end flex-col">
            <button
              type="button"
              onClick={createCategoryHandler}
              className=" m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {t("productlist_tables.ADD_CATEGORY")}
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

            <Card className="h-full w-full overflow-y-auto max-h-96">
              <table className="w-full min-w-max table-auto text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      {t("productlist_tables.ID")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("productlist_tables.CATEGORY_NAME")}
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
                  {category?.map((category) => (
                    <tr
                      key={category._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4">{category._id}</td>
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {category.name}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          to={`/admin/category/${category._id}/edit`}
                          className="font-medium text-blue-500 hover:underline"
                        >
                          {t("productlist_tables.EDIT")}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => deleteCategoryHandler(category._id)}
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
