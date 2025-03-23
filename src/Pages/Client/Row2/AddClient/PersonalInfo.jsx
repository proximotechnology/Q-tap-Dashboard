
import { Divider, FormControl, Grid, IconButton, InputAdornment, MenuItem, OutlinedInput, Select, Typography } from '@mui/material'
import React, { useState } from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box } from '@mui/system';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

import { useNavigate } from 'react-router';
import { usePersonalContext } from '../../../../context/PersonalContext';
import { useTranslation } from 'react-i18next';

export const PersonalInfo = () => {
    const {t} = useTranslation()
    const navigate = useNavigate();
    const { personalData, updatePersonalData, clearPersonalData, setPersonalData } = usePersonalContext();
    const [fullName, setFullName] = useState(personalData.fullName || '');
    const [phone, setPhone] = useState(personalData.phone || '');
    const [email, setEmail] = useState(personalData.email || '');
    const [month, setMonth] = useState(personalData.month || '');
    const [day, setDay] = useState(personalData.day || '');
    const [year, setYear] = useState(personalData.year || '');
    const [country, setCountry] = useState(personalData.country || '');
    const [password, setPassword] = useState(personalData.password || '');
    const [confirmPassword, setConfirmPassword] = useState(personalData.confirmPassword || '');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [website, setWebsite] = useState(personalData.website || '');
    const [image, setImage] = useState(personalData.img || '');

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    // Function to handle image change 
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImage(file); // Update local state
            updatePersonalData({ ...personalData, img: file }); // Update context
            console.log('Image updated in context:', file); // Debugging
        } else {
            alert(t("PlUploadValidImageFile"));
        }
    };

    return (
        <Grid container spacing={2} justifyContent="center" sx={{ marginTop: "10px" }}>
            <Box>
                <ArrowBackIosOutlinedIcon
                    onClick={() => navigate('/client')}
                    sx={{ color: "#4b4a4a", cursor: "pointer" }}
                />
            </Box>

            <Grid item xs={12} md={3} sx={{ marginRight: "40px" }}>
                <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <img src={image ? URL.createObjectURL(image) : "/images/User.jpg"} alt="user" width="170" height="150" />
                        <Box sx={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            height: '18%',
                            backgroundColor: '#4b4a4a',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                        }}>
                            <EditOutlinedIcon sx={{ color: "white", fontSize: '20px' }} />
                            <input
                                accept="image/*"
                                style={{ display: 'block', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0 }}
                                id="raised-button-file"
                                type="file"
                                onChange={handleImageChange}
                            />
                        </Box>
                    </Box>
                    <Typography variant="body2" sx={{ fontSize: "15px", color: "#3b3a3a", marginTop: "8px" }}>
                        {fullName}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="body2" sx={{ fontSize: "15px" }} color="#3b3a3a" gutterBottom>
                    {t("personalInfo")}
                </Typography>
                <Divider sx={{ width: "35%", borderBottom: "4px solid #ef7d00", marginBottom: "18px" }} />

                <FormControl variant="outlined" fullWidth>
                    <OutlinedInput
                        startAdornment={
                            <InputAdornment position="start">
                                <PersonOutlinedIcon sx={{ fontSize: "20px" }} />
                            </InputAdornment>
                        }
                        value={fullName}
                        onChange={(e) => {
                            setFullName(e.target.value);
                            setPersonalData((prevState) => ({
                                ...prevState,
                                fullName: e.target.value
                            }));
                        }}
                        placeholder={t("fullName")}
                        sx={{ borderRadius: '10px', marginBottom: "18px", height: '33px', fontSize: "12px" }}
                    />
                </FormControl>


                <FormControl variant="outlined" fullWidth>
                    <OutlinedInput
                        startAdornment={
                            <InputAdornment position="start">
                                <PhoneOutlinedIcon sx={{ fontSize: "20px" }} />
                            </InputAdornment>
                        }
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value);
                            setPersonalData((prevState) => ({
                                ...prevState,
                                phone: e.target.value
                            }));
                        }}
                        placeholder={t("mobileNumber")}
                        sx={{ borderRadius: '10px', marginBottom: "18px", height: '33px', fontSize: "12px" }}
                    />
                </FormControl>
                <FormControl variant="outlined" fullWidth>
                    <OutlinedInput
                        startAdornment={
                            <InputAdornment position="start">
                                <MailOutlinedIcon sx={{ fontSize: "20px" }} />
                            </InputAdornment>
                        }
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setPersonalData((prevState) => ({
                                ...prevState,
                                email: e.target.value
                            }));
                        }}
                        placeholder={t("email")}
                        sx={{ borderRadius: '10px', marginBottom: "18px", height: '33px', fontSize: "12px" }}
                    />
                </FormControl>

                <FormControl variant="outlined" fullWidth>
                    <OutlinedInput
                        startAdornment={
                            <InputAdornment position="start">
                                <LanguageOutlinedIcon sx={{ fontSize: "18px" }} />
                            </InputAdornment>
                        }
                        value={website}
                        onChange={(e) => {
                            setWebsite(e.target.value);
                            setPersonalData((prevState) => ({
                                ...prevState,
                                website: e.target.value
                            }));
                        }}
                        placeholder={t("websiteNoOptional")}
                        sx={{ borderRadius: '10px', height: "35px", fontSize: "12px", marginBottom: "18px" }}
                    />
                </FormControl>

                <Grid container spacing={2} alignItems="center" sx={{ marginBottom: "18px" }}>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" sx={{ color: "grey", marginTop: "5px" }}>
                            <CalendarMonthOutlinedIcon sx={{ marginRight: 1, fontSize: "18px" }} />
                            <Typography variant="body1" sx={{ fontSize: "13px" }}>{t("dateOfBirth")}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <Select
                                id="outlined-month"
                                value={month}
                                onChange={(e) => {
                                    setMonth(e.target.value);
                                    setPersonalData((prevState) => ({
                                        ...prevState,
                                        month: e.target.value
                                    }));
                                }}
                                displayEmpty
                                sx={{ borderRadius: '10px', height: '33px', fontSize: "12px", color: "gray", marginRight: "5px" }}
                            >
                                <MenuItem value="" disabled>{t("month")}</MenuItem>
                                {[...Array(12).keys()].map((i) => (
                                    <MenuItem key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                        {String(i + 1).padStart(2, '0')}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <Select
                                id="outlined-day"
                                value={day}
                                onChange={(e) => {
                                    setDay(e.target.value);
                                    setPersonalData((prevState) => ({
                                        ...prevState,
                                        day: e.target.value
                                    }));
                                }}
                                displayEmpty
                                sx={{ borderRadius: '10px', height: '33px', fontSize: "12px", color: "gray", marginRight: "5px" }}
                            >
                                <MenuItem value="" disabled>{t("day")}</MenuItem>
                                {[...Array(31).keys()].map((i) => (
                                    <MenuItem key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                        {String(i + 1).padStart(2, '0')}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <Select
                                id="outlined-year"
                                value={year}
                                onChange={(e) => {
                                    setYear(e.target.value);
                                    setPersonalData((prevState) => ({
                                        ...prevState,
                                        year: e.target.value
                                    }));
                                }}
                                displayEmpty
                                sx={{ borderRadius: '10px', height: '33px', fontSize: "12px", color: "gray" }}
                            >
                                <MenuItem value="" disabled>{t("year")}</MenuItem>
                                {Array.from({ length: 2025 - 1980 + 1 }, (_, i) => (
                                    <MenuItem key={i + 1980} value={i + 1980}>
                                        {i + 1980}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <FormControl variant="outlined" fullWidth>
                    <Select
                        id="outlined-country"
                        value={country}
                        onChange={(e) => {
                            setCountry(e.target.value);
                            setPersonalData((prevState) => ({
                                ...prevState,
                                country: e.target.value
                            }));
                        }}
                        displayEmpty
                        sx={{ marginBottom: "18px", borderRadius: '10px', height: '33px', fontSize: "12px", color: "gray" }}
                        startAdornment={
                            <InputAdornment position="start">
                                <PinDropOutlinedIcon sx={{ fontSize: "20px" }} />
                            </InputAdornment>
                        }
                    >
                        <MenuItem value="" disabled>{t("country")}</MenuItem>
                        <MenuItem value="US">United States</MenuItem>
                        <MenuItem value="CA">Canada</MenuItem>
                        <MenuItem value="UK">United Kingdom</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="outlined" fullWidth>
                    <OutlinedInput
                        id="outlined-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setPersonalData((prevState) => ({
                                ...prevState,
                                password: e.target.value
                            }));
                        }}
                        startAdornment={
                            <InputAdornment position="start">
                                <LockOutlinedIcon sx={{ fontSize: "20px" }} />
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={handleClickShowPassword} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        placeholder={t("password")}
                        sx={{ borderRadius: '10px', marginBottom: "18px", height: '33px', fontSize: "12px" }}
                    />
                </FormControl>

                <FormControl variant="outlined" fullWidth>
                    <OutlinedInput
                        id="outlined-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setPersonalData((prevState) => ({
                                ...prevState,
                                confirmPassword: e.target.value
                            }));
                        }}
                        startAdornment={
                            <InputAdornment position="start">
                                <LockOutlinedIcon sx={{ fontSize: "20px" }} />
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        placeholder={t("confirmPass")}
                        sx={{ marginBottom: "18px", borderRadius: '10px', height: '33px', fontSize: "12px" }}
                    />
                </FormControl>
            </Grid>
        </Grid>

    )
}