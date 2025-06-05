import type { SxProps, Theme } from "@mui/material";

import { SPACE_LG, SPACE_SM } from "../../constants/spaces";
import { HEADER_BAR_SIZE } from "../../constants/static";
import { COLOR_BLACK, COLOR_WHITE } from "../../constants/colors";
import { FONT_WEIGHT_BLOD } from "../../constants/fonts";

export const navbarSX = (theme: string): SxProps<Theme> => ({
  p: SPACE_LG,
  width: "100%",
  display: "flex",
  alignItems: "center",
  height: HEADER_BAR_SIZE,
  justifyContent: "space-between",
  backgroundColor: theme === "light" ? COLOR_WHITE : COLOR_BLACK,
  "& .content": {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    "& .profile-info": {
      display: "flex",
      alignItems: "center",
      gap: SPACE_SM,
      "& .title": {
        fontWeight: FONT_WEIGHT_BLOD,
      },
    },
  },
});
