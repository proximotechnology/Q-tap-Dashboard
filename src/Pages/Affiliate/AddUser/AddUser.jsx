// import { Avatar, Button, Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Popover, Typography, Alert, Snackbar, CircularProgress } from '@mui/material'
// import { Box } from '@mui/system'
// import React, { useState } from 'react'
// import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
// import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
// import { useNavigate } from "react-router";
// import { PersonalInfo } from './PersonalInfo';
// import { PaymentInfo } from './PaymentInfo';
// import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
// import axios from 'axios';
// import { toast } from 'react-toastify';


// export const AddUsers = () => {
//     const navigate = useNavigate();

//     // Personal Info States
//     const [fullName, setFullName] = useState('');
//     const [phone, setPhone] = useState('');
//     const [email, setEmail] = useState('');
//     const [month, setMonth] = useState('');
//     const [day, setDay] = useState('');
//     const [year, setYear] = useState('');
//     const [country, setCountry] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [selectedOption, setSelectedOption] = useState('');

//     // Payment Info States
//     const [bankName, setBankName] = useState('');
//     const [accountNumber, setAccountNumber] = useState('');
//     const [accountName, setAccountName] = useState('');
//     const [paymentOption, setPaymentOption] = useState('Bank');

//     // Language and User States (existing)
//     const [anchorElLanguage, setAnchorElLanguage] = useState(null);
//     const [selectedLanguage, setSelectedLanguage] = useState('en');
//     const [anchorElUser, setAnchorElUser] = useState(null);
//     const openLanguage = Boolean(anchorElLanguage);

//     // Add error states
//     const [errors, setErrors] = useState({});
//     const [openSnackbar, setOpenSnackbar] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [snackbarSeverity, setSnackbarSeverity] = useState('error');
//     const [loading, setLoading] = useState(false);

//     const handleLanguageClick = (event) => {
//         setAnchorElLanguage(event.currentTarget);
//     };

//     const handleLanguageClose = (language) => {
//         setAnchorElLanguage(null);
//         setSelectedLanguage(language);
//     };
//     const handlePrint = () => {
//         window.print();
//     };
//     const getLanguageIcon = () => {
//         return selectedLanguage === 'ar' ? <span class="icon-translation" style={{ color: "#ef7d00", fontSize: "22px" }}> </span>
//             : <LanguageOutlinedIcon sx={{ color: "#ef7d00", fontSize: "22px" }} />;
//     };
//     const openUserPopover = Boolean(anchorElUser);

//     const handleUserClick = (event) => {
//         setAnchorElUser(event.currentTarget);
//     };

//     const handleUserClose = () => {
//         setAnchorElUser(null);
//     };

//     const validateForm = () => {
//         const newErrors = {};

//         // Personal Info Validation
//         if (!fullName.trim()) newErrors.fullName = 'Full name is required';
//         if (!phone.trim()) newErrors.phone = 'Phone number is required';
//         if (!email.trim()) {
//             newErrors.email = 'Email is required';
//         } else if (!/\S+@\S+\.\S+/.test(email)) {
//             newErrors.email = 'Email is invalid';
//         }

//         // Date Validation
//         if (!day || !month || !year) {
//             newErrors.birthDate = 'Birth date is required';
//         }

//         if (!country) newErrors.country = 'Country is required';

//         // Password Validation
//         if (!password) {
//             newErrors.password = 'Password is required';
//         }

//         if (password !== confirmPassword) {
//             newErrors.confirmPassword = 'Passwords do not match';
//         }

