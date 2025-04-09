
import React from 'react';
import { Toolbar, IconButton, InputBase, Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

const TopBar = ({isItemSelected}) => {
    const {t} = useTranslation();
    const theme = useTheme();
    return (
        <Box  sx={{boxShadow: 'none',width:isItemSelected ?"77%":"100%" , transition: 'width 0.1s ease', 
        position:"relative" , left:"1%"}}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ color: theme.palette.orangePrimary.main,fontSize:"22px",fontWeight:900 }}>
                    {t("logo")}
                </Typography>

                <Box sx={{ display: {xs:'none',sm:'flex'}, alignItems: 'center', bgcolor: 'white', borderRadius: '50px', pl: 1 }}>
                    <IconButton type="submit" sx={{  p: '5px 20px' }}>
                        <span class="icon-magnifier" style={{ color: "black",fontSize:"18px" }}></span> 
                    </IconButton>
                    <InputBase
                        placeholder={t("whatAreYouLookingFor")}
                        sx={{ ml: 1, flex: 1,width:"250px",height:"35px", fontSize: '12px' }}
                    />
                    <IconButton type="submit" sx={{  p: '5px 20px' }}>
                        <span class="icon-settings-sliders"style={{ color: theme.palette.orangePrimary.main,fontSize:"22px" }}></span> 
                    </IconButton>
                </Box>
                {/* TODO: make this button open the search input */}
                <IconButton type="submit" sx={{  p: '5px 20px' , display:{xs:'flex', sm:'none'} }}>
                        <span class="icon-magnifier" style={{ color: "black",fontSize:"18px" }}></span> 
                    </IconButton>
            </Toolbar>
        </Box>
    );
};

export default TopBar;
