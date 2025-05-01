// // import { Avatar, Button, Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Popover, Typography } from '@mui/material'
// // import { Box } from '@mui/system'
// // import React, { useState } from 'react'
// // import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

// // import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// // import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
// // import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
// // import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
// // import { useNavigate } from "react-router";
// // import axios from 'axios';
// // import { useRegisterClient } from '../../../../context/RegisterClientContext';
// // import { toast } from 'react-toastify';
// // import { BusinessInfoAdmin } from './BusinessInfoAdmin';
// // import { PersonalInfoAdmin } from './PersonalInfoAdmin';
// // export const AddClient = () => {

// //   const navigate = useNavigate();

// //   const { clientData, setClientData } = useRegisterClient();

// //   const handleSave = async () => {
// //     try {
// //       // console.log("clientData ", clientData);

// //       // Function to serialize arrays to JSON strings
// //       const serializeArrays = (obj) => {
// //         const newObj = { ...obj };
// //         for (const key in newObj) {
// //           if (Array.isArray(newObj[key])) {
// //             newObj[key] = JSON.stringify(newObj[key]);
// //           } else if (typeof newObj[key] === 'object' && newObj[key] !== null) {
// //             newObj[key] = serializeArrays(newObj[key]);
// //           }
// //         }
// //         return newObj;
// //       };

// //       const allClientData = {
// //         name: clientData.personalInfo.fullName,
// //         mobile: clientData.personalInfo.phone,
// //         email: clientData.personalInfo.email,
// //         birth_date: `${clientData.personalInfo.year}-${clientData.personalInfo.month}-${clientData.personalInfo.day}`,
// //         country: clientData.personalInfo.country,
// //         password: clientData.personalInfo.password,
// //         user_type: "qtap_clients",
// //         img: '', // Add image if available
// //         payment_method: Object.keys(clientData.businessInfo.paymentMethods).filter(
// //           key => clientData.businessInfo.paymentMethods[key]
// //         ),
// //         brunch1: {
// //           contact_info: {
// //             business_phone: clientData.businessInfo.contactInfo.businessPhone,
// //             business_email: clientData.businessInfo.contactInfo.businessEmail,
// //             facebook: clientData.businessInfo.contactInfo.facebook,
// //             twitter: clientData.businessInfo.contactInfo.twitter,
// //             instagram: clientData.businessInfo.contactInfo.instagram,
// //             address: clientData.businessInfo.contactInfo.address,
// //             website: clientData.businessInfo.contactInfo.website
// //           },
// //           // currency_id: clientData.businessInfo.currency || '', 
// //           currency_id: "1",
// //           workschedules: clientData.businessInfo.workSchedules,
// //           serving_ways: Object.keys(clientData.businessInfo.servingWays).filter(
// //             key => clientData.businessInfo.servingWays[key]
// //           ), // Convert servingWays object to array
// //           tables_number: clientData.businessInfo.numberOfTables,
// //           // pricing_id: clientData.businessInfo.pricingId || '', // Add if available
// //           pricing_id: "1",
// //           pricing_way: "monthly_price",       //monthly_price or yearly_price
// //           payment_services: Object.keys(clientData.businessInfo.paymentMethods).filter(
// //             key => clientData.businessInfo.paymentMethods[key]
// //           ), // Convert paymentMethods object to array
// //           // discount_id: clientData.businessInfo.discountId || '', // Add if available
// //           discount_id: "1",
// //           business_name: clientData.businessInfo.businessName,
// //           business_country: clientData.businessInfo.country,
// //           business_city: clientData.businessInfo.city,
// //           latitude: "846.668848",
// //           longitude: "648.4684684",
// //           // business_format: clientData.businessInfo.businessType, 
// //           business_format: "uk",
// //           menu_design: clientData.businessInfo.design,
// //           default_mode: clientData.businessInfo.mode,

// //           payment_time: clientData.businessInfo.paymentTime.beforeServing ? 'before' : 'after',
// //           // payment_time: Object.keys(clientData.businessInfo.paymentTime).filter(
// //           //   key => clientData.businessInfo.paymentTime[key]
// //           // ).join(" "),
// //           call_waiter: 'active' // Default value, update if needed
// //         }
// //       };

// //       console.log('Client allClientData', allClientData);

