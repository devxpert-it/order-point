import { Grid, Paper, Typography } from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import ShortTextIcon from "@mui/icons-material/ShortText";
import NotesIcon from "@mui/icons-material/Notes";
import SignalWifiStatusbar4BarIcon from "@mui/icons-material/SignalWifiStatusbar4Bar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CategoryStatusChip from "../shared/CategoryStatusChip.jsx";
import { formatDate } from "../../../../utilities/dateUtilities.js";

function CategoryDetailsCard({ category }) {
  return (
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
          <Typography variant={"body1"}>{category.description}</Typography>
        </Grid>

        <Grid size={3}>
          <Typography variant={"body2"} color={"textSecondary"}>
            <SignalWifiStatusbar4BarIcon sx={{ fontSize: 13, mr: 1 }} />
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
  );
}

export default CategoryDetailsCard;
