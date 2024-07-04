import Select from "react-select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { saveShippingAddress } from "../slices/cartSlice";
import { useTranslation } from "react-i18next";
import { useGetMyDataQuery } from "../slices/orderApiSlice";
import { useRedirect } from "../hooks/useRedirect";
import { useFetchCountries } from "../hooks/useFetchCountries";
import { useFetchCities } from "../hooks/useFetchCities";

import {
  validateAddress,
  validateCity,
  validatePostalCode,
  validateCountry,
  validatePhoneNumber,
} from "../utils/validation";

import i18n from "../i18n";
import CustomSpinner from "../components/CustomSpinner";
import ShippingSteps from "../components/ShippingSteps";

export default function Shipping() {
  useRedirect();
  const { t } = useTranslation();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const {
    data,
    isLoading,
    // error
  } = useGetMyDataQuery();

  const [address, setAddress] = useState(
    data?.data?.shippingAddress?.address || shippingAddress?.address || ""
  );
  const [addressError, setAddressError] = useState("");

  const [selectedCity, setSelectedCity] = useState(
    data?.data?.shippingAddress?.city || shippingAddress?.selectedCity || null
  );
  const [cityError, setCityError] = useState("");

  const [postalCode, setPostalCode] = useState(
    data?.data?.shippingAddress?.postalCode || shippingAddress?.postalCode || ""
  );
  const [postalCodeError, setPostalCodeError] = useState("");

  const [phoneNumber, setPhoneNumber] = useState(
    data?.data?.shippingAddress?.phoneNumber ||
      shippingAddress?.phoneNumber ||
      ""
  );
  const [phoneNumberCodeError, setPhoneNumberCodeError] = useState("");
  const [reservedCodeNumber, setReservedCodeNumber] = useState("");

  const [selectedCountry, setSelectedCountry] = useState(
    data?.data?.shippingAddress?.country ||
      shippingAddress?.selectedCountry ||
      null
  );
  const [countryError, setCountryError] = useState("");

  const [isClearPressed, setIsClearPressed] = useState(false);

  const {
    allCountries,
    isLoadingCountry,
    countryError: fetchCountryError,
    fetchCountries,
    handleCountryChange,
    handleCountryMenuOpen,
  } = useFetchCountries(
    setSelectedCity,
    setReservedCodeNumber,
    setPhoneNumber,
    setSelectedCountry
  );

  const {
    allCities,
    isLoadingCity,
    cityError: fetchCityError,
    fetchCities,
    handleCityChange,
    handleCityMenuOpen,
  } = useFetchCities(selectedCountry, setSelectedCity, setIsClearPressed, isClearPressed);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const addressError = validateAddress(address);
    const cityError = validateCity(selectedCity);
    const countryError = validateCountry(selectedCountry);
    const postalCodeError = validatePostalCode(postalCode);
    const phoneNumberCodeError = validatePhoneNumber(
      phoneNumber,
      selectedCountry
    );

    setAddressError(addressError);
    setCityError(cityError);
    setCountryError(countryError);
    setPostalCodeError(postalCodeError);
    setPhoneNumberCodeError(phoneNumberCodeError);

    if (
      !addressError &&
      !cityError &&
      !countryError &&
      !postalCodeError &&
      !phoneNumberCodeError
    ) {
      dispatch(
        saveShippingAddress({
          address: address.trim(),
          selectedCity,
          postalCode,
          selectedCountry,
          phoneNumber,
        })
      );
      navigate("/payment");
    }
  }
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px solid #ccc",
      display: "flex",
      color: state.isSelected ? "white" : "white",
      background: state.isSelected ? "#007BFF" : "white",
      "&:hover": {
        background: "#007BFF",
        color: "white",
        cursor: "pointer",
      },
    }),
    control: (baseStyles) => ({
      ...baseStyles,
      // background: isDark ? "#616161" : "#fff",
      // color: isDark ? "white" : "black",
    }),
    singleValue: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      // color: isDark ? "white" : "black",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "2px 8px",
    }),
  };
  const cityOption = ({ innerProps, label, data }) => {
    if (!data.label) return;
    return (
      <div {...innerProps} className="flex w-full">
        <span className="cursor-pointer ml-3 py-2">{label}</span>
      </div>
    );
  };
  const countryOption = ({ innerProps, label, data }) => {
    if (!data.image) return;
    return (
      <div {...innerProps} className="flex w-full p-2">
        <LazyLoadImage
          src={data.image}
          alt={label}
          style={{ marginRight: "8px" }}
          className="cursor-pointer"
        />
        <span className="cursor-pointer ">{label}</span>
      </div>
    );
  };

  useEffect(() => {
    if (data?.data?.shippingAddress) {
      const { address, postalCode, city, country, phoneNumber } =
        data.data.shippingAddress;

      setAddress(address || "");
      setPostalCode(postalCode || "");
      setSelectedCountry(country || null);
      setSelectedCity(city || null);
      setPhoneNumber(phoneNumber || "");
    }
  }, [data]);

  if (isLoading) return <CustomSpinner />;
  return (
    <div className="bg-gray-100 dark:bg-[#1C1E2D] h-screen w-full xs:h-full">
      <div className="w-full max-w-3xl mx-auto p-8 xs:p-0">
        <div className="bg-white dark:bg-[#1C1E2D] p-8 rounded-lg shadow-md border dark:border-[#242635] xs:p-5">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {t("order.checkout")}
          </h1>
          <ShippingSteps currentStep={2} />
          {/* <!-- Shipping Address --> */}
          <ShippingAddress>
            <form className="mb-6" onSubmit={(e) => handleSubmit(e)}>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
                {t("order.shipping_address")}
              </h2>

              <div className="mt-4">
                <label
                  htmlFor="address"
                  className="block text-gray-700 dark:text-white mb-1"
                >
                  {t("order.address")}
                </label>
                <input
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setAddressError("");
                  }}
                  onBlur={() => setAddressError(validateAddress(address))}
                  type="text"
                  id="address"
                  className="w-full border py-2 px-3"
                />
                <p className="text-red-500">{addressError}</p>
              </div>

              <div className="mt-4">
                {isLoadingCountry && <CustomSpinner />}
                <label
                  htmlFor="country"
                  className="block text-gray-700 dark:text-white mb-1"
                >
                  {t("order.country")}
                </label>
                {typeof selectedCountry === "string" &&
                selectedCountry.length ? (
                  <div className="flex items-center relative">
                    <input
                      type="text"
                      value={selectedCountry}
                      disabled={true}
                      // onChange={(e) => setInputCityValue(e.target.value)}
                      className="w-full border py-2 px-3" // Adjusted to accommodate the button
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCountry(null);
                        setSelectedCity(null);
                        setPhoneNumber("");
                      }}
                      className={`absolute ${
                        i18n.dir() === "rtl" ? "left-0" : "right-0"
                      } px-2 py-1 font-medium text-blue-600 dark:text-blue-500 hover:underline`}
                    >
                      Clear
                    </button>
                  </div>
                ) : (
                  <Select
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    onMenuOpen={handleCountryMenuOpen}
                    onClick={fetchCountries}
                    options={allCountries}
                    isLoading={isLoadingCountry}
                    id="country"
                    styles={customStyles}
                    components={{ Option: countryOption }}
                    isDarkMode={JSON.parse(localStorage.getItem("darkMode"))}
                  />
                )}

                <p className="text-red-500">{countryError}</p>
                {fetchCountryError && (
                  <span className="text-red-500 text-sm">
                    {fetchCountryError}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-gray-700 dark:text-white mb-1"
                  >
                    {t("order.city")}
                  </label>
                  {typeof selectedCity === "string" && selectedCity.length ? (
                    <div className="flex items-center relative">
                      <input
                        type="text"
                        value={selectedCity}
                        disabled={true}
                        // onChange={(e) => setInputCityValue(e.target.value)}
                        className="w-full border py-2 px-3"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCity(null);
                          setIsClearPressed(true);
                        }}
                        className={`absolute ${
                          i18n.dir() === "rtl" ? "left-0" : "right-0"
                        } px-2 py-1 font-medium text-blue-600 dark:text-blue-500 hover:underline`}
                      >
                        Clear
                      </button>
                    </div>
                  ) : (
                    <Select
                      value={selectedCity}
                      onChange={handleCityChange}
                      onMenuOpen={handleCityMenuOpen}
                      onClick={() => fetchCities(selectedCountry)}
                      options={allCities}
                      isLoading={isLoadingCity}
                      isDisabled={!selectedCountry}
                      id="city"
                      styles={customStyles}
                      components={{ Option: cityOption }}
                      menuPortalTarget={document.body}
                    />
                  )}

                  {cityError && (
                    <span className="text-red-500 text-sm">{cityError}</span>
                  )}
                  {fetchCityError && (
                    <span className="text-red-500 text-sm">
                      {fetchCityError}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-gray-700 dark:text-white mb-1"
                  >
                    Phone Number{" "}
                    {reservedCodeNumber ? `(+${reservedCodeNumber})` : ""}
                  </label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(
                        /[^0-9]/g,
                        ""
                      );
                      setPhoneNumber(() => numericValue);
                      setPhoneNumberCodeError("");
                    }}
                    id="postal"
                    className="w-full border py-2 px-3"
                    onBlur={() =>
                      setPhoneNumberCodeError(validatePhoneNumber(phoneNumber))
                    }
                  />
                  <p className="text-red-500">{phoneNumberCodeError}</p>
                </div>
                <div>
                  <label
                    htmlFor="postal"
                    className="block text-gray-700 dark:text-white mb-1"
                  >
                    {t("order.postal_code")}
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(
                        /[^0-9]/g,
                        ""
                      );
                      setPostalCode(numericValue);
                      validatePostalCode();
                    }}
                    id="postal"
                    className="w-full border py-2 px-3"
                  />
                  <p className="text-red-500">{postalCodeError}</p>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-700"
                  disabled={
                    addressError ||
                    cityError ||
                    postalCodeError ||
                    countryError ||
                    phoneNumberCodeError
                  }
                >
                  {t("order.go_to_payment")}
                </button>
              </div>
            </form>
          </ShippingAddress>

          {/* <!-- Payment Information --> */}
          {/* <PaymentInfo /> */}
        </div>
      </div>
    </div>
  );
}
function ShippingAddress({ children }) {
  return children;
}
