import { Avatar, Button, Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Popover, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { useNavigate } from "react-router";
import { PersonalInfo } from './PersonalInfo';
import { BusinessInfo } from './BusinessInfo';
export const AddClient = () => {

  const navigate = useNavigate();

  const [anchorElLanguage, setAnchorElLanguage] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const openLanguage = Boolean(anchorElLanguage);

  const handleLanguageClick = (event) => {
    setAnchorElLanguage(event.currentTarget);
  };

  const handleLanguageClose = (language) => {
    setAnchorElLanguage(null);
    setSelectedLanguage(language);
  };

  const getLanguageIcon = () => {
    return selectedLanguage === 'ar' ? <span class="icon-translation" style={{ color: "#ef7d00", fontSize: "22px" }}> </span>
      : <LanguageOutlinedIcon sx={{ color: "#ef7d00", fontSize: "22px" }} />;
  };
  const [anchorElUser, setAnchorElUser] = useState(null);
  const openUserPopover = Boolean(anchorElUser);

  const handleUserClick = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleUserClose = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ backgroundColor: "white", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "0px 60px",
          justifyContent: "space-between",
          width: "90%",
          height: "70px",
        }}>
        <Box>
          <img src="/images/qtap.PNG" alt='logo' width={"140px"} />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }} >
          <Box sx={{ cursor: "pointer", display: "flex", marginRight: "20px", alignItems: "center" }}
            onClick={handleLanguageClick}>
            {getLanguageIcon()}
            <KeyboardArrowDownIcon sx={{ fontSize: "18px", color: "#575756" }} />
            <Menu
              anchorEl={anchorElLanguage}
              open={openLanguage}
              onClose={() => setAnchorElLanguage(null)}
              sx={{ padding: "2px" }}
            >
              <MenuItem onClick={() => handleLanguageClose('ar')}>
                <span class="icon-translation" style={{ color: "#575756", marginRight: '8px', fontSize: "20px" }}></span>
                <span style={{ fontSize: "12px", color: "#575756" }}>Arabic</span>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => handleLanguageClose('en')}>
                <LanguageOutlinedIcon sx={{ color: "#575756", marginRight: '8px', fontSize: "20px" }} />
                <span style={{ fontSize: "12px", color: "#575756" }}>English</span>
              </MenuItem>
            </Menu>
          </Box>

          <Box
            aria-describedby={openUserPopover ? 'simple-popover' : undefined}
            onClick={handleUserClick}
            sx={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "3px" }}>
            <IconButton color="inherit" sx={{
              backgroundColor: '#ef7d00', borderRadius: '30%', padding: '5px',
              '&:hover': {
                backgroundColor: '#ef7d00',
              }
            }}>
              <PersonOutlineOutlinedIcon sx={{ fontSize: "20px", color: "white" }} />
            </IconButton>
            <Typography variant="body1" sx={{ fontSize: "13px", color: "#575756" }}>User01</Typography>
            <KeyboardArrowDownIcon sx={{ fontSize: "18px", color: "#575756" }} />
          </Box>
          <Popover
            id={openUserPopover ? 'simple-popover' : undefined}
            open={openUserPopover}
            anchorEl={anchorElUser}
            onClose={handleUserClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Box sx={{ width: 200, padding: '10px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: '20px', gap: '10px' }}>
                <Avatar sx={{ bgcolor: '#ef7d00', width: 40, height: 40 }}>
                  <PersonOutlineOutlinedIcon sx={{ fontSize: "22px" }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontSize: "14px" }}>User01</Typography>
                  <Typography variant="body2" sx={{ fontSize: "12px" }} color="textSecondary">Mail@mail.com</Typography>
                </Box>
              </Box>
              <Divider />

              <List>
                <Box
                  onClick={() => navigate('/')}
                  sx={{
                    cursor: "pointer",
                    backgroundColor: "#222240",
                    color: "white",
                    marginBottom: "10px",
                    borderRadius: "30px",
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                    justifyContent: "center",
                    width: "80%",
                    padding: "5px 0px",
                    margin: "0 auto",
                  }}>

                  <span class="icon-home-icon-silhouette" style={{ color: "#ef7d00", marginRight: "5px", fontSize: "15px" }} ></span>
                  <span style={{ color: "white", fontSize: "12px", textTransform: "capitalize" }}>
                    Home
                  </span>
                </Box>

                <ListItem sx={{ cursor: "pointer" }} oonClick={handleUserClose}>
                  <ListItemIcon>
                    <img src="/assets/setting.svg" alt="icon" style={{ width: "16px", height: "16px" }} />
                  </ListItemIcon>
                  <ListItemText primary="Edit Profile"
                    primaryTypographyProps={{
                      sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: "-30px" }
                    }} />
                </ListItem>

                <ListItem sx={{ cursor: "pointer" }} onClick={handleUserClose}>
                  <ListItemIcon>
                    <span class="icon-price-tag" style={{ fontSize: "20px" }}></span>
                  </ListItemIcon>
                  <ListItemText primary="My Subscription"
                    primaryTypographyProps={{
                      sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: "-30px" }
                    }} />
                </ListItem>

                <ListItem sx={{ cursor: "pointer" }} onClick={handleUserClose}>
                  <ListItemIcon>
                    <HelpOutlineOutlinedIcon sx={{ fontSize: "20px" }} />
                  </ListItemIcon>
                  <ListItemText primary="FAQ"
                    primaryTypographyProps={{
                      sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: "-30px" }
                    }} />
                </ListItem>

                <ListItem sx={{ cursor: "pointer" }} onClick={handleUserClose}>
                  <ListItemIcon>
                    <img src="/assets/logout.svg" alt="icon" style={{ width: "16px", height: "16px" }} />
                  </ListItemIcon>
                  <ListItemText primary="Logout"
                    primaryTypographyProps={{
                      sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: "-30px" }
                    }} />
                </ListItem>
              </List>
            </Box>
          </Popover>
        </Box>
      </Box>  {/* header */}

      <Divider sx={{ backgroundColor: "#ef7d00", borderBottom: "none", width: "100%", height: "3px" }} />


      <Box >
        <Grid container spacing={1}>

          <Grid item xs={12} md={5}>
            <PersonalInfo />
          </Grid>

          <Box item sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Divider orientation="vertical" sx={{ backgroundColor: '#f4f6fc', width: '1px', marginTop: "30px", height: "90%" }} />
          </Box>

          <Grid item xs={12} md={6}>
            <BusinessInfo />
          </Grid>
        </Grid>

        <Grid container justifyContent="center" sx={{ marginTop: 3 }}>
          <Button
            sx={{
              width: '160px', textTransform: "capitalize", backgroundColor: "#ef7d00", 
              color: "white", borderRadius: "20px", padding: "5px",
              '&:hover': {
                backgroundColor: "#ef7d10",
              }
            }}>
            <CheckOutlinedIcon sx={{ fontSize: "22px", mr: 1 }} /> Save
          </Button>
        </Grid>
      </Box>

    </Box>
  )
}
