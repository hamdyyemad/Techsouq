import axios from "axios";
import { Link, useLocation, useLoaderData, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { addToCart } from "../../slices/cartSlice";
import { BASE_URL } from "../../constants";

import Reviews from "../../components/Reviews";
import ProductsNavbar from "../../components/ProductsNavbar";
import BackToAllProducts from "../../components/BackToAllProducts";
import { RatingWithText } from "../../components/RatingWithText";
import { Slider } from "@material-tailwind/react";

export default function VanDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const location = useLocation();
  const product = useLoaderData();

  const { userInfo } = useSelector((state) => state.auth);
  const hideReviewsText = false;

  const search = location?.state?.search || "";

  const headers = {
    Authorization: `Bearer ${userInfo?.token}`,
    authorization: `Bearer ${userInfo?.token}`,
  };

  const addedSuccessfully = () =>
    toast.success(t("products.added_success"), {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const [qty, setQty] = useState(1);

  const [isUserAlreadyReviewd, setIsUserAlreadyReviewd] = useState(false);
  const dispatch = useDispatch();

  // const type = location.state?.type || "all";
  const min = 1;
  const max = product.countInStock;
  let enableCart = true;
  if (userInfo?.role === "ADMIN" || userInfo?.role === "SELLER") {
    enableCart = false;
  }
  function handleChange(e) {
    const value = Math.max(min, Math.min(max, Number(e.target.value)));
    setQty(value);
  }
  function addToCardHandler() {
    dispatch(addToCart({ product, qty }));
    addedSuccessfully();
  }
  const handleRatingChange = (e) => {
    const value = Math.max(0, Math.min(5, Number(e.target.value)));
    setRating(value);
  };
  const submitReview = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${BASE_URL}/products/${id}/reviews`,
        {
          rating,
          comment: e.target.feedback.value,
          userInfo,
        },
        {
          headers: headers,
        }
      );

      toast.success("Added successfully");
      window.location.reload();
    } catch (error) {
      // Handle error (you may want to show an error message)

      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    const isReviewed = product.reviews.some((i) => {
      return i.user.toString() === userInfo?.id.toString();
    });
    setIsUserAlreadyReviewd(isReviewed);
  }, [product.reviews, userInfo?.id]);
  return (
    <div>
      <BackToAllProducts />
      <div className="bg-white dark:bg-[#1C1E2D]">
        <div className="pt-6">
          <ProductsNavbar product={product} />
          {/* <!-- Image gallery --> */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl  lg:gap-x-8 lg:px-8">
            <div className="visible lg:grid lg:grid-cols-1 lg:gap-y-8 max-h-[680px]">
              <div className="max-w-[50%] aspect-square overflow-hidden rounded-lg">
                <img
                  src={
                    product.image.includes("/uploads")
                      ? `${BASE_URL}${product.image}`
                      : product.image
                  }
                  alt={product.name}
                  className="w-full h-full object-contain object-center"
                />
              </div>
            </div>

            {/* <!-- Product info --> */}
            <div className="mx-autoc max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
                  {product.name}
                </h1>
              </div>

              {/* <!-- Options --> */}
              <div className="mt-4 lg:row-span-3 lg:mt-0 ">
                <h2 className="sr-only dark:text-white">
                  {product.description}
                </h2>

                <div className="mb-2 flex flex-col justify-between">
                  <p className="text-3xl tracking-tight text-gray-900 mb-4 dark:text-white">
                    ${product.price}
                  </p>
                  {product.countInStock > 0 ? (
                    <p className="text-1xl tracking-tight text-[#007600] mb-4 ">
                      {t("products.in_stock")}
                    </p>
                  ) : (
                    <p className="text-1xl tracking-tight text-[#CC0C39] mb-4">
                      {t("products.out_stock")}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-gray-700 dark:text-white">
                    {t("products.qty")}
                  </p>
                  <form>
                    <input
                      className="appearance-none   w-20 bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-zip"
                      type="number"
                      placeholder={qty}
                      value={qty}
                      onChange={handleChange}
                      min={1}
                      max={product.countInStock}
                    />
                  </form>
                </div>
                <hr className="my-4" />

                {/* <!-- Reviews --> */}
                <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <RatingWithText
                        rating={product.rating}
                        reviews={product.numReviews}
                        showText={hideReviewsText}
                      />
                    </div>
                    <p className="sr-only">
                      {product.rating} {t("products.start")}
                    </p>
                    <Link
                      href="."
                      className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      {product.numReviews} {t("products.reviews")}
                    </Link>
                  </div>
                </div>

                {product.countInStock > 0 && enableCart && (
                  <button
                    type="button"
                    className="mt-20 flex w-full items-center justify-center rounded-md border border-transparent bg-[#FBC02D] px-8 py-3 text-base font-medium text-white hover:bg-[#FBC03D] focus:outline-none focus:ring-2 focus:bg-[#FBC03D] focus:ring-offset-2"
                    disabled={product.countInStock === 0}
                    onClick={addToCardHandler}
                  >
                    {t("products.add_to_cart")}
                  </button>
                )}
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                {/* <!-- Description and details --> */}
                <div>
                  <h3 className="sr-only dark:text-white">
                    {t("products.description")}
                  </h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900 dark:text-white">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {t("products.specifications")}
                  </h3>

                  <div className="mt-4">
                    <ul
                      role="list"
                      className="list-disc space-y-2 pl-4 text-sm "
                    >
                      {product?.specifications?.map((s) => (
                        <>
                          <li className="text-gray-400 ">
                            <span className="text-gray-600 dark:text-white">
                              {s?.key}: {s?.value}
                            </span>
                          </li>
                        </>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900 dark:text-white">
                    {t("products.details")}
                  </h2>

                  <div className="mt-4 space-y-6">
                    <p
                      className="text-sm text-gray-600 dark:text-white"
                      style={{ whiteSpace: "pre-line", lineHeight: "1.8" }}
                    >
                      {product.longDescription
                        ? product.longDescription
                        : product.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {enableCart && userInfo?.token ? (
        <>
          <hr className="border-gray-300 dark:border-white w-80 m-auto xs:w-52"></hr>
          <Reviews product={product} />
          {!isUserAlreadyReviewd && (
            <form
              onSubmit={submitReview}
              className="w-full p-10 flex flex-col ml-5"
              id="feedbackForm"
            >
              <div className="relative  mb-3">
                <label
                  className="block uppercase dark:text-gray-200 text-xs font-bold mb-2"
                  htmlFor="steps-range"
                >
                  {t("products.rating")}
                </label>
                <div className="w-52 grid grid-cols-1">
                  <Slider
                    id="steps-range"
                    min={0}
                    max={5}
                    defaultValue={rating}
                    onChange={handleRatingChange}
                    step={0.5}
                  />
                  <input
                    type="number"
                    name="rating"
                    id="rating"
                    min="0"
                    max="5"
                    step="0.5"
                    readOnly
                    value={rating}
                    onChange={handleRatingChange}
                    required
                    className="mt-5 border-0 px-3 py-3 rounded text-sm shadow 
                    bg-gray-300 placeholder-black text-gray-800 outline-none focus:bg-gray-400"
                  />
                </div>
                {/* <input
                  id="steps-range"
                  type="range"
                  min="0"
                  max="5"
                  value={rating}
                  onChange={handleRatingChange}
                  required
                  step="0.5"
                  className="w-52 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                /> */}
              </div>
              <div className="relative  mb-3 ">
                <label
                  className="block uppercase dark:text-gray-200 text-xs font-bold mb-2"
                  htmlFor="message"
                >
                  {t("products.message")}
                </label>
                <textarea
                  name="feedback"
                  id="feedback"
                  rows="4"
                  cols="80"
                  className="border-0 px-3 py-3 bg-gray-300 placeholder-black text-gray-800 rounded text-sm shadow focus:outline-none xs:w-60"
                  placeholder=""
                  required
                ></textarea>
              </div>
              <div className="mt-6">
                <button
                  id="feedbackBtn"
                  className="bg-[#FBC02D] text-black text-center mx-auto active:bg-yellow-400 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="submit"
                >
                  {t("products.write")}
                </button>
              </div>
            </form>
          )}
        </>
      ) : (
        <>
          <Reviews product={product} showText={false} />
        </>
      )}
    </div>
  );
}
