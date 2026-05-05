import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetCategory } from "../../api/hooks/useCategoryApiService.js";
import PageHeader from "../../components/PageHeader.jsx";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import imagePlaceholder from "../../assets/image-placeholder.svg";
import { formatDate } from "../../utilities/dateUtilities.js";
import TagIcon from "@mui/icons-material/Tag";
import ShortTextIcon from "@mui/icons-material/ShortText";
import NotesIcon from "@mui/icons-material/Notes";
import SignalWifiStatusbar4BarIcon from "@mui/icons-material/SignalWifiStatusbar4Bar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import CategoryStatusChip from "./components/CategoryStatusChip.jsx";

function CategoryDetailsPage() {
  const { id } = useParams();

  const { data: response, isLoading, isError, error } = useGetCategory(id);
  const category = response?.data;

  return (
    <Box>
      {!isLoading && !isError && (
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <PageHeader
              title={category.name}
              breadcrumbs={[
                {
                  label: "Categories",
                  href: "/categories",
                },
              ]}
              currentPage={{
                label: category.name,
              }}
            />

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
                }}
              >
                <Avatar
                  src={imagePlaceholder}
                  alt={`${category.name} image`}
                  variant={"rounded"}
                  sx={{ width: 80, height: 80, mb: 2 }}
                />

                <Typography variant={"body1"} sx={{ fontWeight: "bold" }}>
                  {category.name}
                </Typography>

                <Typography variant={"body2"} sx={{ fontSize: 12, mb: 2 }}>
                  category
                </Typography>

                <CategoryStatusChip status={category.status} />
              </Paper>
            </Grid>

            <Grid size={9}>
              <Paper sx={{ p: 2 }}>
                <Grid
                  container
                  spacing={3}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Grid size={3}>
                    <Typography variant={"body2"} color={"textSecondary"}>
                      <TagIcon sx={{ fontSize: 13, mr: 1 }} />
                      ID
                    </Typography>
                  </Grid>

                  <Grid size={9}>
                    <Typography variant={"button"}>{category.id}</Typography>
                  </Grid>

                  <Grid size={3}>
                    <Typography variant={"body2"} color={"textSecondary"}>
                      <ShortTextIcon sx={{ fontSize: 13, mr: 1 }} />
                      Name
                    </Typography>
                  </Grid>

                  <Grid size={9}>
                    <Typography variant={"body1"}>{category.name}</Typography>
                  </Grid>

                  <Grid size={3}>
                    <Typography variant={"body2"} color={"textSecondary"}>
                      <NotesIcon sx={{ fontSize: 13, mr: 1 }} />
                      Description
                    </Typography>
                  </Grid>

                  <Grid size={9}>
                    <Typography variant={"body1"}>
                      {category.description}
                    </Typography>
                  </Grid>

                  <Grid size={3}>
                    <Typography variant={"body2"} color={"textSecondary"}>
                      <SignalWifiStatusbar4BarIcon
                        sx={{ fontSize: 13, mr: 1 }}
                      />
                      Status
                    </Typography>
                  </Grid>

                  <Grid size={9}>
                    <CategoryStatusChip status={category.status} />
                  </Grid>

                  <Grid size={3}>
                    <Typography variant={"body2"} color={"textSecondary"}>
                      <CalendarMonthIcon sx={{ fontSize: 13, mr: 1 }} />
                      Created at
                    </Typography>
                  </Grid>

                  <Grid size={9}>
                    <Typography variant={"body1"}>
                      {formatDate(category.createdAtUtc)}
                    </Typography>
                  </Grid>

                  <Grid size={3}>
                    <Typography variant={"body2"} color={"textSecondary"}>
                      <CalendarMonthIcon sx={{ fontSize: 13, mr: 1 }} />
                      Updated at
                    </Typography>
                  </Grid>

                  <Grid size={9}>
                    <Typography variant={"body1"}>
                      {formatDate(category.updatedAtUtc)}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid size={12}>
              {/*TODO: add when items are implemented*/}
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
                  <Box>
                    <Typography variant={"body1"} sx={{ fontWeight: "bold" }}>
                      Items in {category.name}
                    </Typography>

                    <Typography
                      variant={"body2"}
                      color={"textSecondary"}
                      sx={{ fontSize: 12 }}
                    >
                      3 items in this category
                    </Typography>
                  </Box>

                  <Button
                    variant={"outlined"}
                    startIcon={<NorthEastIcon />}
                    onClick={() => console.log("go to items")}
                    sx={{ alignSelf: "flex-start" }}
                  >
                    View all
                  </Button>
                </Box>

                <TableContainer>
                  <Table>
                    <TableHead
                      sx={{ "& .MuiTableCell-root": { fontSize: 12, py: 1 } }}
                    >
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Avatar
                            src={imagePlaceholder}
                            alt={"Test"}
                            variant="rounded"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant={"body1"}>Mojito</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant={"body1"}>$21.03</Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default CategoryDetailsPage;
