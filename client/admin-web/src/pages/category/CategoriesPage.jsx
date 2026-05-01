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
import { CategorySortBy } from "../../sorting/categorySortBy.js";

function CategoriesPage() {
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState(CategorySortBy.CreatedAtDesc);

  const {
    data: responseAll,
    isLoading: isLoadingAll,
    isError: isErrorAll,
    error: errorAll,
  } = useCategoryApiService({
    pageNumber: pageNumber + 1,
    pageSize,
    sortBy,
  });

  const {
    data: responseTop,
    isLoading: isLoadingTop,
    isError: isErrorTop,
    error: errorTop,
  } = useCategoryApiService({
    pageNumber: 1,
    pageSize: 5,
    sortBy: CategorySortBy.NameAsc,
  });

  const isAnyLoading = isLoadingAll || isLoadingTop;
  const isAnyError = isErrorAll || isErrorTop;

  const categories = responseAll?.data?.items ?? [];
  const totalCount = responseAll?.data?.totalCount ?? 0;

  const topCategories = responseTop?.data?.items ?? [];

  const handleChangePageNumber = (_, newPageNumber) =>
    setPageNumber(newPageNumber);

  const handleChangePageSize = (e) => {
    setPageSize(parseInt(e.target.value, 10));
    setPageNumber(0);
  };

  const handleSortByChange = (value) => {
    setSortBy(value);
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

      <Box sx={{ mb: 3 }}>
        {isLoadingTop && <LoadingSpinner />}
        {!isLoadingTop && isErrorTop && <ErrorPaper error={errorTop} />}
        {!isLoadingTop && !isErrorTop && (
          <TopCategoriesGrid categories={topCategories} />
        )}
      </Box>

      <Box>
        {isLoadingAll && <LoadingSpinner />}
        {!isLoadingAll && isErrorAll && <ErrorPaper error={errorAll} />}
        {!isLoadingAll && !isErrorAll && (
          <CategoriesTable
            categories={categories}
            totalCount={totalCount}
            pageNumber={pageNumber}
            pageSize={pageSize}
            onPageChange={handleChangePageNumber}
            onPageSizeChange={handleChangePageSize}
            sortBy={sortBy}
            onSortByChange={handleSortByChange}
          />
        )}
      </Box>
    </Box>
  );
}

export default CategoriesPage;
