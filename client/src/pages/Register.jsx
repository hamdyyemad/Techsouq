import axios from "axios";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  useLocation,
  useNavigate,
  Link,
  useNavigation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import i18n from "../i18n";
import { BASE_URL } from "../constants";
function Register() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [selectedRole, setSelectedRole] = useState("USER");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const validateName = (value) => {
    // Validate that the input contains only letters and no whitespace
    const isValid = /^[a-zA-Z]+$/.test(value);
    return isValid || "Invalid input";
  };

  const validateEmail = (value) => {
    // Validate that the input is a valid email and contains no whitespace
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    return isValid || "Invalid email address";
  };
  const onSubmit = async (values) => {
    try {
      values.firstname =
        values.firstname.charAt(0).toUpperCase() + values.firstname.slice(1);
      values.lastname =
        values.lastname.charAt(0).toUpperCase() + values.lastname.slice(1);

      await axios.post(`${BASE_URL}/users/register`, values);
      toast.success("Please check your inbox");
      return navigate("/login");
    } catch (err) {
      setErr(err?.response?.data?.message || err?.response?.data);
      toast.error(err?.response?.data?.message || err?.response?.data);
      console.log(err);
    }
  };
  return (
    <Card
      color="transparent"
      shadow={false}
      className="h-screen w-full max-w-xs m-auto flex flex-col  justify-center items-center xs:mt-10 xs:p-10"
    >
      <Typography variant="h4" color="blue-gray" className="dark:text-white">
        {t("register.title")}
      </Typography>
      <Typography color="gray" className="mt-1 font-normal dark:text-white">
        {t("register.details")}
      </Typography>
      {err && <p className="text-red-500 text-xs italic">{err}</p>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 mb-2 w-80 min-w-screen-lg sm:w-96 xs:w-60"
      >
        <div className="grid md:grid-cols-2 md:gap-6 ">
          <div className="mb-3  relative z-0 max-w-[50%] sm:min-w-full xs:min-w-full group">
            <div className="min-w-full">
              <Typography
                variant="h6"
                color="blue-gray"
                className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500 dark:text-white"
              >
                {t("register.first_Name")}
              </Typography>

              <Input
                name="firstname"
                type="firstname"
                id="firstname"
                size="md"
                placeholder="First Name"
                {...register("firstname", {
                  required: "Required",
                  validate: validateName,
                })}
                onBlur={(e) => {
                  e.target.value = e.target.value.trim(); // Trim whitespace on blur
                }}
                aria-invalid={errors.firstname ? "true" : "false"}
                className={
                  " !border-t-blue-gray-200 focus:!border-t-gray-900 dark:focus:!border-blue-gray-200 dark:text-white w-[90%] sm:min-w-full xs:min-w-full"
                }
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />

              {errors.firstname?.type === "validate" && (
                <p
                  className="m-0 visible peer-invalid:visible text-pink-600 text-sm"
                  role="alert"
                >
                  {errors.firstname.message}
                </p>
              )}
            </div>
          </div>

          {/* Repeat similar structure for other inputs */}

          <div className="mb-3  relative z-0 max-w-[50%] sm:min-w-full xs:min-w-full group ">
            <div className="min-w-min flex flex-col justify-center">
              <Typography
                variant="h6"
                color="blue-gray"
                className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500 dark:text-white "
              >
                {t("register.last_Name")}
              </Typography>

              <Input
                name="lastname"
                type="lastname"
                id="lastname"
                size="md"
                placeholder="Last name"
                {...register("lastname", {
                  required: "Required",
                  validate: validateName,
                })}
                onBlur={(e) => {
                  e.target.value = e.target.value.trim(); // Trim whitespace on blur
                }}
                aria-invalid={errors.lastname ? "true" : "false"}
                className={
                  " !border-t-blue-gray-200 focus:!border-t-gray-900 dark:focus:!border-blue-gray-200 dark:text-white md:w-[90%] xs:min-w-full "
                }
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />

              {errors.lastname?.type === "validate" && (
                <p
                  className="m-0 visible peer-invalid:visible text-pink-600 text-sm"
                  role="alert"
                >
                  {errors.lastname.message}
                </p>
              )}
            </div>
          </div>

          {/* Repeat similar structure for other inputs */}
        </div>

        <div className="mb-3 flex flex-col gap-6">
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500 dark:text-white"
            >
              {t("register.email")}
            </Typography>
            <Input
              name="email"
              type="email"
              id="email"
              size="lg"
              {...register("email", {
                required: "Required",
                validate: validateEmail,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
              onBlur={(e) => {
                e.target.value = e.target.value.trim(); //

                //  Trim whitespace on blur
              }}
              aria-invalid={errors.email ? "true" : "false"}
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:focus:!border-blue-gray-200 dark:text-white"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.email && (
              <p
                className="m-0 p-0 visible peer-invalid:visible text-pink-600 text-sm"
                role="alert"
              >
                {errors?.email?.message}
              </p>
            )}
          </div>
        </div>

        {/* Repeat similar structure for other inputs */}

        <div className="mb-3 flex flex-col gap-6 ">
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500 dark:text-white"
            >
              {t("register.password")}
            </Typography>
            <Input
              name="password"
              id="password"
              type="password"
              size="lg"
              {...register("password", {
                required: "Required",
                pattern: {
                  value:
                    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
                  message:
                    "Password requirements: 8-20 characters, 1 number, 1 letter, 1 symbol.",
                },
              })}
              aria-invalid={errors.password ? "true" : "false"}
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:focus:!border-blue-gray-200 dark:text-white "
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.password && (
              <p
                className="m-0 visible peer-invalid:visible text-pink-600 text-sm "
                role="alert"
              >
                {errors?.password?.message}
              </p>
            )}
          </div>
        </div>
        <div className="mb-3 flex flex-col gap-6">
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500 dark:text-white"
            >
              {t("register.role")}
            </Typography>
            <select
              {...register("role", { required: "Required" })}
              className={`bg-white w-full border p-3 !border-t-blue-gray-200 focus:!border-blue-gray-200 dark:text-white focus:!border-t-gray-900 dark:bg-[#1C1E2D] ${
                i18n.dir() === "rtl" ? "text-right pr-8" : ""
              }`}
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="USER">{t("register.buyer")}</option>
              <option value="SELLER">{t("register.seller")}</option>
            </select>
            {errors.role && (
              <p
                className="m-0 visible peer-invalid:visible text-pink-600 text-sm"
                role="alert"
              >
                {errors?.role?.message}
              </p>
            )}
          </div>
        </div>
        <Button
          className="mt-6 dark:bg-[#151725] dark:hover:bg-[#151729]"
          fullWidth
          disabled={navigation.state === "submitting"}
          type="submit"
        >
          {i18n.dir() === "rtl"
            ? navigation.state === "submitting"
              ? "...جاري تسجيل الحساب"
              : "سجل الحساب"
            : navigation.state === "submitting"
            ? "Register in..."
            : "Register"}
        </Button>
        <Typography
          color="gray"
          className="mt-4 text-center font-normal dark:text-white xs:p-3 xs:m-auto"
        >
          {t("register.already_have_an_account")}
          {i18n.dir() === "rtl" ? "؟" : "?"}{" "}
          <Link
            to="/login"
            className="dark:text-blue-600 font-medium text-gray-900"
          >
            {t("register.sign_in")}
          </Link>
        </Typography>
      </form>
    </Card>
  );
}

export default Register;
