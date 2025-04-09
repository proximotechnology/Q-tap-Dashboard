import React, { useState } from 'react'
import { Box, Button, IconButton, Typography } from "@mui/material";
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { MenuItem, Menu, Divider } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled, useTheme, width } from '@mui/system';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookF, faXTwitter, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';



export const Welcome = () => {
  const theme = useTheme();
  const [anchorElLanguage, setAnchorElLanguage] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const openLanguage = Boolean(anchorElLanguage);
  const Divider2 = styled(Box)({
    width: '20%',
    height: '5px',
    backgroundColor: theme.palette.orangePrimary.main,
    borderRadius: "20px",
    display: "flex",
    margin: "0 auto",
  });
  const { t, i18n } = useTranslation()

  const handleLanguageClick = (event) => {
    setAnchorElLanguage(event.currentTarget);
  };

  const handleLanguageClose = (language) => {
    setAnchorElLanguage(null);
    setSelectedLanguage(language);
    i18n.changeLanguage(language)
  };

  const getLanguageIcon = () => {
    return selectedLanguage === 'ar' ? <span class="icon-translation" style={{ color: theme.palette.orangePrimary.main, fontSize: "22px" }}> </span>
      : <LanguageOutlinedIcon sx={{ color: theme.palette.orangePrimary.main, fontSize: "22px" }} />;
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
        backgroundImage: `linear-gradient(to right, ${theme.palette.orangePrimary.main}, ${theme.palette.secondaryColor.main}), url(/images/Qtop1.jpg)`,
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
        backgroundPosition: "center 38%",
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

        {!sessionStorage.getItem("paymentUrl") ? <Typography variant="body2" sx={{ fontSize: "16px", width: "400px", lineHeight: 2, mb: 2 }}>
          {t("welcomeP1")}
        </Typography> : (<>
          <Typography variant="body2" sx={{ fontSize: "16px", width: "400px", lineHeight: 2, mb: 2 }}>
            {t("welcomeP3")}
          </Typography>
          <Button
            variant="contained"
            target='_blank'
            onClick={() => {
              const paymentUrl = sessionStorage.getItem("paymentUrl");
              if (paymentUrl) {
                window.open(paymentUrl, '_blank');
              } else {
                console.error("Invalid payment URL");
              }
            }}
            sx={{
              width: { lg: "300px", md: "200px", xs: "150px" },
              padding: "5px 20px",
              borderRadius: "50px",
              backgroundColor: theme.palette.orangePrimary.main,
              animation: "bounce 2s infinite",
              "@keyframes bounce": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-10px)" },
              },
              "&:hover": {
                backgroundColor: "#FF8C00",
              },
              margin: "20px 0 20px 0"
            }}>
            {t("welcomeBtn")}
          </Button>
        </>)


        }
        <Divider2 my={10} />

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
          <IconButton sx={{ color: "#FFFFFF", fontSize: "16px", "&:hover": { color: theme.palette.orangePrimary.main }, }}>
            <FontAwesomeIcon icon={faInstagram} />
          </IconButton>

          <IconButton sx={{ color: "#FFFFFF", fontSize: "16px", "&:hover": { color: theme.palette.orangePrimary.main }, }}>
            <FontAwesomeIcon icon={faFacebookF} />
          </IconButton>
          <IconButton sx={{ color: "#FFFFFF", fontSize: "16px", "&:hover": { color: theme.palette.orangePrimary.main }, }}>
            <FontAwesomeIcon icon={faXTwitter} />
          </IconButton>
          <IconButton sx={{ color: "#FFFFFF", fontSize: "16px", "&:hover": { color: theme.palette.orangePrimary.main }, }}>
            <FontAwesomeIcon icon={faTiktok} />
          </IconButton>

        </Box>

      </Box>
    </Box >
  );
}
