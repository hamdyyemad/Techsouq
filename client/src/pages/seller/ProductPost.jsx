import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  // Form,
  Textarea,
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  useGetBrandsQuery,
  useGetCategoryQuery,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";
import useProductValidation from "../../hooks/useProductValidation";
import { BASE_URL } from "../../constants";

import CustomSpinner from "../../components/CustomSpinner";
export default function ProductPost() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [specifications, setSpecifications] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const { data: brandTarget, isLoading: brandLoading } = useGetBrandsQuery();
  const { data: categoryTarget, isLoading: categoryLoading } =
    useGetCategoryQuery();

  const [selectedBrand, setSelectedBrand] = useState(null); // Use selectedBrand state
  const [selectedCategory, setSelectedCategory] = useState(null); // Use selectedBrand state
  const brandData = brandTarget?.data?.listOfBrands;
  const categoryData = categoryTarget?.data?.listOfCategories;

  const {
    errors,
    validateName,
    validateCategory,
    validateBrand,
    validateDescription,
    validateLongDescription,
    capitalizeWords,
    capitalizeFirstLetter,
  } = useProductValidation();
  console.log(errors);

  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();
  // const [product, setProduct] = useState({});
  const uploadFileHandler = async (e) => {
    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();

      toast.success(res?.message);
      setImage(res?.image);
      // setImage(e.target.files[0]); // Set the File object here
    } catch (e) {
      console.log(e?.data?.message || e?.error);
    }
    // Handle the selected file as needed
  };
  const navigate = useNavigate();
  const addSpecification = () => {
    setSpecifications([...specifications, { key: "", value: "" }]);
  };

  const removeSpecification = (index) => {
    const updatedSpecifications = [...specifications];
    updatedSpecifications.splice(index, 1);
    setSpecifications(updatedSpecifications);
  };

  const values = {
    name,
    price,
    brand: selectedBrand,
    image,
    category: selectedCategory,
    description,
    longDescription,
    countInStock,
  };
  const user = useSelector((store) => store.auth.userInfo);
  const token = user.token;
  const headers = {
    Authorization: `Bearer ${token}`,
    authorization: `Bearer ${token}`,
  };

  //   const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    validateName(values.name);
    validateBrand(values.brand);
    validateCategory(values.category);
    validateDescription(values.description);
    validateLongDescription(values.longDescription);

    // Check for validation errors
    if (
      errors.name ||
      errors.brand ||
      errors.category ||
      errors.Description ||
      errors.LongDescription
    ) {
      console.log(errors);
      toast.error("Please fix the validation errors");
      return;
    }
    const transformedValues = {
      ...values,
      name: capitalizeWords(name),
      description: capitalizeFirstLetter(description),
      longDescription: capitalizeFirstLetter(longDescription),
      specifications: specifications.filter((spec) => spec.key && spec.value), // Remove empty specifications
      user: user?.id,
    };

    try {
      const emptyFields = Object.values(transformedValues).some(
        (value) => !value
      );

      if (emptyFields) {
        toast.error("Please fill in all fields");
        return; // Stop further execution
      }
      transformedValues.price = (values.price - 0.01).toFixed(2);
      setIsLoading(true);
      const res = await axios.post(
        `${BASE_URL}/products/seller`,
        transformedValues,
        {
          headers: headers,
        }
      );

      setIsLoading(false);
      toast.success("Product is under review");
      navigate("/seller/productlist");
    } catch (err) {
      setIsLoading(false);
      console.log(err?.response?.data?.data);
      toast.error(err?.response?.data?.data || err.error);
    }
  };
  useEffect(() => {
    if (brandData) {
      // Extracting the brand names from the API response

      setBrandOptions(brandData?.map((brand) => brand.name));
    }
    if (categoryData) {
      setCategoryOptions(categoryData?.map((cat) => cat.name));
    }
  }, [brandData, categoryData]);
  return (
    <>
      {/* <Link
        to="/admin/productlist"
        relative="path"
        className="dark:text-white mx-auto flex max-w-2xl items-center space-x-2 px-4 pt-5 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        &larr;{" "}
        <span className="ml-2 dark:text-white">Back to Product List</span>
      </Link> */}
      <Card
        color="transparent"
        shadow={false}
        className="h-screen min-w-max m-auto flex flex-col justify-center items-center overflow-auto xs:m-auto xs:p-0 xs:min-w-screen xs:overflow-x-hidden "
      >
        <form
          onSubmit={submitHandler}
          className="mt-8 mb-2 min-w-max  sm:w-96 h-full xs:w-screen xs:p-3 xs:m-0 "
        >
          <div className="mb-1 gap-6 grid grid-cols-2 auto-rows-auto gap-4 xs:w-48 xs:m-auto xs:grid-cols-1">
            <Typography
              variant="h6"
              color="blue-gray"
              className="dark:text-white -mb-3"
            >
              {t("post_product.name")}
            </Typography>
            {errors.name ? (
              <Input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  validateName(name);
                }}
                size="lg"
                label={errors.name}
                error
              />
            ) : (
              <Input
                name="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  validateName(name);
                }}
                id="name"
                size="lg"
                placeholder="Airpods"
                className=" !border-t-blue-gray-200 focus:!border-blue-gray-200 dark:text-white  focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            )}

            {/* // {errors.name && label={`${errors.name}`} error} */}
            {/* {errors.name && <Input label="Input Error" error />} */}
            {/* <ValidationError>{errors.name}</ValidationError> */}

            <Typography
              variant="h6"
              color="blue-gray"
              className="dark:text-white -mb-3"
            >
              {t("post_product.price")} ($)
            </Typography>
            <Input
              name="price"
              type="text"
              value={price}
              onChange={(e) => {
                // Handle float validation and set the state
                const inputValue = e.target.value;
                // Validate if it's a valid float
                if (/^\d*\.?\d*$/.test(inputValue)) {
                  setPrice(inputValue);
                }
              }}
              min={1}
              id="price"
              size="lg"
              placeholder="20$"
              className=" !border-t-blue-gray-200 focus:!border-blue-gray-200 dark:text-white  focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {/* <ValidationError>{errors.price}</ValidationError> */}
            <Typography
              variant="h6"
              color="blue-gray"
              className="dark:text-white -mb-3"
            >
              {t("post_product.brand")}
            </Typography>
            {brandLoading && <CustomSpinner />}
            {errors.brand ? (
              <Select
                name="brand"
                variant="standard"
                value={selectedBrand || ""} // Use selectedBrand here
                onChange={(e) => {
                  console.log(e);
                  setSelectedBrand(e);
                  validateBrand(e); // Use selectedBrand here
                }}
                id="brand"
                size="lg"
                className={`w-full border p-3 !border-t-blue-gray-200 focus:!border-blue-gray-200 dark:text-white focus:!border-t-gray-900 dark:bg-[#1C1E2D] 
               `}
                label={errors.brand}
                error
              >
                {brandOptions?.map((brandOption) => (
                  <Option key={brandOption} value={brandOption}>
                    {brandOption}
                  </Option>
                ))}
              </Select>
            ) : (
              <select
                name="brand"
                value={selectedBrand || ""} // Use selectedBrand here
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  validateBrand(selectedBrand); // Use selectedBrand here
                }}
                id="brand"
                size="lg"
                className={`w-full border p-3 !border-t-blue-gray-200 focus:!border-blue-gray-200 dark:text-white focus:!border-t-gray-900 dark:bg-[#1C1E2D] xs:w-48
                 `}
              >
                {brandOptions?.map((brandOption) => (
                  <option key={brandOption} value={brandOption}>
                    {brandOption}
                  </option>
                ))}
              </select>
            )}
            {/* <ValidationError>{errors.brand}</ValidationError> */}
            {categoryLoading && <CustomSpinner />}
            <Typography
              variant="h6"
              color="blue-gray"
              className="dark:text-white -mb-3"
            >
              {t("post_product.category")}
            </Typography>
            {errors.category ? (
              <Select
                name="category"
                value={selectedCategory || ""} // Use selectedCategory here
                onChange={(e) => {
                  setSelectedCategory(e);
                  validateCategory(e);
                }}
                id="category"
                size="lg"
                placeholder="category"
                className={`w-full border p-3 !border-t-blue-gray-200 focus:!border-blue-gray-200 dark:text-white focus:!border-t-gray-900 dark:bg-[#1C1E2D]
               `}
                label={errors.category}
                error
              >
                {categoryOptions?.map((categoryOption) => (
                  <Option key={categoryOption} value={categoryOption}>
                    {categoryOption}
                  </Option>
                ))}
              </Select>
            ) : (
              <select
                name="category"
                value={selectedCategory || ""} // Use selectedCategory here
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  validateCategory(selectedCategory);
                }}
                id="category"
                size="lg"
                placeholder="category"
                className={`w-full border p-3 !border-t-blue-gray-200 focus:!border-blue-gray-200 dark:text-white focus:!border-t-gray-900 dark:bg-[#1C1E2D] xs:w-48
                 `}
              >
                {categoryOptions?.map((categoryOption) => (
                  <option key={categoryOption} value={categoryOption}>
                    {categoryOption}
                  </option>
                ))}
              </select>
            )}
            <Typography
              variant="h6"
              color="blue-gray"
              className="dark:text-white -mb-3"
            >
              {t("post_product.count_in_stock")}
            </Typography>
            <Input
              name="countInStock"
              type="number"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              id="countInStock"
              size="lg"
              min={0}
              placeholder="13"
              className=" !border-t-blue-gray-200 focus:!border-blue-gray-200 dark:text-white  focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography
              variant="h6"
              color="blue-gray"
              className="dark:text-white -mb-3"
            >
              {t("post_product.image")}
            </Typography>
            <div className="mb-3 w-96 flex">
              <label
                htmlFor="image"
                className="mb-2 m-auto inline-block items-center justify-center text-neutral-700 dark:text-neutral-200"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></label>
              <input
                className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                id="image"
                type="file"
                onChange={uploadFileHandler} // Handle image change
              />
            </div>

            <Typography
              variant="h6"
              color="blue-gray"
              className="dark:text-white -mb-3"
            >
              {t("post_product.short_description")}
            </Typography>
            {errors.Description ? (
              <Textarea
                name="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  validateDescription(description);
                }}
                id="description"
                size="lg"
                // placeholder="Product description"
                label={errors.Description}
                error
              />
            ) : (
              <Textarea
                name="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  validateDescription(description);
                }}
                id="description"
                size="lg"
                placeholder="Product description"
                className="resize-none !border-t-blue-gray-200 focus:!border-blue-gray-200 dark:text-white focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            )}

            {/* <ValidationError>{errors.Description}</ValidationError> */}
            <Typography
              variant="h6"
              color="blue-gray"
              className="dark:text-white -mb-3"
            >
              {t("post_product.long_description")}
            </Typography>
            {errors.LongDescription ? (
              <Textarea
                name="longDescription"
                value={longDescription}
                onChange={(e) => {
                  setLongDescription(e.target.value);
                  validateLongDescription(longDescription);
                }}
                size="lg"
                rows="7"
                // placeholder="Product long description"
                className=" !border-t-blue-gray-200 focus:!border-blue-gray-200 dark:text-white focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                label={errors.LongDescription}
                error
              />
            ) : (
              <Textarea
                name="longDescription"
                value={longDescription}
                onChange={(e) => {
                  setLongDescription(e.target.value);
                  validateLongDescription(longDescription);
                }}
                id="longDescription"
                size="lg"
                rows="7"
                placeholder="Product long description"
                className=" !border-t-blue-gray-200 focus:!border-blue-gray-200 dark:text-white focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            )}
            {/* <ValidationError>{errors.LongDescription}</ValidationError> */}
          </div>

          <div className="grid grid-cols-2">
            <Typography
              variant="h6"
              color="blue-gray"
              className="dark:text-white -mb-3"
            >
              {t("post_product.specifications")}
            </Typography>
            {!specifications.length && (
              <button
                type="button"
                onClick={addSpecification}
                className="ml-3 mt-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-3 border border-blue-500 hover:border-transparent rounded w-[fit-content]"
              >
                + {t("post_product.add")}
              </button>
            )}
          </div>
          {specifications?.map((spec, index) => (
            <div
              key={index}
              className="grid grid-cols-3 mb-3 mt-8 xs:grid-cols-2 xs:w-52"
            >
              <Input
                name={`specKey${index}`}
                type="text"
                value={spec.key}
                onChange={(e) => {
                  const updatedSpecifications = [...specifications];
                  updatedSpecifications[index].key = e.target.value;
                  setSpecifications(updatedSpecifications);
                }}
                placeholder={t("post_product.key")}
                className="mx-0 !border-t-blue-gray-200 focus:!border-blue-gray-200 dark:text-white  focus:!border-t-gray-900 xs:w-28 xs:mx-auto"
              />
              <Input
                name={`specValue${index}`}
                type="text"
                value={spec.value}
                onChange={(e) => {
                  const updatedSpecifications = [...specifications];
                  updatedSpecifications[index].value = e.target.value;
                  setSpecifications(updatedSpecifications);
                }}
                placeholder={t("post_product.value")}
                className=" !border-t-blue-gray-200  focus:!border-blue-gray-200 dark:text-white  focus:!border-t-gray-900 ml-7 xs:w-32 xs:mr-6"
              />
              <div className="col-span-1 grid grid-cols-2 items-center justify-center ml-5 xs:mt-2 xs:grid-cols-1">
                <button
                  type="button"
                  onClick={() => removeSpecification(index)}
                  className="m-auto  bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-3 border border-red-500 hover:border-transparent rounded w-[fit-content]"
                >
                  {t("post_product.remove")}
                </button>
                {index === specifications.length - 1 && (
                  <button
                    type="button"
                    onClick={addSpecification}
                    className="m-auto ml-0 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-3 border border-blue-500 hover:border-transparent rounded w-[fit-content] xs:mt-2 xs:mx-2"
                  >
                    + {t("post_product.add")}
                  </button>
                )}
              </div>
            </div>
          ))}

          {isLoading && <CustomSpinner />}
          {loadingUpload && <CustomSpinner />}

          <Button
            className="mt-6 bg-[#151725] hover:bg-[#151729] dark:bg-[#1C1E2D]"
            fullWidth
            disabled={isLoading}
            type="submit"
            onSubmit={submitHandler}
          >
            {isLoading
              ? t("post_product.adding")
              : t("post_product.add_product")}
          </Button>
        </form>
      </Card>
    </>
  );
}