// //       const response = await axios.post('${BASE_URL}qtap_clients', allClientData, {
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //       });

// //       console.log('Client registered response', response);

// //       if (response.status === 201) {

// //         toast.success('Client registered successfully');

// //       }
// //     } catch (error) {
// //       console.error('Error registering client:', error);
// //       toast.error(` ${error.response.data.message}`);
// //     }
// //   };
// //   const [anchorElLanguage, setAnchorElLanguage] = useState(null);
// //   const [selectedLanguage, setSelectedLanguage] = useState('en');
// //   const openLanguage = Boolean(anchorElLanguage);

// //   const handleLanguageClick = (event) => {
// //     setAnchorElLanguage(event.currentTarget);
// //   };

// //   const handleLanguageClose = (language) => {
// //     setAnchorElLanguage(null);
// //     setSelectedLanguage(language);
// //   };

// //   const getLanguageIcon = () => {
// //     return selectedLanguage === 'ar' ? <span class="icon-translation" style={{ color: theme.palette.orangePrimary.main, fontSize: "22px" }}> </span>
// //       : <LanguageOutlinedIcon sx={{ color: theme.palette.orangePrimary.main, fontSize: "22px" }} />;
// //   };
// //   const [anchorElUser, setAnchorElUser] = useState(null);
// //   const openUserPopover = Boolean(anchorElUser);

// //   const handleUserClick = (event) => {
// //     setAnchorElUser(event.currentTarget);
// //   };

// //   const handleUserClose = () => {
// //     setAnchorElUser(null);
// //   };

// //   const deleteAllData = () => {
// //     setClientData({
// //       name: "",
// //       mobile: "",
// //       email: "",
// //       birth_date: "",
// //       country: "",
// //       password: "",
// //       user_type: "qtap_clients",
// //       payment_method: "",
// //       brunch1: {
// //         contact_info: {
// //           business_phone: "",
// //           business_email: "",
// //           facebook: "",
// //           twitter: "",
// //           instagram: "",
// //           address: "",
// //           website: ""
// //         },
// //         // currency_id: clientData.businessInfo.currency || '', 
// //         currency_id: "1",
// //         workschedules: "",
// //         serving_ways: "",
// //         tables_number: " ",
// //         pricing_id: "1",
// //         pricing_way: "monthly_price",       //monthly_price or yearly_price
// //         payment_services: "",
// //         discount_id: "1",
// //         business_name: "",
// //         business_country: "",
// //         business_city: "",
// //         latitude: "846.668848",
// //         longitude: "648.4684684",
// //         business_format: "",
// //         menu_design: "",
// //         default_mode: "",
// //         payment_time: " ",
// //         call_waiter: '' // Default value, update if needed
// //       }
// //     })
// //   }
// //   return (
// //     <Box sx={{ backgroundColor: "white", height: "100%" }}>
// //       <Box
// //         sx={{
// //           display: "flex",
// //           flexDirection: "row",
// //           alignItems: "center",
// //           padding: "0px 60px",
// //           justifyContent: "space-between",
// //           width: "90%",
// //           height: "70px",
// //         }}>
// //         <Box>
// //           <img src="/images/qtap.PNG" alt='logo' width={"140px"} />
// //         </Box>

// //         <Box sx={{ display: "flex", alignItems: "center" }} >
// //           <Box sx={{ cursor: "pointer", display: "flex", marginRight: "20px", alignItems: "center" }}
// //             onClick={handleLanguageClick}>
// //             {getLanguageIcon()}
// //             <KeyboardArrowDownIcon sx={{ fontSize: "18px", color: "#575756" }} />
// //             <Menu
// //               anchorEl={anchorElLanguage}
// //               open={openLanguage}
// //               onClose={() => setAnchorElLanguage(null)}
// //               sx={{ padding: "2px" }}
// //             >
// //               <MenuItem onClick={() => handleLanguageClose('ar')}>
// //                 <span class="icon-translation" style={{ color: "#575756", marginRight: '8px', fontSize: "20px" }}></span>
// //                 <span style={{ fontSize: "12px", color: "#575756" }}>Arabic</span>
// //               </MenuItem>
// //               <Divider />
// //               <MenuItem onClick={() => handleLanguageClose('en')}>
// //                 <LanguageOutlinedIcon sx={{ color: "#575756", marginRight: '8px', fontSize: "20px" }} />
// //                 <span style={{ fontSize: "12px", color: "#575756" }}>English</span>
// //               </MenuItem>
// //             </Menu>
// //           </Box>

