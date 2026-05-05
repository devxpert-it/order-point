import { Box } from "@mui/material";
import { useState } from "react";
import { useGetCategories } from "../../api/hooks/useCategoryApiService.js";
import PageHeader from "../../components/PageHeader.jsx";
import TopCategoriesGrid from "./components/categories-page/TopCategoriesGrid.jsx";
import CategoriesTable from "./components/categories-page/CategoriesTable.jsx";
import { CategorySortBy } from "../../sorting/categorySortBy.js";
import { useDebounce } from "use-debounce";

function CategoriesPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState(CategorySortBy.CreatedAtDesc);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const {
    data: responseAll,
    isLoading: isLoadingAll,
    isError: isErrorAll,
    error: errorAll,
  } = useGetCategories({
    pageNumber: pageNumber,
    pageSize,
    sortBy,
    searchQuery: debouncedSearchQuery,
  });

  const {
    data: responseTop,
    isLoading: isLoadingTop,
    isError: isErrorTop,
    error: errorTop,
  } = useGetCategories({
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
    setPageNumber(1);
  };

  const handleSortByChange = (value) => {
    setSortBy(value);
    setPageNumber(1);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setPageNumber(1);
  };

  return (
    <Box>
      <PageHeader
        title={"Categories"}
        currentPage={{
          label: "Categories",
        }}
      />

      <TopCategoriesGrid
        categories={topCategories}
        isLoading={isLoadingTop}
        isError={isErrorTop}
        error={errorTop}
      />

      <CategoriesTable
        categories={categories}
        totalCount={totalCount}
        pageNumber={pageNumber}
        pageSize={pageSize}
        onPageChange={handleChangePageNumber}
        onPageSizeChange={handleChangePageSize}
        sortBy={sortBy}
        onSortByChange={handleSortByChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onAdd={() => console.log("add category")}
        isLoading={isLoadingAll}
        isError={isErrorAll}
        error={errorAll}
      />
    </Box>
  );
}

export default CategoriesPage;
