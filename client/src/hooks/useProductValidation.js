import { useState } from "react";

const useProductValidation = () => {
  const [errors, setErrors] = useState({});

  const validateName = (name) => {
    // Your validation logic for name
    // Example: 4 words max, 25 characters max
    if (!name.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, name: "Name is required" }));
    } else if (name.split(" ").length > 4) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Max 4 words allowed",
      }));
    } else if (name.length > 25) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Max 25 characters allowed",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, name: null }));
    }
  };

  const validatePrice = (price) => {
    // Your validation logic for price
    // Example: Convert to 2 floating point, 29.99 max
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        price: "Price must be a number",
      }));
    }
  };

  const validateBrand = (brand) => {
    // Your validation logic for brand
    if (!brand) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        brand: "Brand is required",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, brand: null }));
    }
  };
  const validateCategory = (category) => {
    // Your validation logic for category
    if (!category) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        category: "Category is required",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, category: null }));
    }
  };

  // Add more validation functions for other fields as needed
  const validateDescription = (Description) => {
    // Your validation logic for Description
    // Example: 4 words max, 195 characters max
    if (!Description.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        Description: "Description is required",
      }));
    } else if (Description.length > 195) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        Description: "Max 195 characters allowed",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, Description: null }));
    }
  };
  const validateLongDescription = (LongDescription) => {
    // Your validation logic for Description
    // Example: 4 words max, 400 characters max
    if (!LongDescription.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        LongDescription: "LongDescription is required",
      }));
    } else if (LongDescription.length > 400) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        LongDescription: "Max 400 characters allowed",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, LongDescription: null }));
    }
  };
  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  console.log(errors);
  return {
    errors,
    validateName,
    validatePrice,
    validateBrand,
    validateCategory,
    validateDescription,
    validateLongDescription,
    capitalizeWords,
    capitalizeFirstLetter,
  };
};

export default useProductValidation;
