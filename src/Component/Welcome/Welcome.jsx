import React, { useState } from 'react'
import { Box, IconButton, Typography } from "@mui/material";
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { MenuItem, Menu, Divider } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookF, faXTwitter, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from 'react-i18next';


const Divider2 = styled(Box)({
  width: '20%',
  height: '5px',
  backgroundColor: '#E57C00',
  borderRadius: "20px",
  display: "flex",
  margin: "0 auto",
});
export const Welcome = () => {
  const [anchorElLanguage, setAnchorElLanguage] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const openLanguage = Boolean(anchorElLanguage);

  const {t} = useTranslation()

  const handleLanguageClick = (event) => {
    setAnchorElLanguage(event.currentTarget);
  };

  const handleLanguageClose = (language) => {
    setAnchorElLanguage(null);
    setSelectedLanguage(language);
  };

  const getLanguageIcon = () => {
    return selectedLanguage === 'ar' ? <span class="icon-translation" style={{ color: "#ef7d00", fontSize: "22px" }}> </span>
      : <LanguageOutlinedIcon sx={{ color: "#ef7d00", fontSize: "22px" }} />;
  };
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: 'linear-gradient(to right, #E67D00, #222240), url(/images/Qtop1.jpg)',
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
      />
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ position: "absolute", left: "50px", top: "40px", }}>
          <IconButton onClick={() => navigate('/')}>
            <span class=" icon-home-icon-silhouette" style={{ color: "white", fontSize: "20px" }}></span>
          </IconButton>
        </Box>

        <Box sx={{
          position: "absolute", right: "50px", top: "40px", cursor: "pointer", display: "flex", alignItems: "center"
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
                <span class="icon-translation" style={{ color: "#575756", marginRight: '8px', fontSize: "20px" }}></span>
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

      </Box>

      <Box
        sx={{
          position: "relative",
          color: "white",
          textAlign: "center",
          zIndex: 1,
        }}
      >

        <img src="/assets/qtapwhite.svg" alt="qtap" style={{ width: "200px", height: "60px", marginBottom: "60px" }} />

        <Typography variant="body2" sx={{ fontSize: "16px", width: "400px", lineHeight: 2, mb: 2 }}>
          {t("welcomeP1")}
        </Typography>
        <Divider2 />

        <Typography variant="body2" sx={{ fontSize: "12px", mt: 2, mb: 2 }}>
          {t("welcomeP2")}
        </Typography>

        <Typography variant="body2" sx={{ fontSize: "13px", mb: 3 }}>
          <a href="mailto:your-email@example.com" style={{ color: "white" }}>
            sales@qtap.com</a>

          <a href="tel:+201234567890" style={{ color: "white", padding: "0px 20px" }}>
            +201050727984</a>

          <a href="tel:+201234567890" style={{ color: "white" }}>
            +201063879878</a>
        </Typography>

        <Box sx={{ display: "flex", textAlign: "center", justifyContent: "center", gap: "6px" }}>
          <IconButton sx={{ color: "#FFFFFF", fontSize: "16px", "&:hover": { color: "#E57C00" }, }}>
            <FontAwesomeIcon icon={faInstagram} />
          </IconButton>

          <IconButton sx={{ color: "#FFFFFF", fontSize: "16px", "&:hover": { color: "#E57C00" }, }}>
            <FontAwesomeIcon icon={faFacebookF} />
          </IconButton>
          <IconButton sx={{ color: "#FFFFFF", fontSize: "16px", "&:hover": { color: "#E57C00" }, }}>
            <FontAwesomeIcon icon={faXTwitter} />
          </IconButton>
          <IconButton sx={{ color: "#FFFFFF", fontSize: "16px", "&:hover": { color: "#E57C00" }, }}>
            <FontAwesomeIcon icon={faTiktok} />
          </IconButton>

        </Box>

      </Box>
    </Box>
  );
}
