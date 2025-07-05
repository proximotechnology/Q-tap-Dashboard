import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
  Box,
  useTheme,
  CircularProgress,
} from '@mui/material';
import {
  CheckOutlined,
  HelpOutlineOutlined,
  KeyboardArrowDown,
  PersonOutlineOutlined,
} from '@mui/icons-material';
import { PersonalInfo } from '../../Pages/Client/Row2/AddClient/PersonalInfo';
import { BusinessInfo } from '../../Pages/Client/Row2/AddClient/BusinessInfo';
import { useTranslation } from 'react-i18next';
import Language from '../dashboard/TopBar/Language';
import { updatePersonalData } from "../../store/register/personalSlice";
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../../utils/constants';

import { appendBrunchData, appendUserData } from '../../utils/register-client/createBranchFormData';
import { registerUser } from '../../api/Client/registerUser';
import { getValidationError } from '../../utils/register-validation/registerValidation';
import { printFormData } from '../../utils/utils';
export const Save = () => {
  const [branchErrors, setBranchErrors] = useState({})
  const dispatch = useDispatch();
  const personalData = useSelector((state) => state.personalStore.personalData);

  const { businessData, branches, selectedBranch } = useSelector((state) => state.businessStore);

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const [anchorElUser, setAnchorElUser] = useState(null);

  // const openLanguage = Boolean(anchorElLanguage);
  const openUserPopover = Boolean(anchorElUser);

  // Handle Personal Info Changes
  const handlePersonalChange = (field, value) => {
    const updatedData = { ...personalData, [field]: value };
    dispatch(updatePersonalData(updatedData));
  };

  /*  \ 
       \
        \ 
         | => handle save button click
        /
       /
      /
  \ */
  const handleSave = async () => {
    const errors = getValidationError(branches)

    if (errors) {
      setBranchErrors(errors)
      return;
    } else {
      setBranchErrors(null)
    }
    setIsLoading(true);
    const formData = new FormData();

    // Helper function to get currency ID
    const getCurrencyId = (country) => {
      const currencyMap = {
        US: 1,
        UK: 2,
        EU: 3,
        egypt: 4,
        EG: 4,
        UAE: 5,
        SA: 6,
      };
      // return currencyMap[country] || 1;
      return 1;
    };
    // Append personal data

    appendUserData({ personalData, formData })
    // Branch data preparation
    const apiBranches = (branches.length > 0 ? branches : [businessData]).map((branch, index) => ({
      brunch: `brunch${index + 1}`,
      pin: branch.pin || '',
      contact_info: {
        business_phone: [branch.businessPhone?.trim() || ''],
        business_email: [branch.businessEmail?.trim() || ''],
        facebook: [''],
        twitter: [''],
        instagram: [''],
        address: [''],
        website: [branch.website?.trim() || ''],
      },
      currency_id: getCurrencyId(branch.country),
      workschedules: branch.workschedules || {},
      serving_ways: Array.isArray(branch.servingWays) ? branch.servingWays : [],
      tables_number: parseInt(branch.tableCount) || 0,
      payment_services: Array.isArray(branch.paymentMethods) ? branch.paymentMethods : [],
      business_name: branch.businessName?.trim() || '',
      business_country: branch.country || '',
      business_city: branch.city || '',
      latitude: branch.latitude || '846.668848',
      longitude: branch.longitude || '648.4684684',
      business_format: (branch.format || 'uk').toLowerCase(),
      menu_design: branch.design || 'grid',
      default_mode: branch.mode === 'white' || branch.mode === 'light' ? 'white' : 'dark',
      payment_time: branch.paymentTime || 'after',
      call_waiter: branch.callWaiter === 'active' ? 'active' : 'inactive',
      pricing_id: branch.pricing_id || personalData.pricing_id || 1,
      payment_method: branch.payment_method || personalData.payment_method || 'cash',
      discount_id: branch.discount_id || personalData.discount_id || null,
    }));

    // Append branch data

    try {
      apiBranches.forEach((branch, index) => {
        if (!branch.latitude || !branch.longitude) {

          throw new Error(`${branch.brunch} no latitude or longitude`);
        }
        appendBrunchData(branch.brunch, branch, formData);

      });
    } catch (error) {
      toast.error(`Please select position: ${error.message}`);
      setIsLoading(false);
      return;
    }

    // Determine if this is an update or create operation
    const isUpdate = personalData.id; // Assuming personalData.id exists for existing users
    const url = isUpdate ? `${BASE_URL}qtap_clients/${personalData.id}` : `${BASE_URL}qtap_clients`;
    const method = isUpdate ? 'PUT' : 'POST';

    // Send data to API
    try {
      printFormData(formData)
      const response = await registerUser({ method, url, data: formData })

      if (response.status === 200 || response.status === 201) {
        const { payment_url } = response.data;

        toast.success(t(isUpdate ? "dataUpdatedSuccessfully" : "dataSavedSuccessfully"));
        if (payment_url) {
          sessionStorage.setItem("paymentUrl", payment_url);
        }
        navigate('/otp-signup');
      }
    } catch (error) {
      console.error('Network Error:', error);
      toast.error(error.response.data.error_details || error.response.data.message || t("errorWhileSavingData"));
    } finally {
      setIsLoading(false);
    }
  };//



  const handleUserClick = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleUserClose = () => {
    setAnchorElUser(null);
  };

  // const getLanguageIcon = () => {
  //   return selectedLanguage === 'ar' ? (
  //     <span className="icon-translation" style={{ color: theme.palette.orangePrimary.main, fontSize: '22px' }} />
  //   ) : (
  //     <LanguageOutlined sx={{ color: theme.palette.orangePrimary.main, fontSize: '22px' }} />
  //   );
  // };

  return (
    <Box sx={{ backgroundColor: theme.palette.bodyColor.white_333, minHeight: '100vh',paddingBottom:"1rem" }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '0px 60px',
          justifyContent: 'space-between',
          width: '90%',
          height: '70px',
        }}
      >
        <Box>
          <img src="/images/qtap.PNG" alt="logo" width="140px" />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Language />

          <Box
            aria-describedby={openUserPopover ? 'simple-popover' : undefined}
            onClick={handleUserClick}
            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
          >
            <IconButton
              color="inherit"
              sx={{
                backgroundColor: theme.palette.orangePrimary.main,
                borderRadius: '30%',
                padding: '5px',
                '&:hover': { backgroundColor: theme.palette.orangePrimary.main },
              }}
            >
              <PersonOutlineOutlined sx={{ fontSize: '20px', color: 'white' }} />
            </IconButton>
            <Typography variant="body1" sx={{ fontSize: '13px', color: '#575756' }}>
              {personalData.fullName || 'User01'}
            </Typography>
            <KeyboardArrowDown sx={{ fontSize: '18px', color: '#575756' }} />
          </Box>
          <Popover
            id={openUserPopover ? 'simple-popover' : undefined}
            open={openUserPopover}
            anchorEl={anchorElUser}
            onClose={handleUserClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            <Box sx={{ width: 200, padding: '10px' }}>
              <Box
                sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: '20px', gap: '10px' }}
              >
                <Avatar sx={{ bgcolor: theme.palette.orangePrimary.main, width: 40, height: 40 }}>
                  <PersonOutlineOutlined sx={{ fontSize: '22px' }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontSize: '14px' }}>
                    {personalData.fullName || 'User01'}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '12px' }} color="textSecondary">
                    {personalData.email || 'Mail@mail.com'}
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <List>
                <Box
                  onClick={() => navigate('/')}
                  sx={{
                    cursor: 'pointer',
                    backgroundColor: theme.palette.secondaryColor.main,
                    color: 'white',
                    marginBottom: '10px',
                    borderRadius: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    justifyContent: 'center',
                    width: '80%',
                    padding: '5px 0px',
                    margin: '0 auto',
                  }}
                >
                  <span className="icon-home-icon-silhouette" style={{ color: theme.palette.orangePrimary.main, marginRight: '5px', fontSize: '15px' }} />
                  <span style={{ color: 'white', fontSize: '12px', textTransform: 'capitalize' }}>{t("home")}</span>
                </Box>
                <ListItem sx={{ cursor: 'pointer' }} onClick={handleUserClose}>
                  <ListItemIcon>
                    <img src="/assets/setting.svg" alt="icon" style={{ width: '16px', height: '16px' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Edit Profile"
                    primaryTypographyProps={{ sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: '-30px' } }}
                  />
                </ListItem>
                <ListItem sx={{ cursor: 'pointer' }} onClick={handleUserClose}>
                  <ListItemIcon>
                    <span className="icon-price-tag" style={{ fontSize: '20px' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="My Subscription"
                    primaryTypographyProps={{ sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: '-30px' } }}
                  />
                </ListItem>
                <ListItem sx={{ cursor: 'pointer' }} onClick={handleUserClose}>
                  <ListItemIcon>
                    <HelpOutlineOutlined sx={{ fontSize: '20px' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="FAQ"
                    primaryTypographyProps={{ sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: '-30px' } }}
                  />
                </ListItem>
                <ListItem sx={{ cursor: 'pointer' }} onClick={handleUserClose}>
                  <ListItemIcon>
                    <img src="/assets/logout.svg" alt="icon" style={{ width: '16px', height: '16px' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Logout"
                    primaryTypographyProps={{ sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: '-30px' } }}
                  />
                </ListItem>
              </List>
            </Box>
          </Popover>
        </Box>
      </Box>

      <Divider sx={{ backgroundColor: theme.palette.orangePrimary.main, borderBottom: 'none', width: '100%', height: '3px' }} />

      <Box>
        <Grid container >
          <Grid item xs={12} md={5} sx={{ paddingX: { xs: '20px', md: '0px' } }}>
            <PersonalInfo personalData={personalData} onInputChange={handlePersonalChange} />
          </Grid>
          <Box item sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Divider orientation="vertical" sx={{ backgroundColor: '#f4f6fc', width: '1px', marginTop: '30px', height: '90%' }} />
          </Box>
          <Grid item xs={12} md={6} sx={{ marginTop: "10px", paddingInlineStart: "20px", paddingInlineEnd: { xs: '20px', md: '0px' } }}>


            {
              branchErrors?.branchError && branchErrors?.branchError?.map(item =>
                <span style={{ color: "red" }}>
                  {item} <br />
                </span>
              )
            }
            {/* {Object.keys(branchErrors).length !== 0 ? <span style={{ color: "red" }}>error in : {
              Object.entries(branchErrors).map(([branch, branchErrors]) => (
                Object.entries(branchErrors).map(([field, message]) => (
                  <>{field}:{message}</>
                ))
              ))
            } </span> : ""} */}
            <BusinessInfo branchErrors={branchErrors} />
          </Grid>
        </Grid>

        <Grid container justifyContent="center" sx={{ marginTop: 3 }}>
          {isLoading ?
            <Box sx={{
              width: '160px',
              textTransform: 'capitalize',
              backgroundColor: theme.palette.orangePrimary.main,
              color: 'white',
              borderRadius: '20px',
              padding: '5px',
              display: 'flex',
              justifyContent: 'center'
            }}
            >
              {t("loading.")} <CircularProgress size={24} color='inherit' sx={{ marginLeft: "2px" }} />
            </Box>
            :
            <Button
              onClick={handleSave}
              sx={{
                width: '160px',
                textTransform: 'capitalize',
                backgroundColor: theme.palette.orangePrimary.main,
                color: 'white',
                borderRadius: '20px',
                padding: '5px',
                '&:hover': { backgroundColor: '#ef7d10' },
              }}
              disabled={isLoading}
            >
              <CheckOutlined sx={{ fontSize: '22px', mr: 1 }} /> {t("save")}
            </Button>}
        </Grid>
      </Box>
    </Box>
  );
};

export default Save;
