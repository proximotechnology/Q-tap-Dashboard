// AddUsers.jsx
import { Button, Divider, Grid, IconButton, Menu, MenuItem, Popover, Typography, Alert, Snackbar, CircularProgress, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect, useContext } from 'react';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useNavigate, useLocation } from "react-router";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import axios from 'axios';
import { toast } from 'react-toastify';
import { PersonalInfo } from './PersonalInfo';
import { PaymentInfo } from './PaymentInfo';
import { useTranslation } from 'react-i18next';
import { AffiliateClientContext } from '../../../context/AffiliateClient';
import Language from '../../../Component/dashboard/TopBar/Language';
import { BASE_URL } from '../../../utils/helperFunction';
import { Logout, Print, Settings } from '@mui/icons-material';

export const AddUsers = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const location = useLocation();
    const { t } = useTranslation();
    const user = location.state?.user; // Get user data from navigation state
    const { affiliates, getAffiliateData } = useContext(AffiliateClientContext);

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
                user.payment_way === 'credit_card' ? 'Card' : null
    ) : 'Bank');
    const [addressBank, setAddressBank] = useState(user?.address || "")

    const [anchorElUser, setAnchorElUser] = useState(null);


    // Add error states
    const [errors, setErrors] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');
    const [loading, setLoading] = useState(false);

    // Fetch affiliate data when editing an existing user
    useEffect(() => {
        if (user) {
            getAffiliateData(user.id); // Fetch data for the specific user
            console.log("affiliate", affiliates);

        }
    }, [user]);

    // Sync local state with fetched affiliate data
    useEffect(() => {
        if (user && affiliates.length > 0) {
            const affiliateData = affiliates.find(aff => aff.id === user.id) || affiliates[0]; // Fallback to first item if no match
            if (affiliateData) {

                setFullName(affiliateData.affiliate?.name || fullName);
                setPhone(affiliateData.affiliate?.mobile || phone);
                setEmail(affiliateData.affiliate?.email || email);
                if (affiliateData.affiliate?.birth_date) {
                    const [y, m, d] = affiliateData.affiliate?.birth_date.split('-');
                    setYear(y);
                    setMonth(m);
                    setDay(d);
                }
                setCountry(affiliateData.affiliate?.country || country);
                setSelectedOption(affiliateData.affiliate?.campaign || selectedOption);
                setBankName(affiliateData.affiliate?.payment_info?.bank_name || bankName);
                setAccountNumber(affiliateData.affiliate?.payment_info?.bank_account_number || accountNumber);
                setAccountName(affiliateData.affiliate?.payment_info?.bank_account_name || accountName);
                setAddressBank(affiliateData.affiliate?.payment_info?.address || addressBank);

                setPaymentOption(affiliateData.affiliate?.payment_info?.payment_way ? (
                    affiliateData.affiliate?.payment_way === 'bank_account' ? 'Bank' :
                        affiliateData.affiliate?.payment_way === 'digital_wallet' ? 'D.Wallet' :
                            affiliateData.affiliate?.payment_way === 'credit_card' ? 'Card' : "Bank"
                ) : paymentOption);
            }
        }
    }, [affiliates, user]);



    const handlePrint = () => {
        window.print();
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
                case 'Card': paymentWayValue = 'credit_card'; break;
                default: paymentWayValue = 'bank_account';
            }

            formData.append('payment_way', paymentWayValue);
            formData.append('bank_name', bankName);
            formData.append('bank_account_number', accountNumber);
            formData.append('bank_account_name', accountName);

            if (user) {
                // Update existing user
                const response = await axios.post(

                    `${BASE_URL}qtap_affiliate/${user.id}`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                        }
                    }
                );

                if (response.data.status === 'success') {
                    showMessage('User updated successfully', 'success');
                    navigate('/affiliate');
                    toast.success(response.data.message);
                } else {
                    showMessage(response.data.message || 'Error updating user');
                    toast.error(response.data.message);
                }
            } else {
                // Add new user
                const response = await axios.post(

                    `${BASE_URL}add_qtap_affiliate`,
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
        <Box sx={{ backgroundColor: theme.palette.bodyColor.secandary, height: "100vh" }}>
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
                    <img src={localStorage.getItem("themeMode") === "light" ? "/assets/qtapwhite.svg" : "/assets/qtap.svg"} alt="Logo" style={{ width: '140px' }} />

                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Language />
                    <Box
                        aria-describedby={openUserPopover ? 'simple-popover' : undefined}
                        onClick={handleUserClick}
                        sx={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "3px" }}
                    >
                        <IconButton color="inherit" sx={{ backgroundColor: theme.palette.orangePrimary.main, borderRadius: '30%', padding: '5px', '&:hover': { backgroundColor: theme.palette.orangePrimary.main } }}>
                            <PersonOutlineOutlinedIcon sx={{ fontSize: "20px", color: "white" }} />
                        </IconButton>
                        <Typography variant="body1" sx={{ fontSize: "13px", color: theme.palette.text.gray }}>User01</Typography>
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
                                <Box sx={{ bgcolor: theme.palette.orangePrimary.main, width: 40, height: 40, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <PersonOutlineOutlinedIcon sx={{ fontSize: "22px", color: "white" }} />
                                </Box>
                                <Box>
                                    <Typography variant="h6" sx={{ fontSize: "14px", color: theme.palette.text.gray }}>User01</Typography>
                                    <Typography variant="body2" sx={{ fontSize: "12px", color: theme.palette.text.gray }} color="textSecondary">Mail@mail.com</Typography>
                                </Box>
                            </Box>
                            <Divider />
                            <Box component="ul" sx={{ padding: 0, margin: 0 }}>
                                <Box
                                    onClick={() => navigate('/')}
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
                                    <span className="icon-home-icon-silhouette" style={{ color: theme.palette.orangePrimary.main, marginRight: "5px", fontSize: "15px" }}></span>
                                    <span style={{ color: "white", fontSize: "12px", textTransform: "capitalize" }}>Home</span>
                                </Box>
                                <Box sx={{ cursor: "pointer", display: "flex", alignItems: "center", padding: "8px 16px" }} onClick={handleUserClose}>
                                    <Settings style={{ fontSize: "20px", height: "16px", color: theme.palette.text.gray, marginRight: "10px" }} />
                                    <Typography sx={{ color: theme.palette.text.gray, fontSize: '12px' }}>Edit Profile</Typography>
                                </Box>
                                <Box sx={{ cursor: "pointer", display: "flex", alignItems: "center", padding: "8px 16px" }} onClick={handleUserClose}>
                                    <span className="icon-price-tag" style={{ fontSize: "20px", color: theme.palette.text.gray, marginRight: "10px" }}></span>
                                    <Typography sx={{ color: theme.palette.text.gray, fontSize: '12px' }}>My Subscription</Typography>
                                </Box>
                                <Box sx={{ cursor: "pointer", display: "flex", alignItems: "center", padding: "8px 16px" }} onClick={handleUserClose}>
                                    <HelpOutlineOutlinedIcon sx={{ fontSize: "20px", color: theme.palette.text.gray, marginRight: "10px" }} />
                                    <Typography sx={{ color: theme.palette.text.gray, fontSize: '12px' }}>FAQ</Typography>
                                </Box>
                                <Box sx={{ cursor: "pointer", display: "flex", alignItems: "center", padding: "8px 16px" }} onClick={handleUserClose}>
                                    <Logout style={{ fontSize: "20px", height: "16px", color: theme.palette.text.gray, marginRight: "10px" }} />
                                    <Typography sx={{ color: theme.palette.text.gray, fontSize: '12px' }}>Logout</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Popover>
                </Box>
            </Box>
            <Divider sx={{ backgroundColor: theme.palette.orangePrimary.main, borderBottom: "none", width: "100%", height: "3px" }} />
            <Box display={"flex"} justifyContent={"space-between"} padding={"20px 100px 0px 80px"}>
                <ArrowBackIosOutlinedIcon onClick={() => navigate('/affiliate')} sx={{ color: theme.palette.text.gray, cursor: "pointer" }} />
                <Box>
                    <IconButton><span className="icon-delete" style={{ fontSize: "23px", color: theme.palette.text.gray }}></span></IconButton>
                    <IconButton onClick={handlePrint}>
                        <Print style={{ width: "22px", height: "22px", color: theme.palette.text.gray }} />
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
                            setAddressBank={setAddressBank}
                            addressBank={addressBank}

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
                            backgroundColor: theme.palette.orangePrimary.main,
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
                            user ? '✔ ' + t("update") : '✔ ' + t("save")
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
        </Box>
    );
};