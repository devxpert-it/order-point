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
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import imagePlaceholder from "../../../assets/image-placeholder.svg";
import { formatDate } from "../../../utilities/dateUtilities.js";
import { CategorySortBy } from "../../../sorting/categorySortBy.js";

function CategoriesTable({
  categories,
  totalCount,
  pageNumber,
  pageSize,
  onPageChange,
  onPageSizeChange,
  sortBy,
  onSortByChange,
}) {
  const sortColumns = [
    {
      label: "Name",
      ascValue: CategorySortBy.NameAsc,
      descValue: CategorySortBy.NameDesc,
    },
    {
      label: "Items count",
      ascValue: CategorySortBy.ItemsCountAsc,
      descValue: CategorySortBy.ItemsCountDesc,
    },
    {
      label: "Created at",
      ascValue: CategorySortBy.CreatedAtAsc,
      descValue: CategorySortBy.CreatedAtDesc,
    },
  ];

  function getDirection(sortBy, ascValue, descValue) {
    if (sortBy === ascValue) return "asc";
    if (sortBy === descValue) return "desc";
    return "desc";
  }

  function isActive(sortBy, ascValue, descValue) {
    return sortBy === ascValue || sortBy === descValue;
  }

  const handleSortBy = (ascValue, descValue) => {
    if (sortBy === ascValue) {
      onSortByChange(descValue);
    } else {
      onSortByChange(ascValue);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ "& .MuiTableCell-root": { fontSize: 12 } }}>
          <TableRow>
            <TableCell />
            {sortColumns.map((col) => (
              <TableCell
                key={col.label}
                sortDirection={getDirection(
                  sortBy,
                  col.ascValue,
                  col.descValue,
                )}
              >
                <TableSortLabel
                  active={isActive(sortBy, col.ascValue, col.descValue)}
                  direction={getDirection(sortBy, col.ascValue, col.descValue)}
                  onClick={() => handleSortBy(col.ascValue, col.descValue)}
                >
                  {col.label}
                </TableSortLabel>
              </TableCell>
            ))}
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

              <TableCell>{category.itemsCount} items</TableCell>

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
        rowsPerPageOptions={[10, 20, 30]}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} of ${count} items`
        }
      />
    </TableContainer>
  );
}

export default CategoriesTable;
