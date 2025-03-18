import { Box, Button, FormControlLabel, Grid, IconButton, Radio, RadioGroup, styled, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { PricingCard } from './PricingCard';
import { useNavigate } from 'react-router';
import DoneIcon from '@mui/icons-material/Done';
import { useTranslation } from 'react-i18next';
const Divider = styled(Box)({
  width: '5%',
  height: '3px',
  backgroundColor: '#E57C00',
  borderRadius: "20px",
  marginBottom: "20px"
});

const Divider2 = styled(Box)({
  width: '35%',
  height: '2px',
  backgroundColor: '#E57C00',
  borderRadius: "20px",
  display: "flex",
  margin: "0 auto",
});
export const Payment = () => {
  const navigate = useNavigate();
  const { t } = useTranslation()
  const [selectedValue, setSelectedValue] = useState('cash');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Box marginTop={"50px"} flexGrow={1}>
      <Typography variant="body1" sx={{ fontSize: "18px", color: "#222240" }}>
        {t("payment")}
      </Typography>
      <Divider />

      <Grid
        container
        spacing={1}
        sx={{ width: "100%", height: "300px", justifyContent: "center" }}
      >
        <Grid item xs={12} sm={6} md={2}>
          <PricingCard
            title="Free"
            pricePerMonth="0"
            pricePerYear="0"
            orders="30"
            buttonText="Select"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2} sx={{ margin: "0px 30px" }}>
          <PricingCard
            title="Starter"
            pricePerMonth="600"
            pricePerYear="6000"
            orders="900"
            buttonText="Select"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <PricingCard
            title="Pro"
            pricePerMonth="999"
            pricePerYear="10,000"
            orders="Unlimited"
            buttonText="Select"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}  >

        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: "center", justifyContent: "center", marginLeft: "100px", marginTop: "15px" }}>
            <Typography variant="body1" sx={{ fontSize: '12px', color: "gray" }}>
              {t("subTotal")}
              <span variant="body1" style={{ fontSize: '17px', color: "#222240", marginLeft: "10px" }}>
                1000.00 <sub style={{ fontSize: '8px' }}>EGP</sub>
              </span>
            </Typography>

            <Typography variant="body1" sx={{ fontSize: '12px', color: "gray" }}>
              {t("addOns")}
              <span variant="body1" style={{ fontSize: '17px', color: "#222240", marginLeft: "10px" }}>
                500.00 <sub style={{ fontSize: '8px' }}>EGP</sub>
              </span>
            </Typography>

            <Typography variant="body1" sx={{ fontSize: '12px', color: "gray" }}>
              {t("tax")}
              <span variant="body1" style={{ fontSize: '17px', color: "#222240", marginLeft: "10px" }}>
                60.00 <sub style={{ fontSize: '8px' }}>EGP</sub>
              </span>
            </Typography>

            <Typography variant="body1" sx={{ fontSize: '12px', color: "gray" }}>
              {t("discounts")}
              <span variant="body1" style={{ fontSize: '17px', color: "#222240", marginLeft: "10px" }}>
                50.00 <sub style={{ fontSize: '8px' }}>EGP</sub>
              </span>
            </Typography>
            <Divider2 sx={{ mt: 1, mb: 1 }} />

            <Typography variant="body1" sx={{ fontSize: '12px', color: "gray" }}>
              {t("total")}
              <span variant="body1" style={{ fontSize: '17px', color: "#E57C00", marginLeft: "10px" }}>
                1390.00 <sub style={{ fontSize: '8px' }}>EGP</sub>
              </span>
            </Typography>
          </Box>
        </Grid>


        <Grid item xs={12} md={6} display="flex" flexDirection="column"
          alignItems="center" sx={{ marginTop: "30px" }}>
          <Box sx={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>

            <Box sx={{ width: { lg: '220px', md: "100%", xs: "100%" } }} >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Typography sx={{ fontSize: '9px', color: "gray" }}>{t("disCode")}</Typography>
                  <TextField variant="outlined" size="small" sx={{
                    width: "70px",
                    "& .MuiOutlinedInput-root": {
                      height: "26px",
                    },
                  }} />
                </Box>

                <Box alignItems={"center"}>
                  <IconButton>
                    <DoneIcon sx={{ fontSize: "15px", color: "#E57C00" }} />
                  </IconButton>
                  <IconButton>
                    <span class="icon-close-1" style={{ fontSize: "9px", color: "#222240" }}></span>
                  </IconButton>
                </Box>
              </Box>
            </Box>

            <RadioGroup defaultValue="cash" sx={{ mt: 1 }} onChange={handleChange}>
              <FormControlLabel sx={{ color: 'gray', fontSize: "11px", }} value="cash"
                control={<Radio size="small"
                  sx={{
                    color: selectedValue === 'cash' ? '#E57C00' : 'gray',
                    '&.Mui-checked': { color: '#E57C00' },
                  }}
                />}
                label={
                  <Typography sx={{ fontSize: "12px", color: 'gray' }}>{t("cashOrCard")}</Typography>
                } />

              <FormControlLabel sx={{ color: 'gray', fontSize: "11px", mt: '-8px' }} value="card"
                control={<Radio size="small"
                  sx={{
                    color: selectedValue === 'card' ? '#E57C00' : 'gray',
                    '&.Mui-checked': { color: '#E57C00' },
                  }} />}
                label={
                  <Typography sx={{ fontSize: "12px", color: 'gray' }}>{t("onlinePayment")}</Typography>
                }
              />
            </RadioGroup>
          </Box>
        </Grid>
      </Grid>


      <Grid item xs={12}>
        <Button
          variant="contained"
          sx={{
            width: '20%',
            fontSize: "13px",
            borderRadius: '50px',
            backgroundColor: "#E57C00",
            textTransform: 'none',
            padding: "6px 0",
            position: "fixed", bottom: "30px",
            left: "55%",
            '&:hover': {
              backgroundColor: "#E57C00",
            },
            color: "#fff"
          }}
          onClick={() => navigate('/save')}
        >
          {t("pay")}
        </Button>
      </Grid>
    </Box>

  )
}
