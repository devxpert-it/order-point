import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

function DataTableActions({
  searchQuery,
  onSearchChange,
  searchPlaceholder,
  onAdd,
  addLabel,
}) {
  return (
    <Stack
      direction={"row"}
      sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}
    >
      <TextField
        size={"small"}
        variant={"outlined"}
        placeholder={searchPlaceholder}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        slotProps={{
          input: {
            sx: { fontSize: 14 },
            startAdornment: (
              <InputAdornment position={"start"}>
                <SearchIcon fontSize={"small"} />
              </InputAdornment>
            ),
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

      <Button variant={"contained"} startIcon={<AddIcon />} onClick={onAdd}>
        {addLabel}
      </Button>
    </Stack>
  );
}

export default DataTableActions;
