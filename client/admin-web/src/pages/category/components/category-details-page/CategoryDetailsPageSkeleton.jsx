import {
  Box,
  Grid,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function CategoryDetailsPageSkeleton() {
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
          <Skeleton variant="rounded" width={200} height={32} sx={{ mb: 1 }} />
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Skeleton variant="rounded" width={80} height={16} />
            <Skeleton variant="rounded" width={10} height={16} />
            <Skeleton variant="rounded" width={80} height={16} />
            <Skeleton variant="rounded" width={10} height={16} />
            <Skeleton variant="rounded" width={100} height={16} />
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Skeleton variant="rounded" width={80} height={36} />
          <Skeleton variant="rounded" width={90} height={36} />
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid size={3}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              p: 3,
            }}
          >
            <Skeleton variant="rounded" width={80} height={80} sx={{ mb: 2 }} />
            <Skeleton
              variant="rounded"
              width={120}
              height={20}
              sx={{ mb: 1 }}
            />
            <Skeleton variant="rounded" width={60} height={16} sx={{ mb: 2 }} />
            <Skeleton variant="rounded" width={70} height={24} />
          </Paper>
        </Grid>

        <Grid size={9}>
          <Paper sx={{ p: 2, height: "100%" }}>
            <Grid container spacing={3} sx={{ alignItems: "center" }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Box key={i} sx={{ display: "contents" }}>
                  <Grid size={3}>
                    <Skeleton variant="rounded" width={80} height={16} />
                  </Grid>
                  <Grid size={9}>
                    <Skeleton variant="rounded" width={"100%"} height={16} />
                  </Grid>
                </Box>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid size={12}>
          <Paper>
            <Box
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Skeleton variant="rounded" width={160} height={20} />
                <Skeleton variant="rounded" width={120} height={14} />
              </Box>
              <Skeleton
                variant="rounded"
                width={90}
                height={36}
                sx={{ alignSelf: "flex-start" }}
              />
            </Box>

            <TableContainer>
              <Table>
                <TableHead
                  sx={{ "& .MuiTableCell-root": { fontSize: 12, py: 1 } }}
                >
                  <TableRow>
                    <TableCell />
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ "& .MuiTableCell-root": { py: 1 } }}>
                  {Array.from({ length: 1 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton variant="rounded" width={40} height={40} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="rounded" width="60%" height={20} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="rounded" width={60} height={20} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CategoryDetailsPageSkeleton;
