// SnackbarAlert.tsx
import { Snackbar, Alert, type AlertColor } from "@mui/material";
import { memo } from "react";

interface ICustomAlert {
  open: boolean;
  message: string;
  severity: AlertColor;
  onClose: () => void;
}

export const CustomAlert = memo<ICustomAlert>(
  ({ open, message, severity, onClose }) => {
    return (
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={onClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    );
  }
);
