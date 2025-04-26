// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router';
// import { toast } from 'react-toastify';
// import {
//   Avatar,
//   Button,
//   Divider,
//   Grid,
//   IconButton,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Menu,
//   MenuItem,
//   Popover,
//   Typography,
//   Box,
//   useTheme,
// } from '@mui/material';
// import {
//   HelpOutlineOutlined,
//   KeyboardArrowDown,
//   PersonOutlineOutlined,
//   LanguageOutlined,
//   CheckOutlined,
// } from '@mui/icons-material';
// import { PersonalInfo } from '../../Pages/Client/Row2/AddClient/PersonalInfo';
// import { BusinessInfo } from '../../Pages/Client/Row2/AddClient/BusinessInfo';
// import { usePersonalContext } from '../../context/PersonalContext';
// import { useBusinessContext } from '../../context/BusinessContext';
// import { useTranslation } from 'react-i18next';
// import Language from '../dashboard/TopBar/Language';

// export const Save = () => {
//   const { businessData, updateBusinessData, branches, setBranches } = useBusinessContext();
//   const { personalData, updatePersonalData } = usePersonalContext();
//   const navigate = useNavigate();

//   // Business Info State
//   const [selectedBranch, setSelectedBranch] = useState(0);
//   const [businessName, setBusinessName] = useState('');
//   const [businessPhone, setBusinessPhone] = useState('');
//   const [businessEmail, setBusinessEmail] = useState('');
//   const [businessCountry, setBusinessCountry] = useState('');
//   const [businessCity, setBusinessCity] = useState('');
//   const [currency, setCurrency] = useState('');
//   const [businessType, setBusinessType] = useState('');
//   const [menuLanguage, setMenuLanguage] = useState('');
//   const [tableCount, setTableCount] = useState('');
//   const [mode, setMode] = useState('white');
//   const [design, setDesign] = useState('grid');
//   const { t, i18n } = useTranslation()
//   const theme = useTheme();

//   const [workingHours, setWorkingHours] = useState({
//     selectedDays: ['Sa', 'Su'],
//     currentDay: 'Sunday',
//     fromTime: '9:00 am',
//     toTime: '5:00 pm',
//   });
//   const [servingWays, setServingWays] = useState({
//     dineIn: true,
//     takeaway: true,
//     delivery: false,
//   });
//   const [paymentMethods, setPaymentMethods] = useState({
//     cash: true,
//     digitalWallet: true,
//     card: false,
//   });
//   const [paymentTime, setPaymentTime] = useState({
//     beforeServing: true,
//     afterServing: false,
//   });
//   const [selectedServingWays, setSelectedServingWays] = useState([]);

//   // Language and User Popover State
//   const [anchorElLanguage, setAnchorElLanguage] = useState(null);
//   const [selectedLanguage, setSelectedLanguage] = useState('en');
//   const [anchorElUser, setAnchorElUser] = useState(null);

//   const openLanguage = Boolean(anchorElLanguage);
//   const openUserPopover = Boolean(anchorElUser);

//   // Load data from context when component mounts
//   useEffect(() => {
//     if (businessData) {
//       setBusinessName(businessData.businessName || '');
//       setBusinessPhone(businessData.businessPhone || '');
//       setBusinessEmail(businessData.businessEmail || '');
//       setBusinessCountry(businessData.country || '');
//       setBusinessCity(businessData.city || '');
//       setCurrency(businessData.currency || '');
//       setBusinessType(businessData.format || '');
//       setMenuLanguage(businessData.menuLanguage || '');
//       setTableCount(businessData.tableCount || '');
//       setMode(businessData.mode || 'white');
//       setDesign(businessData.design || 'grid');
//       setWorkingHours(businessData.workingHours || {
//         selectedDays: ['Sa', 'Su'],
//         currentDay: 'Sunday',
//         fromTime: '9:00 am',
//         toTime: '5:00 pm',
//       });
//       setServingWays(businessData.servingWays || {
//         dineIn: true,
//         takeaway: true,
//         delivery: false,
//       });
//       setSelectedServingWays(businessData.selectedServingWays || []);
//       setPaymentMethods(businessData.paymentMethods || {
//         cash: true,
//         digitalWallet: true,
//         card: false,
//       });
//       setPaymentTime(businessData.paymentTime || {
//         beforeServing: true,
//         afterServing: false,
//       });
//     }
//   }, [businessData]);
//   console.log("business data in save page" , businessData);


