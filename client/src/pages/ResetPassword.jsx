import { Button, Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { BASE_URL } from "../constants";
import CustomSpinner from "../components/CustomSpinner";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [userId, setUserId] = useState("");
  // const [token, setToken] = useState("");
  const { userId, token } = useParams(); // Use useParams to get userId and token from URL
  const { t } = useTranslation();
  const navigate = useNavigate();
  // useEffect(() => {
  //   // Retrieve data from cookies
  //   const userId = document.cookie.replace(
  //     /(?:(?:^|.*;\s*)resetUserId\s*=\s*([^;]*).*$)|^.*$/,
  //     "$1"
  //   );
  //   const token = document.cookie.replace(
  //     /(?:(?:^|.*;\s*)resetToken\s*=\s*([^;]*).*$)|^.*$/,
  //     "$1"
  //   );

  //   // Use userId and token as needed for your reset password logic
  //   console.log(document.cookie);
  //   setUserId(userId);
  //   setToken(token);
  // }, []);
  console.log("token is" + token);
  console.log("userId is" + userId);
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      toast.error("Field is empty");
      return;
    }

    try {
      setIsLoading(true);
      // /users/reset-password/:id/:token
      const response = await fetch(
        `${BASE_URL}/users/reset-password/${userId}/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );
      setIsLoading(false);
      if (response.ok) {
        // Handle success, show a message to the user
        toast.success("Password reset link sent successfully");
        console.log("Password reset link sent successfully");
        navigate("/login");
      } else {
        // Handle error, show an error message to the user
        console.error("Failed to send reset password link");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Card
      color="transparent"
      shadow={false}
      className="h-screen w-full max-w-xs m-auto flex flex-col  justify-center items-center"
    >
      {isLoading && <CustomSpinner />}
      {/* <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300"> */}
      <Typography variant="h3" color="blue-gray" className="dark:text-white">
        {t("reset_password.reset")}
      </Typography>
      <Typography color="gray" className="mt-1 dark:text-white font-normal">
        {t("reset_password.fill2")}
      </Typography>

      <form
        onSubmit={(e) => handleResetPassword(e)}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 xs:w-60"
      >
        <div className="flex flex-col space-y-5">
          <label htmlFor="password">
            <p className="font-medium text-slate-700 pb-2 dark:text-white">
              Password
            </p>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder={t("reset_password.enter2")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <Button
            fullWidth
            type="submit"
            onSubmit={(e) => handleResetPassword(e)}
            className="mt-6 dark:bg-[#151725] dark:hover:bg-[#151729]"
          >
            <span className="flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
              </svg>
              <p className="px-2">{t("reset_password.reset")}</p>
            </span>
          </Button>
        </div>
      </form>
    </Card>
  );
}
