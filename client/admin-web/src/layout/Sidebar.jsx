import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CategoryIcon from "@mui/icons-material/Category";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { NavLink } from "react-router-dom";
import imagePlaceholder from "../assets/image-placeholder.svg";

function Sidebar({ open }) {
  const DRAWER_WIDTH = 240;

  const navSections = [
    {
      heading: "Overview",
      items: [
        { label: "Dashboard", icon: <DashboardIcon />, path: "/" },
        { label: "Orders", icon: <ReceiptIcon />, path: "/orders" },
      ],
    },
    {
      heading: "Management",
      items: [
        { label: "Bartenders", icon: <PeopleIcon />, path: "/bartenders" },
        { label: "Items", icon: <MenuBookIcon />, path: "/items" },
        { label: "Categories", icon: <CategoryIcon />, path: "/categories" },
      ],
    },
  ];

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? DRAWER_WIDTH : 0,
        flexShrink: 0,
        transition: "width 0.2s",
        "& .MuiDrawer-paper": {
          width: open ? DRAWER_WIDTH : 0,
          boxSizing: "border-box",
          borderRight: "none",
          boxShadow: 3,
          overflowX: "hidden",
          transition: "width 0.2s",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 2,
          height: 64,
          bgcolor: "primary.main",
          color: "white",
        }}
      >
        <Avatar
          src={imagePlaceholder}
          alt={"OrderPoint logo"}
          variant="rounded"
          sx={{ marginRight: 1 }}
        />

        <Stack>
          <Typography variant="h6">OrderPoint</Typography>
          <Typography variant="subtle" sx={{ fontSize: 12 }}>
            Admin Web
          </Typography>
        </Stack>
      </Box>

      <List disablePadding>
        {navSections.map((section, index) => (
          <Box key={section.heading}>
            {index > 0 && <Divider />}
            <Typography
              sx={{
                px: 2,
                pt: 1.5,
                pb: 0.5,
                fontSize: 11,
                fontWeight: "bold",
                letterSpacing: 1,
                color: "text.secondary",
                textTransform: "uppercase",
              }}
            >
              {section.heading}
            </Typography>
            {section.items.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  end={item.path === "/"}
                  sx={{
                    "&.active": {
                      backgroundColor: "rgba(25, 118, 210, 0.08)",
                      color: "primary.main",
                      borderLeft: "3px solid",
                      borderColor: "primary.main",
                      fontWeight: "bold",
                      "& .MuiListItemIcon-root": {
                        color: "primary.main",
                      },
                      "& .MuiListItemText-primary": {
                        fontWeight: "bold",
                      },
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    sx={{ "& .MuiListItemText-primary": { fontSize: 14 } }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </Box>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
