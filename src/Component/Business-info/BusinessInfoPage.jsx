import React, { useState } from 'react'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { SetupPage } from './SetupPage'
import { BusinessInfo } from './BusinessInfo'
import { Box, MenuItem, Grid, Menu, Divider } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


export const BusinessInfoPage = () => {

  const [anchorElLanguage, setAnchorElLanguage] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const openLanguage = Boolean(anchorElLanguage);

  const handleLanguageClick = (event) => {
    setAnchorElLanguage(event.currentTarget);
  };

  const handleLanguageClose = (language) => {
    setAnchorElLanguage(null);
    setSelectedLanguage(language);
  };

  const getLanguageIcon = () => {
    return selectedLanguage === 'ar' ? <span className="icon-translation" style={{ color: "#ef7d00", fontSize: "22px" }}> </span>
      : <LanguageOutlinedIcon sx={{ color: "#ef7d00", fontSize: "22px" }} />;
  };

  return (
    <Grid container  
    sx={{backgroundImage: "url(/images/Rectangle.png)",backgroundSize:"100% 100%", width: "100%",height: "100vh" }}>
      <SetupPage />

      <Grid item xs={12} md={8}  >
        <Box sx={{
          position: "absolute", top: "30px", right: "80px",
          cursor: "pointer", display: "flex", alignItems: "center"
        }}>
          <img src="/assets/helplogo.svg" alt="icon" style={{ width: "25px", height: "25px", marginRight: "30px" }} />

          <Box sx={{ cursor: "pointer", display: "flex", marginRight: "20px", alignItems: "center" }}
            onClick={handleLanguageClick}>
            {getLanguageIcon()}
            <KeyboardArrowDownIcon sx={{ fontSize: "18px", color: "#575756" }} />
            <Menu
              anchorEl={anchorElLanguage}
              open={openLanguage}
              onClose={() => setAnchorElLanguage(null)}
              sx={{ padding: "2px" }}
            >
              <MenuItem onClick={() => handleLanguageClose('ar')}>
                <span className="icon-translation" style={{ color: "#575756", marginRight: '8px', fontSize: "20px" }}></span>
                <span style={{ fontSize: "12px", color: "#575756" }}>Arabic</span>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => handleLanguageClose('en')}>
                <LanguageOutlinedIcon sx={{ color: "#575756", marginRight: '8px', fontSize: "20px" }} />
                <span style={{ fontSize: "12px", color: "#575756" }}>English</span>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        <BusinessInfo />
      </Grid>


    </Grid>


  )
}
