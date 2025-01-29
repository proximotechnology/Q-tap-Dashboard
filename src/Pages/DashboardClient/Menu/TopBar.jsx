
import React from 'react';
import { Toolbar, IconButton, InputBase, Box, Typography } from '@mui/material';

const TopBar = ({isItemSelected}) => {
    return (
        <Box  sx={{boxShadow: 'none',width:isItemSelected ?"77%":"100%" , transition: 'width 0.1s ease', 
        position:"relative" , left:"1%"}}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ color: "#ef7d00",fontSize:"22px",fontWeight:900 }}>
                    LOGO
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'white', borderRadius: '50px', pl: 1 }}>
                    <IconButton type="submit" sx={{  p: '5px 20px' }}>
                        <span class="icon-magnifier" style={{ color: "black",fontSize:"18px" }}></span> 
                    </IconButton>
                    <InputBase
                        placeholder="What are you looking for.."
                        sx={{ ml: 1, flex: 1,width:"250px",height:"35px", fontSize: '12px' }}
                    />
                    <IconButton type="submit" sx={{  p: '5px 20px' }}>
                        <span class="icon-settings-sliders"style={{ color: "#ef7d00",fontSize:"22px" }}></span> 
                    </IconButton>
                </Box>
            </Toolbar>
        </Box>
    );
};

export default TopBar;
