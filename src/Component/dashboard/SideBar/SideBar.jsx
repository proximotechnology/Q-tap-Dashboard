
import React from "react";
import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Tooltip, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";

const Arr1 = [
    {

        text: "Dashboard",
        icon: <img src="/assets/dashboard.svg" alt="icon" style={{ width: "16px", height: "16px" }} />,
        path: "/dashboard-home"
    },

    {
        text: "Client ",
        icon: <img src="/assets/Clients.svg" alt="icon" style={{ width: "16px", height: "16px" }} />,
        path: "/client"
    },
    {
        text: "Wallet",
        icon: <span class="icon-wallet1" style={{ width: "34.539", height: "34.544" }}></span>,
        path: "/wallet",
    },

    {
        text: "Product",
        icon: <span class="icon-shopping-bag" style={{ width: "34.539", height: "34.544" }}></span>,
        path: "/product-admin",
    },
    {
        text: "Support",
        icon: <span class="icon-messenger" style={{ width: "34.539", height: "34.544" }}></span>,
        path: "/support",
    },
    {
        text: "Pricing",
        icon: <span class="icon-price-tag" style={{ width: "34.539", height: "34.544" }}></span>,
        path: "/pricing",
    },
    {
        text: "Affiliate",
        icon: <span class="icon-social" style={{ width: "35", height: "35" }}></span>,
        path: "/affiliate",
    },

    {
        text: "Setting",
        icon: <img src="/assets/setting.svg" alt="icon" style={{ width: "16px", height: "16px" }} />,
        path: "/setting",
    },
    {
        text: "Notification ",
        icon: <span class="icon-bell" style={{ width: "34.539", height: "34.544" }}></span>,
        path: "/notification",
    },
    {
        text: "Feedback",
        icon: <span class="icon-star" style={{ color: "ef7d00" }}></span>,
        path: "/feedback-admin",
    },
];

const Arr2 = [
    {
        text: "Logout",
        icon: <img src="/assets/logout.svg" alt="icon" style={{ width: "16px", height: "16px" }} />,
        path: "/"
    },
    {
        text: "Help",
        icon: <img src="/assets/help.svg" alt="icon" style={{ width: "17px", height: "17px" }} />,
        path: "/help"
    },
];


export default function SideBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Box sx={{
            width: '200px',
            backgroundColor: '#fff',
            padding: '25px 20px',
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            // removed overflowY: 'auto'
            display: 'flex',
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
                                            ? "#ef7d00"
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
                                                ? "#ef7d00"
                                                : "gray",

                                    }}
                                >
                                    {React.cloneElement(item.icon, {
                                        fontSize: "small",
                                        color: location.pathname === item.path ? "#ef7d00" : "gray",
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
                                                : "#ef7d00"
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
                                                    : "#ef7d00"
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