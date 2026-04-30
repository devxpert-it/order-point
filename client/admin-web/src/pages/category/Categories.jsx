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
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import imagePlaceholder from "../../assets/image-placeholder.svg";
import { useState } from "react";

const mockResponse = {
  data: {
    items: [
      {
        id: "1",
        name: "Cocktails",
        itemCount: 10,
        createdAtUtc: "2024-01-01T10:00:00Z",
        updatedAtUtc: null,
      },
      {
        id: "2",
        name: "Beers",
        itemCount: 8,
        createdAtUtc: "2024-01-02T10:00:00Z",
        updatedAtUtc: "2024-03-01T10:00:00Z",
      },
      {
        id: "3",
        name: "Wines",
        itemCount: 7,
        createdAtUtc: "2024-01-03T10:00:00Z",
        updatedAtUtc: null,
      },
      {
        id: "4",
        name: "Non-alcoholic",
        itemCount: 3,
        createdAtUtc: "2024-01-04T10:00:00Z",
        updatedAtUtc: null,
      },
      {
        id: "5",
        name: "Snacks",
        itemCount: 2,
        createdAtUtc: "2024-01-05T10:00:00Z",
        updatedAtUtc: null,
      },
    ],
    pageNumber: 1,
    pageSize: 5,
    totalCount: 12,
  },
};

function formatDate(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function Categories() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { items: categories, totalCount } = mockResponse.data;

  const topCategories = [...categories]
    .sort((a, b) => b.itemCount - a.itemCount)
    .slice(0, 5);

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "flex-end", mb: 3 }}
      >
        <Box>
          <Typography variant="h5" sx={{ marginBottom: 1 }}>
            Categories
          </Typography>

          <Breadcrumbs separator="›" sx={{ fontSize: 12 }}>
            <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
              href="/"
            >
              <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />
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
              <CategoryIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Categories
            </Typography>
          </Breadcrumbs>
        </Box>

        <Button variant="contained" startIcon={<AddIcon />}>
          Add category
        </Button>
      </Stack>

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
                variant="rounded"
                sx={{ width: 50, height: 50, marginBottom: 1 }}
              />

              <Typography variant={"body1"} sx={{ fontWeight: "bold", mb: 1 }}>
                {category.name}
              </Typography>

              <Typography variant="body2" sx={{ fontSize: 12 }}>
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
                    variant="rounded"
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  {category.name}
                </TableCell>
                <TableCell>{category.itemCount} items</TableCell>
                <TableCell>{formatDate(category.createdAtUtc)}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Details">
                    <IconButton size="small" color="primary">
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} of ${count} items`
          }
        />
      </TableContainer>
    </Box>
  );
}

export default Categories;