// //           <Box
// //             aria-describedby={openUserPopover ? 'simple-popover' : undefined}
// //             onClick={handleUserClick}
// //             sx={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "3px" }}>
// //             <IconButton color="inherit" sx={{
// //               backgroundColor: theme.palette.orangePrimary.main, borderRadius: '30%', padding: '5px',
// //               '&:hover': {
// //                 backgroundColor: theme.palette.orangePrimary.main,
// //               }
// //             }}>
// //               <PersonOutlineOutlinedIcon sx={{ fontSize: "20px", color: "white" }} />
// //             </IconButton>
// //             <Typography variant="body1" sx={{ fontSize: "13px", color: "#575756" }}>User01</Typography>
// //             <KeyboardArrowDownIcon sx={{ fontSize: "18px", color: "#575756" }} />
// //           </Box>
// //           <Popover
// //             id={openUserPopover ? 'simple-popover' : undefined}
// //             open={openUserPopover}
// //             anchorEl={anchorElUser}
// //             onClose={handleUserClose}
// //             anchorOrigin={{
// //               vertical: 'bottom',
// //               horizontal: 'left',
// //             }}
// //           >
// //             <Box sx={{ width: 200, padding: '10px' }}>
// //               <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: '20px', gap: '10px' }}>
// //                 <Avatar sx={{ bgcolor: theme.palette.orangePrimary.main, width: 40, height: 40 }}>
// //                   <PersonOutlineOutlinedIcon sx={{ fontSize: "22px" }} />
// //                 </Avatar>
// //                 <Box>
// //                   <Typography variant="h6" sx={{ fontSize: "14px" }}>User01</Typography>
// //                   <Typography variant="body2" sx={{ fontSize: "12px" }} color="textSecondary">Mail@mail.com</Typography>
// //                 </Box>
// //               </Box>
// //               <Divider />

// //               <List>
// //                 <Box
// //                   onClick={() => navigate('/')}
// //                   sx={{
// //                     cursor: "pointer",
// //                     backgroundColor: "#222240",
// //                     color: "white",
// //                     marginBottom: "10px",
// //                     borderRadius: "30px",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     textAlign: "center",
// //                     justifyContent: "center",
// //                     width: "80%",
// //                     padding: "5px 0px",
// //                     margin: "0 auto",
// //                   }}>

// //                   <span class="icon-home-icon-silhouette" style={{ color: theme.palette.orangePrimary.main, marginRight: "5px", fontSize: "15px" }} ></span>
// //                   <span style={{ color: "white", fontSize: "12px", textTransform: "capitalize" }}>
// //                     Home
// //                   </span>
// //                 </Box>

// //                 <ListItem sx={{ cursor: "pointer" }} oonClick={handleUserClose}>
// //                   <ListItemIcon>
// //                     <img src="/assets/setting.svg" alt="icon" style={{ width: "16px", height: "16px" }} />
// //                   </ListItemIcon>
// //                   <ListItemText primary="Edit Profile"
// //                     primaryTypographyProps={{
// //                       sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: "-30px" }
// //                     }} />
// //                 </ListItem>

// //                 <ListItem sx={{ cursor: "pointer" }} onClick={handleUserClose}>
// //                   <ListItemIcon>
// //                     <span class="icon-price-tag" style={{ fontSize: "20px" }}></span>
// //                   </ListItemIcon>
// //                   <ListItemText primary="My Subscription"
// //                     primaryTypographyProps={{
// //                       sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: "-30px" }
// //                     }} />
// //                 </ListItem>

// //                 <ListItem sx={{ cursor: "pointer" }} onClick={handleUserClose}>
// //                   <ListItemIcon>
// //                     <HelpOutlineOutlinedIcon sx={{ fontSize: "20px" }} />
// //                   </ListItemIcon>
// //                   <ListItemText primary="FAQ"
// //                     primaryTypographyProps={{
// //                       sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: "-30px" }
// //                     }} />
// //                 </ListItem>

