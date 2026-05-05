import { Link as RouterLink } from "react-router-dom";
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";

function PageHeader({ title, breadcrumbs = [], currentPage, actions }) {
  return (
    <Box
      sx={{
        mb: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <Box>
        <Typography variant={"h5"} sx={{ mb: 1 }}>
          {title}
        </Typography>

        <Breadcrumbs separator={"›"} sx={{ fontSize: 12 }}>
          <Link
            component={RouterLink}
            to={"/"}
            underline={"hover"}
            sx={{ display: "flex", alignItems: "center" }}
            color={"inherit"}
          >
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
            {currentPage.label}
          </Typography>
        </Breadcrumbs>
      </Box>

      {actions && <Box>{actions}</Box>}
    </Box>
  );
}

export default PageHeader;
