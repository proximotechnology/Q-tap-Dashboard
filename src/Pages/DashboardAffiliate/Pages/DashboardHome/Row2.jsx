import { Card, CardContent, Grid, MenuItem, Select, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import LineChart1 from '../../../Wallet/Row1/LineChart1'
import { useTranslation } from 'react-i18next'
 

export const Row2 = () => {
  const [year, setYear] = React.useState('2024');

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };
  const {t} = useTranslation();
  return (

    <Grid item xs={12} sx={{ flexGrow: 1, padding: '0px 20px 20px 20px' }}>

      <Card sx={{ borderRadius: '20px' }}>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center"  >
            <Grid item>
              <Typography variant="body1" sx={{ fontSize: "13px", color: "#3a3939" }}>{t("clicks&sales")}</Typography>
            </Grid>
            <Grid item>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Select
                  value={year}
                  onChange={handleYearChange}
                  MenuProps={{
                    disableScrollLock: true,
                  }}
                  sx={{
                    height: '24px',
                    fontSize: '12px',
                    color: "#3a3939",
                    '.MuiOutlinedInput-notchedOutline': { border: 0 },
                    '.MuiSelect-icon': { fontSize: '18px' },
                  }}
                >
                  <MenuItem value="2023" sx={{ fontSize: "12px", color: "gray" }}>2023</MenuItem>
                  <MenuItem value="2024" sx={{ fontSize: "12px", color: "gray" }}>2024</MenuItem>
                  <MenuItem value="2025" sx={{ fontSize: "12px", color: "gray" }}>2025</MenuItem>
                </Select>
                <span class="icon-social" style={{ fontSize: "25px", color: "#D8E0E0" }} ></span>
              </Box>
            </Grid>

          </Grid>

          <Box sx={{ display: "flex" }}>
            <Box sx={{ borderRadius: "20px", width: "90%" }}>
              <LineChart1 />
            </Box>  {/* LineChart */}

            <Box sx={{ display: "flex", textAlign: "center", alignItems: "center" }}>
              <Box justifyContent="center">

                <Box display={"flex"} textAlign={"center"} alignItems={"center"}>
                  <Box component="span" sx={{ background:"linear-gradient(90deg, #45F7FF, #2278F3)" , width: '25px', 
                    borderRadius: "20px", height: '10px', display: 'inline-block', marginRight: '8px' }} />
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "9px" }}>{t("clicks")}</Typography>
                </Box>
                <Box display={"flex"} textAlign={"center"} alignItems={"center"} marginTop="5px">
                  <Box component="span" sx={{  background:"linear-gradient(90deg, #FD4845, #843EA1)" ,
                    width: '25px', borderRadius: "20px", height: '10px', display: 'inline-block', marginRight: '8px' }} />
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "9px" }}>{t("sales")}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}
