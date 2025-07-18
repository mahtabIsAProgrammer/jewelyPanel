import type { SxProps, Theme } from "@mui/material";

import {
  FONT_BODY,
  FONT_SMALL_TEXT,
  FONT_WEIGHT_BLOD,
  FONT_WEIGHT_MEDUIM,
  FONT_HEADING_MEDIUM,
} from "../../constants/fonts";
import {
  COLOR_WHITE,
  COLOR_PRIMARY,
  COLOR_MUTED_TEXT,
  COLOR_SIDEBAR_HOVER,
  COLOR_BLACK,
} from "../../constants/colors";
import { sidebar_size } from "../../constants/static";
import { SPACE_SM, SPACE_XS } from "../../constants/spaces";

export const sidebarSX = (theme: TTheme): SxProps<Theme> => ({
  width: { xs: "60px", md: `${sidebar_size} !important` },
  p: SPACE_SM,
  gap: SPACE_XS,
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme === "light" ? COLOR_WHITE : COLOR_BLACK,
  "& .logo": {
    mt: "10px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: SPACE_SM,
    "& .image-box": {
      width: "45px",
      height: "45px",
    },
    "& .texts": {
      flexDirection: "column",
      display: { xs: "none", md: "flex" },
      "& .title": {
        fontSize: FONT_HEADING_MEDIUM,
        fontWeight: FONT_WEIGHT_BLOD,
      },
      "& .subtitle": {
        fontSize: FONT_SMALL_TEXT,
        color: COLOR_MUTED_TEXT,
      },
    },
  },
  "& .lists": {
    mt: "30px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: SPACE_XS,
    "& .links": {
      p: SPACE_SM,
      display: "flex",
      borderRadius: "8px",
      justifyContent: "space-between",
      "& .text": {
        display: { xs: "none", md: "flex" },
        fontSize: FONT_BODY,
        fontWeight: FONT_WEIGHT_MEDUIM,
      },
      "&:hover": {
        backgroundColor:
          theme == "light" ? COLOR_SIDEBAR_HOVER : COLOR_PRIMARY + 30,
      },
      "&.active": {
        backgroundColor: COLOR_PRIMARY,
        color: `${COLOR_WHITE} !important`,
        "& p": {
          color: `${COLOR_WHITE} !important`,
        },
      },
    },
  },
});
