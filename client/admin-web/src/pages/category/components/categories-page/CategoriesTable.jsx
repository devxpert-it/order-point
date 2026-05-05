import Avatar from "@mui/material/Avatar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CategoryIcon from "@mui/icons-material/Category";
import imagePlaceholder from "../../../../assets/image-placeholder.svg";
import { formatDate } from "../../../../utilities/dateUtilities.js";
import { CategorySortBy } from "../../../../sorting/categorySortBy.js";
import DataTable from "../../../../components/DataTable.jsx";
import DataTableActions from "../../../../components/DataTableActions.jsx";
import { Box } from "@mui/material";
import CategoriesTableSkeleton from "./CategoriesTableSkeleton.jsx";
import ApiErrorMessage from "../../../../components/ApiErrorMessage.jsx";
import { useNavigate } from "react-router-dom";
import CategoryStatusChip from "../shared/CategoryStatusChip.jsx";
import CategoryFilters from "./CategoryFilters.jsx";
import { useDeleteCategory } from "../../../../api/hooks/useCategoryApiService.js";
import { useState } from "react";
import ConfirmationDialog from "../../../../components/ConfirmationDialog.jsx";
import Toast from "../../../../components/Toast.jsx";
import { useToast } from "../../../../components/hooks/useToast.js";
import { useConfirmationDialog } from "../../../../components/hooks/useConfirmationDialog.js";

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
  status,
  onStatusChange,
  onAdd,
  isLoading,
  isError,
  error,
}) {
  const navigate = useNavigate();

  const { toast, showToast, hideToast } = useToast();

  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();

  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const {
    isOpen: isDialogOpen,
    openDialog: openDeleteDialog,
    closeDialog: closeDeleteDialog,
  } = useConfirmationDialog();

  const handleDeleteClick = (row) => {
    setCategoryToDelete(row);
    openDeleteDialog();
  };

  const handleDeleteConfirm = () => {
    deleteCategory(categoryToDelete.id, {
      onSuccess: () => {
        closeDeleteDialog();
        showToast(
          `"${categoryToDelete.name}" has been deleted successfully.`,
          "success",
        );
      },
    });
  };

  const columns = [
    {
      key: "avatar",
      label: "",
      render: (row) => (
        <Avatar src={imagePlaceholder} alt={row.name} variant={"rounded"} />
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
      key: "status",
      label: "Status",
      render: (row) => <CategoryStatusChip status={row.status} />,
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
      onClick: handleDeleteClick,
    },
  ];

  const emptyState = {
    icon: <CategoryIcon sx={{ fontSize: 48 }} />,
    title: "No categories found",
    description: "Try adjusting your filters or add a new category",
  };

  return (
    <Box>
      <DataTableActions
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        searchPlaceholder={"Search"}
        filters={
          <CategoryFilters status={status} onStatusChange={onStatusChange} />
        }
        onAdd={onAdd}
        addLabel={"Add category"}
      />
      {isLoading && <CategoriesTableSkeleton columns={columns} />}
      {!isLoading && isError && <ApiErrorMessage error={error} />}
      {!isLoading && !isError && (
        <Box>
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

          <ConfirmationDialog
            open={isDialogOpen}
            title={"Delete category"}
            message={`Are you sure you want to delete "${categoryToDelete?.name}"? This action cannot be undone.`}
            confirmLabel={"Delete"}
            cancelLabel={"Cancel"}
            confirmColor={"error"}
            isPending={isDeleting}
            pendingLabel={"Deleting..."}
            onConfirm={handleDeleteConfirm}
            onCancel={closeDeleteDialog}
          />

          <Toast
            open={toast.open}
            message={toast.message}
            severity={toast.severity}
            onClose={hideToast}
          />
        </Box>
      )}
    </Box>
  );
}

export default CategoriesTable;
