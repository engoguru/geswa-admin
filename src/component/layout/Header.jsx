import React from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Button,
  Modal
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const drawerWidth = 240;

export default function Header({
  handleDrawerToggle,
  handleCollapse,
  collapsed,
  handle
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
 

  return (
    <>
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${collapsed ? 70 : drawerWidth}px)` },
        ml: { md: `${collapsed ? 70 : drawerWidth}px` },
        transition: "0.3s",
      }}
    >
      <Toolbar>
        {/* MOBILE MENU */}
        <IconButton
          onClick={handleDrawerToggle}
          sx={{ display: { md: "none" }, mr: 2 }}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>

        {/* DESKTOP COLLAPSE BUTTON */}
        <IconButton
          onClick={handleCollapse}
          sx={{ display: { xs: "none", md: "inline-flex" }, mr: 2 }}
          color="inherit"
        >
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>

        <Typography variant="h6">Admin Panel</Typography>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton color="inherit">
          <AccountCircle onClick={handle} />
        </IconButton>
      </Toolbar>
   
    </AppBar>


    </>
  );
}