//   // Handle Personal Info Changes
//   const handlePersonalChange = (field, value) => {
//     const updatedData = { ...personalData, [field]: value };
//     updatePersonalData(updatedData);
//   };

//   // Handle Business Info Changes
//   const handleBusinessChange = (field, value) => {
//     if (selectedBranch !== null) {
//       const updatedBranches = [...branches];
//       updatedBranches[selectedBranch] = { ...updatedBranches[selectedBranch], [field]: value };
//       setBranches(updatedBranches);
//     } else {
//       updateBusinessData({ [field]: value });
//     }
//   };

//   // Handle Save Button Click
//   const handleSave = async () => {
//     const getCurrencyId = (country) => {
//       const currencyMap = {
//         US: 1,
//         UK: 2,
//         EU: 3,
//         egypt: 4,
//         EG: 4,
//         UAE: 5,
//         SA: 6,
//       };
//       return currencyMap[country] || 1;
//     };

//     // Map serving ways to API format
//     const getServingWays = (serving) => {
//       const ways = [];
//       if (serving.dineIn) ways.push('dine_in');
//       if (serving.takeaway) ways.push('take_away');
//       if (serving.delivery) ways.push('delivery');
//       return ways;
//     };

//     // Map payment methods to API format
//     const getPaymentServices = (methods) => {
//       const services = [];
//       if (methods.cash) services.push('cash');
//       if (methods.digitalWallet) services.push('wallet');
//       if (methods.card) services.push('card');
//       return services;
//     };

//     // Format branches for API
//     const apiBranches = branches.map((branch, index) => ({
//       brunch: `brunch${index + 1}`,
//       contact_info: {
//         business_phone: [branch.businessPhone?.trim() || ''],
//         business_email: [branch.businessEmail?.trim() || ''],
//         facebook: [''],
//         twitter: [''],
//         instagram: [''],
//         address: [''],
//         website: [branch.website?.trim() || ''],
//       },
//       currency_id: getCurrencyId(branch.country),
//       workschedules: {
//         Saturday: ['9am', '7pm'],
//         Sunday: ['9am', '7pm'],
//         Monday: ['9am', '7pm'],
//         Tuesday: ['9am', '7pm'],
//         Wednesday: ['9am', '7pm'],
//         Thursday: ['9am', '7pm'],
//         Friday: ['9am', '7pm'],
//       },
//       serving_ways: getServingWays(branch.servingWays || servingWays),
//       tables_number: parseInt(branch.tableCount) || 0,
//       payment_services: getPaymentServices(branch.paymentMethods || paymentMethods),
//       business_name: branch.businessName?.trim() || '',
//       business_country: branch.country || '',
//       business_city: branch.city || '',
//       latitude: '846.668848',
//       longitude: '648.4684684',
//       business_format: (branch.format || 'uk').toLowerCase(),
//       menu_design: branch.design || 'grid',
//       default_mode: branch.mode === 'white' ? 'white' : 'dark',
//       payment_time: branch.paymentTime?.beforeServing ? 'before' : 'after',
//       call_waiter: branch.callWaiter ? 'active' : 'inactive',
//     }));

//     // Combine personal and business data
//     const fullApiData = {
//       name: personalData.fullName?.trim() || '',
//       mobile: personalData.phone?.trim() || '',
//       email: personalData.email?.trim().toLowerCase() || '',
//       birth_date: personalData.year && personalData.month && personalData.day
//         ? `${personalData.year}-${personalData.month}-${personalData.day}`
//         : '',
//       country: personalData.country || '',
//       password: personalData.password || '1',
//       user_type: 'qtap_clients',
//       img: '',
//       payment_method: personalData.payment_method, // Root-level payment method
//       pricing_id: personalData.pricing_id, // Root-level pricing ID
//       pricing_way: `${personalData.pricing_way}_price`, // Root-level pricing way
//       discount_id: personalData.discount_id, // Root-level discount ID
//       ...apiBranches.reduce((acc, branch, index) => {
//         acc[`brunch${index + 1}`] = branch;
//         return acc;
//       }, {}),
//     };

//     console.log('Full API Data:', fullApiData);

