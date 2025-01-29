import React, { useState } from "react";
import { Box, createTheme, CssBaseline } from "@mui/material";
import SideBar from "../../Component/SideBar/SideBar";
import TopBar from "../../Component/TopBar/TopBar";
import Content from "../../Component/Content/Content";
import { getDesignTokens } from "../../../Themes/dark";

export default function HomeAffiliate() {
    const [mode, setMode] = useState('light'); 
    const theme = createTheme(getDesignTokens(mode));  
    return (
        <Box
            
            sx={{
                display: "flex",flexDirection:"row",
                backgroundColor: mode === 'dark' ? '#181616' : theme.palette.bodyColor.main,
                color: mode === 'dark' ? '#181616' : '#000',
                width:"100%" , height:"105vh",
                paddingRight:"0px !important",
            
            }}
            >
            <CssBaseline />
            <SideBar />
            <Box sx={{ flexGrow: 1,width:"100%",marginLeft: '200px', overflow: "hidden" }}>
                <TopBar mode={mode} setMode={setMode} />  
                <Content />
            </Box>
        </Box>
    );
}
