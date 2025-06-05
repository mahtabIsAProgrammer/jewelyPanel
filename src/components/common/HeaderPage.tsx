import type { FC } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import type { JSX } from "@emotion/react/jsx-runtime";
import { Box, Typography, type SxProps, type Theme } from "@mui/material";

import { BreadCrumbs } from "./Breadcrumbs";
import { localNavigateHandler } from "../../helpers/utils/handlers";
import { SPACE_MD, SPACE_SM } from "../../helpers/constants/spaces";
import { CustomButton, type TCustomButton } from "../controllers/CustomButton";
import { FONT_BODY, FONT_WEIGHT_REGULAR } from "../../helpers/constants/fonts";

interface IHeaderPage {
  title: string;
  justHelmet?: boolean;
  localNavigate?: boolean;
  otherComponent?: JSX.Element;
  breadcrumbData: IBreadcrumbsItems[];
  button?: { props: TCustomButton; link?: string };
}

export const HeaderPage: FC<IHeaderPage> = ({
  title,
  button,
  justHelmet,
  localNavigate,
  breadcrumbData,
  otherComponent,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet
        title={"jewlery"}
        htmlAttributes={{ lang: "en" }}
        meta={[
          {
            name: "jewlery",
            content: "jewlery",
          },
        ]}
        link={[
          {
            rel: "icon",
            type: "image/png",
            href: "/fav.webp",
          },
        ]}
      />
      {justHelmet ? null : (
        <Box className="header-page-content" sx={headerPageSX}>
          <Box component="div">
            <Typography className="title">{title}</Typography>
            <BreadCrumbs breadcrumbs={breadcrumbData} className="breadcrumb" />
          </Box>

          <Box component="div" className="feature-box">
            {button?.props && (
              <Box
                onClick={() =>
                  localNavigate
                    ? localNavigateHandler(button.link ?? "")
                    : navigate(button.link ?? "")
                }
              >
                <CustomButton {...button?.props} />
              </Box>
            )}

            {otherComponent}
          </Box>
        </Box>
      )}
    </>
  );
};

const headerPageSX: SxProps<Theme> = {
  pb: SPACE_MD,
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
  borderRadius: "12px",
  justifyContent: "space-between",
  "& .title": {
    fontSize: FONT_BODY,
    fontWeight: FONT_WEIGHT_REGULAR,
  },
  "& .breadcrumb": {
    marginBottom: "50px !important",
  },
  "& .feature-box": {
    display: "flex",
    gap: SPACE_SM,
  },
};
