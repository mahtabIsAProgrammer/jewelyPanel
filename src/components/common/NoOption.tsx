import { Grid, Typography, type SxProps, type Theme } from "@mui/material";

import { FONT_BODY } from "../../helpers/constants/fonts";
import { CustomImageBox } from "../controllers/CustomImage";
import { COLOR_MUTED_TEXT } from "../../helpers/constants/colors";

import noData from "../../assets/images/no-data.webp";
import { memo } from "react";
import { SPACE_MD } from "../../helpers/constants/spaces";

export const NoData = memo(() => {
  return (
    <Grid sx={noDataSX}>
      <CustomImageBox src={noData} />
      <Typography className="text">😕 No data to show right now.</Typography>
    </Grid>
  );
});

const noDataSX: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  pb: SPACE_MD,
  "& .image-box": {
    width: "200px",
  },
  "& .text": {
    fontSize: FONT_BODY,
    color: COLOR_MUTED_TEXT,
  },
};
