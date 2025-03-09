
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
  Menu,
  MenuItem,
  Popover,
  Typography,
  Box,
} from '@mui/material';
import {
  HelpOutlineOutlined,
  KeyboardArrowDown,
  PersonOutlineOutlined,
  LanguageOutlined,
  CheckOutlined,
} from '@mui/icons-material';
import { PersonalInfo } from '../../Pages/Client/Row2/AddClient/PersonalInfo';
import { BusinessInfo } from '../../Pages/Client/Row2/AddClient/BusinessInfo';
import { usePersonalContext } from '../../context/PersonalContext';
import { useBusinessContext } from '../../context/BusinessContext';

export const Save = () => {
  const { businessData, updateBusinessData, branches, setBranches } = useBusinessContext();
  const { personalData, updatePersonalData } = usePersonalContext();
  const navigate = useNavigate();

  // Business Info State
  const [selectedBranch, setSelectedBranch] = useState(0); // Default to the first branch
  const [businessName, setBusinessName] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [businessCountry, setBusinessCountry] = useState('');
  const [businessCity, setBusinessCity] = useState('');
  const [currency, setCurrency] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [menuLanguage, setMenuLanguage] = useState('');
  const [tableCount, setTableCount] = useState('');
  const [mode, setMode] = useState('light');
  const [design, setDesign] = useState('grid');
  const [workingHours, setWorkingHours] = useState({
    selectedDays: ['Sa', 'Su'],
    currentDay: 'Sunday',
    fromTime: '9:00 am',
    toTime: '5:00 pm',
  });
  const [servingWays, setServingWays] = useState({
    dineIn: true,
    takeaway: true,
    delivery: false,
  });
  const [paymentMethods, setPaymentMethods] = useState({
    cash: true,
    digitalWallet: true,
    card: false,
  });
  const [paymentTime, setPaymentTime] = useState({
    beforeServing: true,
    afterServing: false,
  });
  const [selectedServingWays, setSelectedServingWays] = useState([]);

  // Language and User Popover State
  const [anchorElLanguage, setAnchorElLanguage] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [anchorElUser, setAnchorElUser] = useState(null);

  const openLanguage = Boolean(anchorElLanguage);
  const openUserPopover = Boolean(anchorElUser);

  // Load data from context when component mounts
  useEffect(() => {
    if (businessData) {
      setBusinessName(businessData.businessName || '');
      setBusinessPhone(businessData.businessPhone || '');
      setBusinessEmail(businessData.businessEmail || '');
      setBusinessCountry(businessData.country || '');
      setBusinessCity(businessData.city || '');
      setCurrency(businessData.currency || '');
      setBusinessType(businessData.format || '');
      setMenuLanguage(businessData.menuLanguage || '');
      setTableCount(businessData.tableCount || '');
      setMode(businessData.mode || 'light');
      setDesign(businessData.design || 'grid');
      setWorkingHours(businessData.workingHours || {
        selectedDays: ['Sa', 'Su'],
        currentDay: 'Sunday',
        fromTime: '9:00 am',
        toTime: '5:00 pm',
      });
      setServingWays(businessData.servingWays || {
        dineIn: true,
        takeaway: true,
        delivery: true,
      });
      setSelectedServingWays(businessData.selectedServingWays || []);
      setPaymentMethods(businessData.paymentMethods || {
        cash: true,
        digitalWallet: true,
        card: true,
      });
      setPaymentTime(businessData.paymentTime || {
        beforeServing: true,
        afterServing: true,
      });
    }
  }, [businessData]);

  // Handle Personal Info Changes
  const handlePersonalChange = (field, value) => {
    const updatedData = { ...personalData, [field]: value };
    updatePersonalData(updatedData);
    console.log('Updated Personal Data:', updatedData); // Debug log
  };

  // Handle Business Info Changes
  const handleBusinessChange = (field, value) => {
    if (selectedBranch !== null) {
      const updatedBranches = [...branches];
      updatedBranches[selectedBranch] = { ...updatedBranches[selectedBranch], [field]: value };
      setBranches(updatedBranches);
    } else {
      updateBusinessData({ [field]: value });
    }
  };

  // Handle Save Button Click
  const handleSave = async () => {
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
      return currencyMap[country] || 1;
    };

    // Format branches for API
    const apiData = branches.map((branch, index) => ({
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
      workschedules: {
        Saturday: ['9am', '7pm'],
        Sunday: ['9am', '7pm'],
        Monday: ['9am', '7pm'],
        Tuesday: ['9am', '7pm'],
        Wednesday: ['9am', '7pm'],
        Thursday: ['9am', '7pm'],
        Friday: ['9am', '7pm'],
      },
      serving_ways: [],
      tables_number: parseInt(branch.tableCount) || 0,
      pricing_id: 1,
      payment_services: [],
      discount_id: 1,
      business_name: branch.businessName?.trim() || '',
      business_country: branch.country || '',
      business_city: branch.city || '',
      latitude: '846.668848',
      longitude: '648.4684684',
      business_format: (branch.format || 'uk').toLowerCase(),
      payment_method: 'cash',
      menu_design: branch.design || 'grid',
      default_mode: branch.mode === 'light' ? 'white' : 'dark',
      payment_time: branch.paymentTime?.beforeServing ? 'before' : 'after',
      call_waiter: branch.callWaiter ? 'active' : 'inactive',
    }));

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
      ...apiData.reduce((acc, branch, index) => {
        acc[`brunch${index + 1}`] = branch;
        return acc;
      }, {}),
    };

    console.log('Full API Data:', fullApiData);

    // Validate data
    const validateData = (data) => {
      const errors = [];
      if (!data.name) errors.push('Full Name is required');
      if (!data.mobile) errors.push('Mobile number is required');
      if (!data.email) errors.push('Email is required');
      if (!data.birth_date) errors.push('Birth date is required');
      if (!data.country) errors.push('Country is required');
      if (!data.password) errors.push('Password is required');
      return errors;
    };

    const validationErrors = validateData(fullApiData);
    if (validationErrors.length > 0) {
      console.error('Validation Errors:', validationErrors);
      toast.error(validationErrors.join('\n'));
      return;
    }

    // Send data to API
    try {
      const response = await fetch('https://highleveltecknology.com/Qtap/api/qtap_clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(fullApiData),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success('Data saved successfully!');
        navigate('/welcome');
        console.log('API Response:', responseData);
      } else {
        console.error('API Error Response:', responseData);
        toast.error(responseData.message || 'An error occurred while saving data.');
      }
    } catch (error) {
      console.error('Network Error:', error);
      toast.error('Network error or server is not responding. Please try again later.');
    }
  };

  // Language and User Popover Handlers
  const handleLanguageClick = (event) => {
    setAnchorElLanguage(event.currentTarget);
  };

  const handleLanguageClose = (language) => {
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
      <span className="icon-translation" style={{ color: '#ef7d00', fontSize: '22px' }} />
    ) : (
      <LanguageOutlined sx={{ color: '#ef7d00', fontSize: '22px' }} />
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
          {/* Language Selector */}
          <Box
            sx={{ cursor: 'pointer', display: 'flex', marginRight: '20px', alignItems: 'center' }}
            onClick={handleLanguageClick}
          >
            {getLanguageIcon()}
            <KeyboardArrowDown sx={{ fontSize: '18px', color: '#575756' }} />
            <Menu
              anchorEl={anchorElLanguage}
              open={openLanguage}
              onClose={() => setAnchorElLanguage(null)}
              sx={{ padding: '2px' }}
            >
              <MenuItem onClick={() => handleLanguageClose('ar')}>
                <span
                  className="icon-translation"
                  style={{ color: '#575756', marginRight: '8px', fontSize: '20px' }}
                />
                <span style={{ fontSize: '12px', color: '#575756' }}>Arabic</span>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => handleLanguageClose('en')}>
                <LanguageOutlined sx={{ color: '#575756', marginRight: '8px', fontSize: '20px' }} />
                <span style={{ fontSize: '12px', color: '#575756' }}>English</span>
              </MenuItem>
            </Menu>
          </Box>

          {/* User Popover */}
          <Box
            aria-describedby={openUserPopover ? 'simple-popover' : undefined}
            onClick={handleUserClick}
            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
          >
            <IconButton
              color="inherit"
              sx={{
                backgroundColor: '#ef7d00',
                borderRadius: '30%',
                padding: '5px',
                '&:hover': {
                  backgroundColor: '#ef7d00',
                },
              }}
            >
              <PersonOutlineOutlined sx={{ fontSize: '20px', color: 'white' }} />
            </IconButton>
            <Typography variant="body1" sx={{ fontSize: '13px', color: '#575756' }}>
              User01
            </Typography>
            <KeyboardArrowDown sx={{ fontSize: '18px', color: '#575756' }} />
          </Box>
          <Popover
            id={openUserPopover ? 'simple-popover' : undefined}
            open={openUserPopover}
            anchorEl={anchorElUser}
            onClose={handleUserClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Box sx={{ width: 200, padding: '10px' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginBottom: '20px',
                  gap: '10px',
                }}
              >
                <Avatar sx={{ bgcolor: '#ef7d00', width: 40, height: 40 }}>
                  <PersonOutlineOutlined sx={{ fontSize: '22px' }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontSize: '14px' }}>
                    User01
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '12px' }} color="textSecondary">
                    Mail@mail.com
                  </Typography>
                </Box>
              </Box>
              <Divider />

              <List>
                <Box
                  onClick={() => navigate('/')}
                  sx={{
                    cursor: 'pointer',
                    backgroundColor: '#222240',
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
                  <span
                    className="icon-home-icon-silhouette"
                    style={{ color: '#ef7d00', marginRight: '5px', fontSize: '15px' }}
                  />
                  <span style={{ color: 'white', fontSize: '12px', textTransform: 'capitalize' }}>
                    Home
                  </span>
                </Box>

                <ListItem sx={{ cursor: 'pointer' }} onClick={handleUserClose}>
                  <ListItemIcon>
                    <img src="/assets/setting.svg" alt="icon" style={{ width: '16px', height: '16px' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Edit Profile"
                    primaryTypographyProps={{
                      sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: '-30px' },
                    }}
                  />
                </ListItem>

                <ListItem sx={{ cursor: 'pointer' }} onClick={handleUserClose}>
                  <ListItemIcon>
                    <span className="icon-price-tag" style={{ fontSize: '20px' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="My Subscription"
                    primaryTypographyProps={{
                      sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: '-30px' },
                    }}
                  />
                </ListItem>

                <ListItem sx={{ cursor: 'pointer' }} onClick={handleUserClose}>
                  <ListItemIcon>
                    <HelpOutlineOutlined sx={{ fontSize: '20px' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="FAQ"
                    primaryTypographyProps={{
                      sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: '-30px' },
                    }}
                  />
                </ListItem>

                <ListItem sx={{ cursor: 'pointer' }} onClick={handleUserClose}>
                  <ListItemIcon>
                    <img src="/assets/logout.svg" alt="icon" style={{ width: '16px', height: '16px' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Logout"
                    primaryTypographyProps={{
                      sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: '-30px' },
                    }}
                  />
                </ListItem>
              </List>
            </Box>
          </Popover>
        </Box>
      </Box>

      {/* Divider */}
      <Divider sx={{ backgroundColor: '#ef7d00', borderBottom: 'none', width: '100%', height: '3px' }} />

      {/* Main Content */}
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={12} md={5}>
            <PersonalInfo personalData={personalData} onInputChange={handlePersonalChange} />
          </Grid>

          <Box item sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Divider
              orientation="vertical"
              sx={{ backgroundColor: '#f4f6fc', width: '1px', marginTop: '30px', height: '90%' }}
            />
          </Box>

          <Grid item xs={12} md={6}>
            <BusinessInfo businessData={businessData} onInputChange={handleBusinessChange} />
          </Grid>
        </Grid>

        {/* Save Button */}
        <Grid container justifyContent="center" sx={{ marginTop: 3 }}>
          <Button
            onClick={handleSave}
            sx={{
              width: '160px',
              textTransform: 'capitalize',
              backgroundColor: '#ef7d00',
              color: 'white',
              borderRadius: '20px',
              padding: '5px',
              '&:hover': {
                backgroundColor: '#ef7d10',
              },
            }}
          >
            <CheckOutlined sx={{ fontSize: '22px', mr: 1 }} /> Saved
          </Button>
        </Grid>
      </Box>
    </Box>
  );
};