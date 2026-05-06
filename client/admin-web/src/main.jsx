import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import DashboardPage from "./pages/dashboard/DashboardPage.jsx";
import Layout from "./layout/Layout.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import CategoriesPage from "./pages/category/CategoriesPage.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CategoryDetailsPage from "./pages/category/CategoryDetailsPage.jsx";
import CategoryCreatePage from "./pages/category/CategoryCreatePage.jsx";
import CategoryUpdatePage from "./pages/category/CategoryUpdatePage.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path={"/"} element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path={"categories"} element={<CategoriesPage />} />
            <Route path={"categories/:id"} element={<CategoryDetailsPage />} />
            <Route
              path={"categories/create"}
              element={<CategoryCreatePage />}
            />
            <Route
              path={"categories/:id/edit"}
              element={<CategoryUpdatePage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
