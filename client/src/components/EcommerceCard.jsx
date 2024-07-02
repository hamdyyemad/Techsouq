import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import { RatingWithText } from "./RatingWithText";
import { addToCart } from "../slices/cartSlice";
import { addToFavorites, removeFromFavorites } from "../slices/favoriteSlice";
import { BASE_URL } from "../constants";
/* eslint-disable react/prop-types */
export default function EcommerceCard({
  product,
  id,
  disableCart = true,
  status = "",
  newArrival = false,
}) {
  const { image, name, price, description, rating, numReviews, countInStock } =
    product;
  const [isFav, setIsFav] = useState(false);
  const { t } = useTranslation();
  const { userInfo } = useSelector((state) => state.auth);
  if (userInfo?.role === "ADMIN" || userInfo?.role === "SELLER")
    disableCart = false;
  const { favoriteItems } = useSelector((state) => state.favorites);
  const isFavorite = favoriteItems.some((item) => item._id === id);
  const handleToggleFavorite = () => {
    if (isFavorite) {
      setIsFav(true);
      dispatch(removeFromFavorites(product));
    } else {
      setIsFav(false);
      dispatch(addToFavorites(product));
    }
  };
  const dispatch = useDispatch();

  const addedSuccessfully = () =>
    toast.success("Added Successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  const showReviewsText = true;
  function addToCardHandler() {
    if (!countInStock) return;
    dispatch(addToCart({ product }));
    addedSuccessfully();
  }
  return (
    <>
      <Card className="relative w-72 bg-white h-[545px] m-auto shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl dark:bg-[#151725]">
        <CardHeader
          shadow={false}
          floated={false}
          className="h-100 relative dark:bg-[#242635]"
        >
          <Button
            ripple={false}
            // fullWidth={true}
            onMouseEnter={() => setIsFav(true)}
            onMouseLeave={() => setIsFav(false)}
            onClick={handleToggleFavorite}
            className="bg-transparent p-2 absolute top-0 right-0 inline focus:outline-none transform scale-100 transition-transform duration-300 hover:scale-150 "
          >
            {isFavorite || isFav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="bi bi-heart-fill text-red-500"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="bi bi-heart text-red-500"
                viewBox="0 0 16 16"
              >
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
              </svg>
            )}
          </Button>
          <img
            // http://localhost:3001/uploads/image-1704202756669.png
            src={image.includes("/uploads") ? `${BASE_URL}${image}` : image}
            alt={name}
            className="h-[256px] w-[256px] object-cover z-10"
          />
        </CardHeader>
        {status === "pending" && (
          <span className="absolute top-0 left-0 w-20 translate-y-4 -translate-x-6 -rotate-45 bg-yellow-500 text-center text-sm text-white z-1000">
            {t("products.pending")}
          </span>
        )}
        {status === "accepted" && (
          <span className="absolute top-0 left-0 w-20 translate-y-4 -translate-x-6 -rotate-45 bg-green-500 text-center text-sm text-white z-1000">
            {t("products.accepted")}
          </span>
        )}

        {newArrival && (
          // text-1xl font-bold
          <span className="absolute top-0 left-6 w-[55px] h-[55px] flex items-center justify-center rounded-full translate-y-2 -translate-x-6 -rotate-12 bg-black text-center text-1xl font-bold text-white z-1000">
            {t("products.new")}
          </span>
        )}
        <Link to={`/products/${id}`}>
          <CardBody>
            <div className="mb-2 flex items-center justify-between">
              <Typography
                color="blue-gray"
                className="font-medium dark:text-white"
              >
                {name}
              </Typography>
              <Typography
                color="blue-gray"
                className="font-medium ml-6 dark:text-white"
              >
                ${price}
              </Typography>
            </div>
            <div
              style={{ maxHeight: "5rem", overflow: "hidden" }}
              className="mb-2"
            >
              <Typography
                variant="small"
                color="gray"
                className="font-normal opacity-75 dark:text-white"
              >
                {description}
              </Typography>
            </div>
            <RatingWithText
              rating={rating}
              reviews={numReviews}
              showText={showReviewsText}
            />
          </CardBody>
        </Link>
        {disableCart && (
          <CardFooter className="pt-0">
            <Button
              ripple={false}
              fullWidth={true}
              onClick={addToCardHandler}
              className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-700 absolute bottom-0 left-0 transform -translate-y-1"
              disabled={!countInStock}
            >
              {t("products.add_to_cart")}
            </Button>
          </CardFooter>
        )}
      </Card>
    </>
  );
}
