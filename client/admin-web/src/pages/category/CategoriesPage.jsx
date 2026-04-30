import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Button,
  Stack,
  Paper,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Tooltip,
  IconButton,
  TablePagination,
  CircularProgress,
  Alert,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import imagePlaceholder from "../../assets/image-placeholder.svg";
import { useState } from "react";
import { useCategoryApiService } from "../../api/hooks/useCategoryApiService.js";
import { formatDate } from "../../utilities/dateUtilities.js";

function CategoriesPage() {
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  // TODO: error handling
  const {
    data: response,
    isLoading,
    isError,
  } = useCategoryApiService({
    pageNumber: pageNumber + 1,
    pageSize: pageSize,
  });

  const categories = response?.data?.items ?? [];
  const totalCount = response?.data?.totalCount ?? 0;

  // TODO: separate API call
  const topCategories = [...categories]
    .sort((a, b) => b.itemCount - a.itemCount)
    .slice(0, 5);

  const handleChangePageNumber = (_, newPageNumber) =>
    setPageNumber(newPageNumber);

  const handleChangePageSize = (e) => {
    setPageSize(parseInt(e.target.value, 10));
    setPageNumber(0);
  };

  return (
    <Box>
      <Stack
        direction={"row"}
        sx={{ justifyContent: "space-between", alignItems: "flex-end", mb: 3 }}
      >
        <Box>
          <Typography variant={"h5"} sx={{ marginBottom: 1 }}>
            Categories
          </Typography>

          <Breadcrumbs separator={"›"} sx={{ fontSize: 12 }}>
            <Link
              underline={"hover"}
              sx={{ display: "flex", alignItems: "center" }}
              color={"inherit"}
              href={"/"}
            >
              <DashboardIcon sx={{ mr: 0.5 }} fontSize={"inherit"} />
              Dashboard
            </Link>
            <Typography
              sx={{
                color: "text.primary",
                display: "flex",
                alignItems: "center",
                fontSize: 12,
              }}
            >
              <CategoryIcon sx={{ mr: 0.5 }} fontSize={"inherit"} />
              Categories
            </Typography>
          </Breadcrumbs>
        </Box>

        <Button variant={"contained"} startIcon={<AddIcon />}>
          Add category
        </Button>
      </Stack>

      {isLoading || isError ? (
        <Paper sx={{ p: 3 }}>
          {isLoading && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress sx={{ mb: 2 }} />
              <Typography variant={"body2"}>Loading...</Typography>
            </Box>
          )}
          {isError && (
            <Box>
              <Alert severity="error">Failed to get categories.</Alert>
            </Box>
          )}
        </Paper>
      ) : (
        <>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {topCategories.map((category) => (
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
                    sx={{ width: 50, height: 50, marginBottom: 1 }}
                  />

                  <Typography
                    variant={"body1"}
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    {category.name}
                  </Typography>

                  <Typography variant={"body2"} sx={{ fontSize: 12 }}>
                    {category.itemCount} items
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ "& .MuiTableCell-root": { fontSize: 12 } }}>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Items count</TableCell>
                  <TableCell>Created at</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id} hover>
                    <TableCell>
                      <Avatar
                        src={imagePlaceholder}
                        alt={category.name}
                        variant={"rounded"}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      {category.name}
                    </TableCell>
                    <TableCell>{category.itemCount} items</TableCell>
                    <TableCell>{formatDate(category.createdAtUtc)}</TableCell>
                    <TableCell align={"right"}>
                      <Tooltip title={"Details"}>
                        <IconButton size={"small"} color={"primary"}>
                          <VisibilityIcon fontSize={"small"} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={"Edit"}>
                        <IconButton size={"small"}>
                          <EditIcon fontSize={"small"} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={"Delete"}>
                        <IconButton size={"small"} color={"error"}>
                          <DeleteIcon fontSize={"small"} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component={"div"}
              count={totalCount}
              page={pageNumber}
              rowsPerPage={pageSize}
              onPageChange={handleChangePageNumber}
              onRowsPerPageChange={handleChangePageSize}
              rowsPerPageOptions={[5, 10, 25]}
              labelDisplayedRows={({ from, to, count }) =>
                `${from}–${to} of ${count} items`
              }
            />
          </TableContainer>
        </>
      )}
    </Box>
  );
}

export default CategoriesPage;
