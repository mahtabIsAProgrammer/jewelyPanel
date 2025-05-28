import type { SxProps, Theme } from "@mui/material";

import {
  FONT_BODY,
  FONT_TITLE,
  FONT_SMALL_TEXT,
  FONT_WEIGHT_BLOD,
  FONT_WEIGHT_MEDUIM,
} from "../../constants/fonts";
import {
  COLOR_WHITE,
  COLOR_PRIMARY,
  COLOR_MUTED_TEXT,
  COLOR_SIDEBAR_HOVER,
} from "../../constants/colors";
import { sidebar_size } from "../../constants/static";
import { SPACE_SM, SPACE_XS } from "../../constants/spaces";

export const sidebarSX: SxProps<Theme> = {
  width: sidebar_size,
  height: "100vh",

  p: SPACE_SM,
  display: "flex",
  flexDirection: "column",
  gap: SPACE_XS,
  "& .profile-info": {
    mt: "10px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: SPACE_SM,
    "& .custom-avatar": {
      width: "60px",
      height: "60px",
    },
    "& .texts": {
      display: "flex",
      flexDirection: "column",
      "& .title": {
        fontSize: FONT_TITLE,
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
        fontSize: FONT_BODY,
        fontWeight: FONT_WEIGHT_MEDUIM,
      },
      "&:hover": {
        backgroundColor: COLOR_SIDEBAR_HOVER,
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
};
