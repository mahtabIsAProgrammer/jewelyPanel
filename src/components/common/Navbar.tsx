import { memo, useContext, useState } from "react";
import { Grid, Typography } from "@mui/material";

import { CustomAvatar } from "../controllers/CustomImage";
import { CustomSwitch } from "../controllers/CustomSwitch";
import { useGetUserById } from "../../services/hooks/users";
import { handleImageUrl } from "../../helpers/utils/handlers";
import { navbarSX } from "../../helpers/styles/common/navbar";
import { MainContext } from "../../helpers/others/mainContext";

export const Navbar = memo(() => {
  const { theme, changeTheme } = useContext(MainContext);
  const [checked, setChecked] = useState<boolean>(false);

  const userJsonData = localStorage.getItem("user");
  let user = {};

  try {
    user = userJsonData ? JSON.parse(userJsonData) : {};
  } catch (e) {
    console.error("Failed to parse user from localStorage:", e);
    user = {};
  }

  const { data: userById } = useGetUserById((user as TAny)?.id);

  const { imageUrl, lastName, firstName } =
    (userById as unknown as { data: Users & { password: string } })?.data ?? {};

  return (
    <Grid sx={navbarSX(theme)}>
      <Grid className="content">
        <Grid className="profile-info">
          <CustomAvatar hasBorder src={handleImageUrl(imageUrl || "")} />
          <Typography className="title">
            {firstName + " " + lastName || "______"}
          </Typography>
        </Grid>
        <CustomSwitch
          checked={checked}
          onChange={(e) => {
            const isChecked = e.target.checked;
            setChecked(isChecked);
            changeTheme(isChecked ? "dark" : "light");
          }}
        />
      </Grid>
    </Grid>
  );
});