//         // Payment Info Validation
//         if (!bankName.trim()) newErrors.bankName = 'Bank name is required';
//         if (!accountNumber.trim()) newErrors.accountNumber = 'Account number is required';
//         if (!accountName.trim()) newErrors.accountName = 'Account name is required';

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const showMessage = (message, severity = 'error') => {
//         setSnackbarMessage(message);
//         setSnackbarSeverity(severity);
//         setOpenSnackbar(true);
//     };

//     const handleSubmit = async () => {
//         if (!validateForm()) {
//             showMessage('Please fill in all required fields correctly');
//             return;
//         }

//         setLoading(true);
//         try {
//             const formData = new FormData();

//             // Personal Info
//             formData.append('name', fullName);
//             formData.append('mobile', phone);
//             formData.append('email', email);
//             formData.append('birth_date', `${year}-${month}-${day}`);
//             formData.append('country', country);
//             formData.append('password', password);
//             formData.append('user_type', 'qtap_affiliates');

//             if (selectedImage) {
//                 formData.append('img', selectedImage);
//             }

//             // Convert payment option to expected API value
//             let paymentWayValue;
//             switch (paymentOption) {
//                 case 'Bank':
//                     paymentWayValue = 'bank_account';
//                     break;
//                 case 'D.Wallet':
//                     paymentWayValue = 'digital_wallet';
//                     break;
//                 case 'Card':
//                     paymentWayValue = 'card';
//                     break;
//                 default:
//                     paymentWayValue = 'bank_account';
//             }

//             // Payment Info
//             formData.append('payment_way', paymentWayValue);
//             formData.append('bank_name', bankName);
//             formData.append('bank_account_number', accountNumber);
//             formData.append('bank_account_name', accountName);

//             const response = await axios.post(
//                 'https://highleveltecknology.com/Qtap/api/add_qtap_affiliate',
//                 formData,
//                 {
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                         'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
//                     }
//                 }
//             );

//             if (response.data.status === 'success') {
//                 showMessage('User added successfully', 'success');
//                 navigate('/affiliate');
//                 toast.success(response.data.message);
//                 console.log("response data", response);
//             } else {
//                 showMessage(response.data.message || 'Error adding user');
//                 toast.error(response.data.message);
//                 console.log("response data err", response);

//             }
//         } catch (error) {
//             const errorMessage = error.response?.data?.message || 'Error adding user';
//             showMessage(errorMessage);
//             toast.error("Error adding user", errorMessage);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Box sx={{ backgroundColor: "white", height: "100%" }}>
//             <Box
//                 sx={{
//                     display: "flex",
//                     flexDirection: "row",
//                     alignItems: "center",
//                     padding: "0px 60px",
//                     justifyContent: "space-between",
//                     width: "90%",
//                     height: "70px",
//                 }}>
//                 <Box>
//                     <img src="/images/qtap.PNG" alt='logo' width={"140px"} />
//                 </Box>

//                 <Box sx={{ display: "flex", alignItems: "center" }} >
//                     <Box sx={{ cursor: "pointer", display: "flex", marginRight: "20px", alignItems: "center" }}
//                         onClick={handleLanguageClick}>
//                         {getLanguageIcon()}
//                         <KeyboardArrowDownIcon sx={{ fontSize: "18px", color: "#575756" }} />
//                         <Menu
//                             anchorEl={anchorElLanguage}
//                             open={openLanguage}
//                             onClose={() => setAnchorElLanguage(null)}
//                             sx={{ padding: "2px" }}
//                         >
//                             <MenuItem onClick={() => handleLanguageClose('ar')}>
//                                 <span class="icon-translation" style={{ color: "#575756", marginRight: '8px', fontSize: "20px" }}></span>
//                                 <span style={{ fontSize: "12px", color: "#575756" }}>Arabic</span>
//                             </MenuItem>
//                             <Divider />
//                             <MenuItem onClick={() => handleLanguageClose('en')}>
//                                 <LanguageOutlinedIcon sx={{ color: "#575756", marginRight: '8px', fontSize: "20px" }} />
//                                 <span style={{ fontSize: "12px", color: "#575756" }}>English</span>
//                             </MenuItem>
//                         </Menu>
//                     </Box>

//                     <Box
//                         aria-describedby={openUserPopover ? 'simple-popover' : undefined}
//                         onClick={handleUserClick}
//                         sx={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "3px" }}>
//                         <IconButton color="inherit" sx={{
//                             backgroundColor: '#ef7d00', borderRadius: '30%', padding: '5px',
//                             '&:hover': {
//                                 backgroundColor: '#ef7d00',
//                             }
//                         }}>
//                             <PersonOutlineOutlinedIcon sx={{ fontSize: "20px", color: "white" }} />
//                         </IconButton>
//                         <Typography variant="body1" sx={{ fontSize: "13px", color: "#575756" }}>User01</Typography>
//                         <KeyboardArrowDownIcon sx={{ fontSize: "18px", color: "#575756" }} />
//                     </Box>
//                     <Popover
//                         id={openUserPopover ? 'simple-popover' : undefined}
//                         open={openUserPopover}
//                         anchorEl={anchorElUser}
//                         onClose={handleUserClose}
//                         anchorOrigin={{
//                             vertical: 'bottom',
//                             horizontal: 'left',
//                         }}
//                     >
//                         <Box sx={{ width: 200, padding: '10px' }}>
//                             <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: '20px', gap: '10px' }}>
//                                 <Avatar sx={{ bgcolor: '#ef7d00', width: 40, height: 40 }}>
//                                     <PersonOutlineOutlinedIcon sx={{ fontSize: "22px" }} />
//                                 </Avatar>
//                                 <Box>
//                                     <Typography variant="h6" sx={{ fontSize: "14px" }}>User01</Typography>
//                                     <Typography variant="body2" sx={{ fontSize: "12px" }} color="textSecondary">Mail@mail.com</Typography>
//                                 </Box>
//                             </Box>
//                             <Divider />

//                             <List>
//                                 <Box
//                                     onClick={() => navigate('/')}
//                                     sx={{
//                                         cursor: "pointer",
//                                         backgroundColor: "#222240",
//                                         color: "white",
//                                         marginBottom: "10px",
//                                         borderRadius: "30px",
//                                         display: "flex",
//                                         alignItems: "center",
//                                         textAlign: "center",
//                                         justifyContent: "center",
//                                         width: "80%",
//                                         padding: "5px 0px",
//                                         margin: "0 auto",
//                                     }}>

//                                     <span class="icon-home-icon-silhouette" style={{ color: "#ef7d00", marginRight: "5px", fontSize: "15px" }} ></span>
//                                     <span style={{ color: "white", fontSize: "12px", textTransform: "capitalize" }}>
//                                         Home
//                                     </span>
//                                 </Box>

//                                 <ListItem sx={{ cursor: "pointer" }} oonClick={handleUserClose}>
//                                     <ListItemIcon>
//                                         <img src="/assets/setting.svg" alt="icon" style={{ width: "16px", height: "16px" }} />
//                                     </ListItemIcon>
//                                     <ListItemText primary="Edit Profile"
//                                         primaryTypographyProps={{
//                                             sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: "-30px" }
//                                         }} />
//                                 </ListItem>

//                                 <ListItem sx={{ cursor: "pointer" }} onClick={handleUserClose}>
//                                     <ListItemIcon>
//                                         <span class="icon-price-tag" style={{ fontSize: "20px" }}></span>
//                                     </ListItemIcon>
//                                     <ListItemText primary="My Subscription"
//                                         primaryTypographyProps={{
//                                             sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: "-30px" }
//                                         }} />
//                                 </ListItem>

//                                 <ListItem sx={{ cursor: "pointer" }} onClick={handleUserClose}>
//                                     <ListItemIcon>
//                                         <HelpOutlineOutlinedIcon sx={{ fontSize: "20px" }} />
//                                     </ListItemIcon>
//                                     <ListItemText primary="FAQ"
//                                         primaryTypographyProps={{
//                                             sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: "-30px" }
//                                         }} />
//                                 </ListItem>

//                                 <ListItem sx={{ cursor: "pointer" }} onClick={handleUserClose}>
//                                     <ListItemIcon>
//                                         <img src="/assets/logout.svg" alt="icon" style={{ width: "16px", height: "16px" }} />
//                                     </ListItemIcon>
//                                     <ListItemText primary="Logout"
//                                         primaryTypographyProps={{
//                                             sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: "-30px" }
//                                         }} />
//                                 </ListItem>
//                             </List>
//                         </Box>
//                     </Popover>
//                 </Box>
//             </Box>  {/* header */}
//             <Divider sx={{ backgroundColor: "#ef7d00", borderBottom: "none", width: "100%", height: "3px" }} />

//             <Box display={"flex"} justifyContent={"space-between"} padding={"20px 100px 0px 80px"}>
//                 <ArrowBackIosOutlinedIcon
//                     onClick={() => navigate('/affiliate')}
//                     sx={{ color: "#4b4a4a", cursor: "pointer" }} />
//                 <Box>
//                     <IconButton><span class="icon-delete" style={{ fontSize: "23px" }} ></span> </IconButton>
//                     <IconButton onClick={handlePrint}>
//                         <img src="/assets/print.svg" alt="icon" style={{ width: "22px", height: "22px" }} />
//                     </IconButton>
//                 </Box>
//             </Box>

//             <Box >
//                 <Grid container spacing={1}>

//                     <Grid item xs={12} md={6}>
//                         <PersonalInfo
//                             fullName={fullName}
//                             setFullName={setFullName}
//                             phone={phone}
//                             setPhone={setPhone}
//                             email={email}
//                             setEmail={setEmail}
//                             month={month}
//                             setMonth={setMonth}
//                             day={day}
//                             setDay={setDay}
//                             year={year}
//                             setYear={setYear}
//                             country={country}
//                             setCountry={setCountry}
//                             password={password}
//                             setPassword={setPassword}
//                             confirmPassword={confirmPassword}
//                             setConfirmPassword={setConfirmPassword}
//                             selectedImage={selectedImage}
//                             setSelectedImage={setSelectedImage}
//                             selectedOption={selectedOption}
//                             setSelectedOption={setSelectedOption}
//                             errors={errors}
//                         />
//                     </Grid>

//                     <Box item sx={{ display: { xs: 'none', sm: 'block' } }}>
//                         <Divider orientation="vertical" sx={{ backgroundColor: '#f4f6fc', width: '1px', marginTop: "40px", height: "96%" }} />
//                     </Box>

//                     <Grid item xs={12} md={5}>
//                         <PaymentInfo
//                             selectedOption={paymentOption}
//                             setSelectedOption={setPaymentOption}
//                             bankName={bankName}
//                             setBankName={setBankName}
//                             accountNumber={accountNumber}
//                             setAccountNumber={setAccountNumber}
//                             accountName={accountName}
//                             setAccountName={setAccountName}
//                             errors={errors}
//                         />
//                     </Grid>
//                 </Grid>

//                 <Grid container justifyContent="center" sx={{ marginTop: 3 }}>
//                     <Button
//                         onClick={handleSubmit}
//                         disabled={loading}
//                         sx={{
//                             width: '160px',
//                             textTransform: "capitalize",
//                             backgroundColor: "#ef7d00",
//                             color: "white",
//                             borderRadius: "20px",
//                             padding: "5px",
//                             '&:hover': {
//                                 backgroundColor: "#ef7d10",
//                             },
//                             '&.Mui-disabled': {
//                                 backgroundColor: '#ffd0a1',
//                                 color: 'white'
//                             }
//                         }}>
//                         {loading ? (
//                             <CircularProgress size={20} color="inherit" />
//                         ) : (
//                             '✔ Save'
//                         )}
//                     </Button>
//                 </Grid>
//             </Box>

//             <Snackbar
//                 open={openSnackbar}
//                 autoHideDuration={6000}
//                 onClose={() => setOpenSnackbar(false)}
//                 anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//             >
//                 <Alert
//                     onClose={() => setOpenSnackbar(false)}
//                     severity={snackbarSeverity}
//                     sx={{ width: '100%' }}
//                 >
//                     {snackbarMessage}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     )
// }

import { Button, Divider, Grid, IconButton, Menu, MenuItem, Popover, Typography, Alert, Snackbar, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { useNavigate, useLocation } from "react-router";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import axios from 'axios';
import { toast } from 'react-toastify';
import { PersonalInfo } from './PersonalInfo';
import { PaymentInfo } from './PaymentInfo';
import { useTranslation } from 'react-i18next';

export const AddUsers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const user = location.state?.user; // Get user data from navigation state

  // Personal Info States
  const [fullName, setFullName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.mobile || '');
  const [email, setEmail] = useState(user?.email || '');
  const [month, setMonth] = useState(user?.birth_date ? user.birth_date.split('-')[1] : '');
  const [day, setDay] = useState(user?.birth_date ? user.birth_date.split('-')[2] : '');
  const [year, setYear] = useState(user?.birth_date ? user.birth_date.split('-')[0] : '');
  const [country, setCountry] = useState(user?.country || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedOption, setSelectedOption] = useState(user?.campaign || 'Winter Campaign');

  // Payment Info States
  const [bankName, setBankName] = useState(user?.bank_name || '');
  const [accountNumber, setAccountNumber] = useState(user?.bank_account_number || '');
  const [accountName, setAccountName] = useState(user?.bank_account_name || '');
  const [paymentOption, setPaymentOption] = useState(user?.payment_way ? (
    user.payment_way === 'bank_account' ? 'Bank' :
      user.payment_way === 'digital_wallet' ? 'D.Wallet' :
        'Card'
  ) : 'Bank');

  // Language and User States
  const [anchorElLanguage, setAnchorElLanguage] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [anchorElUser, setAnchorElUser] = useState(null);
  const openLanguage = Boolean(anchorElLanguage);

  // Add error states
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  const [loading, setLoading] = useState(false);

  const handleLanguageClick = (event) => {
    setAnchorElLanguage(event.currentTarget);
  };

  const handleLanguageClose = (language) => {
    setAnchorElLanguage(null);
    setSelectedLanguage(language);
  };

  const handlePrint = () => {
    window.print();
  };

  const getLanguageIcon = () => {
    return selectedLanguage === 'ar' ? (
      <span className="icon-translation" style={{ color: "#ef7d00", fontSize: "22px" }}></span>
    ) : (
      <LanguageOutlinedIcon sx={{ color: "#ef7d00", fontSize: "22px" }} />
    );
  };

  const openUserPopover = Boolean(anchorElUser);

  const handleUserClick = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleUserClose = () => {
    setAnchorElUser(null);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) newErrors.fullName = t("fullNameRequired");
    if (!phone.trim()) newErrors.phone = t("mobileRequired");
    if (!email.trim()) {
      newErrors.email = t("emailRequired");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t("emailIsInvalid");
    }
    if (!day || !month || !year) {
      newErrors.birthDate = t("birthRequired");
    }
    if (!country) newErrors.country = t("countryRequired");
    if (!user && !password) { // Only require password for new user
      newErrors.password = t("passwordRequired");
    }
    if (!user && password !== confirmPassword) { // Only check for new user
      newErrors.confirmPassword = t("PasswordsDoNotMatch");
    }
    if (!bankName.trim()) newErrors.bankName = 'Bank name is required';
    if (!accountNumber.trim()) newErrors.accountNumber = t("AcountNameRequired");
    if (!accountName.trim()) newErrors.accountName = t("AcountNameRequired");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showMessage = (message, severity = 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };


  const handleSubmit = async () => {
    if (!validateForm()) {
      showMessage(t("plFillAllField"));
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', fullName);
      formData.append('mobile', phone);
      formData.append('email', email);
      formData.append('birth_date', `${year}-${month}-${day}`);
      formData.append('country', country);
      if (password) formData.append('password', password);
      formData.append('user_type', 'qtap_affiliates');
      if (selectedImage) formData.append('img', selectedImage);

      let paymentWayValue;
      switch (paymentOption) {
        case 'Bank': paymentWayValue = 'bank_account'; break;
        case 'D.Wallet': paymentWayValue = 'digital_wallet'; break;
        case 'Card': paymentWayValue = 'card'; break;
        default: paymentWayValue = 'bank_account';
      }

      formData.append('payment_way', paymentWayValue);
      formData.append('bank_name', bankName);
      formData.append('bank_account_number', accountNumber);
      formData.append('bank_account_name', accountName);

      if (user) {
        // Update existing user
        const response = await axios.post(
          `https://highleveltecknology.com/Qtap/api/qtap_affiliate/${user.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
          }
        );


      } else {
        // Add new user
        const response = await axios.post(
          'https://highleveltecknology.com/Qtap/api/add_qtap_affiliate',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
          }
        );

        if (response.data.status === 'success') {
          showMessage('User added successfully', 'success');
          navigate('/affiliate');
          toast.success(response.data.message);
        } else {
          showMessage(response.data.message || 'Error adding user');
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error processing request';
      showMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: "white", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "0px 60px",
          justifyContent: "space-between",
          width: "90%",
          height: "70px",
        }}
      >
        <Box>
          <img src="/images/qtap.PNG" alt='logo' width={"140px"} />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ cursor: "pointer", display: "flex", marginRight: "20px", alignItems: "center" }} onClick={handleLanguageClick}>
          {getLanguageIcon()}
          <KeyboardArrowDownIcon sx={{ fontSize: "18px", color: "#575756" }} />
          <Menu
            anchorEl={anchorElLanguage}
            open={openLanguage}
            onClose={() => setAnchorElLanguage(null)}
            sx={{ padding: "2px" }}
          >
            <MenuItem onClick={() => handleLanguageClose('ar')}>
              <span className="icon-translation" style={{ color: "#575756", marginRight: '8px', fontSize: "20px" }}></span>
              <span style={{ fontSize: "12px", color: "#575756" }}>Arabic</span>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => handleLanguageClose('en')}>
              <LanguageOutlinedIcon sx={{ color: "#575756", marginRight: '8px', fontSize: "20px" }} />
              <span style={{ fontSize: "12px", color: "#575756" }}>English</span>
            </MenuItem>
          </Menu>
        </Box>
        <Box
          aria-describedby={openUserPopover ? 'simple-popover' : undefined}
          onClick={handleUserClick}
          sx={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "3px" }}
        >
          <IconButton color="inherit" sx={{ backgroundColor: '#ef7d00', borderRadius: '30%', padding: '5px', '&:hover': { backgroundColor: '#ef7d00' } }}>
            <PersonOutlineOutlinedIcon sx={{ fontSize: "20px", color: "white" }} />
          </IconButton>
          <Typography variant="body1" sx={{ fontSize: "13px", color: "#575756" }}>User01</Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: "18px", color: "#575756" }} />
        </Box>
        <Popover
          id={openUserPopover ? 'simple-popover' : undefined}
          open={openUserPopover}
          anchorEl={anchorElUser}
          onClose={handleUserClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Box sx={{ width: 200, padding: '10px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: '20px', gap: '10px' }}>
              <Box sx={{ bgcolor: '#ef7d00', width: 40, height: 40, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <PersonOutlineOutlinedIcon sx={{ fontSize: "22px", color: "white" }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontSize: "14px" }}>User01</Typography>
                <Typography variant="body2" sx={{ fontSize: "12px" }} color="textSecondary">Mail@mail.com</Typography>
              </Box>
            </Box>
            <Divider />
            <Box component="ul" sx={{ padding: 0, margin: 0 }}>
              <Box
                onClick={() => navigate('/')}
                sx={{
                  cursor: "pointer",
                  backgroundColor: "#222240",
                  color: "white",
                  marginBottom: "10px",
                  borderRadius: "30px",
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  justifyContent: "center",
                  width: "80%",
                  padding: "5px 0px",
                  margin: "0 auto",
                }}
              >
                <span className="icon-home-icon-silhouette" style={{ color: "#ef7d00", marginRight: "5px", fontSize: "15px" }}></span>
                <span style={{ color: "white", fontSize: "12px", textTransform: "capitalize" }}>Home</span>
              </Box>
              <Box sx={{ cursor: "pointer", display: "flex", alignItems: "center", padding: "8px 16px" }} onClick={handleUserClose}>
                <img src="/assets/setting.svg" alt="icon" style={{ width: "16px", height: "16px", marginRight: "10px" }} />
                <Typography sx={{ color: '#5D5D5C', fontSize: '12px' }}>Edit Profile</Typography>
              </Box>
              <Box sx={{ cursor: "pointer", display: "flex", alignItems: "center", padding: "8px 16px" }} onClick={handleUserClose}>
                <span className="icon-price-tag" style={{ fontSize: "20px", marginRight: "10px" }}></span>
                <Typography sx={{ color: '#5D5D5C', fontSize: '12px' }}>My Subscription</Typography>
              </Box>
              <Box sx={{ cursor: "pointer", display: "flex", alignItems: "center", padding: "8px 16px" }} onClick={handleUserClose}>
                <HelpOutlineOutlinedIcon sx={{ fontSize: "20px", marginRight: "10px" }} />
                <Typography sx={{ color: '#5D5D5C', fontSize: '12px' }}>FAQ</Typography>
              </Box>
              <Box sx={{ cursor: "pointer", display: "flex", alignItems: "center", padding: "8px 16px" }} onClick={handleUserClose}>
                <img src="/assets/logout.svg" alt="icon" style={{ width: "16px", height: "16px", marginRight: "10px" }} />
                <Typography sx={{ color: '#5D5D5C', fontSize: '12px' }}>Logout</Typography>
              </Box>
            </Box>
          </Box>
        </Popover>
      </Box>
    </Box>
    <Divider sx={{ backgroundColor: "#ef7d00", borderBottom: "none", width: "100%", height: "3px" }} />
    <Box display={"flex"} justifyContent={"space-between"} padding={"20px 100px 0px 80px"}>
      <ArrowBackIosOutlinedIcon onClick={() => navigate('/affiliate')} sx={{ color: "#4b4a4a", cursor: "pointer" }} />
      <Box>
        <IconButton><span className="icon-delete" style={{ fontSize: "23px" }}></span></IconButton>
        <IconButton onClick={handlePrint}>
          <img src="/assets/print.svg" alt="icon" style={{ width: "22px", height: "22px" }} />
        </IconButton>
      </Box>
    </Box>
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <PersonalInfo
            fullName={fullName}
            setFullName={setFullName}
            phone={phone}
            setPhone={setPhone}
            email={email}
            setEmail={setEmail}
            month={month}
            setMonth={setMonth}
            day={day}
            setDay={setDay}
            year={year}
            setYear={setYear}
            country={country}
            setCountry={setCountry}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            errors={errors}
          />
        </Grid>
        <Box item sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Divider orientation="vertical" sx={{ backgroundColor: '#f4f6fc', width: '1px', marginTop: "40px", height: "96%" }} />
        </Box>
        <Grid item xs={12} md={5}>
          <PaymentInfo
            selectedOption={paymentOption}
            setSelectedOption={setPaymentOption}
            bankName={bankName}
            setBankName={setBankName}
            accountNumber={accountNumber}
            setAccountNumber={setAccountNumber}
            accountName={accountName}
            setAccountName={setAccountName}
            errors={errors}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="center" sx={{ marginTop: 3 }}>
        <Button
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            width: '160px',
            textTransform: "capitalize",
            backgroundColor: "#ef7d00",
            color: "white",
            borderRadius: "20px",
            padding: "5px",
            '&:hover': { backgroundColor: "#ef7d10" },
            '&.Mui-disabled': { backgroundColor: '#ffd0a1', color: 'white' }
          }}
        >
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            user ? '✔ Update' : '✔ Save'
          )}
        </Button>
      </Grid>
    </Box>
    <Snackbar
      open={openSnackbar}
      autoHideDuration={6000}
      onClose={() => setOpenSnackbar(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={() => setOpenSnackbar(false)}
        severity={snackbarSeverity}
        sx={{ width: '100%' }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
    </Box >
  );
};