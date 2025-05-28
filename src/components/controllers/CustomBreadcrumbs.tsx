import {
  Box,
  type Theme,
  Breadcrumbs,
  type SxProps,
  type BreadcrumbsTypeMap,
} from "@mui/material";
import { type ElementType, type ReactNode, memo } from "react";

import {
  FONT_CAPTION,
  FONT_WEIGHT_REGULAR,
} from "../../helpers/constants/fonts";
import { arrowLeftICON } from "../others/SvgComponents";
import { SPACE_SM } from "../../helpers/constants/spaces";
import type { OverrideProps } from "@mui/material/OverridableComponent";
import { COLOR_MUTED_TEXT, COLOR_TEXT } from "../../helpers/constants/colors";

export interface ICustomBreadcrumbs
  extends OverrideProps<BreadcrumbsTypeMap<object, "nav">, ElementType> {
  sx?: SxProps<Theme>;
  separator?: ReactNode;
  breadcrumbs: ICustomBreadcrumbsItems[];
}

export const CustomBreadCrumbs = memo<ICustomBreadcrumbs>(
  ({ breadcrumbs, separator }) => {
    return (
      <Breadcrumbs
        className="breadcrumbs"
        separator={
          separator || (
            <Box
              component="div"
              sx={{
                width: "16px",
                height: "16px",
                "& svg": { width: "16px", height: "16px" },
              }}
            >
              {arrowLeftICON()}
            </Box>
          )
        }
        aria-label="breadcrumb"
        sx={breadcrumbsSX}
      >
        {breadcrumbs.map(({ name, link, clickHandler }, index) => (
          <Box
            className="breadcrumbs-item"
            onClick={() => clickHandler && clickHandler(link)}
            key={index}
          >
            {name}
          </Box>
        ))}
      </Breadcrumbs>
    );
  }
);

const breadcrumbsSX: SxProps<Theme> = {
  mt: SPACE_SM,
  "& .breadcrumbs-item": {
    cursor: "pointer",
    transition: "0.3s",
    textDecoration: "none",
    color: COLOR_MUTED_TEXT,
    fontSize: FONT_CAPTION,
    fontWeight: FONT_WEIGHT_REGULAR,
    "&:hover": {
      color: COLOR_TEXT,
    },
  },
  "& .MuiBreadcrumbs-separator": {
    marginX: SPACE_SM,
  },
  "& li:last-child .breadcrumbs-item": {
    pointerEvents: "none",
    color: COLOR_TEXT,
  },
};
