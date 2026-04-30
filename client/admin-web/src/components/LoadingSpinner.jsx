import { Box, CircularProgress, Paper, Typography } from "@mui/material";

function LoadingSpinner() {
  return (
    <Paper sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ mb: 2 }} />
        <Typography variant={"body2"}>Loading...</Typography>
      </Box>
    </Paper>
  );
}

export default LoadingSpinner;