//     // Validate data
//     const validateData = (data) => {
//       const errors = [];
//       if (!data.name) errors.push(t("fullNameRequired"));
//       if (!data.mobile) errors.push(t("mobileRequired"));
//       if (!data.email) errors.push(t("emailRequired"));
//       if (!data.birth_date) errors.push(t("birthRequired"));
//       if (!data.country) errors.push(t("countryRequired"));
//       if (!data.password) errors.push(t("passwordRequired"));
//       if (!data.pricing_id) errors.push('Pricing ID is required');
//       if (!data.pricing_way) errors.push('Pricing way is required');
//       return errors;
//     };

//     const validationErrors = validateData(fullApiData);
//     if (validationErrors.length > 0) {
//       console.error('Validation Errors:', validationErrors);
//       toast.error(validationErrors.join('\n'));
//       return;
//     }

//     // Send data to API
//     try {
//       const response = await fetch('https://highleveltecknology.com/Qtap/api/qtap_clients', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(fullApiData),
//       });

//       const responseData = await response.json();
//       console.log('API Response:', responseData);

//       if (response.ok) {
//         const { payment_url } = responseData; // Ensure payment_url is extracted from the API response
//         toast.success(t("dataSavedSuccessfully"));
//         if (payment_url) {
//           sessionStorage.setItem("paymentUrl", payment_url);
//         }
//         navigate('/welcome');
//       } else {
//         // console.error('API Error Response:', responseData);
//         toast.error(t("errorWhileSavingData"));
//         // toast.error(responseData.message || t("errorWhileSavingData"));
//       }
//     } catch (error) {
//       console.error('Network Error:', error);
//       toast.error(t("NetworkError"));
//     }
//   };

//   // Language and User Popover Handlers
//   const handleLanguageClick = (event) => {
//     setAnchorElLanguage(event.currentTarget);
//   };

//   const handleLanguageClose = (language) => {
//     i18n.changeLanguage(language)
//     setAnchorElLanguage(null);
//     setSelectedLanguage(language);
//   };

//   const handleUserClick = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleUserClose = () => {
//     setAnchorElUser(null);
//   };

//   const getLanguageIcon = () => {
//     return selectedLanguage === 'ar' ? (
//       <span className="icon-translation" style={{ color: theme.palette.orangePrimary.main, fontSize: '22px' }} />
//     ) : (
//       <LanguageOutlined sx={{ color: theme.palette.orangePrimary.main, fontSize: '22px' }} />
//     );
//   };

//   return (
//     <Box sx={{ backgroundColor: 'white', height: '100%' }}>
//       {/* Header */}
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'row',
//           alignItems: 'center',
//           padding: '0px 60px',
//           justifyContent: 'space-between',
//           width: '90%',
//           height: '70px',
//         }}
//       >
//         <Box>
//           <img src="/images/qtap.PNG" alt="logo" width="140px" />
//         </Box>

//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <Language/>

