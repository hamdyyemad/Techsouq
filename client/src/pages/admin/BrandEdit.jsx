import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Input, Button, Typography, Card } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useGetBrandDetailsQuery } from "../../slices/productsApiSlice";
import useBrandValidation from "../../hooks/useBrandValidation";

import { BASE_URL } from "../../constants";
import i18n from "../../i18n";
import CustomSpinner from "../../components/CustomSpinner";
export default function BrandEdit() {
  const { t } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const { id } = useParams();
  const [name, setName] = useState("");

  const values = {
    id,
    name,
  };

  const user = useSelector((store) => store.auth.userInfo);
  const token = user.token;
  const headers = {
    Authorization: `Bearer ${token}`,
    authorization: `Bearer ${token}`,
  };

  const { data, isLoading, refetch } = useGetBrandDetailsQuery(id);

  const targetBrand = data?.data?.name;

  const navigate = useNavigate();

  const { formattedBrandName, validateAndSetBrandName } = useBrandValidation();

  const submitHandler = async (e) => {
    e.preventDefault();

    const transformedValues = {
      ...values,
      name: formattedBrandName, // Use the formatted name from the hook
    };

    try {
      if (!transformedValues.name) {
        toast.error("You must enter the brand name");
        return;
      }

      const res = await axios.put(
        `${BASE_URL}/brands/${id}`,
        transformedValues,
        {
          headers: headers,
        }
      );

      toast.success("Brand updated");
      refetch();
      navigate("/admin/brandlist");
    } catch (err) {
      console.log(err?.response?.data?.data);
      toast.error(err?.response?.data?.data || err.error);
    }
  };

  useEffect(() => {
    if (targetBrand) {
      setName(targetBrand || "");
    }
  }, [targetBrand]);

  return (
    <>
      <Link
        to="/admin/brandlist"
        className="dark:text-white mx-auto flex max-w-2xl items-center space-x-2 px-4 pt-5 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        {isRTL ? (
          <>
            <span className="ml-2 dark:text-white">
              {t("admin.back_to_brand_list")}&larr;{" "}
            </span>
          </>
        ) : (
          <>
            &larr;{" "}
            <span className="ml-2 dark:text-white">
              {t("admin.back_to_brand_list")}
            </span>
          </>
        )}
      </Link>
      <Card
        color="transparent"
        shadow={false}
        className="h-screen min-w-max m-auto flex flex-col justify-center items-center overflow-auto xs:m-auto xs:p-0 xs:min-w-screen xs:overflow-x-hidden"
      >
        <form
          onSubmit={submitHandler}
          className="mt-8 mb-2 min-w-max  sm:w-96 h-full xs:w-screen xs:p-3 xs:m-0 "
        >
          <div className="mb-1 gap-6 grid grid-cols-2 auto-rows-auto gap-4 xs:w-48 xs:m-auto xs:grid-cols-1">
            <Typography
              variant="h6"
              color="blue-gray"
              className="dark:text-white -mb-3"
            >
              {t("productlist_tables.BRAND")}
            </Typography>
            <Input
              name="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                validateAndSetBrandName(e.target.value);
              }}
              id="name"
              size="lg"
              placeholder="Brand Name"
              className=" !border-t-blue-gray-200 focus:!border-blue-gray-200 dark:text-white  focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          {isLoading && <CustomSpinner />}
          <Button
            className="mt-6 bg-[#151725] hover:bg-[#151729]"
            fullWidth
            disabled={isLoading}
            type="submit"
            onSubmit={submitHandler}
          >
            {isLoading ? t("update_button.updating") : t("update_button.brand")}
          </Button>
        </form>
      </Card>
    </>
  );
}
