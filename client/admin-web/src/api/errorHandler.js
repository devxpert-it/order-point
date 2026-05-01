export function getProblemDetails(error) {
  return error?.response?.data ?? null;
}

export function getErrorDescription(error) {
  const problemDetails = getProblemDetails(error);
  return problemDetails?.detail ?? "Unknown error occurred";
}

export function getErrors(error) {
  const problemDetails = getProblemDetails(error);
  return problemDetails?.errors ?? [];
}
