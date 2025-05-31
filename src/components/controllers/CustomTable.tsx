import { memo, useCallback, type FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Skeleton,
  type SxProps,
  type Theme,
} from "@mui/material";
import { SPACE_LG } from "../../helpers/constants/spaces";
import { FONT_BODY, FONT_WEIGHT_BLOD } from "../../helpers/constants/fonts";

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
  return (
    <TableContainer component={Paper} sx={tableContainerSX}>
      <Table stickyHeader>
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
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={`skeleton-${i}`}>
                {headerCells.map(({ align }, j) => (
                  <TableCell key={`skeleton-cell-${j}`} align={align || "left"}>
                    <Skeleton variant="text" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : valueRows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={headerCells?.length} align="center">
                <Box p={3}>
                  <Typography variant="subtitle1" color="text.secondary">
                    😕 No data to show right now.
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            valueRows.map((row, rowIndex) => (
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
            ))
          )}
        </TableBody>
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

const tableContainerSX: SxProps<Theme> = {
  width: "100%",
  my: SPACE_LG,
  borderRadius: "12px",
  "& .MuiTable-root": {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    pb: SPACE_LG,
    "& .MuiTableHead-root": {
      width: "100%",
      display: "flex",
    },

    "& .MuiTableBody-root": {
      width: "100%",
      display: "flex",
      flexDirection: "column",
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
};
