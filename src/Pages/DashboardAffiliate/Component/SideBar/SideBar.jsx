
import React from "react";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Tooltip, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { useTranslation } from "react-i18next";


const Arr1 = [ 
    { text: "Dashboard", 
        icon:  <img src="/assets/dashboard.svg" alt="icon" style={{ width: "16px", height: "16px" }} />, 
        path: "/dashboard-affiliate" },

    { text: "Wallet", 
        icon:<span class="icon-wallet1" style={{ width: "34.539", height: "34.544" }}></span>,
        path: "/wallet-affiliate" },
];


export default function SideBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const {t} = useTranslation();
    return (
        <Box 
        sx={{
            width: '200px', 
            backgroundColor: '#fff', 
            padding: '25px 20px', 
            position: 'fixed',  
            top: 0,   
            left: 0,   
            height: '100vh',   
             
            zIndex: 1000 }}>
            <Box sx={{ display: "felx", justifyContent: "center", textAlign: "center", alignItems: "center"}}>
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
                                    
                                    color: 
                                        location.pathname === item.path
                                            ? theme.palette.mode === "dark"
                                                ? grey[600]
                                                : "#ef7d00"
                                            : "gray",
                                    
                                }}
                                onClick={() => {navigate(item.path);  }}
                            >
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
                                    primary={t(item.text)}
                                    primaryTypographyProps={{ fontSize: "12px" }}
                                />

                            </ListItemButton>


                        </Box>
                    </Tooltip>
                ))}
            </List>

        </Box>
    );
}