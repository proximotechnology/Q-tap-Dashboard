
import React from "react";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Tooltip, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";

const Arr1 = [
    {
        text: "Dashboard",
        icon: <img src="/assets/dashboard.svg" alt="icon" style={{ width: "16px", height: "16px" }} />,
        path: "/dashboard-client"
    },

    {
        text: "Orders", icon: <span class="icon-shopping-bag-1" style={{ fontSize: "13px" }} />,
        path: "/order"
    },
    {
        text: "Wallet",
        icon: <span class="icon-wallet1" style={{ width: "34.539", height: "34.544" }}></span>,
        path: "/wallet-client",
    },
    {
        text: "Menu",
        icon: <img src="/assets/menu.svg" alt="menu icon" style={{ width: "17px", height: "17px" }} />,
        path: "/menu",
    },
    {
        text: "Support",
        icon: <span class="icon-messenger" style={{ width: "34.539", height: "34.544" }}></span>,
        path: "/support-client",
    },
    {
        text: "User | Staff",
        icon: <img src="/assets/user.svg" alt="user icon" style={{ width: "17px", height: "17px" }} />,
        path: "/user",
    },
    {
        text: "Customers Log",
        icon: <span class="icon-show"></span>,
        path: "/customers-log",
    },
    {
        text: "Setting",
        icon: <img src="/assets/setting.svg" alt="icon" style={{ width: "16px", height: "16px" }} />,
        path: "/setting-client",
    },

];
const Arr2 = [
    {
        text: "Feedback",
        icon: <span class="icon-star" style={{
            background: 'linear-gradient(to right, #FDB913, #F2672E)',
            WebkitBackgroundClip: 'text' ,
            WebkitTextFillColor:'transparent',
        }}></span>,
        path: "/feedback"
    },
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
            zIndex: 1000
        }}>
            <Box sx={{ display: "felx", justifyContent: "center", textAlign: "center", alignItems: "center" }}>
                <img src="/images/logoDash.jpg" alt="Logo" style={{ width: '110px' }} />
            </Box>

            <List >
                {Arr1.map((item, index) => (
                    <Tooltip
                        ListItem
                        key={index}
                        placement="left-start"
                    >
                        <Box sx={{ display: "block" }}
                        >
                            <ListItemButton
                                sx={{
                                    justifyContent: "center",
                                    px: 2,
                                    height: item.path === "/order" ? "28px" : "inherit",
                                    width: item.path === "/order" ? "80%" : "inherit",
                                    marginTop: item.path === "/order" ? "8px" : "0px",
                                    marginBottom: item.path === "/order" ? "10px" : "0px",
                                    borderRadius: item.path === "/order" ? "20px 0px 20px 20px " : "0px",
                                    background: item.path === "/order"
                                        ? "linear-gradient(90deg, #FDB913, #F2682E)"
                                        : "inherit",
                                    color: item.path === "/order" ? "white" :
                                        location.pathname === item.path
                                            ? theme.palette.mode === "dark"
                                                ? grey[600]
                                                : "#ef7d00"
                                            : "gray",
                                    '&:hover': {
                                        backgroundColor: item.path === "/order" ? "#ef7d00" : "inherit",
                                    },
                                }}
                                onClick={() => {
                                    navigate(item.path);
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        justifyContent: "center",
                                        // marginRight: "10px",
                                        marginRight: item.path === "/order" ? "3px" : "10px", 
                                        color: item.path === "/order" ? "white" :
                                            location.pathname === item.path
                                                ? theme.palette.mode === "dark"
                                                    ? grey[50]
                                                    : "#ef7d00"
                                                : "gray",
                                    }}
                                >
                                    {React.cloneElement(item.icon, {
                                        fontSize: "small",
                                        color: location.pathname === item.path ? "#ef7d00" : "#AAAAAA",
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

            <List sx={{ marginTop: "9vh" }}>
                {Arr2.map((item, index) => (
                    <Tooltip
                        ListItem
                        key={index}
                        placement="left-start"
                    >
                        <Box sx={{ display: "block" }}
                        >
                            <ListItemButton
                                sx={{

                                    justifyContent: "center",
                                    px: 2,
                                    color:
                                        location.pathname === item.path
                                            ? theme.palette.mode === "dark"
                                                ? grey[600]
                                                : "#ef7d00"
                                            : "gray",

                                }}
                                onClick={() => {
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
                                                    : "#ff9800"
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