import { Box, Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";

function PageHeader({ title, breadcrumbs = [], currentPage, action }) {
  return (
    <Stack
      direction={"row"}
      sx={{ justifyContent: "space-between", alignItems: "flex-end", mb: 3 }}
    >
      <Box>
        <Typography variant={"h5"} sx={{ mb: 1 }}>
          {title}
        </Typography>

        <Breadcrumbs separator="›" sx={{ fontSize: 12 }}>
          <Link
            underline={"hover"}
            sx={{ display: "flex", alignItems: "center" }}
            color={"inherit"}
            href={"/"}
          >
            <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Dashboard
          </Link>

          {breadcrumbs.map((crumb) => (
            <Link
              key={crumb.label}
              underline={"hover"}
              sx={{ display: "flex", alignItems: "center" }}
              color={"inherit"}
              href={crumb.href}
            >
              {crumb.icon && (
                <Box component="span" sx={{ mr: 0.5, display: "flex" }}>
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
              <Box component="span" sx={{ mr: 0.5, display: "flex" }}>
                {currentPage.icon}
              </Box>
            )}
            {currentPage.label}
          </Typography>
        </Breadcrumbs>
      </Box>

      {action && <Box>{action}</Box>}
    </Stack>
  );
}

export default PageHeader;
