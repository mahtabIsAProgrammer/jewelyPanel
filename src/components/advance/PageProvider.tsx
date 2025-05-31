import { Box, MenuItem } from "@mui/material";
import { pageProviderSX } from "../../helpers/styles/advance";
import { useState, type ChangeEvent, type FC } from "react";
import { CustomTextfield } from "../controllers/CustomTextfield";
import { CustomTable } from "../controllers/CustomTable";
import { HeaderPage } from "../common/HeaderPage";
import { addICON } from "../others/SvgComponents";
import type { JSX } from "@emotion/react/jsx-runtime";

interface IPageProvider {
  title: string;
  headerCells: IHeaderCell[];
  data: Record<string, TAny>[];
  filters?: string[];
  onSearch?: (value: string) => void;
  onFilterChange?: (filter: string) => void;
  breadcrumbs: IBreadcrumbsItems[];
  insertButton?: string;
  InsertButtonHandleClick?: TEmptyFunctionVoid;
  localNavigate?: boolean;
  buttonLink?: string;
  otherComponentHeader?: JSX.Element;
  isLoading: boolean;
}

export const PageProvider: FC<IPageProvider> = ({
  title,
  headerCells,
  data,
  filters = [],
  onSearch,
  onFilterChange,
  breadcrumbs,
  insertButton,
  InsertButtonHandleClick,
  localNavigate,
  buttonLink,
  otherComponentHeader,
  isLoading,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch?.(value);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterValue(value);
    onFilterChange?.(value);
  };

  return (
    <Box sx={pageProviderSX}>
      <HeaderPage
        title={title}
        localNavigate={localNavigate}
        breadcrumbData={breadcrumbs}
        button={{
          props: {
            text: insertButton || "",
            size: "large",
            startIcon: addICON(),
            color: "primary",
            variant: "contained",
            onClick: InsertButtonHandleClick ?? undefined,
          },
          link: buttonLink ?? undefined,
        }}
        otherComponent={otherComponentHeader}
      />
      <Box sx={{ display: "flex", gap: 2 }}>
        <CustomTextfield
          label="Search"
          variant="outlined"
          value={searchValue}
          onChange={handleSearchChange}
        />
        {filters.length > 0 && (
          <CustomTextfield
            select
            label="Filter"
            value={filterValue}
            onChange={handleFilterChange}
          >
            {filters.map((filter, idx) => (
              <MenuItem key={idx} value={filter}>
                {filter}
              </MenuItem>
            ))}
          </CustomTextfield>
        )}
      </Box>
      <CustomTable
        isLoading={isLoading}
        headerCells={headerCells}
        valueRows={data}
      />
    </Box>
  );
};
