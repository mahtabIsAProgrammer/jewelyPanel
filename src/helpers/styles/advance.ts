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
      width: "100%",
      display: "flex",
      "& .grid-container": {
        display: "flex",
        flexDirection: "column",
        rowGap: SPACE_LG,
        padding: SPACE_LG,
        borderRadius: "12px",
        backgroundColor: COLOR_WHITE,
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
