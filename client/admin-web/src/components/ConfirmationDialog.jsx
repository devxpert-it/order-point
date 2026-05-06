import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ApiErrorMessage from "./ApiErrorMessage.jsx";

function ConfirmationDialog({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel,
  confirmColor,
  isPending,
  pendingLabel,
  onConfirm,
  onCancel,
  error,
}) {
  return (
    <Dialog open={open} onClose={onCancel}>
      {error && (
        <Box sx={{ mt: 3, mx: 3 }}>
          <ApiErrorMessage error={error} />
        </Box>
      )}

      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>

      <DialogActions sx={{ pb: 3, pr: 3 }}>
        <Button onClick={onCancel} disabled={isPending}>
          {cancelLabel}
        </Button>

        <Button
          onClick={onConfirm}
          color={confirmColor}
          variant={"contained"}
          disabled={isPending}
        >
          {isPending && pendingLabel ? pendingLabel : confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
