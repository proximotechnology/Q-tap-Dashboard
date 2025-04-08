import { Box, Button, FormControlLabel, Grid, IconButton, Radio, RadioGroup, styled, TextField, Typography, useTheme } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { PricingCard } from './PricingCard';
import { useNavigate } from 'react-router';
import DoneIcon from '@mui/icons-material/Done';
import { useTranslation } from 'react-i18next';
import { usePersonalContext } from '../../context/PersonalContext';





export const Payment = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const { personalData, updatePersonalData } = usePersonalContext();
  const [selectedValue, setSelectedValue] = useState('cash');
  const [pricing, setPricing] = useState([]);
  const [selectedPlans, setSelectedPlans] = useState([]); // Array of { plan, pricingWay }
  const [discountCode, setDiscountCode] = useState('');
  const Divider2 = styled(Box)({
    width: '35%',
    height: '2px',
    backgroundColor: theme.palette.orangePrimary.main,
    borderRadius: "20px",
    display: "flex",
    margin: "0 auto",
  });
  const Divider = styled(Box)({
    width: '5%',
    height: '3px',
    backgroundColor: theme.palette.orangePrimary.main,
    borderRadius: "20px",
    marginBottom: "20px",
  });
  // Fetch pricing data from API
  useEffect(() => {
    fetch('https://highleveltecknology.com/Qtap/api/pricing', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setPricing(data.data);
        console.log("price data register", data);
      })
      .catch(error => console.error('Error fetching pricing data:', error));
  }, []);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    updatePersonalData({ payment_method: event.target.value });
  };

  const handleDiscountChange = (event) => {
    setDiscountCode(event.target.value);
    updatePersonalData({ discount_id: event.target.value });
  };

  const handlePlanSelect = (plan) => {
    const isSelected = selectedPlans.some(p => p.plan.id === plan.id);
    let updatedPlans;
    if (isSelected) {
      updatedPlans = selectedPlans.filter(p => p.plan.id !== plan.id); // Deselect
    } else {
      updatedPlans = [...selectedPlans, { plan, pricingWay: '' }]; // Add without pricingWay initially
    }
    setSelectedPlans(updatedPlans);

    // Update pricing_id with the first selected plan's ID as a string, or empty string if none
    const firstPlanId = updatedPlans.length > 0 ? updatedPlans[0].plan.id : '';
    updatePersonalData({ pricing_id: firstPlanId });
  };

  const handlePricingWayChange = (planId, pricingWay) => {
    const updatedPlans = selectedPlans.map(p =>
      p.plan.id === planId ? { ...p, pricingWay } : p
    );
    setSelectedPlans(updatedPlans);

    // Update pricing_way in context if all selected plans have a consistent pricingWay
    const allPricingWays = updatedPlans.map(p => p.pricingWay).filter(Boolean);
    if (allPricingWays.length === updatedPlans.length && allPricingWays.every(pw => pw === allPricingWays[0])) {
      updatePersonalData({ pricing_way: allPricingWays[0] }); // Set to 'monthly' or 'yearly'
    } else {
      updatePersonalData({ pricing_way: '' }); // Clear if not all match or some are unset
    }
  };

  const calculateTotals = () => {
    if (selectedPlans.length === 0) return { subTotal: 0, addOns: 0, tax: 0, discounts: 0, total: 0 };

    // Check if all selected plans have pricingWay set
    const allPricingWaysSet = selectedPlans.every(p => p.pricingWay);
    if (!allPricingWaysSet) return { subTotal: 0, addOns: 0, tax: 0, discounts: 0, total: 0 };

    const subTotal = selectedPlans.reduce((sum, { plan, pricingWay }) => {
      const price = pricingWay === 'monthly' ? parseFloat(plan.monthly_price) : parseFloat(plan.yearly_price);
      return sum + (price || 0);
    }, 0);

    const addOns = 0; // Adjust as needed
    const tax = 0; // Adjust as needed
    const discounts = discountCode ? parseFloat(discountCode) || 0 : 0;
    const total = subTotal + addOns + tax - discounts;

    return { subTotal, addOns, tax, discounts, total };
  };

  const totals = calculateTotals();

  return (
    <Box marginTop={"50px"} flexGrow={1} >
      <Typography variant="body1" sx={{ fontSize: "18px", color: theme.palette.secondaryColor.main }}>
        {t("payment")}
      </Typography>
      <Divider />

      <Box 
      sx={{ display:"flex", flexDirection:'column' }}
      >
      <Grid container  spacing={1} sx={{ width: "100%", minHeight: "300px", justifyContent: "center" }}>
        {pricing.map((plan) => (
          <Grid item xs={12} sm={6} md={2} key={plan.id}>
            <PricingCard
              title={plan.name}
              pricePerMonth={plan.monthly_price}
              pricePerYear={plan.yearly_price}
              orders={plan.orders_limit}
              buttonText={t("select")}
              isSelected={selectedPlans.some(p => p.plan.id === plan.id)}
              onSelect={() => handlePlanSelect(plan)}
              onPricingWayChange={(pricingWay) => handlePricingWayChange(plan.id, pricingWay)}
              pricingWay={selectedPlans.find(p => p.plan.id === plan.id)?.pricingWay || ''}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ height:'15px' }}></Box>
        {/* section2 calc & discount */}
      <Grid container  spacing={2} >
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: "center", justifyContent: "center", marginTop: "15px" }}>
            <Typography variant="body1" sx={{ fontSize: '12px', color: "gray" }}>
              {t("subTotal")}
              <span style={{ fontSize: '17px', color: theme.palette.secondaryColor.main, marginLeft: "10px" }}>
                {totals.subTotal.toFixed(2)} <sub style={{ fontSize: '8px' }}>EGP</sub>
              </span>
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '12px', color: "gray" }}>
              {t("addOns")}
              <span style={{ fontSize: '17px', color: theme.palette.secondaryColor.main, marginLeft: "10px" }}>
                {totals.addOns.toFixed(2)} <sub style={{ fontSize: '8px' }}>EGP</sub>
              </span>
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '12px', color: "gray" }}>
              {t("tax")}
              <span style={{ fontSize: '17px', color: theme.palette.secondaryColor.main, marginLeft: "10px" }}>
                {totals.tax.toFixed(2)} <sub style={{ fontSize: '8px' }}>EGP</sub>
              </span>
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '12px', color: "gray" }}>
              {t("discounts")}
              <span style={{ fontSize: '17px', color: theme.palette.secondaryColor.main, marginLeft: "10px" }}>
                {totals.discounts.toFixed(2)} <sub style={{ fontSize: '8px' }}>EGP</sub>
              </span>
            </Typography>
            <Divider2 sx={{ mt: 1, mb: 1 }} />
            <Typography variant="body1" sx={{ fontSize: '12px', color: "gray" }}>
              {t("total")}
              <span style={{ fontSize: '17px', color: theme.palette.orangePrimary.main, marginLeft: "10px" }}>
                {totals.total.toFixed(2)} <sub style={{ fontSize: '8px' }}>EGP</sub>
              </span>
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}  sx={{ marginTop: "30px" }}>
          <Box sx={{ width: '100%', textAlign: 'center' ,display:"flex", flexDirection:"column" ,alignItems:"center"}}>
            <Box sx={{ width: { lg: '220px', md: "100%", xs: "100%" } }}>
              <Box sx={{ display: "flex", alignItems: "center" ,justifyContent:'center'}}>
                <Box>
                  <Typography sx={{ fontSize: '9px', color: "gray" }}>{t("disCode")}</Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={discountCode}
                    onChange={handleDiscountChange}
                    sx={{
                      width: "70px",
                      "& .MuiOutlinedInput-root": { height: "26px" },
                    }}
                  />
                </Box>
                <Box alignItems={"center"}>
                  <IconButton>
                    <DoneIcon sx={{ fontSize: "15px", color: theme.palette.orangePrimary.main }} />
                  </IconButton>
                  <IconButton>
                    <span className="icon-close-1" style={{ fontSize: "9px", color: theme.palette.secondaryColor.main }}></span>
                  </IconButton>
                </Box>
              </Box>
            </Box>

            <RadioGroup defaultValue="cash" sx={{ mt: 1 }} onChange={handleChange}>
              <FormControlLabel
                sx={{ color: 'gray', fontSize: "11px" }}
                value="cash"
                control={<Radio size="small" sx={{ color: selectedValue === 'cash' ? theme.palette.orangePrimary.main : 'gray', '&.Mui-checked': { color: theme.palette.orangePrimary.main } }} />}
                label={<Typography sx={{ fontSize: "12px", color: 'gray' }}>{t("cashOrCard")}</Typography>}
              />
              <FormControlLabel
                sx={{ color: 'gray', fontSize: "11px", mt: '-8px' }}
                value="wallet"
                control={<Radio size="small" sx={{ color: selectedValue === 'wallet' ? theme.palette.orangePrimary.main : 'gray', '&.Mui-checked': { color: theme.palette.orangePrimary.main } }} />}
                label={<Typography sx={{ fontSize: "12px", color: 'gray' }}>{t("onlinePayment")}</Typography>}
              />
            </RadioGroup>
          </Box>
        </Grid>
      </Grid>
{/* section 3 pay button */}
      <Grid container >
        <Button
          variant="contained"
          sx={{
            width: '20%',
            fontSize: "13px",
            borderRadius: '50px',
            backgroundColor: theme.palette.orangePrimary.main,
            textTransform: 'none',
            padding: "6px 0",
            marginX:'auto',
            '&:hover': { backgroundColor: theme.palette.orangePrimary.main },
            color: "#fff",
          }}
          onClick={() => navigate('/save')}
        >
          {t("pay")}
        </Button>
      </Grid>
      </Box>
    </Box>
  );
};