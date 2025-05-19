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
  LanguageOutlined,
  PersonOutlineOutlined,
} from '@mui/icons-material';
import { PersonalInfo } from '../../Pages/Client/Row2/AddClient/PersonalInfo';
import { BusinessInfo } from '../../Pages/Client/Row2/AddClient/BusinessInfo';
import { useTranslation } from 'react-i18next';
import Language from '../dashboard/TopBar/Language';
import { BASE_URL } from '../../utils/helperFunction';
import axios from 'axios';

import { updateBusinessData, addBranch, selectBranch, clearBusinessData, setBranches } from "../../store/register/businessSlice";
import { updatePersonalData } from "../../store/register/personalSlice";
import { useDispatch, useSelector } from 'react-redux';
export const Save = () => {

  const dispatch = useDispatch();
  const personalData = useSelector((state) => state.personalStore.personalData);
  const { businessData, branches, selectedBranch } = useSelector((state) => state.businessStore);

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  // Business Info State
  const [businessName, setBusinessName] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [businessCountry, setBusinessCountry] = useState('');
  const [businessCity, setBusinessCity] = useState('');
  const [currency, setCurrency] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [menuLanguage, setMenuLanguage] = useState('');
  const [tableCount, setTableCount] = useState('');
  const [mode, setMode] = useState('white');
  const [design, setDesign] = useState('grid');
  const [workschedules, setWorkSchedules] = useState({
    Saturday: ['9:00 am', '7:00 pm'],
    Sunday: ['9:00 am', '7:00 pm'],
  });
  const [servingWays, setServingWays] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentTime, setPaymentTime] = useState('after');
  const [callWaiter, setCallWaiter] = useState('inactive');

  // Personal Info State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [password, setPassword] = useState('');
  const [img, setImg] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [pricingId, setPricingId] = useState(1);
  const [pricingWay, setPricingWay] = useState('monthly');
  const [discountId, setDiscountId] = useState(null);

  // Language and User Popover State
  const [anchorElLanguage, setAnchorElLanguage] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [anchorElUser, setAnchorElUser] = useState(null);

  const openLanguage = Boolean(anchorElLanguage);
  const openUserPopover = Boolean(anchorElUser);

  // Load data from contexts when component mounts
  useEffect(() => {
    // Load business data
    const data = selectedBranch !== null && branches[selectedBranch] ? branches[selectedBranch] : businessData;
    if (data) {
      setBusinessName(data.businessName || '');
      setBusinessPhone(data.businessPhone || '');
      setBusinessEmail(data.businessEmail || '');
      setBusinessCountry(data.country || '');
      setBusinessCity(data.city || '');
      setCurrency(data.currency || '');
      setBusinessType(data.format || '');
      setMenuLanguage(data.menuLanguage || '');
      setTableCount(data.tableCount || '');
      setMode(data.mode || 'white');
      setDesign(data.design || 'grid');
      setWorkSchedules(data.workschedules || {
        Saturday: ['9:00 am', '7:00 pm'],
        Sunday: ['9:00 am', '7:00 pm'],
      });
      setServingWays(data.servingWays || []);
      setPaymentMethods(data.paymentMethods || []);
      setPaymentTime(data.paymentTime || 'after');
      setCallWaiter(data.callWaiter || 'inactive');
    }

    // Load personal data
    if (personalData) {
      setFullName(personalData.fullName || '');
      setPhone(personalData.phone || '');
      setEmail(personalData.email || '');
      setCountry(personalData.country || '');
      setYear(personalData.year || '');
      setMonth(personalData.month || '');
      setDay(personalData.day || '');
      setPassword(personalData.password || '');
      setImg(personalData.img || '');
      setPaymentMethod(personalData.payment_method || 'cash');
      setPricingId(personalData.pricing_id || 1);
      setPricingWay(personalData.pricing_way || 'monthly');
      setDiscountId(personalData.discount_id || null);
    }
  }, [businessData, branches, selectedBranch, personalData]);

  // Handle Personal Info Changes
  const handlePersonalChange = (field, value) => {
    const updatedData = { ...personalData, [field]: value };
    dispatch(updatePersonalData(updatedData));
  };

  // Handle Save Button Click
  const handleSave = async () => {
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
      return  1;
    };

    // Append personal data
    formData.append('name', personalData.fullName?.trim() || '');
    formData.append('mobile', personalData.phone?.trim() || '');
    formData.append('email', personalData.email?.trim().toLowerCase() || '');
    formData.append('birth_date', personalData.year && personalData.month && personalData.day
      ? `${personalData.year}-${personalData.month}-${personalData.day}`
      : '');
    formData.append('country', personalData.country || '');
    formData.append('password', personalData.password || '1');
    formData.append('user_type', 'qtap_clients');
    formData.append('payment_method', personalData.payment_method || 'cash');
    formData.append('pricing_id', personalData.pricing_id || 1);
    formData.append('pricing_way', `${personalData.pricing_way}_price` || 'monthly_price');
    if (personalData.discount_id) formData.append('discount_id', personalData.discount_id);
    if (personalData.affiliate_code) formData.append('affiliate_code', personalData.affiliate_code);

    // Append image if it exists
    if (personalData.img instanceof File) {
      formData.append('img', personalData.img);
    }

    // Branch data preparation
    const apiBranches = (branches.length > 0 ? branches : [businessData]).map((branch, index) => ({
      brunch: `brunch${index + 1}`,
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
    const appendBrunchData = (prefix, data) => {
      try {
        // Contact info
        formData.append(`${prefix}[contact_info][business_phone][]`, data.contact_info.business_phone[0]);
        formData.append(`${prefix}[contact_info][business_email][]`, data.contact_info.business_email[0]);
        formData.append(`${prefix}[contact_info][facebook][]`, data.contact_info.facebook[0]);
        formData.append(`${prefix}[contact_info][twitter][]`, data.contact_info.twitter[0]);
        formData.append(`${prefix}[contact_info][instagram][]`, data.contact_info.instagram[0]);
        formData.append(`${prefix}[contact_info][address][]`, data.contact_info.address[0]);
        formData.append(`${prefix}[contact_info][website][]`, data.contact_info.website[0]);

        // Work schedules
        Object.entries(data.workschedules).forEach(([day, times]) => {
          times.forEach((time) => {
            formData.append(`${prefix}[workschedules][${day}][]`, time);
          });
        });

        // Serving ways
        data.serving_ways.forEach((value) => {
          formData.append(`${prefix}[serving_ways][]`, value);
        });

        // Payment services
        data.payment_services.forEach((value) => {
          formData.append(`${prefix}[payment_services][]`, value);
        });

        // Other fields
        formData.append(`${prefix}[tables_number]`, data.tables_number);
        formData.append(`${prefix}[currency_id]`, data.currency_id);
        formData.append(`${prefix}[business_name]`, data.business_name);
        formData.append(`${prefix}[business_country]`, data.business_country);
        formData.append(`${prefix}[business_city]`, data.business_city);
        formData.append(`${prefix}[latitude]`, data.latitude);
        formData.append(`${prefix}[longitude]`, data.longitude);
        formData.append(`${prefix}[business_format]`, data.business_format);
        formData.append(`${prefix}[menu_design]`, data.menu_design);
        formData.append(`${prefix}[default_mode]`, data.default_mode);
        formData.append(`${prefix}[payment_time]`, data.payment_time);
        formData.append(`${prefix}[call_waiter]`, data.call_waiter);
        if (data.pricing_id) formData.append(`${prefix}[pricing_id]`, data.pricing_id);
        if (data.payment_method) formData.append(`${prefix}[payment_method]`, data.payment_method);
        if (data.discount_id) formData.append(`${prefix}[discount_id]`, data.discount_id);
      } catch (error) {
        throw new Error(`${prefix} missing required fields: ${error.message}`);
      }
    };

    try {
      apiBranches.forEach((branch) => {
        if (!branch.latitude || !branch.longitude) {
          throw new Error(`${branch.brunch} no latitude or longitude`);
        }
        appendBrunchData(branch.brunch, branch);
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
      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });


      if (response.status === 200 || response.status === 201) {
        const { payment_url } = response.data;
        toast.success(t(isUpdate ? "dataUpdatedSuccessfully" : "dataSavedSuccessfully"));
        if (payment_url) {
          sessionStorage.setItem("paymentUrl", payment_url);
        }
        navigate('/welcome');
      }
    } catch (error) {
      console.error('Network Error:', error);
      toast.error(error.response.data.error_details || error.response.data.message || t("errorWhileSavingData"));
    } finally {
      setIsLoading(false);
    }
  };

  // Language and User Popover Handlers
  const handleLanguageClick = (event) => {
    setAnchorElLanguage(event.currentTarget);
  };

  const handleLanguageClose = (language) => {
    i18n.changeLanguage(language);
    setAnchorElLanguage(null);
    setSelectedLanguage(language);
  };

  const handleUserClick = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleUserClose = () => {
    setAnchorElUser(null);
  };

  const getLanguageIcon = () => {
    return selectedLanguage === 'ar' ? (
      <span className="icon-translation" style={{ color: theme.palette.orangePrimary.main, fontSize: '22px' }} />
    ) : (
      <LanguageOutlined sx={{ color: theme.palette.orangePrimary.main, fontSize: '22px' }} />
    );
  };

  return (
    <Box sx={{ backgroundColor: 'white', height: '100%' }}>
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
            <BusinessInfo />
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
