import React from 'react'
import { Box, Grid, } from "@mui/material";
import { OtpSignUp } from './OtpSignUp';
import Language from '../dashboard/TopBar/Language';
import { SetupPage } from '../Business-info/SetupPage';


export const OtpSignupPage = () => {

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

        <OtpSignUp />
      </Grid>


    </Grid>


  )
}
