import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import imagePlaceholder from "../../../../assets/image-placeholder.svg";
import TopCategoriesGridSkeleton from "./TopCategoriesGridSkeleton.jsx";
import ApiErrorMessage from "../../../../components/ApiErrorMessage.jsx";

function TopCategoriesGrid({ categories, isLoading, isError, error }) {
  return (
    <Box>
      {isLoading && <TopCategoriesGridSkeleton />}

      {!isLoading && isError && <ApiErrorMessage error={error} />}

      {!isLoading && !isError && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {categories.map((category) => (
            <Grid size={12 / 5} key={category.id}>
              <Paper
                sx={{
                  py: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={imagePlaceholder}
                  alt={`${category.name} image`}
                  variant={"rounded"}
                  sx={{ width: 50, height: 50, mb: 1 }}
                />

                <Typography
                  variant={"body1"}
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  {category.name}
                </Typography>

                <Typography variant={"body2"} sx={{ fontSize: 12 }}>
                  {category.itemsCount} items
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default TopCategoriesGrid;
