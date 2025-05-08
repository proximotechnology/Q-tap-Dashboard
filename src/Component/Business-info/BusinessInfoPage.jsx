import React from 'react'
import { SetupPage } from './SetupPage'
import { BusinessInfo } from './BusinessInfo'
import { Box, Grid, } from "@mui/material";

import Language from '../dashboard/TopBar/Language';


export const BusinessInfoPage = () => {

  return (
    <Grid container
      sx={{ backgroundImage: "url(/images/Rectangle.png)", backgroundSize: "100% 100%", width: "100%", height: "100vh" }}>
      <SetupPage />

      <Grid item xs={12} md={8}  >
        <Box sx={{
          position: "absolute", top: "calc(1rem + 7px)", insetInlineEnd: "1rem", zIndex: "10000",
          cursor: "pointer", display: "flex", alignItems: "center"
        }}>
          <img
            src="/images/help.jpg"
            alt="icon"
            style={{ width: "20px", height: "20px", marginRight: "30px" }}
          />
          <Language />
        </Box>

        <BusinessInfo />
      </Grid>


    </Grid>


  )
}
