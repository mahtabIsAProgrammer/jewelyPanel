import { Grid, Box, type SxProps, type Theme } from "@mui/material";

export const Loading = () => {
  return (
    <Grid sx={laodingSX}>
      <Box>Loading...</Box>
    </Grid>
  );
};

const laodingSX: SxProps<Theme> = {
  width: "100%",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& .img-loading": {
    width: "600px",
  },
};

export const LoadingSideBar = () => {
  return <>Loading SideBar</>;
};
