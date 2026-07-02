import React, { useState } from "react";
import {
  Box, CssBaseline, Toolbar, Button,
  Modal, Typography, Divider,
  List,
  ListItemText, ListItemButton
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logOutUser } from "../../redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
const drawerWidth = 240;
const miniDrawerWidth = 70;

function MainLayout({ children }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const {
    loginUserData,
    isloginLoading,
    authChecked,
  } = useSelector((state) => state.user);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleCollapse = () => {
    setCollapsed((prev) => !prev);
  };


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      const response = await dispatch(logOutUser()).unwrap()
      if (response.success) {
        toast.success(response.message)
        navigate('/')
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  console.log(loginUserData, "opop")
  // useSelector
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Header
          handleDrawerToggle={handleDrawerToggle}
          handleCollapse={handleCollapse}
          collapsed={collapsed}
          handle={handleOpen}
        />

        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          collapsed={collapsed}
          drawerWidth={drawerWidth}
          miniDrawerWidth={miniDrawerWidth}
        />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            ml: {
              md: collapsed ? `${miniDrawerWidth}px` : `${drawerWidth}px`,
            },
            p: 3,
            minHeight: "100vh",
            backgroundColor: "#f5f5f5",
            transition: "0.3s",
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>


      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "7%",
              right: "1%",
              width: 220,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 1,
            }}
          >
            <Divider
              sx={{
                width: "100%",
                borderColor: "rgb(230, 218, 218)",
              }}
            />
            <List>

              <ListItemButton component={Link} to={`/user/${loginUserData?.user?.id}`}
                sx={{
                  '&:hover': {
                    backgroundColor: '#f44336',
                    color: 'white',
                    '& .MuiSvgIcon-root': {
                      color: 'white',
                    },
                  },
                }}
              >
                <PersonIcon />
                <ListItemText primary="Profile" />
              </ListItemButton>


              <ListItemButton onClick={handleLogout} 
               sx={{
                  '&:hover': {
                    backgroundColor: '#f44336',
                    color: 'white',
                    '& .MuiSvgIcon-root': {
                      color: 'white',
                    },
                  },
                }}
              >
                <LogoutIcon />
                <ListItemText primary="Logout" />
              </ListItemButton>
              <ListItemButton 
               sx={{
                  '&:hover': {
                    backgroundColor: '#ec3e31',
                    color: 'white',
                    '& .MuiSvgIcon-root': {
                      color: 'white',
                    },
                  },
                }}
              >
                <SettingsIcon />
                <ListItemText primary="Settings" />
              </ListItemButton>



            </List>
          </Box>
        </Modal>
      )}
    </>
  );
}

export default MainLayout;