import { Grid, Typography } from "@mui/material";
import type { FC } from "react";
import { HeaderPage } from "./HeaderPage";
import { notFoundSX } from "../../helpers/styles/pages/notFound";
export const NotFound: FC = () => {
  return (
    <Grid container sx={notFoundSX}>
      <HeaderPage title="not_found" breadcrumbData={[]} justHelmet />
      {/* <Box component="img" src={currentCommonImagesPages["404"]} /> */}
      <Typography variant="caption" className="title">
        Page was not found
      </Typography>
      <Typography variant="body1" className="description">
        Lorem Epsom is Fake text produced with incomprehensible simplicity from
        the printing industry and using graphic designers, printers and texts,
        but also newspapers and magazines in columns and rows as necessary
      </Typography>
    </Grid>
  );
};
