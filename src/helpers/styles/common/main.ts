import type { SxProps, Theme } from "@mui/material";

import {
  COLOR_BACKGROUND,
  COLOR_DARK_BACKGROUND,
} from "../../constants/colors";
import { SPACE_MD } from "../../constants/spaces";
import { SIDE_BAR_SIZE } from "../../constants/static";

export const mainLayoutSX = (
  theme: string,
  sidebarSize: TSidebarSize
): SxProps<Theme> => ({
  width: "100%",
  // direction: dir,
  display: "flex",
  minHeight: "100vh",
  "& .content-box": {
    backgroundColor:
      theme === "light" ? COLOR_BACKGROUND : COLOR_DARK_BACKGROUND,
    width: {
      xs: "calc(100% - 60px)",
      md: `calc(100% - ${SIDE_BAR_SIZE[sidebarSize]})`,
    },
    overflow: "auto",
    transition: ".2s all",
  },

  "& .pages-box": {
    scrollBehavior: "smooth",
    animation: "fadeIn 0.3s",
    height: "100vh",
    padding: SPACE_MD,
    overflow: "auto",
    "& .items": {
      maxWidth: "1500px",
      margin: "auto",
      height: "100%",
    },
  },
});
