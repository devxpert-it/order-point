import { Alert, Snackbar } from "@mui/material";

function Toast({ open, message, severity, onClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert onClose={onClose} severity={severity} variant={"filled"}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Toast;
