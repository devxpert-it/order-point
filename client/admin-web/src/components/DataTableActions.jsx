import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

function DataTableActions({
  searchQuery,
  onSearchChange,
  searchPlaceholder,
  filters,
  onAdd,
  addLabel,
}) {
  return (
    <Stack
      direction={"row"}
      sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <TextField
          label={searchPlaceholder}
          variant={"outlined"}
          size={"small"}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          slotProps={{
            input: {
              endAdornment: searchQuery && (
                <InputAdornment position={"end"}>
                  <IconButton size={"small"} onClick={() => onSearchChange("")}>
                    <ClearIcon fontSize={"small"} />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        {filters}
      </Box>

      <Button variant={"contained"} startIcon={<AddIcon />} onClick={onAdd}>
        {addLabel}
      </Button>
    </Stack>
  );
}

export default DataTableActions;
