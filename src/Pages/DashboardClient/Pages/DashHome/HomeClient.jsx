import React, { useState } from "react";
import { Box, createTheme, CssBaseline } from "@mui/material";

import SideBar from "../../ComponentDashClient/SideBar/SideBar";
import TopBar from "../../ComponentDashClient/TopBar/TopBar";
import Content from "../../ComponentDashClient/Content/Content";
import { getDesignTokens } from "../../../Themes/dark";


export default function HomeClient() {
    const [mode, setMode] = useState('light');
    const theme = createTheme(getDesignTokens(mode));
    return (
        <Box
            sx={{
                display: "flex",flexDirection:"row",
                backgroundColor: mode === 'dark' ? '#181616' : theme.palette.bodyColor.main,
                color: mode === 'dark' ? '#181616' : '#000',
                width:"100%" , height:"125vh",
                paddingRight:"0px !important",
            
            }}
        >
            <CssBaseline />
            <SideBar />
            <Box sx={{ flexGrow: 1,width:"100%",  padding:"0px 30px ",  marginLeft: '200px', overflow: "hidden" }}>
                <TopBar mode={mode} setMode={setMode} />
                <Content />
            </Box>
        </Box>
    );
}