export function getProblemDetails(error) {
  return error?.response?.data ?? null;
}

export function getErrorDescription(error) {
  const problemDetails = getProblemDetails(error);
  return problemDetails?.detail ?? null;
}

export function getErrors(error) {
  const problemDetails = getProblemDetails(error);
  return problemDetails?.errors ?? [];
}