// //                 <ListItem sx={{ cursor: "pointer" }} onClick={handleUserClose}>
// //                   <ListItemIcon>
// //                     <img src="/assets/logout.svg" alt="icon" style={{ width: "16px", height: "16px" }} />
// //                   </ListItemIcon>
// //                   <ListItemText primary="Logout"
// //                     primaryTypographyProps={{
// //                       sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: "-30px" }
// //                     }} />
// //                 </ListItem>
// //               </List>
// //             </Box>
// //           </Popover>
// //         </Box>
// //       </Box>  {/* header */}

// //       <Divider sx={{ backgroundColor: theme.palette.orangePrimary.main, borderBottom: "none", width: "100%", height: "3px" }} />


// //       <Box >
// //         <Grid container spacing={1}>

// //           <Grid item xs={12} md={5}>
// //             <PersonalInfoAdmin />
// //           </Grid>

// //           <Box item sx={{ display: { xs: 'none', sm: 'block' } }}>
// //             <Divider orientation="vertical" sx={{ backgroundColor: '#f4f6fc', width: '1px', marginTop: "30px", height: "90%" }} />
// //           </Box>

// //           <Grid item xs={12} md={6}>
// //             <BusinessInfoAdmin />
// //           </Grid>
// //         </Grid>

// //         <Grid container justifyContent="center" sx={{ marginTop: 3 }}>
// //           <Button
// //             sx={{
// //               width: '160px', textTransform: "capitalize", backgroundColor: theme.palette.orangePrimary.main,
// //               color: "white", borderRadius: "20px", padding: "5px",
// //               '&:hover': {
// //                 backgroundColor: "#ef7d10",
// //               }
// //             }}
// //             onClick={handleSave}>
// //             <CheckOutlinedIcon sx={{ fontSize: "22px", mr: 1 }} /> Saveggg
// //           </Button>
// //         </Grid>
// //       </Box>

// //     </Box>
// //   )
// // }

// // export default AddClient;
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
  CircularProgress,
} from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React, { useState, useEffect, useRef } from "react";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BusinessInfoAdmin } from "./BusinessInfoAdmin";
import { PersonalInfoAdmin } from "./PersonalInfoAdmin";
import { useClientContext } from "../../../../context/ClientContext";
import { useTranslation } from "react-i18next";
import Language from "../../../../Component/dashboard/TopBar/Language";
import { BASE_URL } from "../../../../utils/helperFunction";

