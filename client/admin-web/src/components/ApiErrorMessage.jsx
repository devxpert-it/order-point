import { Alert, Box, Paper, Typography } from "@mui/material";
import { getErrorDescription, getErrors } from "../api/errorHandler.js";

function ApiErrorMessage({ error }) {
  const description = getErrorDescription(error);
  const errors = getErrors(error);

  return (
    <Paper>
      <Alert severity={"error"}>
        {description && (
          <Typography variant={"body2"}>{description}</Typography>
        )}

        {errors.length > 0 && (
          <Box sx={{ mt: 1 }}>
            {errors.map((err) => (
              <Typography
                key={err.code}
                variant={"body2"}
                sx={{ fontSize: 12 }}
              >
                - {err.description}
              </Typography>
            ))}
          </Box>
        )}
      </Alert>
    </Paper>
  );
}

export default ApiErrorMessage;
