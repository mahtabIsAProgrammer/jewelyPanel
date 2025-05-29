import type { SxProps, Theme } from "@mui/material";

import {
  FONT_BODY,
  FONT_CAPTION,
  FONT_WEIGHT_BLOD,
  FONT_WEIGHT_REGULAR,
} from "../../constants/fonts";
import { SPACE_SM } from "../../constants/spaces";
import { COLOR_TEXT } from "../../constants/colors";

export const notFoundSX: SxProps<Theme> = {
  display: "flex",
  height: "100%",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  "& img": {
    height: "380px",
    maxHeight: "400px",
    marginBottom: SPACE_SM,
  },

  "& .title": {
    fontSize: FONT_BODY,
    fontWeight: FONT_WEIGHT_BLOD,
    color: COLOR_TEXT,
  },
  "& .description": {
    fontSize: FONT_CAPTION,
    fontWeight: FONT_WEIGHT_REGULAR,
    color: COLOR_TEXT,
    textAlign: "center",
    maxWidth: "70%",
    marginTop: SPACE_SM,
  },
};
