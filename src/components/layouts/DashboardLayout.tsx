import { Suspense, useContext, type FC } from "react";
import { MainContext } from "../../helpers/others/mainContext";
import { DashboardRoutes } from "../others/DashboardRoutes";
import { useRoutes } from "react-router-dom";
import { Grid } from "@mui/material";
import { mainLayoutSX } from "../../helpers/styles/common/main";
import { LoadingSideBar, Loading } from "../common/Loading";
import { Navbar } from "../common/Navbar";
import { ProtectedLayout } from "./ProtectedLayout";
import Sidebar from "../../components/common/Sidebar";

export const DashboardLayout: FC = () => {
  const { theme, sidebarSize } = useContext(MainContext);
  const content = useRoutes(DashboardRoutes);

  const isLoadingSidebar = false;
  // const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  // const location = useLocation();

  // if (!isLoggedIn) {
  //   return <Navigate to="/login" replace state={{ from: location }} />;
  // }

  return (
    <ProtectedLayout>
      <Grid sx={mainLayoutSX(theme, sidebarSize)}>
        {isLoadingSidebar ? <LoadingSideBar /> : <Sidebar />}
        <Grid className="content-box">
          <Navbar />
          <Grid className="pages-box">
            <Grid className="items">
              <Suspense fallback={<Loading />}>{content}</Suspense>
            </Grid>
          </Grid>
          m
        </Grid>
      </Grid>
    </ProtectedLayout>
  );
};
