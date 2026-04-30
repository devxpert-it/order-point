import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar.jsx";
import Sidebar from "./Sidebar.jsx";
import { useState } from "react";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar open={sidebarOpen} />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Topbar onMenuClick={() => setSidebarOpen((previous) => !previous)} />
        <Box component={"main"} sx={{ p: 2, flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
