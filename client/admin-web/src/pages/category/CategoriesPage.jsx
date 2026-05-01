import { Box, Button } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useCategoryApiService } from "../../api/hooks/useCategoryApiService.js";
import PageHeader from "../../components/PageHeader.jsx";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";
import TopCategoriesGrid from "./components/TopCategoriesGrid.jsx";
import CategoriesTable from "./components/CategoriesTable.jsx";
import ErrorPaper from "../../components/ErrorPaper.jsx";

function CategoriesPage() {
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useCategoryApiService({
    pageNumber: pageNumber + 1,
    pageSize: pageSize,
  });

  const categories = response?.data?.items ?? [];
  const totalCount = response?.data?.totalCount ?? 0;

  // TODO: separate API call
  const topCategories = [...categories]
    .sort((a, b) => b.itemsCount - a.itemsCount)
    .slice(0, 5);

  const handleChangePageNumber = (_, newPageNumber) =>
    setPageNumber(newPageNumber);

  const handleChangePageSize = (e) => {
    setPageSize(parseInt(e.target.value, 10));
    setPageNumber(0);
  };

  return (
    <Box>
      <PageHeader
        title={"Categories"}
        currentPage={{
          label: "Categories",
          icon: <CategoryIcon fontSize="inherit" />,
        }}
        action={
          <Button variant={"contained"} startIcon={<AddIcon />}>
            Add category
          </Button>
        }
      />

      {isLoading && <LoadingSpinner />}

      {isError && <ErrorPaper error={error} />}

      {!isLoading && !isError && (
        <>
          <TopCategoriesGrid categories={topCategories} />

          <CategoriesTable
            categories={categories}
            totalCount={totalCount}
            pageNumber={pageNumber}
            pageSize={pageSize}
            onPageChange={handleChangePageNumber}
            onPageSizeChange={handleChangePageSize}
          />
        </>
      )}
    </Box>
  );
}

export default CategoriesPage;
