import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar.jsx";
import Sidebar from "./Sidebar.jsx";
import { useState } from "react";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar open={sidebarOpen} />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Topbar onMenuClick={() => setSidebarOpen((previous) => !previous)} />
        <Box component={"main"} sx={{ p: 2, flexGrow: 1, overflow: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
