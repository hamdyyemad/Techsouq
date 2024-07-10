import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  // Form,
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useGetUserDetailsQuery } from "../../slices/userApiSlice";

import i18n from "../../i18n";
import { BASE_URL } from "../../constants";
import CustomSpinner from "../../components/CustomSpinner";

export default function UserEdit() {
  const { t } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const { id } = useParams();

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const values = {
    id,
    firstname,
    lastname,
    email,
    role,
  };
  const user = useSelector((store) => store.auth.userInfo);
  const token = user.token;
  const headers = {
    Authorization: `Bearer ${token}`,
    authorization: `Bearer ${token}`,
  };

  const {
    data,
    isLoading,
    refetch,
    // error,
  } = useGetUserDetailsQuery(id);

  const targetUser = data?.data?.user;
  //   const product = {};
  const navigate = useNavigate();
  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const transformedValues = {
      ...values,
      firstname: capitalizeWords(firstname),
      lastname: capitalizeWords(lastname),
      email: email,
      role: role,
    };

    try {
      if (
        !transformedValues.lastname ||
        !transformedValues.firstname ||
        !transformedValues.email ||
        !transformedValues.role
      ) {
        toast.error("You must enter data first");
        return;
      }
      const res = await axios.put(
        `${BASE_URL}/users/${id}`,
        transformedValues,
        {
          headers: headers,
        }
      );

      toast.success("User updated");
      refetch();
      navigate("/admin/userlist");
    } catch (err) {
      console.log(err?.response?.data?.data);
      toast.error(err?.response?.data?.data || err.error);
    }
  };
  useEffect(() => {
    if (targetUser) {
      setFirstName(targetUser.firstname || "");
      setLastName(targetUser.lastname || "");
      setRole(targetUser.role || "");
      setEmail(targetUser.email || "");
    }
  }, [targetUser]);
  return (
    <>
      <Link
        to="/admin/userlist"
        relative="path"
        className="dark:text-white mx-auto flex max-w-2xl items-center space-x-2 px-4 pt-5 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        {isRTL ? (
          <>
            <span className="ml-2 dark:text-white">
              {t("admin.back_to_user_list")}&larr;{" "}
            </span>
          </>
        ) : (
          <>
            &larr;{" "}
            <span className="ml-2 dark:text-white">
              {t("admin.back_to_user_list")}
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
              {t("register.first_Name")}
            </Typography>
            <Input
              name="firstname"
              type="text"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              id="firstname"
              size="lg"
              placeholder="John"
              className=" !border-t-blue-gray-200 focus:!border-blue-gray-200 dark:text-white  focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography
              variant="h6"
              color="blue-gray"
              className="dark:text-white -mb-3"
            >
              {t("register.last_Name")}
            </Typography>
            <Input
              name="lastname"
              type="text"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              id="lastname"
              size="lg"
              placeholder="Doe"
              className=" !border-t-blue-gray-200 focus:!border-blue-gray-200 dark:text-white  focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Typography
              variant="h6"
              color="blue-gray"
              className="dark:text-white -mb-3"
            >
              {t("register.email")}
            </Typography>
            <Input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              size="lg"
              placeholder="email@email.com"
              className=" !border-t-blue-gray-200 focus:!border-blue-gray-200 dark:text-white  focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography
              variant="h6"
              color="blue-gray"
              className="dark:text-white -mb-3"
            >
              {t("register.role")}
            </Typography>
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              id="role"
              className="!border-t-blue-gray-200 focus:!border-blue-gray-200 dark:text-white focus:!border-t-gray-900 dark:bg-[#1C1E2D] "
            >
              <option value="" disabled>
                {t("register.role")}
              </option>
              <option value="USER">{t("register.seller")}</option>
              <option value="ADMIN">{t("register.admin")}</option>
              <option value="SELLER">{t("register.buyer")}</option>
            </select>
          </div>

          {isLoading && <CustomSpinner />}
          <Button
            className="mt-6 bg-[#151725] hover:bg-[#151729]"
            fullWidth
            disabled={isLoading}
            type="submit"
            onSubmit={submitHandler}
          >
            {isLoading ? t("update_button.updating") : t("update_button.user")}
          </Button>
        </form>
      </Card>
    </>
  );
}
