import { Grid, Skeleton, Box } from "@mui/material";
import { mainLayoutSX } from "../../helpers/styles/common/main";
import { MainContext } from "../../helpers/others/mainContext";
import { useContext } from "react";

export const Loading = () => {
  const { theme } = useContext(MainContext);
  return (
    <Grid container sx={mainLayoutSX(theme, "none")}>
      <Grid className="content-box">
        <Grid className="pages-box">
          <Grid className="items">
            <Box>
              <Skeleton variant="text" width="200px" height="40px" />
              <Skeleton variant="text" width="400px" height="40px" />
            </Box>
            <Skeleton variant="rounded" width="100%px" height="70vh" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export const LoadingSidebar = () => {
  return <></>;
};

export const LoadingSideBar = () => {
  return <>Loading SideBar</>;
};
