import { useState } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const useFetchCountries = (
  setSelectedCity,
  setReservedCodeNumber,
  setPhoneNumber,
  setSelectedCountry
) => {
  const [allCountries, setAllCountries] = useState([]);
  const [isLoadingCountry, setIsLoadingCountry] = useState(false);
  const [countryError, setCountryError] = useState("");

  const fetchCountries = async () => {
    try {
      setIsLoadingCountry(true);
      const response = await fetch(
        `http://api.geonames.org/countryInfoJSON?username=${
          import.meta.env.VITE_COUNTRY_USERNAME
        }`
      );
      const data = await response.json();
      const countriesData = data?.geonames.map((country) => ({
        value: country.countryCode,
        label: country.countryName,
        image: [
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
          : `https://flagsapi.com/${country.countryCode}/flat/24.png`,
      }));
      setAllCountries(countriesData);
      setIsLoadingCountry(false);
    } catch (error) {
      setCountryError(`Error fetching countries: ${error}`);
    }
  };
  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setCountryError("");
    // Reset city when country changes
    setSelectedCity(null);
    const phoneNumberInstance = parsePhoneNumberFromString(
      "2222",
      selectedOption.value
    );
    setReservedCodeNumber(phoneNumberInstance?.countryCallingCode);
    setPhoneNumber("");
  };

  const handleCountryMenuOpen = () => {
    if (allCountries.length === 0) {
      fetchCountries();
      setPhoneNumber("");
    }
  };

  return {
    allCountries,
    isLoadingCountry,
    countryError,
    fetchCountries,
    handleCountryChange,
    handleCountryMenuOpen,
  };
};
