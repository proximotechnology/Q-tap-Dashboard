import { Avatar, Button, Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Popover, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState, useEffect } from 'react'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { useNavigate } from "react-router";
import { PersonalInfo } from '../../Pages/Client/Row2/AddClient/PersonalInfo';
import { BusinessInfo } from '../../Pages/Client/Row2/AddClient/BusinessInfo';
import { usePersonalContext } from '../../context/PersonalContext';
import { useBusinessContext } from '../../context/BusinessContext';
import { toast } from 'react-toastify';



export const Save = () => {
    const { businessData, updateBusinessData } = useBusinessContext();
    const { personalData, updatePersonalData } = usePersonalContext();
    const navigate = useNavigate();

    // Business Info State
    const [selectedBranch, setSelectedBranch] = useState('branch1');
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
        toTime: '5:00 pm'
    });
    const [servingWays, setServingWays] = useState({
        dineIn: true,
        takeaway: true,
        delivery: true
    });
    const [paymentMethods, setPaymentMethods] = useState({
        cash: true,
        digitalWallet: true,
        card: true
    });
    const [paymentTime, setPaymentTime] = useState({
        beforeServing: true,
        afterServing: true
    });
    const [selectedServingWays, setSelectedServingWays] = useState([]);

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
                toTime: '5:00 pm'
            });
            setServingWays(businessData.servingWays || {
                dineIn: true,
                takeaway: true,
                delivery: true
            });
            setSelectedServingWays(businessData.selectedServingWays || []);
            setPaymentMethods(businessData.paymentMethods || {
                cash: true,
                digitalWallet: true,
                card: true
            });
            setPaymentTime(businessData.paymentTime || {
                beforeServing: true,
                afterServing: true
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
        const updatedData = { ...businessData, [field]: value };
        updateBusinessData(updatedData);
        console.log('Updated Business Data:', updatedData); // Debug log
    };

    const handleSave = async() => {
        // Currency mapping function - returns numeric IDs
        const getCurrencyId = (country) => {
            const currencyMap = {
                'US': 1,    // Changed from '1' to 1
                'UK': 2,    // Changed from '2' to 2
                'EU': 3,    // Changed from '3' to 3
                'egypt': 4, // Changed from '4' to 4
                'EG': 4,    // Added alternative code
                'UAE': 5,   // Add more as needed
                'SA': 6
            };
            return currencyMap[country] || 1; // Default to 1 if not found
        };

        const apiData = {
            // Personal Info
            name: personalData.fullName?.trim() || '',
            mobile: personalData.phone?.trim() || '',
            email: personalData.email?.trim().toLowerCase() || '',
            birth_date: personalData.year && personalData.month && personalData.day 
                ? `${personalData.year}-${personalData.month}-${personalData.day}`
                : '',
            country: personalData.country || '',
            password: personalData.password || "1",
            user_type: "qtap_clients",
            img: "", 

            // Business Info
            brunch1: {
                contact_info: {
                    business_phone: [businessData.businessPhone?.trim() || ''],
                    business_email: [businessData.businessEmail?.trim() || ''],
                    facebook: ["www.facebook.com"],
                    twitter: ["www.twitter.com"],
                    instagram: ["www.instagram.com"],
                    address: [""],
                    website: [businessData.website?.trim() || ""]
                },
                currency_id: getCurrencyId(businessData.country), // Now returns a number
                workschedules: {
                    Saturday: ["9am", "7pm"],
                    Sunday: ["9am", "7pm"],
                    Monday: ["9am", "7pm"],
                    Tuesday: ["9am", "7pm"],
                    Wednesday: ["9am", "7pm"],
                    Thursday: ["9am", "7pm"],
                    Friday: ["9am", "7pm"]
                },
                serving_ways: selectedServingWays.map(way => {
                    // Map the serving ways to the API format
                    switch(way) {
                        case 'dinein': return 'dine_in';
                        case 'takeaway': return 'take_away';
                        case 'delivery': return 'delivery';
                        default: return way;
                    }
                }),
                tables_number: parseInt(businessData.tableCount) || 0, // Convert to number
                pricing_id: 1,  // Changed from "1" to 1
                payment_services: ["wallet", "cash", "card"],
                discount_id: 1, // Changed from "1" to 1
                business_name: businessData.businessName?.trim() || '',
                business_country: businessData.country || '',
                business_city: businessData.city || "",
                latitude: "846.668848",
                longitude: "648.4684684",
                business_format: (businessData.format || "uk").toLowerCase(),
                payment_method: "cash",
                menu_design: businessData.design || "grid",
                default_mode: businessData.mode === 'light' ? 'white' : 'dark',
                payment_time: businessData.paymentTime?.beforeServing ? 'before' : 'after',
                call_waiter: businessData.callWaiter ? 'active' : 'inactive'
            }
        };

        // Add debug logging
        console.log('Currency ID being sent:', apiData.brunch1.currency_id);
        console.log('Country value:', businessData.country);
        console.log('Full API Data:', apiData);

        // Validate currency_id is a number
        if (typeof apiData.brunch1.currency_id !== 'number') {
            toast.error('Invalid currency format');
            console.error('Currency ID is not a number:', apiData.brunch1.currency_id);
            return;
        }

        // Detailed validation function
        const validateData = (data) => {
            const errors = [];

            // Personal Info Validation
            if (!data.name) errors.push('Full Name is required');
            if (!data.mobile) errors.push('Mobile number is required');
            if (!data.email) errors.push('Email is required');
            if (!data.birth_date) errors.push('Birth date is required');
            if (!data.country) errors.push('Country is required');
            if (!data.password) errors.push('Password is required');

            // Business Info Validation
            if (!data.brunch1.business_name) errors.push('Business Name is required');
            if (!data.brunch1.contact_info.business_phone[0]) errors.push('Business Phone is required');
            if (!data.brunch1.business_country) errors.push('Business Country is required');
            if (!data.brunch1.business_city) errors.push('Business City is required');

            // Format Validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) errors.push('Invalid email format');

            // Phone number validation
            const phoneRegex = /^\d{6,15}$/;
            if (!phoneRegex.test(data.mobile)) errors.push('Invalid mobile number format');
            if (!phoneRegex.test(data.brunch1.contact_info.business_phone[0])) 
                errors.push('Invalid business phone format');

            return errors;
        };

        // Validate before sending
        const validationErrors = validateData(apiData);
        if (validationErrors.length > 0) {
            console.error('Validation Errors:', validationErrors);
            toast.error(validationErrors.join('\n'));
            return;
        }

        try {
            const response = await fetch("https://highleveltecknology.com/Qtap/api/qtap_clients", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(apiData)
            });

            const responseData = await response.json();
            
            if (response.ok) {
                toast.success('Data saved successfully!');
                navigate('/welcome')
                console.log('API Response:', responseData);
            } else {
                console.error('API Error Response:', responseData);
                
                if (responseData.error_details) {
                    // Parse and display SQL error in a more readable format
                    const sqlError = responseData.error_details;
                    console.error('SQL Error:', sqlError);
                    
                    if (sqlError.includes('SQLSTATE')) {
                        const errorMessage = sqlError.split('SQL:')[0];
                        toast.error(`Database Error: ${errorMessage}`);
                    } else {
                        toast.error(responseData.message);
                    }
                } else if (response.status === 422) {
                    // Display validation errors from the server
                    const errors = responseData.errors;
                    if (errors) {
                        const errorMessages = Object.entries(errors)
                            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
                            .join('\n');
                        toast.error(errorMessages);
                    } else {
                        toast.error(responseData.message || 'Validation error');
                    }
                } else {
                    toast.error('An unexpected error occurred. Please try again.');
                }
            }
        } catch (error) {
            console.error('Network Error:', error);
            toast.error('Network error or server is not responding. Please try again later.');
        }
    };

    const [anchorElLanguage, setAnchorElLanguage] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const openLanguage = Boolean(anchorElLanguage);

    const handleLanguageClick = (event) => {
        setAnchorElLanguage(event.currentTarget);
    };

    const handleLanguageClose = (language) => {
        setAnchorElLanguage(null);
        setSelectedLanguage(language);
    };

    const getLanguageIcon = () => {
        return selectedLanguage === 'ar' ? <span class="icon-translation" style={{ color: "#ef7d00", fontSize: "22px" }}> </span>
            : <LanguageOutlinedIcon sx={{ color: "#ef7d00", fontSize: "22px" }} />;
    };
    const [anchorElUser, setAnchorElUser] = useState(null);
    const openUserPopover = Boolean(anchorElUser);

    const handleUserClick = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleUserClose = () => {
        setAnchorElUser(null);
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
                }}>
                <Box>
                    <img src="/images/qtap.PNG" alt='logo' width={"140px"} />
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }} >
                    <Box sx={{ cursor: "pointer", display: "flex", marginRight: "20px", alignItems: "center" }}
                        onClick={handleLanguageClick}>
                        {getLanguageIcon()}
                        <KeyboardArrowDownIcon sx={{ fontSize: "18px", color: "#575756" }} />
                        <Menu
                            anchorEl={anchorElLanguage}
                            open={openLanguage}
                            onClose={() => setAnchorElLanguage(null)}
                            sx={{ padding: "2px" }}
                        >
                            <MenuItem onClick={() => handleLanguageClose('ar')}>
                                <span class="icon-translation" style={{ color: "#575756", marginRight: '8px', fontSize: "20px" }}></span>
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
                        sx={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "3px" }}>
                        <IconButton color="inherit" sx={{
                            backgroundColor: '#ef7d00', borderRadius: '30%', padding: '5px',
                            '&:hover': {
                                backgroundColor: '#ef7d00',
                            }
                        }}>
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
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Box sx={{ width: 200, padding: '10px' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: '20px', gap: '10px' }}>
                                <Avatar sx={{ bgcolor: '#ef7d00', width: 40, height: 40 }}>
                                    <PersonOutlineOutlinedIcon sx={{ fontSize: "22px" }} />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontSize: "14px" }}>User01</Typography>
                                    <Typography variant="body2" sx={{ fontSize: "12px" }} color="textSecondary">Mail@mail.com</Typography>
                                </Box>
                            </Box>
                            <Divider />

                            <List>
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
                                    }}>

                                    <span class="icon-home-icon-silhouette" style={{ color: "#ef7d00", marginRight: "5px", fontSize: "15px" }} ></span>
                                    <span style={{ color: "white", fontSize: "12px", textTransform: "capitalize" }}>
                                        Home
                                    </span>
                                </Box>

                                <ListItem sx={{ cursor: "pointer" }} oonClick={handleUserClose}>
                                    <ListItemIcon>
                                        <img src="/assets/setting.svg" alt="icon" style={{ width: "16px", height: "16px" }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Edit Profile"
                                        primaryTypographyProps={{
                                            sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: "-30px" }
                                        }} />
                                </ListItem>

                                <ListItem sx={{ cursor: "pointer" }} onClick={handleUserClose}>
                                    <ListItemIcon>
                                        <span class="icon-price-tag" style={{ fontSize: "20px" }}></span>
                                    </ListItemIcon>
                                    <ListItemText primary="My Subscription"
                                        primaryTypographyProps={{
                                            sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: "-30px" }
                                        }} />
                                </ListItem>

                                <ListItem sx={{ cursor: "pointer" }} onClick={handleUserClose}>
                                    <ListItemIcon>
                                        <HelpOutlineOutlinedIcon sx={{ fontSize: "20px" }} />
                                    </ListItemIcon>
                                    <ListItemText primary="FAQ"
                                        primaryTypographyProps={{
                                            sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: "-30px" }
                                        }} />
                                </ListItem>

                                <ListItem sx={{ cursor: "pointer" }} onClick={handleUserClose}>
                                    <ListItemIcon>
                                        <img src="/assets/logout.svg" alt="icon" style={{ width: "16px", height: "16px" }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Logout"
                                        primaryTypographyProps={{
                                            sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: "-30px" }
                                        }} />
                                </ListItem>
                            </List>
                        </Box>
                    </Popover>
                </Box>
            </Box>  {/* header */}

            <Divider sx={{ backgroundColor: "#ef7d00", borderBottom: "none", width: "100%", height: "3px" }} />

            <Box >
                <Grid container spacing={1}>
                    <Grid item xs={12} md={5}>
                        <PersonalInfo 
                            personalData={personalData}
                            onInputChange={handlePersonalChange}
                        />
                    </Grid>

                    <Box item sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Divider orientation="vertical" 
                            sx={{ backgroundColor: '#f4f6fc', width: '1px', marginTop: "30px", height: "90%" }} 
                        />
                    </Box>

                    <Grid item xs={12} md={6}>
                        <BusinessInfo 
                            businessData={businessData}
                            onInputChange={handleBusinessChange}
                        />
                    </Grid>
                </Grid>

                <Grid container justifyContent="center" sx={{ marginTop: 3 }}>
                    <Button
                        onClick={handleSave}
                        sx={{
                            width: '160px',
                            textTransform: "capitalize",
                            backgroundColor: "#ef7d00",
                            color: "white",
                            borderRadius: "20px",
                            padding: "5px",
                            '&:hover': {
                                backgroundColor: "#ef7d10",
                            }
                        }}>
                        <CheckOutlinedIcon sx={{ fontSize: "22px", mr: 1 }} /> Save
                    </Button>
                </Grid>
            </Box>

            <Box>
                <Typography variant="h6">Selected Serving Ways:</Typography>
                {selectedServingWays.map((way, index) => (
                    <Typography key={index} variant="body1">
                        {way.charAt(0).toUpperCase() + way.slice(1)}
                    </Typography>
                ))}
            </Box>

        </Box>
    )
}
