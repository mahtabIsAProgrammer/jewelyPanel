import {
  Grid,
  Autocomplete,
  type Theme,
  type SxProps,
  type AutocompleteProps,
  type FilterOptionsState,
  Box,
} from "@mui/material";
import { memo } from "react";
import { filter, isArray } from "lodash";

import { CustomTextfield } from "./CustomTextfield";
import {
  FONT_SMALL_TEXT,
  FONT_WEIGHT_MEDUIM,
} from "../../helpers/constants/fonts";
import {
  SPACE_LG,
  SPACE_MD,
  SPACE_SM,
  SPACE_XS,
} from "../../helpers/constants/spaces";
import {
  COLOR_PRIMARY,
  COLOR_TEXT,
  COLOR_WHITE,
} from "../../helpers/constants/colors";
import { CustomChip } from "./CustomChip";
import { STYLE_AUTOCOMPLETE_ITEMS } from "../../helpers/constants/material";

export interface ICustomAutoComplete
  extends Omit<
    AutocompleteProps<
      IOption,
      boolean | undefined,
      boolean | undefined,
      boolean | undefined
    >,
    "renderInput"
  > {
  loading?: boolean;
  errorMessage?: IErrorMessage;
  customLabel?: string;
  required?: boolean;
}

const EMPTY_VALUE = "nothing found!";
const noOptionsText = (
  <Box
    sx={{
      color: COLOR_PRIMARY,
      textAlign: "center",
      width: "100%",
    }}
  >
    {EMPTY_VALUE}
  </Box>
);
const filterOptions = (
  options: IOption[],
  params: FilterOptionsState<IOption>
) => {
  //const filtered = filter(options, params);
  const { inputValue } = params;
  const filtered = filter(options, ({ label }) => {
    return label?.toLowerCase()?.includes(inputValue);
  });

  return filtered;
};

const renderValue = (
  value: (string | IOption)[] | string | IOption,
  getItemProps: TAny
) => {
  const safeArray = isArray(value) ? value : [value];

  return safeArray.map((option: IOption | string, index: number) => {
    const { key, ...itemProps } = getItemProps({ index });

    return (
      <CustomChip
        color="primary"
        sx={{ marginRight: `${SPACE_XS} !important` }}
        label={
          typeof option === "object" && "label" in option
            ? option.label
            : option
        }
        key={key}
        {...itemProps}
      />
    );
  });
};

export const CustomAutoComplete = memo<ICustomAutoComplete>(
  ({ errorMessage, options, customLabel, required, ...props }) => {
    return (
      <Grid
        sx={customAutoCompleteSX}
        component="div"
        className="autocomplete-chip-wrapper"
      >
        <Autocomplete
          noOptionsText={noOptionsText}
          options={options}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.label
          }
          slotProps={{ listbox: { sx: STYLE_AUTOCOMPLETE_ITEMS } }}
          filterOptions={(options: IOption[], params) =>
            filterOptions(options, params)
          }
          renderValue={(value, getTagProps) => renderValue(value, getTagProps)}
          renderInput={({
            id,
            size,
            disabled,
            fullWidth,
            inputProps,
            InputProps: { endAdornment, ref },
          }) => (
            <CustomTextfield
              {...{
                id,
                size,
                disabled,
                fullWidth,
                inputProps,
                InputProps: { endAdornment, ref },
                InputLabelProps: { required: false },
              }}
              isAutocomplete
              required={required}
              customLabel={customLabel}
              errorMessage={errorMessage}
            />
          )}
          {...props}
        />
      </Grid>
    );
  }
);

const customAutoCompleteSX: SxProps<Theme> = {
  "& .MuiInputBase-root": {
    borderRadius: "12px",
    paddingRight: `${SPACE_MD} !important`,
    "&.Mui-focused": {
      backgroundColor: `${`${COLOR_PRIMARY}20`}10`,
    },
  },
  "& div.MuiAutocomplete-endAdornment": {
    position: "absolute",
    right: "12px !important",
  },
  "& .MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-endAdornment":
    {
      right: "0",
    },
  "& .MuiAutocomplete-popper": {
    width: { xs: "100%", md: "450px" },
    my: `${SPACE_SM} !important`,
    boxShadow: "unset !important",
    borderRadius: `12px`,
    "& .MuiPaper-root ": {
      py: SPACE_XS,
      maxHeight: "340px",
      minWidth: "100px !important",
      overflowY: "hidden",
      background: COLOR_WHITE,
      pl: `${SPACE_LG} !important`,
      pr: `${SPACE_MD} !important`,
      borderRadius: "12px",
    },
  },
  "& .MuiInputBase-input": {
    color: `${COLOR_TEXT} !important`,
    paddingRight: `${SPACE_XS} !important`,
    fontSize: `${FONT_SMALL_TEXT} !important`,
    fontWeight: `${FONT_WEIGHT_MEDUIM} !important`,
    "::placeholder": {
      color: "#919EAB",
    },
  },
  "& .MuiAutocomplete-option": {
    display: "flex",
    justifyContent: "flex-start",
    mb: SPACE_XS,
    height: "45px",
    width: "97% !important",
    borderRadius: "8px",
    fontSize: `${FONT_SMALL_TEXT} !important`,
    "&:hover": {
      background: `${"#919EAB"}20`,
    },
  },
};
