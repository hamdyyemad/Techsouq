import { Typography } from "@material-tailwind/react";
import { RatingWithText } from "./RatingWithText";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";
export default function Reviews({ product, showText = true }) {
  const reviews = product?.reviews;
  const { t } = useTranslation();
  return (
    <div className="max-w-2xl sm:px-6 lg:grid lg:max-w-7xl  lg:gap-x-8 lg:px-8 xs:mt-5 ">
      {showText && (
        <Typography
          variant="h3"
          color="blue-gray"
          className={
            i18n.dir() === "rtl"
              ? "rtl mr-10 pr-10   text-3xl md:text-2xl lg:text-3xl dark:text-white"
              : "ml-10 pl-10   text-3xl md:text-2xl lg:text-3xl dark:text-white"
          }
        >
          {t("products.reviews")}
        </Typography>
      )}
      <ul className="p-5 ">
        {reviews.map((r, i) => (
          <li className="py-8 text-left  px-4 m-2 " key={i}>
            <div className="flex items-start">
              <img
                className="block h-10 w-10 max-w-full justify-self-center  self-center	flex-shrink-0 rounded-full align-middle"
                src="/assets/avatar.png"
                alt="avatar"
              />
              <div className="ml-3">
                <p className="mt-5 text-sm font-bold text-black dark:text-white">
                  {r.name}
                </p>
                <div className="flex items-center pt-3">
                  <RatingWithText
                    rating={r.rating}
                    reviews={product.numReviews}
                    showText={false}
                  />
                </div>
                <p className="mt-5 text-base text-black dark:text-white">
                  {r.comment}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
