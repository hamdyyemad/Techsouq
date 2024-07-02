// useBrandValidation.js

import { useState } from "react";
import { toast } from "react-toastify";

const useBrandValidation = () => {
  const [formattedBrandName, setFormattedBrandName] = useState("");

  const validateAndSetBrandName = (input) => {
    const words = input.split(" ");

    if (words.length === 2 || words.length === 1) {
      const capitalizedWords = words.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      );

      const formattedName = capitalizedWords.join(" ");
      setFormattedBrandName(formattedName);
    } else {
      toast.error("Brand name should consist of at most two words");
    }
  };

  return { formattedBrandName, validateAndSetBrandName };
};

export default useBrandValidation;
