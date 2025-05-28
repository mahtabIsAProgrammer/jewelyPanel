import { useContext, type FC } from "react";
import { Grid, Typography } from "@mui/material";

import { navbarSX } from "../../helpers/styles/common/navbar";
import { MainContext } from "../../helpers/others/mainContext";

export const Navbar: FC = () => {
  const { theme } = useContext(MainContext);
  return (
    <Grid sx={navbarSX(theme)}>
      <Grid className="content">
        <Typography>Jewelry Panel</Typography>
        <Typography>Setting</Typography>
      </Grid>
    </Grid>
  );
};
