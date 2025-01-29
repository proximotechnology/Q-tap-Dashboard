import React, { useState } from "react";
import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Popover, Typography } from "@mui/material";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Switch from '@mui/material/Switch';
import { useLocation, useNavigate } from "react-router";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

const pageTitles = {
    '/dashboard-home': 'Dashboard',
    '/client': 'Client',
    '/wallet': 'Wallet',
    '/product': 'Product',
    "/support":"Support",
    '/pricing':"Pricing",
    '/affiliate' : 'Affiliate',
    "/setting": "Setting",
    "/notification":"Notification",
    "/feedback-admin": "Feedback",
};
export default function TopBar() {
    const [mode, setMode] = useState('light');
    const navigate = useNavigate();

    const handleToggle = (event) => {
        setMode(event.target.checked ? 'light' : 'dark');
    };

    const handleToggleMode = () => {
        setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
    };

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

    const iconColor = mode === 'light' ? '#ff9800' : '#ff9800';
    const location = useLocation(); 
    return (
        <Box sx={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "30px 60px 0px 60px ",
        }}>
            <Typography variant="body1" sx={{ fontSize: "15px", color: "#222240" }}>
            {pageTitles[location.pathname] || 'Dashboard'}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>

                <Box sx={{ marginRight: "20px", display: "flex", justifyContent: "center", textAlign: "center", alignItems: "center" }}>
                    <LightModeOutlinedIcon onClick={handleToggleMode}
                        sx={{ fontSize: "20px", fill: mode === 'light' ? iconColor : '#575756' }} />
                    <Switch
                        checked={mode === 'light'}
                        onChange={handleToggle}
                        sx={{
                            margin: "0px -10px !important",
                            transform: 'scale(0.8)', // تصغير الحجم العام
                            '& .MuiSwitch-switchBase': {
                                padding: -1, // تصغير القاعدة
                            },
                            '& .MuiSwitch-thumb': {
                                width: 18, // تصغير النقطة
                                height: 18,
                                color: "#ef7d00",
                            },
                            '& .MuiSwitch-track': {
                                borderRadius: 12,
                                height: 15,
                                width: 50, // تصغير المسار
                            },
                            '& .MuiSwitch-switchBase.Mui-checked': {
                                color: "#ef7d00",
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: "#D8E0E0",
                            },
                        }}
                    />
                    <DarkModeOutlinedIcon onClick={handleToggleMode}
                        sx={{ fontSize: "20px", fill: mode === 'dark' ? iconColor : '#575756' }} />
                </Box>

                <Box sx={{ cursor: "pointer", display: "flex", marginRight: "20px", alignItems: "center" }}
                    onClick={handleLanguageClick}>
                    {getLanguageIcon()}
                    <KeyboardArrowDownIcon sx={{ fontSize: "18px", color: "#575756" }} />
                    <Menu
                        anchorEl={anchorElLanguage}
                        open={openLanguage} 
                        onClose={() => setAnchorElLanguage(null)} 
                        sx={{padding:"2px"}} 
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
                                        sx: { color: '#5D5D5C', fontSize: '12px',marginLeft: "-30px" }
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
        </Box>
    );
}
