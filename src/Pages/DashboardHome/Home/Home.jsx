import React, { useState } from "react";
import SideBar from "../../../Component/dashboard/SideBar/SideBar";
import { Box, Button, createTheme, CssBaseline } from "@mui/material";
import Content from "../../../Component/DashboardContent/Content";
import TopBar from "../../../Component/dashboard/TopBar/TopBar";
import { getDesignTokens } from "../../Themes/dark";
import { Menu, Close } from '@mui/icons-material'


export default function Home() {
    const [mode, setMode] = useState('light');
    const theme = createTheme(getDesignTokens(mode));
    const [openSidebar, setOpenSidebar] = useState(false);

    const handleToggleSideBar = () => {
        setOpenSidebar(!openSidebar)
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: mode === 'dark' ? '#181616' : theme.palette.bodyColor.main,
                color: mode === 'dark' ? '#fff' : '#000',
                minHeight: "100vh",
                width: "100%",
                overflow: "hidden",
                transition: "all 0.3s ease-in-out",
            }}>
            {/* sidebar open close button for xs screen */}
            <Button sx={{
                position: "absolute",
                top: openSidebar ? '25px' : '50px',
                left: openSidebar ? '45%' : '0px',
                display: {
                    xs: "",
                    md: 'none'
                },
                zIndex: "9999"
            }}
                onClick={handleToggleSideBar}
            >{openSidebar ? <Close sx={{ color: "black" }} /> : <Menu sx={{ color: "black" }} />}
            </Button>

            <CssBaseline />
            <SideBar isOpen={openSidebar} setOpen={setOpenSidebar} />
            <Box
                sx={{
                    flexGrow: 1,
                    width: {
                        xs: "100%",
                        md: 'calc(100% - 200px)'
                    },
                    marginLeft: {
                        xs: "0",
                        md: '200px'
                    },
                    minHeight: "100vh",
                    padding: "20px",
                    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",

                }}
            >
                <TopBar mode={mode} setMode={setMode} />
                <Content />
            </Box>
        </Box>
    );
}
