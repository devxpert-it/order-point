import { Avatar, Paper, Typography } from "@mui/material";
import imagePlaceholder from "../../../../assets/image-placeholder.svg";
import CategoryStatusChip from "../shared/CategoryStatusChip.jsx";

function CategoryProfileCard({ name, status }) {
  return (
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
        alt={`${name} image`}
        variant={"rounded"}
        sx={{ width: 80, height: 80, mb: 2 }}
      />

      <Typography variant={"body1"} sx={{ fontWeight: "bold" }}>
        {name}
      </Typography>

      <Typography variant={"body2"} sx={{ fontSize: 12, mb: 2 }}>
        category
      </Typography>

      <CategoryStatusChip status={status} />
    </Paper>
  );
}

export default CategoryProfileCard;
