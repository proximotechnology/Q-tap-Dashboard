import { Box, Button, FormControlLabel, Grid, IconButton, Radio, RadioGroup, styled, TextField, Typography, useTheme } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { PricingCard } from './PricingCard';
import { useNavigate } from 'react-router';
import DoneIcon from '@mui/icons-material/Done';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {BASE_URL} from '../../utils/constants'

import { updateBusinessData, addBranch, selectBranch, clearBusinessData, setBranches } from "../../store/register/businessSlice";
import { updatePersonalData } from "../../store/register/personalSlice";
import { useDispatch, useSelector } from 'react-redux';

export const Payment = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const [selectedValue, setSelectedValue] = useState('cash');
  const [pricing, setPricing] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null); // { plan, pricingWay }
  const [discountCode, setDiscountCode] = useState('');
  const [isLoading, setIsLoading] = useState(true); // حالة تحميل جديدة
  const dispatch = useDispatch();
  const personalData = useSelector((state) => state.personalStore.personalData);
  const { businessData, branches, selectedBranch } = useSelector((state) => state.businessStore);


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

  // Fetch pricing and discount data from API
  useEffect(() => {
    setIsLoading(true);
    Promise.all([

      fetch(`${BASE_URL}pricing`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          setPricing(data.data);
        })
        .catch(error => console.error('Error fetching pricing data:', error)),


      fetch(`${BASE_URL}discount`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          setDiscounts(data.discounts);
        })
        .catch(error => console.error('Error fetch discount data:', error)),
    ])
      .finally(() => setIsLoading(false));
  }, []);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    dispatch(updatePersonalData({ payment_method: event.target.value }));
  };

  const handleDiscountChange = (event) => {
    setDiscountCode(event.target.value);
    // التحقق من كود الخصم سيتم في handleNext
  };

  const handlePlanSelect = (plan) => {
    if (selectedPlan && selectedPlan.plan.id === plan.id) {
      // إلغاء اختيار الباقة إذا تم النقر عليها مرة أخرى
      setSelectedPlan(null);
      dispatch(updatePersonalData({ pricing_id: '', pricing_way: '' }));
    } else {
      // اختيار باقة واحدة فقط
      setSelectedPlan({ plan, pricingWay: '' });
      dispatch(updatePersonalData({ pricing_id: plan.id, pricing_way: '' }));
    }
  };

  const handlePricingWayChange = (planId, pricingWay) => {
    if (selectedPlan && selectedPlan.plan.id === planId) {
      setSelectedPlan({ ...selectedPlan, pricingWay });
      dispatch(updatePersonalData({ pricing_way: pricingWay }));
    }
  };

  const calculateTotals = () => {
    if (!selectedPlan || !selectedPlan.pricingWay) {
      return { subTotal: 0, addOns: 0, tax: 0, discounts: 0, total: 0 };
    }

    const { plan, pricingWay } = selectedPlan;
    const price = pricingWay === 'monthly' ? parseFloat(plan.monthly_price) : parseFloat(plan.yearly_price);
    const subTotal = price || 0;

    // حساب addOns بناءً على عدد الفروع
    let addOns = 0;
    if (branches.length > 1) {
      addOns = subTotal / 2; // إضافة نصف سعر الباقة إذا كان هناك أكثر من فرع
    }

    const tax = 0; // يمكن تعديله حسب الحاجة
    // التحقق الآمن من discounts
    const discountValue = discountCode && Array.isArray(discounts)
      ? parseFloat(discounts.find(d => d.code === discountCode && d.status === 'active')?.discount || 0)
      : 0;
    const total = subTotal + addOns + tax - discountValue;

    return { subTotal, addOns, tax, discounts: discountValue, total };
  };

  const totals = calculateTotals();
  const totalPrice = totals.total; // تخزين إجمالي السعر في متغير totalPrice

  const handleNext = () => {
    if (!selectedPlan) {
      toast.error(t("pleaseSelectPlan"));
      return;
    }
    if (!selectedPlan.pricingWay) {
      toast.error(t("pleaseSelectPricingWay"));
      return;
    }

    // التحقق من كود الخصم
    if (discountCode) {
      const validDiscount = Array.isArray(discounts) && discounts.find(d => d.code === discountCode && d.status === 'active');
      if (!validDiscount) {
        toast.error(t("invalidDiscountCode"));
        return;
      }
      dispatch(updatePersonalData({ discount_id: validDiscount.id }));
    } else {
      dispatch(updatePersonalData({ discount_id: null }));
    }

    navigate('/save');
  };

  // عرض حالة التحميل أثناء جلب البيانات
  if (isLoading) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography variant="h6">{t("loading")}</Typography>
      </Box>
    );
  }

  return (
    <Box marginTop={"50px"} flexGrow={1}>
      <Typography variant="body1" sx={{ marginLeft: "50px", fontSize: "18px", color: theme.palette.secondaryColor.main }}>
        {t("payment")}
      </Typography>
      <Divider marginLeft={"50px"} />

      <Box sx={{ display: "flex", flexDirection: 'column' }}>
        <Grid container spacing={1} sx={{ width: "100%", minHeight: "300px", justifyContent: "center" }}>
          {pricing.map((plan) => (
            <Grid item xs={12} sm={6} md={2} key={plan.id}>
              <PricingCard
                title={plan.name}
                pricePerMonth={plan.monthly_price}
                pricePerYear={plan.yearly_price}
                orders={plan.orders_limit}
                buttonText={t("select")}
                isSelected={selectedPlan && selectedPlan.plan.id === plan.id}
                onSelect={() => handlePlanSelect(plan)}
                onPricingWayChange={(pricingWay) => handlePricingWayChange(plan.id, pricingWay)}
                pricingWay={selectedPlan && selectedPlan.plan.id === plan.id ? selectedPlan.pricingWay : ''}
              />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ height: '15px' }}></Box>
        {/* section2 calc & discount */}
        <Grid container spacing={2}>
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
                  {totalPrice.toFixed(2)} <sub style={{ fontSize: '8px' }}>EGP</sub>
                </span>
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} sx={{ marginTop: "30px" }}>
            <Box sx={{ width: '100%', textAlign: 'center', display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Box sx={{ width: { lg: '220px', md: "100%", xs: "100%" } }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'center' }}>
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
        <Grid container>
          <Button
            variant="contained"
            sx={{
              width: '20%',
              fontSize: "13px",
              borderRadius: '50px',
              backgroundColor: theme.palette.orangePrimary.main,
              textTransform: 'none',
              padding: "6px 0",
              marginX: 'auto',
              '&:hover': { backgroundColor: theme.palette.orangePrimary.main },
              color: "#fff",
            }}
            onClick={handleNext}
          >
            {t("pay")}
          </Button>
        </Grid>
      </Box>
    </Box>
  );
};