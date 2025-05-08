import React, { useState } from "react";
import QtapLogo from "../Component/QtapLogo";
import QtapHome from "../Component/QtapHome";
import { Box, Grid } from "@mui/material";

import Language from "../Component/dashboard/TopBar/Language";

export const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState("login");

  return (
    <Box
      sx={{
        backgroundImage: "url(/images/Rectangle.png)",
        backgroundSize: "100% 100%",
        width: "100%",
      }}
    >
      <Grid container spacing={0}>
        <Grid item xs={12} md={6}>
          <QtapLogo />
        </Grid>

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
              zIndex: "2000",
            }}
          >
            <img
              src="/images/help.jpg"
              alt="icon"
              style={{ width: "20px", height: "20px", marginRight: "30px" }}
            />
            <Language />
           
          </Box>
          {/* login component */}
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="calc(100vh - 70px)"
            marginTop='70px'
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