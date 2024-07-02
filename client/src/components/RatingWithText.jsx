import { Rating, Typography } from "@material-tailwind/react";

/* eslint-disable react/prop-types */
export function RatingWithText({ rating, reviews, showText }) {
  const stars = Math.floor(rating);
  return (
    <div className="flex items-center gap-2 font-bold text-blue-gray-500">
      {rating}
      <Rating value={stars} readonly />
      {showText && (
        <Typography
          variant="small"
          color="blue-gray"
          className="text-blue-gray-500"
        >
          Based on {reviews} Reviews
        </Typography>
      )}
    </div>
  );
}
