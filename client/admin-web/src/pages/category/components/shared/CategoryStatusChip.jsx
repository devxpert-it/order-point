import { Chip } from "@mui/material";

function CategoryStatusChip({ status }) {
  return (
    <Chip
      label={status}
      size={"small"}
      sx={{
        backgroundColor: status === "Active" ? "#c8f1c9" : "#fbd8db",
        color: status === "Active" ? "#2e7d32" : "#c62828",
        fontWeight: 600,
        fontSize: 12,
      }}
    />
  );
}

export default CategoryStatusChip;
