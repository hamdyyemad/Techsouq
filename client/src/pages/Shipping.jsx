import Select from "react-select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { saveShippingAddress } from "../slices/cartSlice";
import { useTranslation } from "react-i18next";
import { useGetMyDataQuery } from "../slices/orderApiSlice";
import { toast } from "react-toastify";
import { useRedirect } from "../hooks/useRedirect";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import i18n from "../i18n";
import CustomSpinner from "../components/CustomSpinner";
import ShippingSteps from "../components/ShippingSteps";
export default function Shipping() {
  useRedirect();
  const { t } = useTranslation();
  const [isLoadingCountry, setIsLoadingCountry] = useState(false);
  const [isLoadingCity, setIsLoadingCity] = useState(false);
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

  const [allCities, setAllCities] = useState([]);
  // const [city, setCity] = useState(shippingAddress.city || "");
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
  const [reservedCodeNumber, setReservedCodeNumber] = useState("");
  const [phoneNumberCodeError, setPhoneNumberCodeError] = useState("");

  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(
    data?.data?.shippingAddress?.country ||
      shippingAddress?.selectedCountry ||
      null
  );
  const [countryError, setCountryError] = useState("");

  const [isClearPressed, setIsClearPressed] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // const excludeFlags = [
  //   "BL",
  //   "BQ",
  //   "BV",
  //   "GF",
  //   "GP",
  //   "HM",
  //   "IQ",
  //   "SX",
  //   "SJ",
  //   "PM",
  //   "UM",
  //   "XK",
  // ];
  function handleFetchCountry() {
    // Fetch countries from GeoNames API
    const fetchCountries = async () => {
      try {
        setIsLoadingCountry(true);
        // "client-id": `${import.meta.env.VITE_CLIENT_ID}`,
        const response = await fetch(
          `http://api.geonames.org/countryInfoJSON?username=${
            import.meta.env.VITE_COUNTRY_USERNAME
          }`
        );
        const data = await response.json();
        // Extract relevant information from the API response
        const countriesData = data?.geonames.map((country) => ({
          value: country.countryCode,
          label: country.countryName,
          // Add the country flag URL to each option
          // https://flagsapi.com/EG/flat/32.png
          // ${

          //     ? ""
          //     : country.countryCode
          // }
          image: `${
            [
              "BL",
              "BQ",
              "BV",
              "GF",
              "GP",
              "HM",
              "IO",
              "SX",
              "SJ",
              "PM",
              "UM",
              "XK",
            ].includes(country.countryCode)
              ? ""
              : `https://flagsapi.com/${country.countryCode}/flat/24.png`
          }`,
        }));

        setAllCountries(countriesData);
        setIsLoadingCountry(false);
      } catch (error) {
        setCountryError(`Error fetching countries: ${error}`);
      }
    };

    fetchCountries();
  }

  function handleFetchCity() {
    const fetchCities = async () => {
      if (selectedCountry) {
        try {
          setIsLoadingCity(true);
          let response;
          console.log(selectedCountry);
          if (!selectedCountry.value) {
            const code_response = await fetch(
              `http://api.geonames.org/searchJSON?q=${selectedCountry}&featureClass=A&featureCode=PCLI&maxRows=1&username=${
                import.meta.env.VITE_COUNTRY_USERNAME
              }`
            );
            const data2 = await code_response.json();

            response = await fetch(
              `http://api.geonames.org/searchJSON?country=${
                data2.geonames[0].countryCode
              }&username=${import.meta.env.VITE_COUNTRY_USERNAME}`
            );
          } else {
            response = await fetch(
              `http://api.geonames.org/searchJSON?country=${
                selectedCountry.value
              }&username=${import.meta.env.VITE_COUNTRY_USERNAME}`
            );
          }
          const data = await response.json();
          console.log(data);
          const citiesData = data.geonames.map((city) => {
            if (city.name === selectedCountry.label) return {};
            return {
              value: city.geonameId,
              label: city.name,
            };
          });

          setAllCities(citiesData);
          setIsLoadingCity(false);
          return true;
        } catch (error) {
          setCityError(`Error fetching cities: ${error}`);
          return false;
        }
      }
    };

    fetchCities();
  }

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setCountryError("");
    // Reset city when country changes
    setSelectedCity(null);
    const phoneNumberInstance = parsePhoneNumberFromString(
      phoneNumber,
      selectedOption.value
    );
    setReservedCodeNumber(phoneNumberInstance?.countryCallingCode);
  };
  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };
  const validateAddress = () => {
    if (!address) {
      setAddressError("Address is required");
    } else {
      setAddressError("");
    }
  };
  const validateCity = () => {
    if (!selectedCity) {
      setCityError("City is required");
    } else {
      setCityError("");
    }
  };

  const validatePostalCode = () => {
    if (!postalCode.trim()) {
      setPostalCodeError("Postal Code is required");
    } else {
      setPostalCodeError("");
    }
  };

  const validateCountry = () => {
    if (!selectedCountry) {
      setCountryError("Country is required");
    } else {
      setCountryError("");
    }
  };

  const validatePhoneNumber = () => {
    if (!phoneNumber) {
      setPhoneNumberCodeError("Phone Number is required");
    } else {
      const phoneNumberInstance = parsePhoneNumberFromString(
        phoneNumber,
        selectedCountry.value
      );
      setReservedCodeNumber(phoneNumberInstance?.countryCallingCode);

      if (!phoneNumberInstance || !phoneNumberInstance.isValid()) {
        setPhoneNumberCodeError("Invalid Phone Number");
      } else {
        setPhoneNumberCodeError("");
      }
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    validateAddress();
    validateCity();
    validateCountry();
    validatePostalCode();
    validatePhoneNumber();

    if (
      address &&
      selectedCity &&
      postalCode &&
      selectedCountry &&
      phoneNumber
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
  const handleCountryMenuOpen = () => {
    if (allCountries.length === 0) {
      handleFetchCountry();
    }
  };

  const handleCityMenuOpen = async () => {
    setIsClearPressed(false);
    if (selectedCountry) {
      const fetchCitySuccess = await handleFetchCity();
      if (!fetchCitySuccess && !allCities.length && isClearPressed) {
        toast.error("Please Select a Country again");
      }
    }
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
                    validateAddress();
                  }}
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
                    onClick={handleFetchCountry}
                    options={allCountries}
                    isLoading={isLoadingCountry}
                    id="country"
                    styles={customStyles}
                    components={{ Option: countryOption }}
                    isDarkMode={JSON.parse(localStorage.getItem("darkMode"))}
                  />
                )}

                <p className="text-red-500">{countryError}</p>
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
                      onClick={() => handleFetchCity()}
                      options={allCities}
                      isLoading={isLoadingCity}
                      isDisabled={!selectedCountry}
                      id="city"
                      styles={customStyles}
                      components={{ Option: cityOption }}
                      menuPortalTarget={document.body}
                    />
                  )}

                  <p className="text-red-500">{cityError}</p>
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
                      setPhoneNumber(numericValue);
                      validatePhoneNumber();
                    }}
                    id="postal"
                    className="w-full border py-2 px-3"
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
