import React, { useState } from "react";
import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Popover, Typography, useTheme } from "@mui/material";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Switch from '@mui/material/Switch';
import { useLocation, useNavigate } from "react-router";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Language from "./Language";
import { useTranslation } from "react-i18next";
import { useColorMode } from '../../../context/ThemeModeProvider'
import DarkModeSwitch from "../../DarkModeSwitch";

export default function TopBar() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const theme = useTheme();
    const pageTitles = {
        '/dashboard-home': t("dashboard"),
        '/client': t("client"),
        '/wallet': t("wallet"),
        '/product-admin': t("product"),
        "/support": t("support"),
        '/pricing': t("pricing"),
        '/affiliate': t("affiliateMarketing"),
        "/setting": t("setting"),
        "/notification": t("notification"),
        "/feedback-admin": t("feedback"),
    };


    const [anchorElLanguage, setAnchorElLanguage] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    //TODO:delete unused functions and variable
    const openLanguage = Boolean(anchorElLanguage);

    const handleLanguageClick = (event) => {
        setAnchorElLanguage(event.currentTarget);
    };

    const handleLanguageClose = (language) => {
        if (language) {
            setSelectedLanguage(language);
        }
        setAnchorElLanguage(null);
    };


    const getLanguageIcon = () => {
        return selectedLanguage === 'ar' ? <span class="icon-translation" style={{ color: theme.palette.orangePrimary.main, fontSize: "22px" }}> </span>
            : <LanguageOutlinedIcon sx={{ color: theme.palette.orangePrimary.main, fontSize: "22px" }} />;
    };
    const [anchorElUser, setAnchorElUser] = useState(null);
    const openUserPopover = Boolean(anchorElUser);

    const handleUserClick = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleUserClose = () => {
        setAnchorElUser(null);
    };

    const location = useLocation();
    return (
        <Box sx={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "30px 60px 0px 60px ",
        }}>
            <Typography variant="body1" sx={{ fontSize: "20px", color: theme.palette.secondaryColor.main }}>
                {pageTitles[location.pathname] || 'Dashboard'}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                {/* TODO:lang / dark mode disappear in xs screen and go to the parson list item */}
                {/* light dark mode */}
                <Box sx={{ display:{xs:'none',sm:'flex'} }}>
                    <DarkModeSwitch />
                <Language />
                </Box>
                {/* language */}

                {/* user option */}
                <Box
                    aria-describedby={openUserPopover ? 'simple-popover' : undefined}
                    onClick={handleUserClick}
                    sx={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "3px" }}>
                    <IconButton color="inherit" sx={{
                        backgroundColor: theme.palette.orangePrimary.main, borderRadius: '30%', padding: '5px',
                        '&:hover': {
                            backgroundColor: theme.palette.orangePrimary.main,
                        }
                    }}>
                        <PersonOutlineOutlinedIcon sx={{ fontSize: "20px", color: "white" }} />
                    </IconButton>
                    <Typography variant="body1" sx={{ fontSize: "13px", color: "#575756", marginLeft: "3px" }}>{localStorage.getItem('userName')}</Typography>
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
                    <Box sx={{ width: 200, padding: '20px 10px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: '20px', gap: '10px' }}>
                            <Avatar sx={{ bgcolor: theme.palette.orangePrimary.main, width: 40, height: 40 }}>
                                <PersonOutlineOutlinedIcon sx={{ fontSize: "22px" }} />
                            </Avatar>
                            <Box>
                                <Typography variant="h6" sx={{ fontSize: "14px" }}>{localStorage.getItem('userName')}</Typography>
                                <Typography variant="body2" sx={{ fontSize: "12px" }} color="textSecondary">{localStorage.getItem('userEmail')}</Typography>
                            </Box>
                        </Box>
                        <Divider sx={{ marginBottom: "10px" }} />

                        <List >
                            <Box
                                onClick={() => navigate('/')}
                                sx={{
                                    cursor: "pointer",
                                    backgroundColor: theme.palette.secondaryColor.main,
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

                                <span class="icon-home-icon-silhouette" style={{ color: theme.palette.orangePrimary.main, marginRight: "5px", fontSize: "15px" }} ></span>
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

                            <ListItem sx={{ cursor: "pointer" }} onClick={() => {
                                localStorage.removeItem("adminToken");
                                navigate('/');
                            }}>
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
