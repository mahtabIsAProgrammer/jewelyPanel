import { useContext, type FC } from "react";
import { map } from "lodash";
import { Grid, Typography } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

import {
  faqICON,
  blogICON,
  userIcon,
  productICON,
  commentICON,
  categoryICON,
  dashboardICON,
} from "../others/SvgComponents";
import { COLOR_WHITE } from "../../helpers/constants/colors";
import { sidebarSX } from "../../helpers/styles/common/sidebar";
import { CustomIcon, CustomImageBox } from "../controllers/CustomImage";
import { MainContext } from "../../helpers/others/mainContext";

const Sidebar: FC = () => {
  const { theme } = useContext(MainContext);
  const location = useLocation();
  return (
    <Grid sx={sidebarSX(theme)}>
      <Grid className="logo">
        <CustomImageBox src="/fav.webp" />
        <Grid className="texts">
          <Typography className="title">Jelwery</Typography>
        </Grid>
      </Grid>
      <Grid className="lists">
        {map(routes, ({ name, url, icon }, index) => (
          <NavLink
            key={index}
            className={location.pathname == url ? "links active" : "links"}
            to={url}
          >
            <Typography className="text">{name}</Typography>
            <CustomIcon
              src={icon(location.pathname == url ? COLOR_WHITE : undefined)}
            />
          </NavLink>
        ))}
      </Grid>
    </Grid>
  );
};

export default Sidebar;

const routes = [
  {
    name: "dashboard",
    url: "/",
    icon: dashboardICON,
  },
  {
    name: "users",
    url: "/users",
    icon: userIcon,
  },
  { name: "products", url: "/products", icon: productICON },
  { name: "comments", url: "/comments", icon: commentICON },
  { name: "blogs", url: "/blogs", icon: blogICON },
  { name: "categories", url: "/categories", icon: categoryICON },
  { name: "faqs", url: "/faqs", icon: faqICON },
];
