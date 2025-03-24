import React from 'react'
import { Box, Button, Grid, MenuItem, Paper, Select, Typography } from '@mui/material'
import StraightIcon from '@mui/icons-material/Straight';
import { useNavigate } from 'react-router';
import LineChart1 from '../../../../Wallet/Row1/LineChart1';
import { useTranslation } from 'react-i18next';
export const Row1 = () => {
  const [year, setYear] = React.useState('2024');
  const navigate = useNavigate();
  const { t } = useTranslation()
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };
  return (

    <Paper sx={{ height: "270px", borderRadius: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Grid width={"80%"} >
        <Grid container justifyContent="space-between" alignItems="center"  >
          <Grid item sx={{
            paddingLeft: "20px", display: "flex", textAlign: "center",
            alignItems: "center"
          }}>
            <span class="icon-social" style={{ fontSize: "25px", marginRight: "6px", color: "#D8E0E0" }} ></span>
            <Typography variant="body1" component="div" sx={{ fontSize: '14px', color: "#575756" }}>
              {t("salesVolume")}
            </Typography>
          </Grid>
          <Grid item sx={{ paddingLeft: "20px" }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Select
                value={year}
                onChange={handleYearChange}
                sx={{
                  height: '24px',
                  fontSize: '14px',
                  color: "#575756",
                  '.MuiOutlinedInput-notchedOutline': { border: 0 },
                  '.MuiSelect-icon': { fontSize: '20px' },
                }}
                MenuProps={{
                  disableScrollLock: true,
                }}
              >
                <MenuItem value="2022" sx={{ fontSize: "12px", color: "gray" }}>2022</MenuItem>
                <MenuItem value="2023" sx={{ fontSize: "12px", color: "gray" }}>2023</MenuItem>
                <MenuItem value="2024" sx={{ fontSize: "12px", color: "gray" }}>2024</MenuItem>
              </Select>
            </Box>
          </Grid>
        </Grid>
        <Grid>

          <LineChart1 />
        </Grid>
      </Grid>


      <Grid width={"20%"}>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: "10px"
          }}
        >
          <img src="/assets/revenue.svg" alt="icon" style={{ width: "28px", height: "28px" }} />
          <Typography variant="h6"
            sx={{
              color: '#575756',
              marginTop: '8px',
              padding: "5px 40px",
              position: "relative",
              borderRadius: "30px",
              overflow: "hidden",

              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "30px",
                padding: "3px",
                background: "linear-gradient(to right, #FDB913, #F2672E)",
                WebkitMask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                mask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                zIndex: 0,
              },

              backgroundColor: "white",
              zIndex: 1,
            }}
          >
            0.00 <span style={{ fontSize: "20px"  , opacity:'0.5'}}>£</span>
          </Typography>


          <Box sx={{
            backgroundColor: "#222240",
            color: "white",
            marginTop: "10px",
            borderRadius: "30px",
            padding: "1px 10px",
            display: "flex",
            alignItems: "center",
            justifyContent:"center"
          }}>
            <StraightIcon sx={{ color: "#ef7d00", fontSize: "20px" }} />
            <Button
              onClick={() => navigate('/transaction')}
              sx={{ color: "white", textTransform: "capitalize" }}>
              {t("transactions")}
            </Button>
          </Box>

          <Box marginTop="30px" justifyContent="left">

            <Box display={"flex"} textAlign={"center"} alignItems={"center"}>
              <Box component="span" sx={{  background: "linear-gradient(to right,rgb(135, 195, 241), #1C7FCB)", width: '25px', borderRadius: "20px", height: '10px', display: 'inline-block', marginRight: '8px' }} />
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: "9px" }}>{t("salesVolume")}</Typography>
            </Box>
            <Box display={"flex"} textAlign={"center"} alignItems={"center"} marginTop="5px">
              <Box component="span" sx={{ background: "linear-gradient(to right,rgb(250, 160, 214), #8A2C5E)", width: '25px', borderRadius: "20px", height: '10px', display: 'inline-block', marginRight: '8px' }} />
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: "9px" }}>{t("orders")}</Typography>
            </Box>
          </Box>
        </Box>
      </Grid>

    </Paper>
  )
}
