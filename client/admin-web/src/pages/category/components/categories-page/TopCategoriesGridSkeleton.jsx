import { Grid, Paper, Skeleton } from "@mui/material";

function TopCategoriesGridSkeleton() {
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Grid size={12 / 5} key={i}>
          <Paper
            sx={{
              py: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Skeleton variant="rounded" width={50} height={50} sx={{ mb: 1 }} />
            <Skeleton variant="rounded" width={80} height={16} sx={{ mb: 1 }} />
            <Skeleton variant="rounded" width={50} height={14} />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default TopCategoriesGridSkeleton;
