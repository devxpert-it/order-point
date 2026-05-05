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
import { Box, Chip } from "@mui/material";
import CategoriesTableSkeleton from "./CategoriesTableSkeleton.jsx";
import ApiErrorMessage from "../../../components/ApiErrorMessage.jsx";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const columns = [
    {
      key: "avatar",
      label: "",
      width: 80,
      render: (row) => (
        <Avatar src={imagePlaceholder} alt={row.name} variant="rounded" />
      ),
    },
    {
      key: "name",
      label: "Name",
      width: 200,
      render: (row) => <span style={{ fontWeight: "bold" }}>{row.name}</span>,
      sortAscValue: CategorySortBy.NameAsc,
      sortDescValue: CategorySortBy.NameDesc,
    },
    {
      key: "status",
      label: "Status",
      width: 150,
      render: (row) => (
        <Chip
          label={row.status}
          size={"small"}
          sx={{
            backgroundColor: row.status === "Active" ? "#c8f1c9" : "#fbd8db",
            color: row.status === "Active" ? "#2e7d32" : "#c62828",
            fontWeight: 600,
            fontSize: 12,
          }}
        />
      ),
    },
    {
      key: "itemsCount",
      label: "Items count",
      width: 150,
      render: (row) => `${row.itemsCount} items`,
      sortAscValue: CategorySortBy.ItemsCountAsc,
      sortDescValue: CategorySortBy.ItemsCountDesc,
    },
    {
      key: "createdAtUtc",
      label: "Created at",
      width: 150,
      render: (row) => formatDate(row.createdAtUtc),
      sortAscValue: CategorySortBy.CreatedAtAsc,
      sortDescValue: CategorySortBy.CreatedAtDesc,
    },
  ];

  const rowActions = [
    {
      label: "Details",
      icon: <VisibilityIcon fontSize={"small"} />,
      color: "primary",
      onClick: (row) => navigate(`/categories/${row.id}`),
    },
    {
      label: "Edit",
      icon: <EditIcon fontSize={"small"} />,
      onClick: (row) => console.log("edit", row),
    },
    {
      label: "Delete",
      icon: <DeleteIcon fontSize={"small"} />,
      color: "error",
      onClick: (row) => console.log("delete", row),
    },
  ];

  const emptyState = {
    icon: <CategoryIcon sx={{ fontSize: 48 }} />,
    title: "No categories found",
    description: "Try adjusting your search or add a new category",
  };

  return (
    <Box>
      <DataTableActions
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        searchPlaceholder={"Search categories..."}
        onAdd={onAdd}
        addLabel={"Add category"}
      />

      {isLoading && <CategoriesTableSkeleton columns={columns} />}

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
