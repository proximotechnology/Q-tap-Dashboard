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
                backgroundColor: mode === 'dark' ? '#181616' : theme.palette.bodyColor.main, 
                color: mode === 'dark' ?'#181616': '#000',
                height:"100%"
            }}>
            <CssBaseline />
            <SideBar />
            <Box sx={{ flexGrow: 1 ,width: 'calc(100% - 200px)' ,marginLeft: '200px'  ,height:"100vh"}} >
                <TopBar mode={mode} setMode={setMode} />  
                <Content />
            </Box>
        </Box>
    );
}
