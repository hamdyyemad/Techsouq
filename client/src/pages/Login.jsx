import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  // Form,
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
// import {CustomSpinner} from "../components/CustomSpinner"
import i18n from "../i18n";
function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search, state } = useLocation();

  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();

      const user = res.data;

      dispatch(setCredentials({ ...user }));
      if (userInfo?.role === "ADMIN") {
        navigate("/admin");
        return;
      }
      if (userInfo?.role === "SELLER") {
        navigate("/seller");
        return;
      }
      navigate(redirect);
    } catch (err) {
      console.log(err);
      err?.data?.data?.map((er) => toast.error(er.msg));
      toast.error(err?.data?.message);
    }
  };

  return (
    <Card
      color="transparent"
      shadow={false}
      className="h-screen w-full max-w-xs m-auto flex flex-col  justify-center items-center xs:m-0"
    >
      <Typography variant="h3" color="blue-gray" className="dark:text-white">
        {t("sign_in.title")}
      </Typography>
      <Typography color="gray" className="mt-1 dark:text-white font-normal">
        {t("sign_in.details")}!
      </Typography>
      {state && <p className="text-red-500 text-md ">{state?.message}</p>}
      <form
        onSubmit={submitHandler}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 xs:w-60"
      >
        <div className="mb-1 flex flex-col gap-6 ">
          <div className="flex flex-col xs:mb-2">
            <Typography
              variant="h6"
              color="blue-gray"
              className="dark:text-white xs:mb-1"
            >
              {t("sign_in.email")}
            </Typography>
            <Input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 dark:focus:!border-blue-gray-200 dark:text-white  focus:!border-t-gray-900 "
              labelProps={{
                className: "before:content-none after:content-none ",
              }}
            />
          </div>
          <div className="flex flex-col xs:mb-2">
            <Typography
              variant="h6"
              color="blue-gray"
              className="dark:text-white  "
            >
              {t("sign_in.password")}
            </Typography>
            <Input
              name="password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:focus:!border-blue-gray-200 dark:text-white"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
        </div>
        <div className="mt-3 mb-0">
          <Link
            to="/forget-password"
            className="dark:text-blue-600  font-medium text-gray-900 "
          >
            {t("sign_in.forget_password")}
            {i18n.dir() === "rtl" ? "؟" : "?"}{" "}
          </Link>
        </div>
        <Button
          className="mt-6 dark:bg-[#151725] dark:hover:bg-[#151729]"
          fullWidth
          disabled={isLoading}
          type="submit"
          onSubmit={submitHandler}
        >
          {i18n.dir() === "rtl"
            ? isLoading
              ? "...جاري الدخول"
              : "دخول للحساب"
            : isLoading
            ? "Logging in..."
            : "Log in"}
        </Button>
        <Typography
          color="gray"
          className="dark:text-white mt-4 text-center font-normal"
        >
          {t("sign_in.dont_have_an_account")}
          {i18n.dir() === "rtl" ? "؟" : "?"}{" "}
          <Link
            to="/register"
            className="dark:text-blue-600  font-medium text-gray-900"
          >
            {t("sign_in.sign_up")}
          </Link>
        </Typography>
      </form>
    </Card>
  );
}

export default Login;
