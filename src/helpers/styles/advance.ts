import type { SxProps, Theme } from "@mui/material";

import { SPACE_LG } from "../constants/spaces";
import { COLOR_WHITE } from "../constants/colors";

export const pageProviderSX: SxProps<Theme> = {
  "& .MuiInputBase-root": {
    "& .MuiInputBase-input": {
      backgroundColor: `${COLOR_WHITE} !important`,
    },
  },
};
export const addEditPrivderSX: SxProps<Theme> = {
  "& .page-container": {
    "& .form-container": {
      display: "flex",
      gap: SPACE_LG,
      padding: SPACE_LG,
      borderRadius: "12px",
      backgroundColor: COLOR_WHITE,
      "& .grid-container": {
        display: "flex",
        width: "100%",
        rowGap: SPACE_LG,
        flexDirection: "column",
        "& .inputs-wrapper": {
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        },
      },
    },
  },
};
