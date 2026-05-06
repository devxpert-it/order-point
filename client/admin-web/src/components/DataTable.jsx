import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
} from "@mui/material";

function DataTable({
  columns,
  rows,
  getRowId,
  rowActions,
  emptyState,
  totalCount,
  pageNumber,
  pageSize,
  onPageChange,
  onPageSizeChange,
  sortBy,
  onSortByChange,
}) {
  function getSortDirection(ascValue, descValue) {
    if (sortBy === ascValue) return "asc";
    if (sortBy === descValue) return "desc";
    return "desc";
  }

  function isSortActive(ascValue, descValue) {
    return sortBy === ascValue || sortBy === descValue;
  }

  function handleSortClick(ascValue, descValue) {
    if (sortBy === ascValue) {
      onSortByChange(descValue);
    } else {
      onSortByChange(ascValue);
    }
  }

  const hasSorting = sortBy != null && !!onSortByChange;
  const hasActions = rowActions && rowActions.length > 0;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ tableLayout: "fixed" }}>
        <TableHead
          sx={{
            "& .MuiTableCell-root": {
              fontSize: 12,
              py: 1,
            },
          }}
        >
          <TableRow>
            {columns.map((column) => {
              const sortable =
                hasSorting &&
                column.sortAscValue != null &&
                column.sortDescValue != null;
              return (
                <TableCell
                  key={column.key}
                  sortDirection={
                    sortable
                      ? getSortDirection(
                          column.sortAscValue,
                          column.sortDescValue,
                        )
                      : undefined
                  }
                >
                  {sortable ? (
                    <TableSortLabel
                      active={isSortActive(
                        column.sortAscValue,
                        column.sortDescValue,
                      )}
                      direction={getSortDirection(
                        column.sortAscValue,
                        column.sortDescValue,
                      )}
                      onClick={() =>
                        handleSortClick(
                          column.sortAscValue,
                          column.sortDescValue,
                        )
                      }
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              );
            })}
            {hasActions && <TableCell />}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (hasActions ? 1 : 0)}
                align={"center"}
                sx={{ py: 4 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                    color: "text.secondary",
                  }}
                >
                  {emptyState.icon}

                  <Typography variant={"body1"} fontWeight={"bold"}>
                    {emptyState.title}
                  </Typography>

                  <Typography variant={"body2"}>
                    {emptyState.description}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow key={getRowId(row)} hover>
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {column.render ? column.render(row) : row[column.key]}
                  </TableCell>
                ))}
                {hasActions && (
                  <TableCell align={"right"}>
                    {rowActions.map((action) => (
                      <Tooltip key={action.label} title={action.label}>
                        <IconButton
                          size={"small"}
                          color={action.color ?? "default"}
                          onClick={() => action.onClick(row)}
                        >
                          {action.icon}
                        </IconButton>
                      </Tooltip>
                    ))}
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <TablePagination
        component={"div"}
        count={totalCount}
        page={pageNumber}
        rowsPerPage={pageSize}
        onPageChange={onPageChange}
        onRowsPerPageChange={onPageSizeChange}
        rowsPerPageOptions={[10, 20, 30]}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} of ${count} items`
        }
      />
    </TableContainer>
  );
}

export default DataTable;
