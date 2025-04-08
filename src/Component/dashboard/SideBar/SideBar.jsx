
import React from "react";
import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Tooltip, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import GridViewIcon from '@mui/icons-material/GridView';
import { useTranslation } from "react-i18next";







export default function SideBar({isOpen}) {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const {t} = useTranslation()

    const Arr1 = [
        {
    
            text: t("dashboard"),
            icon: <GridViewIcon style={{fontSize:"18px"  ,marginLeft:"-1px"}}></GridViewIcon>,
            path: "/dashboard-home"
        },
    
        {
            text: t("client"),
            icon: <PeopleOutlineIcon style={{fontSize:"20px"  ,marginLeft:"-1px"}}></PeopleOutlineIcon>,
            path: "/client"
        },
        {
            text: t("wallet"),
            icon: <span class="icon-wallet1" style={{ width: "34.539", height: "34.544" }}></span>,
            path: "/wallet",
        },
    
        {
            text: t("product"),
            icon: <span class="icon-shopping-bag" style={{ width: "34.539", height: "34.544" }}></span>,
            path: "/product-admin",
        },
        {
            text: t("support"),
            icon: <span class="icon-messenger" style={{ width: "34.539", height: "34.544" }}></span>,
            path: "/support",
        },
        {
            text: t("pricing"),
            icon: <span class="icon-price-tag" style={{ width: "34.539", height: "34.544" }}></span>,
            path: "/pricing",
        },
        {
            text: t("affiliate"),
            icon: <span class="icon-social" style={{ width: "35", height: "35" }}></span>,
            path: "/affiliate",
        },
    
        {
            text: t("setting"),
            icon: <SettingsIcon style={{fontSize:"18px" ,marginLeft:"-1px"}}></SettingsIcon>,
            path: "/setting",
        },
        {
            text: t("notification"),
            icon: <span class="icon-bell" style={{ width: "34.539", height: "34.544" }}></span>,
            path: "/notification",
        },
        {
            text: t("feedback"),
            icon: <StarBorderIcon style={{fontSize:"20px" ,marginLeft:"-1px"}}></StarBorderIcon>,
            path: "/feedback-admin",
        },
    ];
    
    const Arr2 = [
        {
            text: t("logout"),
            icon: <img src="/assets/logout.svg" alt="icon" style={{ width: "16px", height: "16px" }} />,
            path: "/"
        },
        {
            text: t("help"),
            icon: <img src="/assets/help.svg" alt="icon" style={{ width: "17px", height: "17px" }} />,
            path: "/help"
        },
    ];

    return (
        <Box sx={{
            width: {
                xs:'60%',
                md:'200px'
            },
            backgroundColor: '#fff',
            padding: '25px 20px',
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            // removed overflowY: 'auto'
            display: {
                xs:isOpen? "" :"none",
                md:'flex'
            },
            flexDirection: 'column',
            zIndex: 1000
        }}>
            <Box sx={{ display: "flex", justifyContent: "center", textAlign: "center", alignItems: "center" }}>
                <img src="/images/logoDash.jpg" alt="Logo" style={{ width: '110px' }} />
            </Box>

            <List sx={{ flex: 1, marginTop: '20px' }}>
                {Arr1.map((item, index) => (
                    <Tooltip
                        ListItem
                        key={index}
                        placement="left-start"
                    >
                        <Box sx={{ display: "block" }}>
                            <ListItemButton
                                sx={{
                                    justifyContent: "center",
                                    px: 2,
                                    py: 1.2, // reduced padding
                                    color:
                                        location.pathname === item.path
                                            ? theme.palette.orangePrimary.main
                                            : "gray",
                                }}
                                onClick={() => { navigate(item.path); }}>

                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        justifyContent: "center",
                                        marginRight: "10px",
                                        color:
                                            location.pathname === item.path
                                                ? theme.palette.orangePrimary.main
                                                : "gray",

                                    }}
                                >
                                    {React.cloneElement(item.icon, {
                                        fontSize: "small",
                                        color: location.pathname === item.path ? theme.palette.orangePrimary.main : "gray",
                                    })}
                                </ListItemIcon>


                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{ fontSize: "12px" }}
                                />
                            </ListItemButton>
                        </Box>
                    </Tooltip>
                ))}
            </List>

            <List>
                <Divider sx={{ width: "70%" }} />
                {Arr2.map((item, index) => (
                    <Tooltip
                        ListItem
                        key={index}
                        placement="left-start"
                    >
                        <Box sx={{ display: "block" }}>
                            <ListItemButton
                                sx={{
                                    justifyContent: "center",
                                    px: 2,
                                    py: 0.5, // reduced padding
                                    color:
                                        location.pathname === item.path
                                            ? theme.palette.mode === "dark"
                                                ? grey[600]
                                                : theme.palette.orangePrimary.main
                                            : "gray",
                                }}
                                onClick={() => {
                                    localStorage.removeItem("adminToken");
                                    navigate(item.path);
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        justifyContent: "center",
                                        marginRight: "10px",
                                        color:
                                            location.pathname === item.path
                                                ? theme.palette.mode === "dark"
                                                    ? grey[50]
                                                    : theme.palette.orangePrimary.main
                                                : "gray",
                                    }}
                                >
                                    {React.cloneElement(item.icon, { fontSize: "small" })}
                                </ListItemIcon>

                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontSize: "12px",
                                        style: {
                                            color: item.text.toLowerCase() === "help" ?
                                                "#D8E0E0" : "inherit",
                                        }
                                    }}
                                />

                            </ListItemButton>

                        </Box>
                    </Tooltip>
                ))}
            </List>
        </Box>
    );
}