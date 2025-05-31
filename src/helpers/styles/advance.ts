import type { SxProps, Theme } from "@mui/material";
import { SPACE_LG, SPACE_MD } from "../constants/spaces";

export const pageProviderSX: SxProps<Theme> = {};
export const addEditPrivderSX: SxProps<Theme> = {
  "& .page-container": {
    padding: SPACE_LG,
    borderRadius: "12px",
    "& .form": {
      "& .grid-container": {
        display: "flex",
        flexDirection: "column",
        rowGap: SPACE_LG,
        "& .inputs-wrapper": {
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          rowGap: SPACE_MD,
        },
      },
    },
  },
};
