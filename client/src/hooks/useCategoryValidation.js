import { useState } from "react";
import { toast } from "react-toastify";

const useCategoryValidation = () => {
  const [formattedCategory, setFormattedCategory] = useState("");

  const validateAndSetCategory = (input) => {
    const words = input.split(" ");

    if (words.length > 3) {
      toast.error("Category name should consist of at most three words");
      return;
    }

    const containsInvalidSymbol = words.some(
      (word) => !/^[a-zA-Z0-9&-]+$/.test(word)
    );

    if (containsInvalidSymbol) {
      toast.error(
        "Category name should only contain alphanumeric characters, '&' or '-'"
      );
      return;
    }

    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );

    const formattedName = capitalizedWords.join(" ");
    setFormattedCategory(formattedName);
  };

  return { formattedCategory, validateAndSetCategory };
};

export default useCategoryValidation;
