import React, { useState } from "react";
import SideBar from "../../../Component/dashboard/SideBar/SideBar";
import { Box, createTheme, CssBaseline } from "@mui/material";
import Content from "../../../Component/DashboardContent/Content";
import TopBar from "../../../Component/dashboard/TopBar/TopBar";
import { getDesignTokens } from "../../Themes/dark";
 

export default function Home() {
    const [mode, setMode] = useState('light'); 
    const theme = createTheme(getDesignTokens(mode));  
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
                transition: "all 0.3s ease-in-out"
            }}>
            <CssBaseline />
            <SideBar />
            <Box 
                sx={{ 
                    flexGrow: 1,
                    width: 'calc(100% - 200px)',
                    marginLeft: '200px',
                    minHeight: "100vh",
                    padding: "20px",
                    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px"
                }}
            >
                <TopBar mode={mode} setMode={setMode} />  
                <Content />
            </Box>
        </Box>
    );
}
