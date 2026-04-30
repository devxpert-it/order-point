import {
  Avatar,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import imagePlaceholder from "../../../assets/image-placeholder.svg";
import { formatDate } from "../../../utilities/dateUtilities.js";

function CategoriesTable({
  categories,
  totalCount,
  pageNumber,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ "& .MuiTableCell-root": { fontSize: 12 } }}>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell>Items count</TableCell>
            <TableCell>Created at</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>

        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id} hover>
              <TableCell>
                <Avatar
                  src={imagePlaceholder}
                  alt={category.name}
                  variant={"rounded"}
                />
              </TableCell>

              <TableCell sx={{ fontWeight: "bold" }}>{category.name}</TableCell>

              <TableCell>{category.itemCount} items</TableCell>

              <TableCell>{formatDate(category.createdAtUtc)}</TableCell>

              <TableCell align={"right"}>
                <Tooltip title={"Details"}>
                  <IconButton size={"small"} color={"primary"}>
                    <VisibilityIcon fontSize={"small"} />
                  </IconButton>
                </Tooltip>

                <Tooltip title={"Edit"}>
                  <IconButton size={"small"}>
                    <EditIcon fontSize={"small"} />
                  </IconButton>
                </Tooltip>

                <Tooltip title={"Delete"}>
                  <IconButton size={"small"} color={"error"}>
                    <DeleteIcon fontSize={"small"} />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component={"div"}
        count={totalCount}
        page={pageNumber}
        rowsPerPage={pageSize}
        onPageChange={onPageChange}
        onRowsPerPageChange={onPageSizeChange}
        rowsPerPageOptions={[5, 10, 25]}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} of ${count} items`
        }
      />
    </TableContainer>
  );
}

export default CategoriesTable;
