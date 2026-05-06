import {
  Avatar,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import imagePlaceholder from "../../../../assets/image-placeholder.svg";

function CategoryItemsCard({ name }) {
  return (
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
            Items in {name}
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
          startIcon={<AddIcon />}
          onClick={() => console.log("add item")}
          sx={{ alignSelf: "flex-start" }}
        >
          Add item
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead sx={{ "& .MuiTableCell-root": { fontSize: 12, py: 1 } }}>
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
                  variant={"rounded"}
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
  );
}

export default CategoryItemsCard;
