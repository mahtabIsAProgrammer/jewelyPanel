import { Box, Grid, Typography, type SxProps, type Theme } from "@mui/material";

import { COLOR_TEXT } from "../../helpers/constants/colors";
import { SPACE_SM, SPACE_XS } from "../../helpers/constants/spaces";
import { FONT_BUTTON, FONT_WEIGHT_BLOD } from "../../helpers/constants/fonts";
import { memo } from "react";

export type TCustomLabel = {
  customLabel?: string;
  //   subTitleLabel?: string;
  required?: boolean;
  disabled?: boolean;
  gap?: number | string;
};

export const CustomLabel = memo<TCustomLabel>(
  ({
    //   subTitleLabel,
    customLabel,
    ...props
  }) => {
    const { required, gap, disabled } = props;

    return (
      <Grid container gap={gap}>
        <Grid className="label-box" sx={{ display: "flex", gap: SPACE_SM }}>
          {customLabel && (
            <Typography
              variant="body1"
              className="label-local-text-field"
              sx={STYLE_LABEL(disabled)}
            >
              {customLabel}
              {required && (
                <Box
                  component="span"
                  className="required-icon"
                  sx={STYLE_REQUIRED_ICON(disabled)}
                >
                  *
                </Box>
              )}
            </Typography>
          )}
        </Grid>
        {/* {subTitleLabel && (
        <Typography variant="h1" sx={STYLE_SUBTITLE_LABEL(dir, disabled)}>
          {subTitleLabel}
        </Typography>
      )} */}
      </Grid>
    );
  }
);

const STYLE_LABEL = (disabled?: boolean): SxProps<Theme> => ({
  display: "flex",
  color: COLOR_TEXT,
  marginBottom: SPACE_SM,
  fontSize: FONT_BUTTON,
  fontWeight: FONT_WEIGHT_BLOD,
  flexDirection: "row",
  opacity: disabled ? 0.4 : 1,
});

const STYLE_REQUIRED_ICON = (disabled?: boolean): SxProps<Theme> => ({
  color: "red",
  px: SPACE_XS,
  opacity: disabled ? 0.4 : 1,
});
