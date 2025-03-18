import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Divider } from '@mui/material';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AddBundle from './AddBundle';
import { DiscountModelAdmin } from './DiscountModelAdmin';
import { useTranslation } from 'react-i18next';

export const Pricing = () => {
  const [open, setOpen] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [openDiscount, setOpenDiscount] = useState(false);
  const { t } = useTranslation()

  const handleOpen = () => {
    setSelectedBundle(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBundle(null);
  };

  const handleSettingsClick = (bundle) => {
    setSelectedBundle(bundle);
    setOpen(true);
  };

  const handleDiscountOpen = () => {
    setOpenDiscount(true);
  };

  const handleDiscountClose = () => {
    setOpenDiscount(false);
  };
  /// card pricing structure 
  const PricingCard = ({ title, priceMonthly, priceYearly, description, features, id }) => {
    // delete pricing data from api
    const handleDelete = () => {
      fetch(`https://highleveltecknology.com/Qtap/api/pricing/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      })
        .then(response => {
          if (response.status === 204) {
            return { success: true };
          }
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text().then(text => {
            return text ? JSON.parse(text) : { success: true };
          });
        })
        .then(data => {
          console.log('Delete successful:', data);
          window.location.reload();
        })
        .catch(error => {
          console.error('Error deleting pricing data:', error);
          alert('Failed to delete pricing data. Please try again.');
        });
    };

    return (
      <Box sx={{
        borderRadius: '50px 50px 50px 0px',
        padding: '20px 35px',
        width: '28%',
        backgroundColor: 'white',
        margin: '20px',
        marginTop: "70px",
      }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'center', position: "relative", top: "-40px", }}>
          <Box
            sx={{
              backgroundColor: '#ef7d00',
              textAlign: 'center',
              padding: '5px 20px',
              width: "170px",
              borderRadius: "40px",
              color: '#fff',
            }}
          >
            <Typography variant="h6">{title}</Typography>
          </Box>
        </Box>

        <Box sx={{ textAlign: 'center', marginTop: "-20px" }}>
          <Typography variant="h4" color="textPrimary">
            <sup style={{ color: "#ef7d00", fontSize: "12px", marginRight: "10px" }}>EGP</sup>{priceMonthly}
            <Typography component="span" variant="body2" color="textSecondary">
              /month
            </Typography>
          </Typography>

          <Typography variant="h6" color="textPrimary" sx={{ marginTop: "10px" }}>
            <sup style={{ color: "#ef7d00", fontSize: "12px", marginRight: "10px" }}>EGP</sup>{priceYearly}
            <Typography component="span" variant="body2" color="textSecondary">
              /year
            </Typography>
          </Typography>
          <Divider sx={{ my: 2, backgroundColor: "#ef7d00", width: "100%" }} />
        </Box>

        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '40px', fontSize: "11px" }}>
          {description}
        </Typography>

        <Box>
          {features.map((feature, index) => (
            <Typography key={index} variant="body2" color="textSecondary" display="flex"
              sx={{ fontSize: "10px", paddingTop: "8px", wordSpacing: "2px" }} >
              <DoneOutlinedIcon sx={{ color: '#f57c00', marginRight: '5px', fontSize: "15px", fontWeight: "bold" }} />
              {feature}
            </Typography>
          ))}
        </Box>

        <Box display="flex" justifyContent="center" mt={3}>
          <IconButton onClick={handleDelete}>
            <span className="icon-delete" style={{ color: 'black', fontSize: "25px" }} />
          </IconButton>
          <IconButton onClick={() => handleSettingsClick({ id, name: title, monthly_price: priceMonthly, yearly_price: priceYearly, description, feature: JSON.stringify(features) })}>
            <img src="/assets/setting.svg" alt="icon" style={{ color: 'black', width: "20px", height: "20px" }} />
          </IconButton>
        </Box>
      </Box>
    );
  };

  const [pricing, setPricing] = useState([]);
  // get pricing data from api
  useEffect(() => {
    fetch('https://highleveltecknology.com/Qtap/api/pricing', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      },
    })
      .then(response => response.json())
      .then(data => {
        setPricing(data.data);
        console.log("price data", data);
      })
      .catch(error => console.error('Error fetching pricing data:', error));
  }, []);

  return (
    <Box sx={{ padding: "0px 20px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "center", }}>
        <Typography sx={{ fontSize: "14px", color: "#575756" }}>{t("bundle")}</Typography>

        <Box sx={{ display: "flex" }}>
          <Typography onClick={handleDiscountOpen}
            sx={{
              color: "#222240", cursor: "pointer", border: "1px solid gray",
              padding: "3px 15px", borderRadius: "30px", fontSize: "12px"
            }}>
            <span style={{ color: "#ef7d00", fontSize: "17px", marginRight: "5px" }}>%</span>
            {t("disCode")}
          </Typography>
          <DiscountModelAdmin open={openDiscount} handleClose={handleDiscountClose} />

          <AddOutlinedIcon
            onClick={handleOpen}
            sx={{
              color: '#ef7d00',
              border: "3px solid #ef7d00", borderRadius: "50%",
              fontSize: '32px', marginLeft: "15px", cursor: "pointer",
            }}
          />
          <AddBundle
            open={open}
            onClose={handleClose}
            editData={selectedBundle}
          />
        </Box>
      </Box>

      <Divider sx={{
        width: "100%", borderRadius: "20px", borderBottom: "none", marginTop: "10px",
        background: 'linear-gradient(90deg, #FDB913 0%, #F2672E 100%)', height: "3px"
      }} />

      <Box display="flex" justifyContent="center" flexWrap="wrap">
        {Array.isArray(pricing) ? pricing?.map((item) => (
          <PricingCard
            key={item.id}
            title={item.name}
            priceMonthly={item.monthly_price}
            priceYearly={item.yearly_price}
            description={item.description}
            features={JSON.parse(item.feature)}
            id={item.id}
          />
        )) : null}
      </Box>
    </Box>
  );
};
