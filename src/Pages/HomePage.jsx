import React, { useState, useCallback } from "react";
import QtapLogo from "../Component/QtapLogo";
import QtapHome from "../Component/QtapHome";
import { Box, MenuItem, Grid, Menu, Divider, useTheme } from "@mui/material";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTranslation } from "react-i18next";

export const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState("login");
  const [anchorElLanguage, setAnchorElLanguage] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const { i18n } = useTranslation();
  const theme = useTheme();
  const handleLanguageClick = useCallback((event) => {
    event.stopPropagation(); // Prevent bubbling
    setAnchorElLanguage(event.currentTarget);
  }, []);

  const handleLanguageSelect = useCallback((language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
    setAnchorElLanguage(null); // Close menu
  }, [i18n]);

  const handleMenuClose = useCallback(() => {
    setAnchorElLanguage(null);
  }, []);

  const getLanguageIcon = () => {
    return selectedLanguage === "ar" ? (
      <span
        className="icon-translation"
        style={{ color: theme.palette.orangePrimary.main, fontSize: "22px" }}
      >
        {" "}
      </span>
    ) : (
      <LanguageOutlinedIcon sx={{ color: theme.palette.orangePrimary.main, fontSize: "22px" }} />
    );
  };

  return (
    <Box
      sx={{
        backgroundImage: "url(/images/Rectangle.png)",
        backgroundSize: "100% 100%",
        width: "100%",
      }}
    >
      <Grid container spacing={0}>
        <QtapLogo />

        <Grid item xs={12} md={6}>
          {/* language component */}
          <Box
            sx={{
              position: "absolute",
              top: "30px",
              right: "80px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              zIndex:"2000",
            }}
          >
            <img
              src="/assets/helplogo.svg"
              alt="icon"
              style={{ width: "25px", height: "25px", marginRight: "30px" }}
            />

            <Box
              sx={{
                cursor: "pointer",
                display: "flex",
                marginRight: "20px",
                alignItems: "center",
              }}
              onClick={handleLanguageClick}
              id="language-button"
              aria-controls={anchorElLanguage ? "language-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={anchorElLanguage ? "true" : undefined}
            >
              {getLanguageIcon()}
              <KeyboardArrowDownIcon
                sx={{ fontSize: "18px", color: "#575756" }}
              />
              <Menu
                id="language-menu"
                anchorEl={anchorElLanguage}
                open={Boolean(anchorElLanguage)}
                onClose={handleMenuClose}
                MenuListProps={{
                  "aria-labelledby": "language-button",
                }}
                PaperProps={{
                  elevation: 1,
                  sx: {
                    mt: 1,
                  },
                }}
              >
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent bubbling
                    handleLanguageSelect("ar");
                  }}
                  sx={{ minWidth: "120px" }}
                >
                  <span
                    className="icon-translation"
                    style={{
                      color: "#575756",
                      marginRight: "8px",
                      fontSize: "20px",
                    }}
                  ></span>
                  <span style={{ fontSize: "12px", color: "#575756" }}>
                    Arabic
                  </span>
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent bubbling
                    handleLanguageSelect("en");
                  }}
                  sx={{ minWidth: "120px" }}
                >
                  <LanguageOutlinedIcon
                    sx={{
                      color: "#575756",
                      marginRight: "8px",
                      fontSize: "20px",
                    }}
                  />
                  <span style={{ fontSize: "12px", color: "#575756" }}>
                    English
                  </span>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          {/* login component */}
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
          >
            <Box sx={{ width: { lg: "43%", md: "60%", xs: "90%" } }}>
              <QtapHome
                setSelectedTab={setSelectedTab}
                selectedTab={selectedTab}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;