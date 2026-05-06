export function formatDate(dateStr) {
  if (!dateStr) return "-";

  return new Date(dateStr).toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
