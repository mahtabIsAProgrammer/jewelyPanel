import type { SxProps, Theme } from "@mui/material";

import { SPACE_LG, SPACE_SM } from "../constants/spaces";
import { COLOR_WHITE } from "../constants/colors";

export const pageProviderSX: SxProps<Theme> = {
  padding: SPACE_LG,
  borderRadius: "12px",
  backgroundColor: COLOR_WHITE,
  boxShadow: "0px 4px 6px -2px #A3A3A308 , 0px 12px 16px -4px #A3A3A308",

  "& .filters": {
    display: "flex",
    gap: SPACE_SM,
    mb: SPACE_LG,
  },
};
export const addEditPrivderSX: SxProps<Theme> = {
  padding: SPACE_LG,
  borderRadius: "12px",
  backgroundColor: COLOR_WHITE,
  boxShadow: "0px 4px 6px -2px #A3A3A308 , 0px 12px 16px -4px #A3A3A308",

  "& .page-container": {
    "& .form-container": {
      display: "flex",
      gap: SPACE_LG,
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
