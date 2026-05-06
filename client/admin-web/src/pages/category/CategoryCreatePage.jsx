import {
  Alert,
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader.jsx";
import { useCreateCategory } from "../../api/hooks/useCategoryApiService.js";
import imagePlaceholder from "../../assets/image-placeholder.svg";
import Avatar from "@mui/material/Avatar";
import CategoryStatusChip from "./components/shared/CategoryStatusChip.jsx";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ApiErrorMessage from "../../components/ApiErrorMessage.jsx";

function CategoryCreatePage() {
  const navigate = useNavigate();

  const {
    mutate: createCategory,
    isPending: isCreating,
    isError,
    error,
  } = useCreateCategory();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(0);

  const handleCreate = () => {
    createCategory(
      { name, description, status, imageUrl: null },
      {
        onSuccess: (response) => {
          navigate(`/categories/${response.data.id}`, {
            state: { toast: `Category "${name}" created successfully.` },
          });
        },
      },
    );
  };

  const bullets = [
    "Categories appear on the QR-code customer menu",
    "Items must belong to a category",
    "Inactive categories are hidden from customers",
  ];

  return (
    <Box>
      <PageHeader
        title={"Create category"}
        breadcrumbs={[{ label: "Categories", href: "/categories" }]}
        currentPage={{
          label: "Create category",
        }}
      />

      <Grid container spacing={3}>
        <Grid size={8}>
          <Paper sx={{ p: 3 }}>
            {isError && (
              <Box sx={{ mb: 5 }}>
                <ApiErrorMessage error={error} />
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
                    formHelperText: { sx: { fontSize: 11, mt: 0.5, mx: 0 } },
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
                    formHelperText: { sx: { fontSize: 11, mt: 0.5, mx: 0 } },
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
                    formHelperText: { sx: { fontSize: 11, mt: 0.5, mx: 0 } },
                  }}
                  disabled
                />
              </Grid>

              <Grid size={12}>
                <Box
                  sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}
                >
                  <Button
                    onClick={() => navigate("/categories")}
                    disabled={isCreating}
                  >
                    {"Cancel"}
                  </Button>
                  <Button
                    variant={"contained"}
                    onClick={handleCreate}
                    disabled={isCreating || !name || !description}
                  >
                    {isCreating ? "Creating..." : "Create"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
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
                category
              </Typography>

              <CategoryStatusChip
                status={status === 0 ? "Active" : "Inactive"}
              />
            </Paper>

            <Paper>
              <Alert
                severity={"info"}
                icon={<InfoOutlinedIcon fontSize={"small"} />}
                sx={{ "& .MuiAlert-message": { fontSize: 12 }, p: 2 }}
              >
                <Typography
                  variant={"body2"}
                  fontWeight={"bold"}
                  sx={{ mb: 1, fontSize: 12 }}
                >
                  How categories work
                </Typography>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
                >
                  {bullets.map((bullet) => (
                    <Box
                      key={bullet}
                      sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}
                    >
                      <FiberManualRecordIcon
                        sx={{
                          fontSize: 7,
                          mt: 0.6,
                          color: "text.secondary",
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        variant={"body2"}
                        sx={{ fontSize: 12 }}
                        color={"text.secondary"}
                      >
                        {bullet}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Alert>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CategoryCreatePage;
