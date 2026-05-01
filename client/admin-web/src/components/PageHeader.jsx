import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link as RouterLink } from "react-router-dom";
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";

function PageHeader({ title, breadcrumbs = [], currentPage }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant={"h5"} sx={{ mb: 1 }}>
        {title}
      </Typography>

      <Breadcrumbs separator="›" sx={{ fontSize: 12 }}>
        <Link
          component={RouterLink}
          to="/"
          underline={"hover"}
          sx={{ display: "flex", alignItems: "center" }}
          color={"inherit"}
        >
          <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Dashboard
        </Link>

        {breadcrumbs.map((crumb) => (
          <Link
            key={crumb.label}
            component={RouterLink}
            to={crumb.href}
            underline={"hover"}
            sx={{ display: "flex", alignItems: "center" }}
            color={"inherit"}
          >
            {crumb.icon && (
              <Box component={"span"} sx={{ mr: 0.5, display: "flex" }}>
                {crumb.icon}
              </Box>
            )}
            {crumb.label}
          </Link>
        ))}

        <Typography
          sx={{
            color: "text.primary",
            display: "flex",
            alignItems: "center",
            fontSize: 12,
          }}
        >
          {currentPage.icon && (
            <Box component={"span"} sx={{ mr: 0.5, display: "flex" }}>
              {currentPage.icon}
            </Box>
          )}
          {currentPage.label}
        </Typography>
      </Breadcrumbs>
    </Box>
  );
}

export default PageHeader;
