import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function CategoryFilters({ status, onStatusChange }) {
  return (
    <FormControl size={"small"} sx={{ minWidth: 120 }}>
      <InputLabel id={"status-label"} shrink>
        {"Status"}
      </InputLabel>
      <Select
        labelId={"status-label"}
        value={status ?? ""}
        label={"Status"}
        onChange={(e) => onStatusChange(e.target.value)}
        variant={"outlined"}
        displayEmpty
        notched
      >
        <MenuItem value={""}>{"All"}</MenuItem>
        <MenuItem value={0}>{"Active"}</MenuItem>
        <MenuItem value={1}>{"Inactive"}</MenuItem>
      </Select>
    </FormControl>
  );
}

export default CategoryFilters;
