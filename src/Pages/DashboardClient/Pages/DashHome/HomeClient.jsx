import React, {  useState } from "react";
import { Box, CssBaseline, useTheme } from "@mui/material";

import SideBar from "../../ComponentDashClient/SideBar/SideBar";
import TopBar from "../../ComponentDashClient/TopBar/TopBar";
import Content from "../../ComponentDashClient/Content/Content";
import SidebarButton from "../../../../Component/MobileSideBarButton/SidebarButton";



export default function HomeClient() {
    const theme = useTheme()
    const [isSideBarOpen, setisSideBarOpen] = useState(false);

    const handleOpenSideBar = ()=>{
        setisSideBarOpen(!isSideBarOpen)
    }
    return (
        <Box
            sx={{
                display: "flex", flexDirection: "row",
                backgroundColor: theme.palette.bodyColor.main,
                color: '#000',
                width:"100%" , minHeight:"125vh",
                paddingRight:"0px !important",
            
            }}
        >
            <CssBaseline />
            <SidebarButton top={'30px'} openSidebar={isSideBarOpen} handleToggleSideBar={handleOpenSideBar} />
            <SideBar isOpen={isSideBarOpen}/>
            <Box sx={{ flexGrow: 1,width:"100%",  padding:"0px 30px ",  marginLeft: {sm:"0px",md:'200px'}, overflow: "hidden" }}>
                <TopBar />
                <Content />
            </Box>
        </Box>
    );
}