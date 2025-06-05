import {
  Table,
  Paper,
  TableRow,
  Skeleton,
  TableCell,
  TableHead,
  TableBody,
  type Theme,
  type SxProps,
  TableContainer,
} from "@mui/material";
import { memo, useCallback, useContext, type FC } from "react";

import { NoData } from "../common/NoOption";
import { SPACE_LG } from "../../helpers/constants/spaces";
import { FONT_BODY, FONT_WEIGHT_BLOD } from "../../helpers/constants/fonts";
import { COLOR_BORDER } from "../../helpers/constants/colors";
import { MainContext } from "../../helpers/others/mainContext";

interface ICustomTable<T = TAny> {
  headerCells: IHeaderCell<T>[];
  valueRows: T[];
  isLoading: boolean;
}

export const CustomTable: FC<ICustomTable> = ({
  headerCells,
  valueRows,
  isLoading,
}) => {
  const { theme } = useContext(MainContext);
  return (
    <TableContainer component={Paper} sx={tableContainerSX(theme)}>
      <Table stickyHeader>
        {valueRows?.length === 0 ? (
          <NoData />
        ) : (
          <>
            <TableHead>
              <TableRow>
                {headerCells.map(({ label, align }, index) => (
                  <TableCell
                    key={index}
                    align={align || "left"}
                    sx={{ fontWeight: "bold" }}
                  >
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={`skeleton-${i}`}>
                      {headerCells.map(({ align }, j) => (
                        <TableCell
                          sx={{ py: "0" }}
                          key={`skeleton-cell-${j}`}
                          align={align || "left"}
                        >
                          <Skeleton variant="text" width={"100%"} height={40} />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : valueRows?.map((row, rowIndex) => (
                    <TableRow key={rowIndex} hover>
                      {headerCells.map(({ id, ComponentRow, align }) => (
                        <CustomTableCell
                          id={id}
                          row={row}
                          align={align}
                          ComponentRow={ComponentRow}
                        />
                      ))}
                    </TableRow>
                  ))}
            </TableBody>
          </>
        )}
      </Table>
    </TableContainer>
  );
};

interface ICustomTableCell {
  row: TAny;
  id: IHeaderCell["id"];
  align: IHeaderCell["align"];
  ComponentRow: IHeaderCell["ComponentRow"];
}

const CustomTableCell = memo<ICustomTableCell>(
  ({ id, row, ComponentRow, align }) => {
    const Component = useCallback(
      () => ComponentRow && ComponentRow({ row: row }),
      [ComponentRow, row]
    );

    return (
      <TableCell align={align || "left"} key={id as number}>
        {ComponentRow ? Component() : row?.[id] || "_______"}
      </TableCell>
    );
  }
);

const tableContainerSX = (theme: TTheme): SxProps<Theme> => ({
  width: "100%",
  mb: SPACE_LG,
  borderRadius: "12px",
  backgroundColor: "transparent",

  "& .MuiTable-root": {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "14px",
    border: theme == "light" ? "" : `1px solid` + COLOR_BORDER,
    "& .MuiTableHead-root": {
      width: "100%",
      display: "flex",
    },

    "& .MuiTableBody-root": {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      overflowY: "scrol",
      maxHeight: "310px",
      "& .MuiTableCell-root": {
        height: "auto",
        maxHeight: "100px",
        minWidth: "200px",
      },
    },
    "& .MuiTableRow-root": {
      width: "100%",
      display: "flex",
      "& .MuiTableCell-root": {
        backgroundColor: "transparent",
        width: "100%",
        display: "flex",
        color: "#686868",
        alignItems: "center",
        justifyContent: "center",
        fontSize: FONT_BODY + "!important",
        fontWeight: FONT_WEIGHT_BLOD,
        minWidth: "200px",
      },
    },
  },
});
