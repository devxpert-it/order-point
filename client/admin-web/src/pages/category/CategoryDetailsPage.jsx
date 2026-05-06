import { Box, Button, Grid } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteCategory,
  useGetCategory,
} from "../../api/hooks/useCategoryApiService.js";
import PageHeader from "../../components/PageHeader.jsx";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CategoryProfileCard from "./components/category-details-page/CategoryProfileCard.jsx";
import CategoryInfoCard from "./components/category-details-page/CategoryInfoCard.jsx";
import CategoryItemsCard from "./components/category-details-page/CategoryItemsCard.jsx";
import ApiErrorMessage from "../../components/ApiErrorMessage.jsx";
import CategoryDetailsPageSkeleton from "./components/category-details-page/CategoryDetailsPageSkeleton.jsx";
import ConfirmationDialog from "../../components/ConfirmationDialog.jsx";
import { useConfirmationDialog } from "../../components/hooks/useConfirmationDialog.js";
import { useToast } from "../../components/hooks/useToast.js";
import { useEffect } from "react";
import Toast from "../../components/Toast.jsx";

function CategoryDetailsPage() {
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const { toast, showToast, hideToast } = useToast();

  const {
    data: response,
    isLoading,
    isError,
    error: getCategoryError,
  } = useGetCategory(id);
  const category = response?.data;

  const {
    mutate: deleteCategory,
    isPending: isDeleting,
    error: deleteCategoryError,
  } = useDeleteCategory();

  const {
    isOpen: isDialogOpen,
    openDialog: openDeleteDialog,
    closeDialog: closeDeleteDialog,
  } = useConfirmationDialog();

  useEffect(() => {
    if (location.state?.toast) {
      showToast(location.state.toast, "success");
    }
  }, []);

  const handleDeleteConfirm = () => {
    deleteCategory(category.id, {
      onSuccess: () => {
        closeDeleteDialog();
        navigate("/categories", {
          state: {
            toast: `Category "${category.name}" deleted successfully.`,
          },
        });
      },
    });
  };

  return (
    <Box>
      {isLoading && <CategoryDetailsPageSkeleton />}

      {!isLoading && isError && <ApiErrorMessage error={getCategoryError} />}

      {!isLoading && !isError && (
        <Box>
          <PageHeader
            title={category.name}
            breadcrumbs={[{ label: "Categories", href: "/categories" }]}
            currentPage={{ label: category.name }}
            actions={
              <Box>
                <Button
                  variant={"outlined"}
                  startIcon={<EditIcon />}
                  onClick={() => console.log("edit")}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant={"outlined"}
                  startIcon={<DeleteIcon />}
                  onClick={openDeleteDialog}
                  color={"error"}
                >
                  Delete
                </Button>
              </Box>
            }
          />
          <Grid container spacing={3}>
            <Grid size={3}>
              <CategoryProfileCard
                name={category.name}
                status={category.status}
              />
            </Grid>

            <Grid size={9}>
              <CategoryInfoCard category={category} />
            </Grid>

            <Grid size={12}>
              <CategoryItemsCard name={category.name} />
            </Grid>
          </Grid>

          <ConfirmationDialog
            open={isDialogOpen}
            title={"Delete category"}
            message={`Are you sure you want to delete "${category.name}"? This action cannot be undone.`}
            confirmLabel={"Delete"}
            cancelLabel={"Cancel"}
            confirmColor={"error"}
            isPending={isDeleting}
            pendingLabel={"Deleting..."}
            onConfirm={handleDeleteConfirm}
            onCancel={closeDeleteDialog}
            error={deleteCategoryError}
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

export default CategoryDetailsPage;
