import {
  parsePhoneNumberFromString,
  validatePhoneNumberLength,
} from "libphonenumber-js";

export const validateAddress = (address) => {
  if (!address) {
    return "Address is required";
  }
  return "";
};

export const validateCity = (selectedCity) => {
  if (!selectedCity) {
    return "City is required";
  }
  return "";
};

export const validatePostalCode = (postalCode) => {
  if (!postalCode.trim()) {
    return "Postal Code is required";
  }
  return "";
};

export const validateCountry = (selectedCountry) => {
  if (!selectedCountry) {
    return "Country is required";
  }
  return "";
};

export const validatePhoneNumber = (phoneNumber, selectedCountry) => {
  if (!phoneNumber) {
    return "Phone Number is required";
  } else {
    const phoneNumberInstance = parsePhoneNumberFromString(
      phoneNumber,
      selectedCountry.value
    );
    const check =
      phoneNumberInstance &&
      phoneNumber.length >= phoneNumberInstance?.countryCallingCode.length
        ? phoneNumber.slice(phoneNumberInstance?.countryCallingCode.length)
        : "2";
    if (
      !phoneNumberInstance ||
      !phoneNumberInstance.isValid() ||
      !phoneNumberInstance.isPossible() ||
      validatePhoneNumberLength(check, selectedCountry.value)
    ) {
      return "Invalid Phone Number";
    }
  }
  return "";
};
