import { Box, MenuItem } from "@mui/material";
import {
  useMemo,
  type FC,
  useState,
  useContext,
  type ChangeEvent,
} from "react";
import { debounce } from "lodash";

import { HeaderPage } from "../common/HeaderPage";
import { addICON } from "../others/SvgComponents";
import type { JSX } from "@emotion/react/jsx-runtime";
import { CustomTable } from "../controllers/CustomTable";
import { pageProviderSX } from "../../helpers/styles/advance";
import { MainContext } from "../../helpers/others/mainContext";
import { CustomTextfield } from "../controllers/CustomTextfield";
import { DEBOUNCE_SEARCH_TIME } from "../../helpers/constants/static";

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
  const { theme } = useContext(MainContext);

  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const debouncedSearch = useMemo(
    () =>
      debounce((val: string) => {
        onSearch?.(val);
      }, DEBOUNCE_SEARCH_TIME),
    [onSearch]
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.trim()) {
      debouncedSearch(value);
    } else {
      debouncedSearch.cancel();
      onSearch?.("");
    }
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterValue(value);
    onFilterChange?.(value);
  };

  return (
    <Box sx={pageProviderSX(theme)}>
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
      <Box className="filters">
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