//           <Box
//             aria-describedby={openUserPopover ? 'simple-popover' : undefined}
//             onClick={handleUserClick}
//             sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
//           >
//             <IconButton
//               color="inherit"
//               sx={{
//                 backgroundColor: theme.palette.orangePrimary.main,
//                 borderRadius: '30%',
//                 padding: '5px',
//                 '&:hover': { backgroundColor: theme.palette.orangePrimary.main },
//               }}
//             >
//               <PersonOutlineOutlined sx={{ fontSize: '20px', color: 'white' }} />
//             </IconButton>
//             <Typography variant="body1" sx={{ fontSize: '13px', color: '#575756' }}>
//               User01
//             </Typography>
//             <KeyboardArrowDown sx={{ fontSize: '18px', color: '#575756' }} />
//           </Box>
//           <Popover
//             id={openUserPopover ? 'simple-popover' : undefined}
//             open={openUserPopover}
//             anchorEl={anchorElUser}
//             onClose={handleUserClose}
//             anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
//           >
//             <Box sx={{ width: 200, padding: '10px' }}>
//               <Box
//                 sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: '20px', gap: '10px' }}
//               >
//                 <Avatar sx={{ bgcolor: theme.palette.orangePrimary.main, width: 40, height: 40 }}>
//                   <PersonOutlineOutlined sx={{ fontSize: '22px' }} />
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h6" sx={{ fontSize: '14px' }}>User01</Typography>
//                   <Typography variant="body2" sx={{ fontSize: '12px' }} color="textSecondary">
//                     Mail@mail.com
//                   </Typography>
//                 </Box>
//               </Box>
//               <Divider />
//               <List>
//                 <Box
//                   onClick={() => navigate('/')}
//                   sx={{
//                     cursor: 'pointer',
//                     backgroundColor: theme.palette.secondaryColor.main,
//                     color: 'white',
//                     marginBottom: '10px',
//                     borderRadius: '30px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     textAlign: 'center',
//                     justifyContent: 'center',
//                     width: '80%',
//                     padding: '5px 0px',
//                     margin: '0 auto',
//                   }}
//                 >
//                   <span className="icon-home-icon-silhouette" style={{ color: theme.palette.orangePrimary.main, marginRight: '5px', fontSize: '15px' }} />
//                   <span style={{ color: 'white', fontSize: '12px', textTransform: 'capitalize' }}>{t("home")}</span>
//                 </Box>
//                 <ListItem sx={{ cursor: 'pointer' }} onClick={handleUserClose}>
//                   <ListItemIcon>
//                     <img src="/assets/setting.svg" alt="icon" style={{ width: '16px', height: '16px' }} />
//                   </ListItemIcon>
//                   <ListItemText
//                     primary="Edit Profile"
//                     primaryTypographyProps={{ sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: '-30px' } }}
//                   />
//                 </ListItem>
//                 <ListItem sx={{ cursor: 'pointer' }} onClick={handleUserClose}>
//                   <ListItemIcon>
//                     <span className="icon-price-tag" style={{ fontSize: '20px' }} />
//                   </ListItemIcon>
//                   <ListItemText
//                     primary="My Subscription"
//                     primaryTypographyProps={{ sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: '-30px' } }}
//                   />
//                 </ListItem>
//                 <ListItem sx={{ cursor: 'pointer' }} onClick={handleUserClose}>
//                   <ListItemIcon>
//                     <HelpOutlineOutlined sx={{ fontSize: '20px' }} />
//                   </ListItemIcon>
//                   <ListItemText
//                     primary="FAQ"
//                     primaryTypographyProps={{ sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: '-30px' } }}
//                   />
//                 </ListItem>
//                 <ListItem sx={{ cursor: 'pointer' }} onClick={handleUserClose}>
//                   <ListItemIcon>
//                     <img src="/assets/logout.svg" alt="icon" style={{ width: '16px', height: '16px' }} />
//                   </ListItemIcon>
//                   <ListItemText
//                     primary="Logout"
//                     primaryTypographyProps={{ sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: '-30px' } }}
//                   />
//                 </ListItem>
//               </List>
//             </Box>
//           </Popover>
//         </Box>
//       </Box>

//       <Divider sx={{ backgroundColor: theme.palette.orangePrimary.main, borderBottom: 'none', width: '100%', height: '3px' }} />

//       <Box>
//         <Grid container spacing={1}>
//           <Grid item xs={12} md={5}>
//             <PersonalInfo personalData={personalData} onInputChange={handlePersonalChange} />
//           </Grid>
//           <Box item sx={{ display: { xs: 'none', sm: 'block' } }}>
//             <Divider orientation="vertical" sx={{ backgroundColor: '#f4f6fc', width: '1px', marginTop: '30px', height: '90%' }} />
//           </Box>
//           <Grid item xs={12} md={6}>
//             <BusinessInfo businessData={businessData} onInputChange={handleBusinessChange} />
//           </Grid>
//         </Grid>

//         <Grid container justifyContent="center" sx={{ marginTop: 3 }}>
//           <Button
//             onClick={handleSave}
//             sx={{
//               width: '160px',
//               textTransform: 'capitalize',
//               backgroundColor: theme.palette.orangePrimary.main,
//               color: 'white',
//               borderRadius: '20px',
//               padding: '5px',
//               '&:hover': { backgroundColor: '#ef7d10' },
//             }}
//           >
//             <CheckOutlined sx={{ fontSize: '22px', mr: 1 }} /> {t("save")}
//           </Button>
//         </Grid>
//       </Box>
//     </Box >
//   );
// };



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

