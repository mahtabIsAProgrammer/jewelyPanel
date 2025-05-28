import { type FC } from "react";
import { Grid, type Theme, type SxProps } from "@mui/material";

import {
  SPACE_LG,
  SPACE_MD,
  SPACE_SM,
  SPACE_XS,
} from "../../helpers/constants/spaces";
import { MAX_WIDTH } from "../../helpers/constants/static";
import { COLOR_PRIMARY } from "../../helpers/constants/colors";

import { FONT_BODY, FONT_WEIGHT_REGULAR } from "../../helpers/constants/fonts";

export const Navbar: FC = () => {
  return (
    <Grid sx={navbarSX} size={{ xs: 11.2 }}>
      Navbar
    </Grid>
  );
};

const navbarSX: SxProps<Theme> = {
  px: SPACE_MD,
  py: SPACE_SM,
  top: "16px",
  mx: { xs: SPACE_SM, lg: "auto" },
  display: "flex",
  maxWidth: MAX_WIDTH,
  position: "sticky",
  borderRadius: "22px",
  alignItems: "center",
  justifyContent: "space-between",
  backdropFilter: "brightness(0.3)",

  zIndex: "222",
  "& .logo": {
    width: "150px",
    cursor: "pointer",
  },
  "& .list": {
    display: "flex",
    gap: SPACE_LG,
    ml: "150px",
    "& .link": {
      position: "relative",
      color: "#FFFFFF",
      textDecoration: "none",
      fontSize: FONT_BODY,
      fontWeight: FONT_WEIGHT_REGULAR,
      "&::after": {
        content: '""',
        position: "absolute",
        left: 0,
        bottom: -2,
        width: 0,
        height: "2px",
        backgroundColor: COLOR_PRIMARY,
        transition: "width 0.3s ease",
      },
      "&:hover::after": {
        width: "100%",
      },
      "&.active::after": {
        width: "100%",
      },
    },
  },
  "& .buttons": {
    display: "flex",
    gap: SPACE_XS,
  },
};
