import React, { useEffect, useState } from "react";
import { Box, createTheme, CssBaseline } from "@mui/material";

import SideBar from "../../ComponentDashClient/SideBar/SideBar";
import TopBar from "../../ComponentDashClient/TopBar/TopBar";
import Content from "../../ComponentDashClient/Content/Content";
import { getDesignTokens } from "../../../Themes/dark";
import SidebarButton from "../../../../Component/MobileSideBarButton/SidebarButton";



export default function HomeClient() {
    const [mode, setMode] = useState('light');
    const [isSideBarOpen, setisSideBarOpen] = useState(false);
    const theme = createTheme(getDesignTokens(mode));

    const handleOpenSideBar = ()=>{
        setisSideBarOpen(!isSideBarOpen)
    }
    return (
        <Box
            sx={{
                display: "flex", flexDirection: "row",
                backgroundColor: mode === 'dark' ? '#181616' : theme.palette.bodyColor.main,
                color: mode === 'dark' ? '#181616' : '#000',
                width:"100%" , minHeight:"125vh",
                paddingRight:"0px !important",
            
            }}
        >
            <CssBaseline />
            <SidebarButton top={'30px'} openSidebar={isSideBarOpen} handleToggleSideBar={handleOpenSideBar} />
            <SideBar isOpen={isSideBarOpen}/>
            <Box sx={{ flexGrow: 1,width:"100%",  padding:"0px 30px ",  marginLeft: {sm:"0px",md:'200px'}, overflow: "hidden" }}>
                <TopBar mode={mode} setMode={setMode} />
                <Content />
            </Box>
        </Box>
    );
}