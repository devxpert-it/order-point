import { Box } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import { useState } from "react";
import { useCategoryApiService } from "../../api/hooks/useCategoryApiService.js";
import PageHeader from "../../components/PageHeader.jsx";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";
import TopCategoriesGrid from "./components/TopCategoriesGrid.jsx";
import CategoriesTable from "./components/CategoriesTable.jsx";
import ErrorPaper from "../../components/ErrorPaper.jsx";
import { CategorySortBy } from "../../sorting/categorySortBy.js";
import CategoriesTableActions from "./components/CategoriesTableActions.jsx";
import { useDebounce } from "use-debounce";

function CategoriesPage() {
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState(CategorySortBy.CreatedAtDesc);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const {
    data: responseAll,
    isLoading: isLoadingAll,
    isError: isErrorAll,
    error: errorAll,
  } = useCategoryApiService({
    pageNumber: pageNumber + 1,
    pageSize,
    sortBy,
    searchQuery: debouncedSearchQuery,
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

  const handleSearchChange = (value) => {
    setSearchQuery(value);
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
      />

      <Box sx={{ mb: 3 }}>
        {isLoadingTop && <LoadingSpinner />}
        {!isLoadingTop && isErrorTop && <ErrorPaper error={errorTop} />}
        {!isLoadingTop && !isErrorTop && (
          <TopCategoriesGrid categories={topCategories} />
        )}
      </Box>

      <CategoriesTableActions
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onAdd={() => {
          console.log("add category");
        }}
      />

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
