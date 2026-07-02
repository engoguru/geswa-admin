import React from "react";
import { Link } from "react-router-dom";

import {
  Box,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ContactsIcon from '@mui/icons-material/Contacts';
import SettingsIcon from "@mui/icons-material/Settings";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import CelebrationIcon from '@mui/icons-material/Celebration';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import HandshakeIcon from '@mui/icons-material/Handshake';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';

const menuItems = [ 
  { name: "Dashboard", icon: <DashboardIcon />, to: "/f" },
  { name: "Users", icon: <PeopleIcon />, to: "/user" },
  { name: "contact", icon: <ContactsIcon />, to: "/contact" },
  { name: "Partner", icon: <HandshakeIcon />, to: "/partner" },
  { name: "Co-ordinator", icon: <InterpreterModeIcon />, to: "/department" },
  //  { name: "Sales", icon: <AttachMoneyIcon />, to: "/sale" },

  { name: "Career", icon: <Inventory2Icon />, to: "/career" },
  // { name: "Product", icon: <Inventory2Icon />, to: "/product" },
  { name: "Expanses", icon: <AirlineSeatReclineNormalIcon />, to: "/expanse" },
  { name: "Event", icon: <CelebrationIcon />, to: "/event" },
  // { name: "Leave", icon: <TimeToLeaveIcon />, to: "/contact" },
  // { name: "Salary", icon: <ShoppingBasketIcon />, to: "/salary" },
  { name: "Blog", icon: <ShoppingBasketIcon />, to: "/blog" },

  // { name: "Settings", icon: <SettingsIcon />, to: "/settings" },
];

export default function Sidebar({
  mobileOpen,
  handleDrawerToggle,
  collapsed,
  drawerWidth,
  miniDrawerWidth,
}) {
  const width = collapsed ? miniDrawerWidth : drawerWidth;

  const drawer = (
    <Box>
      <Toolbar>
        {!collapsed && (
          <Typography fontWeight={700}>ADMIN</Typography>

        )}

      </Toolbar>
      <Divider
        sx={{
          width: "100%",
          borderColor: "rgb(255, 255, 255)",
        }}
      />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={Link}
              to={item.to}
              sx={{
                justifyContent: collapsed ? "center" : "flex-start",
                px: 2,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: collapsed ? 0 : 2,
                  justifyContent: "center",
                  color: "#fff",
                }}
              >
                {item.icon}
              </ListItemIcon>

              {!collapsed && (
                <ListItemText primary={item.name} />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* MOBILE */}
      <Drawer
        open={mobileOpen}
        onClose={handleDrawerToggle}
        variant="temporary"
        sx={{

          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: "#0f172a",
            color: "#fff",
            borderRight: "none",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* DESKTOP */}
      <Drawer
        variant="permanent"
        sx={{

          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width,
            transition: "0.3s",
            overflowX: "hidden",
            background: "#0f172a",
            color: "#fff",
            borderRight: "none",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
}