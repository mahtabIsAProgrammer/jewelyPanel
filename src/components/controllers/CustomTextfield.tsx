import { memo, type FC, type ReactElement } from "react";

import {
  Grid,
  TextField,
  Typography,
  type Theme,
  type SxProps,
  type TextFieldProps,
  type TextFieldVariants,
  InputAdornment,
  Box,
  IconButton,
} from "@mui/material";

import {
  FONT_SMALL_TEXT,
  FONT_WEIGHT_MEDUIM,
} from "../../helpers/constants/fonts";
import { COLOR_PRIMARY, COLOR_TEXT } from "../../helpers/constants/colors";
import { CustomLabel } from "./CustomLabel";
import { SPACE_MD, SPACE_SM } from "../../helpers/constants/spaces";
import { ERROR_MESSAGE_STYLE } from "../../helpers/constants/material";
import { errorIcon, warningIcon } from "../others/SvgComponents";

export type TCustomTextfield =
  | {
      customLabel?: string;
      required?: boolean;
      variant?: TextFieldVariants;
      errorMessage?: IErrorMessage;
      disabled?: boolean;
      icon?: ReactElement;
      type?: "textarea" | "password" | "simple";
    } & Omit<TextFieldProps, "variant"> & {};

export const CustomTextfield = memo<TCustomTextfield>(
  ({
    errorMessage,
    customLabel,
    className,
    required,
    disabled,
    type,
    icon,
    ...props
  }) => {
    return (
      <Grid
        container
        className="textfield-wrapper"
        sx={textfieldSX(disabled, type)}
      >
        <Grid className="label-box" sx={{ display: "flex", gap: SPACE_SM }}>
          {customLabel ? (
            <CustomLabel customLabel={customLabel} required={required} />
          ) : undefined}
        </Grid>
        <TextField
          slotProps={{
            input: {
              endAdornment: icon && (
                <InputAdornment position="end">
                  {icon && <IconButton>{icon}</IconButton>}
                </InputAdornment>
              ),
            },
          }}
          {...props}
          required={undefined}
          className={className && "custom-textfield"}
        />
        {errorMessage && (
          <ErrorMessage
            text={errorMessage?.text || ""}
            type={errorMessage?.type || "error"}
            disabled={disabled || false}
          />
        )}
      </Grid>
    );
  }
);

export const ErrorMessage: FC<IErrorMessage> = ({ text, type, disabled }) => {
  return (
    <Box
      component="div"
      sx={ERROR_MESSAGE_STYLE(disabled)}
      className="error-message"
    >
      {text && type === "warning"
        ? warningIcon()
        : text && type === "error"
        ? errorIcon()
        : ""}
      <Typography variant="body1" className="text-icon">
        {text}
      </Typography>
    </Box>
  );
};

const textfieldSX = (
  disabled: TCustomTextfield["disabled"],
  type?: TCustomTextfield["type"]
): SxProps<Theme> => ({
  width: "100%",
  display: "flex",
  pb: SPACE_MD,
  flexDirection: "column",
  "& .custom-textfield": {
    width: "100%",
    borderRadius: "12px",
    opacity: disabled ? 0.4 : 1,
  },
  "& .MuiInputBase-root": {
    outline: "none",
    color: COLOR_TEXT,
    fontSize: FONT_SMALL_TEXT,
    borderRadius: "12px",
    fontWeight: FONT_WEIGHT_MEDUIM,
    "&.Mui-focused": {
      backgroundColor: `${COLOR_PRIMARY}10 !important`,
    },
    "&:hover fieldset": {
      borderColor: disabled ? "none" : COLOR_PRIMARY,
    },
  },
  "& .icon-search": {
    cursor: "pointer",
  },
  "& .MuiTextField-root": {
    "& .MuiFormLabel-asterisk.MuiInputLabel-asterisk": {
      "&::after": {
        content: '"mandatory field"',
      },
    },
    "& .MuiInputLabel-root": {
      left: "0px",
    },
    "& legend": {
      textAlign: "left",
    },
  },
  "& .MuiIconButton-root": {
    padding: "0px !important",
  },
  "& .MuiInputBase-input": {
    color: `${COLOR_TEXT} !important`,
    fontSize: `${FONT_SMALL_TEXT} !important`,
    fontWeight: `${FONT_WEIGHT_MEDUIM} !important`,
    pl: "14px",
    "::placeholder": {
      color: "#919EAB",
    },
  },

  "& .MuiInputLabel-root": {
    left: "0px",
    transformOrigin: "top left",
  },
  "& legend": {
    textAlign: "left",
  },
  "& .delete-icon-button": {
    "&:hover": {
      background: "transparent !important",
    },
  },
});
