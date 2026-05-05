import { useState } from "react";

export function useToast() {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const showToast = (message, severity) =>
    setToast({ open: true, message, severity });

  const hideToast = () => setToast((prev) => ({ ...prev, open: false }));

  return { toast, showToast, hideToast };
}
