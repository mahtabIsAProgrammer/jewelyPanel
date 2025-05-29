import { type FC } from "react";
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
} from "@mui/material";

interface ICustomTable {
  headerCells: IHeaderCell[];
  bodyCells: Array<Record<string, TAny>>;
  isLoading: boolean;
}

export const CustomTable: FC<ICustomTable> = ({
  headerCells,
  bodyCells,
  isLoading,
}) => {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 500, borderRadius: 2 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {headerCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.align || "left"}
                sx={{ fontWeight: "bold" }}
              >
                {headCell.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={`skeleton-${i}`}>
                {headerCells.map((cell, j) => (
                  <TableCell
                    key={`skeleton-cell-${j}`}
                    align={cell.align || "left"}
                  >
                    <Skeleton variant="text" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : bodyCells.length === 0 ? (
            <TableRow>
              <TableCell colSpan={headerCells.length} align="center">
                <Box p={3}>
                  <Typography variant="subtitle1" color="text.secondary">
                    😕 No data to show right now.
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            bodyCells.map((row, rowIndex) => (
              <TableRow key={rowIndex} hover>
                {headerCells.map((headCell) => (
                  <TableCell key={headCell.id} align={headCell.align || "left"}>
                    {row[headCell.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
