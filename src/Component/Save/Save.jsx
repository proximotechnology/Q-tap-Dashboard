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
import { useBusinessContext } from '../../context/BusinessContext';
import { useTranslation } from 'react-i18next';
import Language from '../dashboard/TopBar/Language';
import { usePersonalContext } from '../../context/PersonalContext';
import { BASE_URL } from '../../utils/helperFunction';
import axios from 'axios';

export const Save = () => {
  const { businessData, branches, selectedBranch } = useBusinessContext();
  const { personalData, updatePersonalData } = usePersonalContext();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false)

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
    console.log('Loaded business data:', data);
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
    updatePersonalData(updatedData);
  };

  // Handle Save Button Click
  const handleSave = async () => {
    setIsLoading(true)
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
      return 1;
      // return currencyMap[country] || 1;
    };

    // Map serving ways to API format
    const getServingWays = (serving) => {
      return Array.isArray(serving) ? serving : [];
    };

    // Map payment methods to API format
    const getPaymentServices = (methods) => {
      return Array.isArray(methods) ? methods : [];
    };

    // Use workschedules directly
    const getWorkSchedules = (schedules) => {
      return schedules || {};
    };

    // Format branches for API
    const apiBranches = (branches.length > 0 ? branches : [businessData]).map((branch, index) => {
      console.log('Branch data for API:', branch);
      return {
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
        workschedules: getWorkSchedules(branch.workschedules),
        serving_ways: getServingWays(branch.servingWays),
        tables_number: parseInt(branch.tableCount) || 0,
        payment_services: getPaymentServices(branch.paymentMethods),
        business_name: branch.businessName?.trim() || '',
        business_country: branch.country || '',
        business_city: branch.city || '',
        latitude: '846.668848',
        longitude: '648.4684684',
        business_format: (branch.format || 'uk').toLowerCase(),
        menu_design: branch.design || 'grid',
        default_mode: branch.mode === 'white' || branch.mode === 'light' ? 'white' : 'dark',
        payment_time: branch.paymentTime || 'after',
        call_waiter: branch.callWaiter === 'active' ? 'active' : 'inactive',
      };
    });

    // Combine personal and business data
    const fullApiData = {
      name: personalData.fullName?.trim() || '',
      mobile: personalData.phone?.trim() || '',
      email: personalData.email?.trim().toLowerCase() || '',
      birth_date: personalData.year && personalData.month && personalData.day
        ? `${personalData.year}-${personalData.month}-${personalData.day}`
        : '',
      country: personalData.country || '',
      password: personalData.password || '1',
      user_type: 'qtap_clients',
      img: '',
      payment_method: personalData.payment_method,
      pricing_id: personalData.pricing_id,
      pricing_way: `${personalData.pricing_way}_price`,
      discount_id: personalData.discount_id,
      ...apiBranches.reduce((acc, branch, index) => {
        acc[`brunch${index + 1}`] = branch;
        return acc;
      }, {}),
    };

    console.log('Full API Data:', fullApiData);
    console.log('branch API Data:', branches);
    /*
    * section of body data
    * --------------------- 
    */

    const formData = new FormData();

    // Basic fields
    formData.append('name', 'al shaeb pizza');
    formData.append('mobile', '12345617');
    formData.append('email', 'testc21@gmail.com');
    formData.append('birth_date', '2000-1-1');
    formData.append('country', 'egypt');
    formData.append('password', '1');
    formData.append('user_type', 'qtap_clients');
    formData.append('affiliate_code', 'afe75752');
    formData.append('payment_method', 'wallet');
    formData.append('pricing_id', '1');
    formData.append('pricing_way', 'monthly_price');


    // Brunch helper
    const appendBrunchData = (prefix, data) => {
      // contact_info arrays
      // Object.entries(data.contact_info).forEach(([key, arr]) => {
      //   arr.forEach((value, i) => {
      //     formData.append(`${prefix}[contact_info][${key}][]`, value);
      //   });
      // });
      formData.append(`${prefix}[contact_info][website][]`, data.website);
      formData.append(`${prefix}[contact_info][business_phone][]`, data.businessPhone);
      formData.append(`${prefix}[contact_info][business_email][]`, data.businessEmail);

      formData.append(`${prefix}[contact_info][twitter][]`, "");
      formData.append(`${prefix}[contact_info][instagram][]`, "");
      formData.append(`${prefix}[contact_info][address][]`, "");
      formData.append(`${prefix}[contact_info][facebook][]`, "");
      // work schedule
      Object.entries(data.workschedules).forEach(([day, times]) => {
        times.forEach((time, i) => {
          formData.append(`${prefix}[workschedules][${day}][]`, time);
        });
      });

      // serving_ways
      data.servingWays.forEach(value => {
        formData.append(`${prefix}[serving_ways][]`, value);
      });

      // payment_services
      data.paymentMethods
        .forEach(value => {
          formData.append(`${prefix}[payment_services][]`, value);
        });

      // Other fields
      formData.append(`${prefix}[tables_number]`, data.tableCount || '');
      formData.append(`${prefix}[currency_id]`, 1);
      formData.append(`${prefix}[business_name]`, data.businessName);
      formData.append(`${prefix}[business_country]`, data.country);
      formData.append(`${prefix}[business_city]`, data.city);

      if (!data.latitude) { console.log("here the data",data.latitude);throw new Error(`${prefix} no latitude`) }
      if (!data.longitude) { throw new Error(`${prefix} no latitude`) }
      formData.append(`${prefix}[latitude]`, data.latitude);
      formData.append(`${prefix}[longitude]`, data.longitude);

      formData.append(`${prefix}[business_format]`, data.format);
      formData.append(`${prefix}[menu_design]`, data.design);
      formData.append(`${prefix}[default_mode]`, data.mode);
      formData.append(`${prefix}[payment_time]`, data.paymentTime);
      formData.append(`${prefix}[call_waiter]`, data.callWaiter);
      if (data.pricing_id) formData.append(`${prefix}[pricing_id]`, data.pricing_id);
      if (data.payment_method) formData.append(`${prefix}[payment_method]`, data.payment_method);
      if (data.discount_id) formData.append(`${prefix}[discount_id]`, data.discount_id);
      console.log(`${prefix}`, " ", data.latitude, " - ", data.longitude)
    };
    // Append brunch1 and brunch2
    try {
      branches.forEach((branch, index) => { appendBrunchData(`brunch${index + 1}`, branch); })
    } catch (error) {
      toast.error(`plz select position of  ${error.message}`);
      setIsLoading(false)
      return;
    }

    // Append image file (assuming it's stored in personalData.img and is a File object)
    if (personalData.img instanceof File) {
      formData.append("img", personalData.img);
    }

    // Send data to API

    try {

      const response = await fetch(`${BASE_URL}qtap_clients`, {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        body: formData,
      });
      const contentType = response.headers.get('content-type');
      console.log(contentType)

      const responseData = await response.json();
      console.log('API Response:', responseData);

      if (response.ok) {
        const { payment_url } = responseData;
        toast.success(t("dataSavedSuccessfully"));
        if (payment_url) {
          sessionStorage.setItem("paymentUrl", payment_url);
        }
        navigate('/welcome');
      } else {
        toast.error(responseData.message || t("errorWhileSavingData"));
      }
    } catch (error) {
      console.error('Network Error:', error);
      toast.error(t("NetworkError"));
    } finally {
      setIsLoading(false)
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
              '&:hover': { backgroundColor: '#ef7d10' },
            }}
            >
              {t("loading")}
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