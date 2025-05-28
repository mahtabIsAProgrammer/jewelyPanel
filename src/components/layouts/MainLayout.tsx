import { type FC, Suspense, useContext, useEffect } from "react";

import { SnackbarProvider } from "notistack";
import { useLocation, useRoutes } from "react-router-dom";
import { Grid, IconButton, ThemeProvider } from "@mui/material";

import {
  createTheme,
  extendTheme as materialExtendTheme,
  ThemeProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";

import { routes } from "../../routes";
import { Navbar } from "../common/Navbar";
import { Sidebar } from "../common/Sidebar";
import { Loading, LoadingSideBar } from "../common/Loading";
import { FONT_FAMILY } from "../../helpers/constants/static";
import { MainContext } from "../../helpers/others/mainContext";
import { mainLayoutSX } from "../../helpers/styles/common/main";
import { FONT_WEIGHT_REGULAR } from "../../helpers/constants/fonts";
import { COLOR_PRIMARY, COLOR_TEXT } from "../../helpers/constants/colors";
import { errorAlertICON, successAlertICON } from "../others/SvgComponents";

const MainLayout: FC = () => {
  const children = useRoutes(routes);

  const { pathname } = useLocation();

  const isLoadingSidebar = false;

  const themeMUI = createTheme({
    palette: { primary: { main: COLOR_PRIMARY } },
    typography: {
      fontFamily: FONT_FAMILY,
      allVariants: { color: COLOR_TEXT, fontWeight: FONT_WEIGHT_REGULAR },
    },
  });

  const materialTheme = materialExtendTheme(themeMUI);
  const { theme, sidebarSize } = useContext(MainContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ThemeProvider theme={themeMUI}>
      <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
        <SnackbarProvider
          iconVariant={{
            success: (
              <IconButton className="alert-icon">
                {successAlertICON()}
              </IconButton>
            ),

            error: (
              <IconButton className="alert-icon">{errorAlertICON()}</IconButton>
            ),
          }}
          style={{
            direction: "ltr",
            backgroundColor: "#000",
            color: "#fff",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "normal",
            borderRadius: "12px",
            boxShadow: "0px 8px 16px 0px rgba(145, 158, 171, 0.16)",
          }}
        >
          <Suspense fallback={<Loading />}>
            <Grid sx={mainLayoutSX(theme, sidebarSize)}>
              {isLoadingSidebar ? <LoadingSideBar /> : <Sidebar />}
              <Grid className="content-box">
                <Navbar />
                <Grid className="pages-box">
                  <Grid className="items">
                    <Suspense fallback={<Loading />}>{children}</Suspense>
                  </Grid>
                </Grid>
                m
              </Grid>
            </Grid>
          </Suspense>
        </SnackbarProvider>
      </MaterialCssVarsProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
