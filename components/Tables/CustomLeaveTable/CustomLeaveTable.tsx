import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableFooter from "@mui/material/TableFooter";
import Pagination from "@/components/Pagination";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

type PropsCustomLeaveTable = {
  children: React.ReactNode | any;
  setPage: (value: number) => void;
  page: number;
  setRowsPerPage: (value: number) => void;
  rowsPerPage: number;
  headers: string[];
  minWidth?: number;
  totalPage: number;
};

export default function CustomLeaveTable({
  children,
  setPage,
  page,
  setRowsPerPage,
  rowsPerPage,
  headers,
  minWidth,
  totalPage,
}: PropsCustomLeaveTable) {
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalPage) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: minWidth || 700 }} aria-label="Table">
        <TableHead>
          <TableRow>
            {headers.map((header, i) => (
              <StyledTableCell key={i}>{header}</StyledTableCell>
            ))}
            {/* <StyledTableCell align="right">Actions</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {children}
          {emptyRows > 0 && (
            <>
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            </>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <Pagination
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              page={page}
              totalPage={totalPage}
              rowsPerPage={rowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
