
import { Payment } from './Payment'
import { SetupPage } from '../Business-info/SetupPage'
import React from 'react'
import { Box, Grid, useTheme } from "@mui/material";
import Language from '../dashboard/TopBar/Language';

export const PaymentPage = () => {
  const theme = useTheme()
  return (
    <Grid container position={'relative'}
      sx={{
        backgroundImage: theme.palette.mode === 'light' ? "url(/images/Rectangle.png)" : undefined,
        backgroundColor: theme.palette.mode === 'light' ? undefined : theme.palette.background.default,
        backgroundSize: "100% 100%", width: "100%", height: "100vh"
      }}>
      {/* <Grid item xs={12} md={4} position={'relative'}> */}
      <SetupPage />
      {/* </Grid> */}

      <Grid item xs={12} md={8} >
        <Box sx={{
          position: "absolute", top: "calc(1rem + 7px)", insetInlineEnd: "1rem",
          cursor: "pointer", display: "flex", alignItems: "center", zIndex: '9999'
        }}>
          <img
            src="/images/help.jpg"
            alt="icon"
            style={{ width: "20px", height: "20px", marginRight: "30px" }}
          />

          <Language />
        </Box>

        <Payment />
      </Grid>


    </Grid>
  )
}
