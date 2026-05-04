import Avatar from "@mui/material/Avatar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CategoryIcon from "@mui/icons-material/Category";
import imagePlaceholder from "../../../assets/image-placeholder.svg";
import { formatDate } from "../../../utilities/dateUtilities.js";
import { CategorySortBy } from "../../../sorting/categorySortBy.js";
import DataTable from "../../../components/DataTable.jsx";
import DataTableActions from "../../../components/DataTableActions.jsx";
import { Box } from "@mui/material";
import CategoriesTableSkeleton from "./CategoriesTableSkeleton.jsx";
import ApiErrorMessage from "../../../components/ApiErrorMessage.jsx";

const columns = [
  {
    key: "avatar",
    label: "",
    render: (row) => (
      <Avatar src={imagePlaceholder} alt={row.name} variant="rounded" />
    ),
  },
  {
    key: "name",
    label: "Name",
    render: (row) => <span style={{ fontWeight: "bold" }}>{row.name}</span>,
    sortAscValue: CategorySortBy.NameAsc,
    sortDescValue: CategorySortBy.NameDesc,
  },
  {
    key: "itemsCount",
    label: "Items count",
    render: (row) => `${row.itemsCount} items`,
    sortAscValue: CategorySortBy.ItemsCountAsc,
    sortDescValue: CategorySortBy.ItemsCountDesc,
  },
  {
    key: "createdAtUtc",
    label: "Created at",
    render: (row) => formatDate(row.createdAtUtc),
    sortAscValue: CategorySortBy.CreatedAtAsc,
    sortDescValue: CategorySortBy.CreatedAtDesc,
  },
];

const rowActions = [
  {
    label: "Details",
    icon: <VisibilityIcon fontSize="small" />,
    color: "primary",
    onClick: (row) => console.log("details", row),
  },
  {
    label: "Edit",
    icon: <EditIcon fontSize="small" />,
    onClick: (row) => console.log("edit", row),
  },
  {
    label: "Delete",
    icon: <DeleteIcon fontSize="small" />,
    color: "error",
    onClick: (row) => console.log("delete", row),
  },
];

const emptyState = {
  icon: <CategoryIcon sx={{ fontSize: 48, opacity: 0.4 }} />,
  title: "No categories found",
  description: "Try adjusting your search or add a new category",
};

function CategoriesTable({
  categories,
  totalCount,
  pageNumber,
  pageSize,
  onPageChange,
  onPageSizeChange,
  sortBy,
  onSortByChange,
  searchQuery,
  onSearchChange,
  onAdd,
  isLoading,
  isError,
  error,
}) {
  return (
    <Box>
      <DataTableActions
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        searchPlaceholder={"Search categories..."}
        onAdd={onAdd}
        addLabel={"Add category"}
      />

      {isLoading && <CategoriesTableSkeleton />}
      {!isLoading && isError && <ApiErrorMessage error={error} />}
      {!isLoading && !isError && (
        <DataTable
          columns={columns}
          rows={categories}
          getRowId={(row) => row.id}
          rowActions={rowActions}
          emptyState={emptyState}
          totalCount={totalCount}
          pageNumber={pageNumber}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          sortBy={sortBy}
          onSortByChange={onSortByChange}
        />
      )}
    </Box>
  );
}

export default CategoriesTable;