export const Save = () => {
  const { businessData, branches, selectedBranch, updateBusinessData, selectBranch } = useBusinessContext();
  const { personalData, updatePersonalData } = usePersonalContext();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const theme = useTheme();

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
  const [workingHours, setWorkingHours] = useState({
    selectedDays: ['Sa', 'Su'],
    currentDay: 'Sunday',
    fromTime: '9:00 am',
    toTime: '5:00 pm',
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
      setBusinessType(data.businessType || '');
      setMenuLanguage(data.menuLanguage || '');
      setTableCount(data.tableCount || '');
      setMode(data.mode || 'white');
      setDesign(data.design || 'grid');
      setWorkingHours(data.workingHours || {
        selectedDays: ['Sa', 'Su'],
        currentDay: 'Sunday',
        fromTime: '9:00 am',
        toTime: '5:00 pm',
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
  }, [businessData, branches, selectedBranch , personalData]);

  // Handle Business Info Changes
  const handleBusinessChange = (field, value) => {
    if (selectedBranch !== null) {
      selectBranch(selectedBranch);
    }
    updateBusinessData({ [field]: value });
  };


  // Handle Personal Info Changes
  const handlePersonalChange = (field, value) => {
    const updatedData = { ...personalData, [field]: value };
    updatePersonalData(updatedData);
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
      // return currencyMap[country] || 1;
      return  1;
    };

    // Map serving ways to API format (already an array)
    const getServingWays = (serving) => {
      return Array.isArray(serving) ? serving : [];
    };

    // Map payment methods to API format (already an array)
    const getPaymentServices = (methods) => {
      return Array.isArray(methods) ? methods : [];
    };

    // Map working hours to API format
    const getWorkSchedules = (hours) => {
      const daysMap = {
        Sa: 'Saturday',
        Su: 'Sunday',
        Mo: 'Monday',
        Tu: 'Tuesday',
        We: 'Wednesday',
        Th: 'Thursday',
        Fr: 'Friday',
      };
      const schedules = {};
      (hours?.selectedDays || []).forEach((day) => {
        const fullDay = daysMap[day];
        schedules[fullDay] = [hours.fromTime || '9:00 am', hours.toTime || '5:00 pm'];
      });
      return schedules;
    };

    // Format branches for API
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
      workschedules: getWorkSchedules(branch.workingHours || workingHours),
      serving_ways: getServingWays(branch.servingWays || servingWays),
      tables_number: parseInt(branch.tableCount) || 0,
      payment_services: getPaymentServices(branch.paymentMethods || paymentMethods),
      business_name: branch.businessName?.trim() || '',
      business_country: branch.country || '',
      business_city: branch.city || '',
      latitude: '846.668848',
      longitude: '648.4684684',
      business_format: (branch.businessType || 'uk').toLowerCase(),
      menu_design: branch.design || 'grid',
      default_mode: branch.mode === 'white' || branch.mode === 'light' ? 'white' : 'dark',
      payment_time: branch.paymentTime || 'after',
      call_waiter: branch.callWaiter === 'active' ? 'active' : 'inactive',
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
      payment_method: personalData.payment_method, // Root-level payment method
      pricing_id: personalData.pricing_id, // Root-level pricing ID
      pricing_way: `${personalData.pricing_way}_price`, // Root-level pricing way
      discount_id: personalData.discount_id, // Root-level discount ID
      ...apiBranches.reduce((acc, branch, index) => {
      acc[`brunch${index + 1}`] = branch;
      return acc;
      }, {}),
    };

    console.log('Full API Data:', fullApiData);

    // Send data to API
    try {
      const response = await fetch('https://highleveltecknology.com/Qtap/api/qtap_clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fullApiData),
      });

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
        <Grid container spacing={1}>
          <Grid item xs={12} md={5}>
            {/* <PersonalInfo /> */}
            <PersonalInfo personalData={personalData} onInputChange={handlePersonalChange} />

          </Grid>
          <Box item sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Divider orientation="vertical" sx={{ backgroundColor: '#f4f6fc', width: '1px', marginTop: '30px', height: '90%' }} />
          </Box>
          <Grid item xs={12} md={6}>
            <BusinessInfo />
          </Grid>
        </Grid>

        <Grid container justifyContent="center" sx={{ marginTop: 3 }}>
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
          >
            <CheckOutlined sx={{ fontSize: '22px', mr: 1 }} /> {t("save")}
          </Button>
        </Grid>
      </Box>
    </Box>
  );
};

export default Save;