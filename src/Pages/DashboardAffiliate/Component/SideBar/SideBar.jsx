
import React from "react";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Tooltip, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { useTranslation } from "react-i18next";
import SidebarExtraMobileSection from "../../../../Component/SidebarExtraMobileSection";


const Arr1 = [
    {
        text: "Dashboard",
        icon: <img src="/assets/dashboard.svg" alt="icon" style={{ width: "16px", height: "16px" }} />,
        path: "/dashboard-affiliate"
    },

    {
        text: "Wallet",
        icon: <span class="icon-wallet1" style={{ width: "34.539", height: "34.544" }}></span>,
        path: "/wallet-affiliate"
    },
];


export default function SideBar({ isOpen }) {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const { t } = useTranslation();
    return (
        <Box
            sx={{
                width: { xs: '60%', md: '200px' },
                backgroundColor: theme.palette.bodyColor.secandary,
                padding: '25px 20px',
                position: 'fixed',
                top: 0,
                insetInlineStart: 0,
                height: '100vh',
                display: { xs: isOpen ? 'block' : 'none', md: "block" },
                zIndex: 1000
            }}>
            <Box sx={{ display: "felx", justifyContent: "center", textAlign: "center", alignItems: "center" , margin:"10px 0px"}}>
                <img src={
                    localStorage.getItem("themeMode") !== null
                        ? (localStorage.getItem("themeMode") === "dark"
                            ? "/assets/qtap.svg"
                            : "/assets/qtapwhite.svg")
                        : "/assets/qtap.svg"
                } alt="Logo" style={{ width: '110px' }} />
            </Box>
            <SidebarExtraMobileSection />
            <List sx={{ padding: 0, marginTop: "40px" }}>
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
                                                : theme.palette.orangePrimary.main
                                            : theme.palette.text.gray_light,

                                }}
                                onClick={() => { navigate(item.path); }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        justifyContent: "center",
                                        marginRight: "10px",
                                        color:
                                            location.pathname === item.path
                                                ? theme.palette.orangePrimary.main
                                                : theme.palette.text.gray_light,

                                    }}
                                >
                                    {React.cloneElement(item.icon, {
                                        fontSize: "small",
                                        color: location.pathname === item.path ? theme.palette.orangePrimary.main : theme.palette.text.gray_light,
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