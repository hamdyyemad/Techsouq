import { useState } from "react";
import { toast } from "react-toastify";

export const useFetchCities = (
  selectedCountry,
  setSelectedCity,
  setIsClearPressed,
  isClearPressed
) => {
  const [allCities, setAllCities] = useState([]);
  const [isLoadingCity, setIsLoadingCity] = useState(false);
  const [cityError, setCityError] = useState("");

  const fetchCities = async (selectedCountry) => {
    if (selectedCountry) {
      try {
        setIsLoadingCity(true);
        let response;
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
        const citiesData = data.geonames.map((city) => {
          if (city.name === selectedCountry.label) return {};
          return { value: city.geonameId, label: city.name };
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
  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    setCityError("");
  };
  const handleCityMenuOpen = async () => {
    setIsClearPressed(false);
    if (selectedCountry) {
      const fetchCitySuccess = await fetchCities(selectedCountry);
      if (!fetchCitySuccess && !allCities.length && isClearPressed) {
        toast.error("Please Select a Country again");
      }
    }
  };
  return {
    allCities,
    isLoadingCity,
    cityError,
    fetchCities,
    handleCityChange,
    handleCityMenuOpen,
  };
};
