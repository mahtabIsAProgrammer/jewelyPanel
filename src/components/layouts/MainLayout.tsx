import { type FC, Suspense, useEffect } from "react";

import { SnackbarProvider } from "notistack";
import { useLocation, useRoutes } from "react-router-dom";
import { IconButton, ThemeProvider } from "@mui/material";

import {
  createTheme,
  extendTheme as materialExtendTheme,
  ThemeProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";
import { HelmetProvider } from "react-helmet-async";

import { routes } from "../../routes";
import { Loading } from "../common/Loading";
import { FONT_FAMILY } from "../../helpers/constants/static";
import {
  FONT_SMALL_TEXT,
  FONT_WEIGHT_BLOD,
  FONT_WEIGHT_REGULAR,
} from "../../helpers/constants/fonts";
import {
  COLOR_PRIMARY,
  COLOR_TEXT,
  COLOR_WHITE,
} from "../../helpers/constants/colors";
import { errorAlertICON, successAlertICON } from "../others/SvgComponents";
import { ProtectedLayout } from "./ProtectedLayout";

const MainLayout: FC = () => {
  const children = useRoutes(routes);

  const { pathname } = useLocation();

  const themeMUI = createTheme({
    palette: { primary: { main: COLOR_PRIMARY } },
    typography: {
      fontFamily: FONT_FAMILY,
      allVariants: { color: COLOR_TEXT, fontWeight: FONT_WEIGHT_REGULAR },
    },
  });

  const materialTheme = materialExtendTheme(themeMUI);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ThemeProvider theme={themeMUI}>
      <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
        <HelmetProvider>
          <SnackbarProvider
            iconVariant={{
              success: (
                <IconButton className="alert-icon">
                  {successAlertICON()}
                </IconButton>
              ),

              error: (
                <IconButton className="alert-icon">
                  {errorAlertICON()}
                </IconButton>
              ),
            }}
            style={{
              direction: "ltr",
              backgroundColor: COLOR_WHITE,
              color: COLOR_TEXT,
              fontSize: FONT_SMALL_TEXT,
              fontStyle: "normal",
              fontWeight: FONT_WEIGHT_BLOD,
              lineHeight: "normal",
              borderRadius: "12px",
              boxShadow: "0px 8px 16px 0px rgba(145, 158, 171, 0.16)",
            }}
          >
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </SnackbarProvider>
        </HelmetProvider>
      </MaterialCssVarsProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
