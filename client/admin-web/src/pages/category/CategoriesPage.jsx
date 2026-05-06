import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetCategories } from "../../api/hooks/useCategoryApiService.js";
import PageHeader from "../../components/PageHeader.jsx";
import TopCategoriesGrid from "./components/categories-page/TopCategoriesGrid.jsx";
import CategoriesTable from "./components/categories-page/CategoriesTable.jsx";
import { CategorySortBy } from "../../sorting/categorySortBy.js";
import { useDebounce } from "use-debounce";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "../../components/hooks/useToast.js";
import Toast from "../../components/Toast.jsx";

function CategoriesPage() {
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState(CategorySortBy.CreatedAtDesc);

  const navigate = useNavigate();

  const location = useLocation();
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    if (location.state?.toast) {
      showToast(location.state.toast, "success");
    }
  }, []);

  const {
    data: responseAll,
    isLoading: isLoadingAll,
    isError: isErrorAll,
    error: errorAll,
  } = useGetCategories({
    pageNumber: pageNumber + 1,
    pageSize,
    searchQuery: debouncedSearchQuery || null,
    status: status !== "" ? status : null,
    sortBy,
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
    setPageNumber(0);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setPageNumber(0);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
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
        status={status}
        onStatusChange={handleStatusChange}
        onAdd={() => navigate("/categories/create")}
        isLoading={isLoadingAll}
        isError={isErrorAll}
        error={errorAll}
      />

      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={hideToast}
      />
    </Box>
  );
}

export default CategoriesPage;
