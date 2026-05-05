import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function CategoriesTableSkeleton({ columns }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ tableLayout: "fixed" }}>
        <TableHead sx={{ "& .MuiTableCell-root": { fontSize: 12, py: 1 } }}>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key} width={column.width}>
                {column.label}
              </TableCell>
            ))}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 1 }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((col) => (
                <TableCell key={col.key}>
                  <Skeleton variant={"rounded"} height={20} width={"100%"} />
                </TableCell>
              ))}
              <TableCell>
                <Skeleton variant={"rounded"} height={20} width={"100%"} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CategoriesTableSkeleton;
