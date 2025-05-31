import { Rating, type RatingProps } from "@mui/material";
import { memo } from "react";
import { ratingFilledIcon, ratingEmptyIcon } from "../others/SvgComponents";

interface IRating extends Omit<RatingProps, "size"> {
  size?: "small" | "medium" | "large";
}

const sizeObj = {
  small: "16px",
  large: "24px",
  medium: "20px",
};

export const CustomRating = memo<IRating>(({ size, ...props }) => {
  return (
    <Rating
      {...props}
      sx={{
        "&.MuiRating-root": {
          gap: "2px",
          "& svg": {
            width: sizeObj[size || "large"],
            height: sizeObj[size || "large"],
          },
        },
      }}
      icon={ratingFilledIcon()}
      emptyIcon={ratingEmptyIcon()}
    />
  );
});
