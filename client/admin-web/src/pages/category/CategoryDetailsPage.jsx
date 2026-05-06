import { Box, Button, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetCategory } from "../../api/hooks/useCategoryApiService.js";
import PageHeader from "../../components/PageHeader.jsx";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CategoryProfileCard from "./components/category-details-page/CategoryProfileCard.jsx";
import CategoryInfoCard from "./components/category-details-page/CategoryInfoCard.jsx";
import CategoryItemsCard from "./components/category-details-page/CategoryItemsCard.jsx";
import ApiErrorMessage from "../../components/ApiErrorMessage.jsx";
import CategoryDetailsPageSkeleton from "./components/category-details-page/CategoryDetailsPageSkeleton.jsx";

function CategoryDetailsPage() {
  const { id } = useParams();

  const { data: response, isLoading, isError, error } = useGetCategory(id);
  const category = response?.data;

  return (
    <Box>
      {isLoading && <CategoryDetailsPageSkeleton />}

      {!isLoading && isError && <ApiErrorMessage error={error} />}

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
                  onClick={() => console.log("delete")}
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
        </Box>
      )}
    </Box>
  );
}

export default CategoryDetailsPage;
