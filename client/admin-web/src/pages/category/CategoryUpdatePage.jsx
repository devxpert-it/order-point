import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader.jsx";
import {
  useGetCategory,
  useUpdateCategory,
} from "../../api/hooks/useCategoryApiService.js";
import imagePlaceholder from "../../assets/image-placeholder.svg";
import Avatar from "@mui/material/Avatar";
import CategoryStatusChip from "./components/shared/CategoryStatusChip.jsx";
import ApiErrorMessage from "../../components/ApiErrorMessage.jsx";
import CategoryUpdatePageSkeleton from "./components/category-update-page/CategoryUpdatePageSkeleton.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteCategory } from "../../api/hooks/useCategoryApiService.js";
import { useConfirmationDialog } from "../../components/hooks/useConfirmationDialog.js";
import ConfirmationDialog from "../../components/ConfirmationDialog.jsx";

function CategoryUpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: response,
    isLoading,
    isError,
    error: getError,
  } = useGetCategory(id);

  const category = response?.data;

  const {
    mutate: updateCategory,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateCategory(id);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(0);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
      setStatus(category.status === "Active" ? 0 : 1);
    }
  }, [category]);

  const {
    mutate: deleteCategory,
    isPending: isDeleting,
    error: deleteError,
  } = useDeleteCategory();

  const {
    isOpen: isDialogOpen,
    openDialog: openDeleteDialog,
    closeDialog: closeDeleteDialog,
  } = useConfirmationDialog();

  const handleUpdate = () => {
    updateCategory(
      { name, description, status, imageUrl: null },
      {
        onSuccess: () => {
          navigate(`/categories/${id}`, {
            state: { toast: `Category "${name}" updated successfully.` },
          });
        },
      },
    );
  };

  const handleDeleteConfirm = () => {
    deleteCategory(category.id, {
      onSuccess: () => {
        closeDeleteDialog();
        navigate("/categories", {
          state: { toast: `Category "${category.name}" deleted successfully.` },
        });
      },
    });
  };

  return (
    <Box>
      {isLoading && <CategoryUpdatePageSkeleton />}

      {!isLoading && isError && <ApiErrorMessage error={getError} />}

      {!isLoading && !isError && (
        <Box>
          <PageHeader
            title={`Edit ${category.name}`}
            breadcrumbs={[
              { label: "Categories", href: "/categories" },
              { label: category.name, href: `/categories/${id}` },
            ]}
            currentPage={{ label: `Edit ${category.name}` }}
          />

          <Grid container spacing={3}>
            <Grid size={8}>
              <Paper sx={{ p: 3 }}>
                {isUpdateError && (
                  <Box sx={{ mb: 3 }}>
                    <ApiErrorMessage error={updateError} />
                  </Box>
                )}

                <Grid container spacing={2}>
                  <Grid size={12} sx={{ mb: 2 }}>
                    <TextField
                      label={"Name"}
                      variant={"outlined"}
                      fullWidth
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      helperText={
                        "The display name of the category shown to customers."
                      }
                      slotProps={{
                        formHelperText: {
                          sx: { fontSize: 11, mt: 0.5, mx: 0 },
                        },
                      }}
                      required
                    />
                  </Grid>

                  <Grid size={12} sx={{ mb: 2 }}>
                    <TextField
                      label={"Description"}
                      variant={"outlined"}
                      fullWidth
                      multiline
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      helperText={
                        "A brief description of what this category contains."
                      }
                      slotProps={{
                        formHelperText: {
                          sx: { fontSize: 11, mt: 0.5, mx: 0 },
                        },
                      }}
                      required
                    />
                  </Grid>

                  <Grid size={6} sx={{ mb: 2 }}>
                    <FormControl fullWidth>
                      <InputLabel id={"status-label"}>{"Status"}</InputLabel>
                      <Select
                        labelId={"status-label"}
                        value={status}
                        label={"Status"}
                        variant={"outlined"}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <MenuItem value={0}>{"Active"}</MenuItem>
                        <MenuItem value={1}>{"Inactive"}</MenuItem>
                      </Select>
                      <FormHelperText sx={{ fontSize: 11, mt: 0.5, mx: 0 }}>
                        Controls whether this category is visible to customers.
                      </FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid size={6} sx={{ mb: 2 }}>
                    <TextField
                      label={"Image URL"}
                      variant={"outlined"}
                      fullWidth
                      value={"null"}
                      helperText={
                        "Image upload will be available in a future update."
                      }
                      slotProps={{
                        formHelperText: {
                          sx: { fontSize: 11, mt: 0.5, mx: 0 },
                        },
                      }}
                      disabled
                    />
                  </Grid>

                  <Grid size={12}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        onClick={() => navigate(`/categories/${id}`)}
                        disabled={isUpdating}
                      >
                        {"Cancel"}
                      </Button>
                      <Button
                        variant={"contained"}
                        onClick={handleUpdate}
                        disabled={isUpdating || !name || !description}
                      >
                        {isUpdating ? "Updating..." : "Update"}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid size={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                    flexGrow: 1,
                  }}
                >
                  <Avatar
                    src={imagePlaceholder}
                    alt={`${name || "Category"} image`}
                    variant={"rounded"}
                    sx={{ width: 80, height: 80, mb: 3 }}
                  />
                  <Typography
                    variant={"body1"}
                    sx={{
                      fontWeight: "bold",
                      wordBreak: "break-word",
                      textAlign: "center",
                    }}
                  >
                    {name || "Category name"}
                  </Typography>
                  <Typography variant={"body2"} sx={{ fontSize: 12, mb: 2 }}>
                    {"category"}
                  </Typography>
                  <CategoryStatusChip
                    status={status === 0 ? "Active" : "Inactive"}
                  />
                </Paper>

                <Paper sx={{ p: 3 }}>
                  <Typography
                    variant={"body2"}
                    color={"text.secondary"}
                    sx={{ fontSize: 12, mb: 2 }}
                  >
                    {
                      "Permanently delete this category. This action cannot be undone."
                    }
                  </Typography>
                  <Button
                    variant={"outlined"}
                    color={"error"}
                    startIcon={<DeleteIcon fontSize={"small"} />}
                    size={"small"}
                    onClick={openDeleteDialog}
                    fullWidth
                  >
                    Delete
                  </Button>
                </Paper>
              </Box>
            </Grid>
          </Grid>

          <ConfirmationDialog
            open={isDialogOpen}
            title={"Delete category"}
            message={`Are you sure you want to delete "${category?.name}"? This action cannot be undone.`}
            confirmLabel={"Delete"}
            cancelLabel={"Cancel"}
            confirmColor={"error"}
            isPending={isDeleting}
            pendingLabel={"Deleting..."}
            onConfirm={handleDeleteConfirm}
            onCancel={closeDeleteDialog}
            error={deleteError}
          />
        </Box>
      )}
    </Box>
  );
}

export default CategoryUpdatePage;
