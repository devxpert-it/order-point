import { Box, Grid, Paper, Skeleton } from "@mui/material";

function CategoryUpdatePageSkeleton() {
  return (
    <Box>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <Skeleton
            variant={"rounded"}
            width={220}
            height={32}
            sx={{ mb: 1 }}
          />
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Skeleton variant={"rounded"} width={80} height={16} />
            <Skeleton variant={"rounded"} width={10} height={16} />
            <Skeleton variant={"rounded"} width={80} height={16} />
            <Skeleton variant={"rounded"} width={10} height={16} />
            <Skeleton variant={"rounded"} width={80} height={16} />
            <Skeleton variant={"rounded"} width={10} height={16} />
            <Skeleton variant={"rounded"} width={80} height={16} />
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid size={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box>
                <Skeleton
                  variant={"rounded"}
                  width={"100%"}
                  height={56}
                  sx={{ mb: 0.5 }}
                />
                <Skeleton variant={"rounded"} width={220} height={12} />
              </Box>

              <Box>
                <Skeleton
                  variant={"rounded"}
                  width={"100%"}
                  height={120}
                  sx={{ mb: 0.5 }}
                />
                <Skeleton variant={"rounded"} width={200} height={12} />
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Skeleton
                    variant={"rounded"}
                    width={"100%"}
                    height={56}
                    sx={{ mb: 0.5 }}
                  />
                  <Skeleton variant={"rounded"} width={200} height={12} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Skeleton
                    variant={"rounded"}
                    width={"100%"}
                    height={56}
                    sx={{ mb: 0.5 }}
                  />
                  <Skeleton variant={"rounded"} width={180} height={12} />
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                <Skeleton variant={"rounded"} width={100} height={36} />
                <Skeleton variant={"rounded"} width={100} height={36} />
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid size={4}>
          <Box
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}
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
              <Skeleton
                variant={"rounded"}
                width={80}
                height={80}
                sx={{ mb: 3 }}
              />
              <Skeleton
                variant={"rounded"}
                width={130}
                height={20}
                sx={{ mb: 1 }}
              />
              <Skeleton
                variant={"rounded"}
                width={60}
                height={16}
                sx={{ mb: 2 }}
              />
              <Skeleton variant={"rounded"} width={70} height={24} />
            </Paper>

            <Paper>
              <Skeleton variant={"rounded"} width={"100%"} height={120} />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CategoryUpdatePageSkeleton;
