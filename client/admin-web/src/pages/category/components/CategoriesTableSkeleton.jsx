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

function CategoriesTableSkeleton() {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableCell key={i}>
                <Skeleton variant={"rounded"} height={16} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell>
                <Skeleton variant={"rounded"} height={40} width={40} />
              </TableCell>
              <TableCell>
                <Skeleton variant={"rounded"} height={16} width={100} />
              </TableCell>
              <TableCell>
                <Skeleton variant={"rounded"} height={16} width={100} />
              </TableCell>
              <TableCell>
                <Skeleton variant={"rounded"} height={16} width={100} />
              </TableCell>
              <TableCell align={"right"}>
                <Skeleton
                  variant={"rounded"}
                  height={16}
                  width={100}
                  sx={{ ml: "auto" }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CategoriesTableSkeleton;
