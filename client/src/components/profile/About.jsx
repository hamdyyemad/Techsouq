import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { setCredentials } from "../../slices/authSlice";
import { Input } from "@material-tailwind/react";
import CustomSpinner from "../CustomSpinner";

export default function About({
  user,
  shippingAddress,
  updateProfile,
  dispatch,
  userInfo,
  loadingUpdateProfile,
  isEdit,
  setIsEdit,
}) {
  const { t } = useTranslation();
  const [editedUser, setEditedUser] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    password: "",
    confirmPassword: "",
  });

  // const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };
  const validatePassword = () => {
    // Password validation logic
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(editedUser.password);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic to send a POST request to the backend with editedUser data

    if (editedUser.password !== editedUser.confirmPassword) {
      // Display an error message or handle the mismatch case
      toast.error("Password and Confirm Password do not match");
      return;
    }
    if (!validatePassword()) {
      toast.error(
        "Password must be at least 8 characters long and contain letters, symbols, and numbers."
      );
      return;
    }
    const { firstname, lastname, password } = editedUser;

    try {
      const res = await updateProfile({
        id: userInfo.id,
        firstname,
        lastname,
        password,
        token: userInfo.token,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }

    // Reset the edit mode after saving
    setIsEdit(false);
  };
  console.log(shippingAddress);
  return (
    <div className="bg-white p-3 pb-0 shadow-sm rounded-sm  dark:bg-[#1C1E2D] xs:p-auto ">
      {isEdit ? (
        <>
          <div className="bg-white p-3 shadow-sm rounded-sm  dark:bg-[#1C1E2D]">
            <form onSubmit={handleSubmit}>
              {/* Input fields for editing */}
              <div className="grid md:grid-cols-2 text-sm xs:grid-cols-1">
                <div className="grid grid-cols-2 py-2 xs:grid-cols-1">
                  <div className="px-4 py-2 font-semibold dark:text-white ">
                    {t("profile.first_name")}:
                  </div>
                  <Input
                    type="text"
                    name="firstname"
                    value={editedUser.firstname}
                    onChange={handleInputChange}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white dark:focus:!border-gray-700 "
                    labelProps={{
                      className:
                        "before:content-none after:content-none dark:text-white",
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 py-2 xs:grid-cols-1">
                  <div className="px-4 py-2 font-semibold dark:text-white">
                    {t("profile.last_name")}:
                  </div>
                  <Input
                    type="text"
                    name="lastname"
                    value={editedUser.lastname}
                    onChange={handleInputChange}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white dark:focus:!border-gray-700 "
                    labelProps={{
                      className:
                        "before:content-none after:content-none dark:text-white",
                    }}
                  />
                </div>
                {/* ... (other input fields) ... */}
                <div className="grid grid-cols-2 py-2 xs:grid-cols-1">
                  <div className="px-4 py-2 font-semibold dark:text-white">
                    {t("profile.password")}:
                  </div>
                  <Input
                    type="password"
                    name="password"
                    value={editedUser.password}
                    onChange={handleInputChange}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white dark:focus:!border-gray-700 "
                    labelProps={{
                      className:
                        "before:content-none after:content-none dark:text-white",
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 py-2 xs:grid-cols-1">
                  <div className="px-4 py-2 font-semibold dark:text-white">
                    {t("profile.confirm_password")}:
                  </div>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={editedUser.confirmPassword}
                    onChange={handleInputChange}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white dark:focus:!border-gray-700 "
                    labelProps={{
                      className:
                        "before:content-none after:content-none dark:text-white",
                    }}
                  />
                </div>
              </div>
              {/* Save button */}
              <button
                type="submit"
                className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4 dark:hover:bg-[#151725] dark:focus:bg-[#151725]"
              >
                {t("profile.save_information")}
              </button>
              {loadingUpdateProfile && <CustomSpinner />}
            </form>
            <button
              className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4 dark:hover:bg-[#151725] dark:focus:bg-[#151725]"
              onClick={() => setIsEdit(false)}
            >
              {t("profile.cancel")}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
            <span className="text-green-500">
              <svg
                className="h-5 m-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <span className="tracking-wide dark:text-white">
              {t("profile.about")}
            </span>
          </div>
          <div className="text-gray-700">
            <div className="grid md:grid-cols-2 text-sm ">
              <div className="grid grid-cols-2 xs:grid-cols-1">
                <div className="px-4 py-2 font-semibold dark:text-white">
                  {t("profile.first_name")}:
                </div>
                <div className="px-4 py-2 dark:text-white">
                  {user.firstname}
                </div>
              </div>
              <div className="grid grid-cols-2 xs:grid-cols-1">
                <div className="px-4 py-2 font-semibold dark:text-white">
                  {t("profile.last_name")}:
                </div>
                <div className="px-4 py-2 dark:text-white">{user.lastname}</div>
              </div>
              <div className="grid grid-cols-2 xs:grid-cols-1">
                {/* <div className="px-4 py-2 font-semibold">Gender</div>
                      <div className="px-4 py-2">Female</div> */}
              </div>
              <div className="grid grid-cols-2 xs:grid-cols-1">
                {/* <div className="px-4 py-2 font-semibold">Contact No.</div>
                      <div className="px-4 py-2">+11 998001001</div> */}
              </div>
              {user?.role === "USER" && (
                <>
                  <div className="grid grid-cols-2 xs:grid-cols-1">
                    <div className="px-4 py-2 font-semibold dark:text-white">
                      {t("profile.current_address")}:
                    </div>
                    <div className="px-4 py-2 dark:text-white">
                      {shippingAddress?.address}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 xs:grid-cols-1">
                    <div className="px-4 py-2 font-semibold dark:text-white">
                      {t("profile.city")}:
                    </div>
                    <div className="px-4 py-2 dark:text-white">
                      {shippingAddress?.selectedCity?.label}
                    </div>
                  </div>
                </>
              )}
              <div className="grid grid-cols-2 xs:grid-cols-1">
                <div className="px-4 py-2 font-semibold dark:text-white">
                  {t("profile.email")}:
                </div>
                <div className="px-4 py-2">
                  <div className="text-blue-800 dark:text-white">
                    {user.email}
                  </div>
                </div>
              </div>
              {user?.role === "USER" && (
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold dark:text-white">
                    {t("profile.country")}:
                  </div>
                  <div className="px-4 py-2 dark:text-white">
                    {shippingAddress?.selectedCountry?.label}
                  </div>
                </div>
              )}
            </div>
          </div>
          <button
            className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4 dark:hover:bg-[#151725] dark:focus:bg-[#151725]"
            onClick={() => setIsEdit(true)}
          >
            {t("profile.edit_information")}
          </button>
        </>
      )}
    </div>
  );
}
