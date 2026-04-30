import { Alert, Box, Paper } from "@mui/material";

function ErrorPaper({ message }) {
  return (
    <Paper sx={{ p: 3 }}>
      <Box>
        <Alert severity={"error"}>{message}</Alert>
      </Box>
    </Paper>
  );
}

export default ErrorPaper;
