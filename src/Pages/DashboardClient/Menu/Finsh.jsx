import { AppBar, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

import Lottie  from 'lottie-react';
import ghostAnimation from '../../../animation/ghost.json'; 
import Language from '../ComponentDashClient/TopBar/Language';

export const Finsh = () => {

    return (
        
        <Box sx={{ overflowY: "auto", width: '340px',
            boxShadow: '3', bgcolor: 'white', position: 'fixed', right: 0, top: 0, height: '100vh' }}>
            <AppBar position="sticky" color="inherit">
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }} />
                    <Language />

                    <Box sx={{ display: "flex", textAlign: "center", alignItems: "center", cursor: "pointer" }}  >
                        <PersonOutlineOutlinedIcon
                            sx={{ color: "white", fontSize: "18px", borderRadius: "10px", padding: "5px", backgroundColor: "#ef7d00" }} />
                        <Typography variant='body2' sx={{ color: "#575756", fontSize: "10px", padding: "0px 5px" }}>Admin</Typography>
                        <KeyboardArrowDownOutlinedIcon sx={{ color: "#575756", fontSize: "13px" }} />
                    </Box>
                </Toolbar>
            </AppBar> {/* header */}

            <Box  display={"flex"} height={"80vh"} justifyContent={"center"} alignItems={"center"} textAlign={"center"}>
                <div style={{width:"250px",height:"250px"}}>  
                    <Lottie animationData={ghostAnimation} loop={true} /> 
                </div>
            </Box>

        </Box>
    )
}