export const AddClient = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { clientData, setClientData, clearClientData } = useClientContext();
  const [isEditMode, setIsEditMode] = useState(false);
  const [clientId, setClientId] = useState(null);
  const [clientInfoData, setClientInfoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const isFetching = useRef(false); // Prevent duplicate API calls

  // Retry logic for API calls
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Fetch client info with retry on 429
  const getClientInfo = async (clientId, retries = 3, retryDelay = 5000) => {
    if (isFetching.current) return; // Prevent concurrent fetches
    isFetching.current = true;
    setLoading(true);

    try {
      const response = await axios.get(
        `${BASE_URL}get_client_info/${clientId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      if (response.data && response.data.qtap_clients) {
        setClientInfoData(response.data.qtap_clients);
        console.log("Client info data", response.data.qtap_clients);
      }
    } catch (e) {
      if (e.response?.status === 429 && retries > 0) {
        console.warn(`Rate limit hit, retrying after ${retryDelay}ms... (${retries} retries left)`);
        toast.warn(t("rateLimitHit"), { autoClose: 3000 });
        await delay(retryDelay);
        return getClientInfo(clientId, retries - 1, retryDelay * 2); // Exponential backoff
      }
      console.error("Error fetching client info:", e);
      toast.error(t("errorFetchingClientInfo"));
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  };

  // Handle state from location and set clientId
  useEffect(() => {
    const { clientData: incomingClientData, isEditMode: editMode } = location.state || {};
    if (editMode && incomingClientData && incomingClientData.id && clientId !== incomingClientData.id) {
      setIsEditMode(true);
      setClientId(incomingClientData.id);
    } else if (!editMode) {
      setIsEditMode(false);
      setClientId(null);
      setClientInfoData(null);
      clearClientData();
    }
  }, [location.state, clearClientData, clientId]);

  // Fetch client info when clientId changes
  useEffect(() => {
    if (clientId && !clientInfoData) {
      getClientInfo(clientId);
    }
  }, [clientId]);

  // Transform and set client data to context when clientInfoData updates
  useEffect(() => {
    if (clientInfoData) {
      const branch = clientInfoData.brunchs?.[0] || {};
      const contactInfo = branch.contact_info?.[0] || {};
      const parseFirstValue = (str) => (str ? str.split(",")[0].trim() : "");

      const transformedData = {
        personalInfo: {
          fullName: clientInfoData.name || "",
          phone: clientInfoData.mobile || "",
          email: clientInfoData.email || "",
          year: clientInfoData.birth_date?.split("-")[0] || "",
          month: clientInfoData.birth_date?.split("-")[1] || "",
          day: clientInfoData.birth_date?.split("-")[2] || "",
          country: clientInfoData.country || "",
          img: clientInfoData.img || "",
          password: "",
          confirmPassword: "",
          website: parseFirstValue(contactInfo.website) || "",
        },
        businessInfo: {
          businessName: branch.business_name || "",
          contactInfo: {
            businessPhone: parseFirstValue(contactInfo.business_phone) || "",
            businessEmail: parseFirstValue(contactInfo.business_email) || "",
            facebook: parseFirstValue(contactInfo.facebook) || "",
            twitter: parseFirstValue(contactInfo.twitter) || "",
            instagram: parseFirstValue(contactInfo.instagram) || "",
            address: parseFirstValue(contactInfo.address) || "",
            website: parseFirstValue(contactInfo.website) || "",
          },
          country: branch.business_country || "",
          city: branch.business_city || "",
          currency: branch.currency_id?.toString() || "1",
          businessType: branch.business_format?.toLowerCase() || "uk",
          menuLanguage: "US",
          numberOfTables: branch.tables_number?.toString() || "1",
          design: branch.menu_design?.toLowerCase() || "grid",
          mode: branch.default_mode === "white" ? "light" : "dark",
          workSchedules: branch.workschedule?.length
            ? branch.workschedule.reduce((acc, schedule) => {
              acc[schedule.day] = [schedule.opening_time, schedule.closing_time];
              return acc;
            }, {})
            : {
              Saturday: ["9am", "7pm"],
              Sunday: ["9am", "7pm"],
              Monday: ["9am", "7pm"],
              Tuesday: ["9am", "7pm"],
              Wednesday: ["9am", "7pm"],
              Thursday: ["9am", "7pm"],
              Friday: ["9am", "7pm"],
            },
          servingWays: {
            dine_in: branch.serving_ways?.some((way) => way.name === "dine_in") || false,
            take_away: branch.serving_ways?.some((way) => way.name === "take_away") || false,
            delivery: branch.serving_ways?.some((way) => way.name === "delivery") || false,
          },
          paymentMethods: {
            cash: branch.payment_services?.some((service) => service.name === "cash") || false,
            wallet: branch.payment_services?.some((service) => service.name === "wallet") || false,
            card: branch.payment_services?.some((service) => service.name === "card") || false,
          },
          paymentTime: {
            beforeServing: branch.payment_time === "before",
            afterServing: branch.payment_time === "after",
          },
          callWaiter: branch.call_waiter === "active",
        },
        branches: clientInfoData.brunchs || [],
        selectedBranch: 0,
      };

      setClientData(transformedData);
    }
  }, [clientInfoData, setClientData]);

  const handleSave = async () => {
    try {
      const allClientData = {
        name: clientData.personalInfo.fullName,
        mobile: clientData.personalInfo.phone,
        email: clientData.personalInfo.email,
        birth_date: `${clientData.personalInfo.year}-${clientData.personalInfo.month}-${clientData.personalInfo.day}`,
        Country: clientData.personalInfo.country,
        user_type: "qtap_clients",
        img: clientData.personalInfo.img || null,
        payment_method: Object.keys(clientData.businessInfo.paymentMethods)
          .filter((key) => clientData.businessInfo.paymentMethods[key])[0] || "cash",
        brunch1: {
          contact_info: {
            business_phone: [clientData.businessInfo.contactInfo.businessPhone || ""],
            business_email: [clientData.businessInfo.contactInfo.businessEmail || ""],
            facebook: [clientData.businessInfo.contactInfo.facebook || ""],
            twitter: [clientData.businessInfo.contactInfo.twitter || ""],
            instagram: [clientData.businessInfo.contactInfo.instagram || ""],
            address: [clientData.businessInfo.contactInfo.address || ""],
            website: [clientData.businessInfo.contactInfo.website || ""],
          },
          currency_id: clientData.businessInfo.currency || "1",
          workschedules: clientData.businessInfo.workSchedules,
          serving_ways: Object.keys(clientData.businessInfo.servingWays).filter(
            (key) => clientData.businessInfo.servingWays[key]
          ),
          tables_number: clientData.businessInfo.numberOfTables || "1",
          business_name: clientData.businessInfo.businessName || "",
          business_country: clientData.businessInfo.country || "",
          business_city: clientData.businessInfo.city || "",
          latitude: "846.668848",
          longitude: "648.4684684",
          business_format: clientData.businessInfo.businessType?.toUpperCase() || "UK",
          menu_design: clientData.businessInfo.design?.charAt(0).toUpperCase() + clientData.businessInfo.design?.slice(1) || "Grid",
          default_mode: clientData.businessInfo.mode === "light" ? "white" : "dark",
          payment_time: clientData.businessInfo.paymentTime.beforeServing ? "before" : "after",
          call_waiter: clientData.businessInfo.callWaiter ? "active" : "inactive",
          payment_services: Object.keys(clientData.businessInfo.paymentMethods).filter(
            (key) => clientData.businessInfo.paymentMethods[key]
          ),
        },
      };

      const url = isEditMode
        ? `${BASE_URL}qtap_clients/${clientId}`
        : `${BASE_URL}qtap_clients`;
      const method = isEditMode ? "POST" : "POST";

      console.log("clientData save =>>", allClientData)
      const formData = new FormData();
      let headers = {}
      if (isEditMode) {

        formData.append("name", allClientData.name);
        formData.append("mobile", allClientData.mobile);
        formData.append("email", allClientData.email);
        formData.append("birth_date", allClientData.birth_date);
        formData.append("Country", allClientData.Country);
        formData.append("user_type", allClientData.user_type);
        formData.append("img", allClientData.img); // Assuming this is a File object
        formData.append("payment_method", allClientData.payment_method);
        formData.append("brunch1", allClientData.brunch1);
        headers = {
           Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
         }

         for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }
      } else {
         headers = {
          "Content-Type":"application/json",
           Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
         }
      }
     
      const response = await axios({
        method,
        url,
        headers,
        data: isEditMode ? formData : allClientData,
       
      });

      if (response.status === 201 || response.status === 200) {
        toast.success(isEditMode ? t("clientUpdatedSucc") : t("clients.registeredSucc"));
        navigate("/client");
      }
    } catch (error) {
      console.error("Error saving client:", error);
      toast.error(t("errorWhileSavingData"));
    }
  };

  const [anchorElUser, setAnchorElUser] = useState(null);
  const openUserPopover = Boolean(anchorElUser);

  const handleUserClick = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleUserClose = () => {
    setAnchorElUser(null);
  };

  // Render loading indicator or content based on loading state
  const renderContent = () => {
    if (loading && isEditMode) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            minHeight: "400px",
          }}
        >
          <CircularProgress />
        </Box>
      );
    }

    return (
      <Box>
        <Grid container >
          <Grid item xs={12} md={6} >
            <PersonalInfoAdmin clientInfoData={clientInfoData} />
          </Grid>


          <Divider
            orientation="vertical"
            sx={{
              backgroundColor: "#f4f6fc", width: "1px", marginTop: "30px", height: "90%", position: "absolute", display: { xs: "none", md: "block" },
              left: "50%", // between md=6 and md=6
              top: "70px",
            }}
          />


          <Grid item xs={12} md={6}>
            <BusinessInfoAdmin clientInfoData={clientInfoData} />
          </Grid>
        </Grid>

        <Grid container justifyContent="center" sx={{ marginTop: 3 }}>
          <Button
            sx={{
              width: "160px",
              textTransform: "capitalize",
              backgroundColor: theme.palette.orangePrimary.main,
              color: "white",
              borderRadius: "20px",
              padding: "5px",
              "&:hover": {
                backgroundColor: "#ef7d10",
              },
            }}
            onClick={handleSave}
          >
            <CheckOutlinedIcon sx={{ fontSize: "22px", mr: 1 }} />
            {isEditMode ? t("update") : t("save")}
          </Button>
        </Grid>
      </Box>
    );
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
          <img src="/images/qtap.PNG" alt="logo" width={"140px"} />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Language />
          <Box
            aria-describedby={openUserPopover ? "simple-popover" : undefined}
            onClick={handleUserClick}
            sx={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "3px" }}
          >
            <IconButton
              color="inherit"
              sx={{
                backgroundColor: theme.palette.orangePrimary.main,
                borderRadius: "30%",
                padding: "5px",
                "&:hover": {
                  backgroundColor: theme.palette.orangePrimary.main,
                },
              }}
            >
              <PersonOutlineOutlinedIcon sx={{ fontSize: "20px", color: "white" }} />
            </IconButton>
            <Typography variant="body1" sx={{ fontSize: "13px", color: "#575756" }}>
              {localStorage.getItem("userName")}
            </Typography>
            <KeyboardArrowDownIcon sx={{ fontSize: "18px", color: "#575756" }} />
          </Box>
          <Popover
            id={openUserPopover ? "simple-popover" : undefined}
            open={openUserPopover}
            anchorEl={anchorElUser}
            onClose={handleUserClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Box sx={{ width: 200, padding: "10px" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  marginBottom: "20px",
                  gap: "10px",
                }}
              >
                <Avatar sx={{ bgcolor: theme.palette.orangePrimary.main, width: 40, height: 40 }}>
                  <PersonOutlineOutlinedIcon sx={{ fontSize: "22px" }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontSize: "14px" }}>
                    {localStorage.getItem("userName")}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "12px" }} color="textSecondary">
                    {localStorage.getItem("userEmail")}
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <List>
                <Box
                  onClick={() => navigate("/")}
                  sx={{
                    cursor: "pointer",
                    backgroundColor: theme.palette.secondaryColor.main,
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
                  <span
                    className="icon-home-icon-silhouette"
                    style={{ color: theme.palette.orangePrimary.main, marginRight: "5px", fontSize: "15px" }}
                  ></span>
                  <span style={{ color: "white", fontSize: "12px", textTransform: "capitalize" }}>
                    Home
                  </span>
                </Box>

                <ListItem sx={{ cursor: "pointer" }} onClick={handleUserClose}>
                  <ListItemIcon>
                    <img src="/assets/setting.svg" alt="icon" style={{ width: "16px", height: "16px" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Edit Profile"
                    primaryTypographyProps={{ sx: { color: "#5D5D5C", fontSize: "12px", marginLeft: "-30px" } }}
                  />
                </ListItem>

                <ListItem sx={{ cursor: "pointer" }} onClick={handleUserClose}>
                  <ListItemIcon>
                    <span className="icon-price-tag" style={{ fontSize: "20px" }}></span>
                  </ListItemIcon>
                  <ListItemText
                    primary="My Subscription"
                    primaryTypographyProps={{ sx: { color: "#5D5D5C", fontSize: "12px", marginLeft: "-30px" } }}
                  />
                </ListItem>

                <ListItem sx={{ cursor: "pointer" }} onClick={handleUserClose}>
                  <ListItemIcon>
                    <HelpOutlineOutlinedIcon sx={{ fontSize: "20px" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="FAQ"
                    primaryTypographyProps={{ sx: { color: "#5D5D5C", fontSize: "12px", marginLeft: "-30px" } }}
                  />
                </ListItem>

                <ListItem sx={{ cursor: "pointer" }} onClick={handleUserClose}>
                  <ListItemIcon>
                    <img src="/assets/logout.svg" alt="icon" style={{ width: "16px", height: "16px" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Logout"
                    primaryTypographyProps={{ sx: { color: "#5D5D5C", fontSize: "12px", marginLeft: "-30px" } }}
                  />
                </ListItem>
              </List>
            </Box>
          </Popover>
        </Box>
      </Box>

      <Divider
        sx={{ backgroundColor: theme.palette.orangePrimary.main, borderBottom: "none", width: "100%", height: "3px" }}
      />

      {renderContent()}
    </Box>
  );
};

export default AddClient;