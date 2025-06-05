import { useContext, useState, type FC } from "react";
import { Grid, Typography } from "@mui/material";

import { navbarSX } from "../../helpers/styles/common/navbar";
import { MainContext } from "../../helpers/others/mainContext";
import { CustomAvatar } from "../controllers/CustomImage";
import { CustomSwitch } from "../controllers/CustomSwitch";

export const Navbar: FC = () => {
  const { theme, changeTheme } = useContext(MainContext);
  const [checked, setChecked] = useState<boolean>(false);

  const userJsonData = localStorage.getItem("user");
  const userData = JSON.parse(userJsonData || "");

  return (
    <Grid sx={navbarSX(theme)}>
      <Grid className="content">
        <Grid className="profile-info">
          <CustomAvatar hasBorder src="" />
          <Typography className="title">
            {userData.firstName + " " + userData.lastName}
          </Typography>
        </Grid>
        <CustomSwitch
          checked={!checked}
          onChange={(e) => {
            const isChecked = e.target.checked;
            setChecked(!isChecked);
            changeTheme(!isChecked ? "dark" : "light");
          }}
        />
      </Grid>
    </Grid>
  );
};
