import { Paper, Skeleton } from "@mui/material";

function CategoriesTableSkeleton() {
  return (
    <Paper>
      <Skeleton variant="rounded" height={400} />
    </Paper>
  );
}

export default CategoriesTableSkeleton;
