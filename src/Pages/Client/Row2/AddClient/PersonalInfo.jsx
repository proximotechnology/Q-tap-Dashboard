import { Divider, FormControl, Grid, IconButton, InputAdornment, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
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
import { useRegisterClient } from '../../../../context/RegisterClientContext';

export const PersonalInfo = () => {
    const navigate = useNavigate();
    const { clientData, setClientData } = useRegisterClient();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClientData((prevData) => ({
            ...prevData,
            personalInfo: { ...prevData.personalInfo, [name]: value }
        }));
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

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
                        {/* Display the selected image or a default placeholder */}
                        {clientData.personalInfo.image ? (
                            <img
                                src={URL.createObjectURL(clientData.personalInfo.image)} // Create a URL for the file
                                alt="user"
                                width="100%"
                                style={{ objectFit: 'cover' }}
                            />
                        ) : (
                            <img src="/images/User.jpg" alt="user" width="100%" />
                        )}
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
                            {/* File input for image upload */}
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="image-upload"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setClientData((prevData) => ({
                                            ...prevData,
                                            personalInfo: {
                                                ...prevData.personalInfo,
                                                image: file, // Store the file object
                                            },
                                        }));
                                    }
                                }}
                            />
                            <label htmlFor="image-upload">
                                <EditOutlinedIcon sx={{ color: "white", fontSize: '20px', cursor: 'pointer' }} />
                            </label>
                        </Box>
                    </Box>
                    <Typography sx={{ marginTop: "10px", fontSize: "15px" }}>{clientData.personalInfo.fullName}</Typography>
                </Box>
            </Grid>

            <Grid item xs={12} md={6}>
                <Typography variant="body2" sx={{ fontSize: "15px" }} color="#3b3a3a" gutterBottom>
                    Personal Info
                </Typography>
                <Divider sx={{ width: "35%", borderBottom: "4px solid #ef7d00", marginBottom: "18px" }} />

                <FormControl variant="outlined" fullWidth>
                    <OutlinedInput
                        startAdornment={
                            <InputAdornment position="start">
                                <PersonOutlinedIcon sx={{ fontSize: "20px" }} />
                            </InputAdornment>
                        }
                        name="fullName"
                        value={clientData.personalInfo.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
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
                        name="phone"
                        value={clientData.personalInfo.phone}
                        onChange={handleChange}
                        placeholder="Mobile Number"
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
                        name="email"
                        value={clientData.personalInfo.email}
                        onChange={handleChange}
                        placeholder="Email"
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
                        placeholder="Website"
                        sx={{ borderRadius: '10px', height: "35px", fontSize: "12px", marginBottom: "18px" }}
                    />
                </FormControl>

                <Grid container alignItems="center" sx={{ marginBottom: "18px" }}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Grid container alignItems="center" sx={{ color: "grey", marginTop: "5px" }} >
                            <CalendarMonthOutlinedIcon sx={{ marginRight: 1, fontSize: "18px" }} />
                            <Typography variant="body1" sx={{ fontSize: "13px" }}>Date of Birth:</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <Select
                                id="outlined-month"
                                name="month"
                                value={clientData.personalInfo.month}
                                onChange={handleChange}
                                displayEmpty
                                sx={{ borderRadius: '10px', height: '33px', fontSize: "12px", color: "gray", marginRight: "5px" }}
                            >
                                <MenuItem value="" disabled >
                                    Month
                                </MenuItem>
                                <MenuItem value="01">01</MenuItem>
                                <MenuItem value="02">02</MenuItem>
                                <MenuItem value="03">03</MenuItem>
                                <MenuItem value="04">04</MenuItem>
                                <MenuItem value="05">05</MenuItem>
                                <MenuItem value="06">06</MenuItem>
                                <MenuItem value="07">07</MenuItem>
                                <MenuItem value="08">08</MenuItem>
                                <MenuItem value="09">09</MenuItem>
                                <MenuItem value="10">10</MenuItem>
                                <MenuItem value="11">11</MenuItem>
                                <MenuItem value="12">12</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <Select
                                id="outlined-day"
                                name="day"
                                value={clientData.personalInfo.day}
                                onChange={handleChange}
                                displayEmpty
                                sx={{ borderRadius: '10px', height: '33px', fontSize: "12px", color: "gray", marginRight: "5px" }}
                            >
                                <MenuItem value="" disabled >
                                    Day
                                </MenuItem>
                                {[...Array(31).keys()].map((i) => (
                                    <MenuItem key={i + 1} value={i + 1}>
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
                                name="year"
                                value={clientData.personalInfo.year}
                                onChange={handleChange}
                                displayEmpty
                                sx={{ borderRadius: '10px', height: '33px', fontSize: "12px", color: "gray" }}
                            >
                                <MenuItem value="" disabled >
                                    Year
                                </MenuItem>
                                {Array.from({ length: 2025 - 1980 + 1 }, (_, i) => (
                                    <MenuItem key={i + 1980} value={i + 1980}>
                                        {i + 1980}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <FormControl variant="outlined" fullWidth >
                    <Select
                        id="outlined-country"
                        name="country"
                        value={clientData.personalInfo.country}
                        onChange={handleChange}
                        displayEmpty
                        sx={{ marginBottom: "18px", borderRadius: '10px', height: '33px', fontSize: "12px", color: "gray" }}
                        startAdornment={
                            <InputAdornment position="start">
                                <PinDropOutlinedIcon sx={{ fontSize: "20px" }} />
                            </InputAdornment>
                        }
                    >
                        <MenuItem value="" disabled >
                            Country
                        </MenuItem>
                        <MenuItem value="US">United States</MenuItem>
                        <MenuItem value="CA">Canada</MenuItem>
                        <MenuItem value="UK">United Kingdom</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="outlined" fullWidth  >
                    <OutlinedInput
                        id="outlined-password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={clientData.personalInfo.password}
                        onChange={handleChange}
                        startAdornment={
                            <InputAdornment position="start">
                                <LockOutlinedIcon sx={{ fontSize: "20px" }} />
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff sx={{ fontSize: "20px" }} /> : <Visibility sx={{ fontSize: "20px" }} />}
                                </IconButton>
                            </InputAdornment>
                        }
                        placeholder="Password"
                        sx={{ borderRadius: '10px', marginBottom: "18px", height: '33px', fontSize: "12px" }}
                    />
                </FormControl>

                <FormControl variant="outlined" fullWidth  >
                    <OutlinedInput
                        id="outlined-confirm-password"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={clientData.personalInfo.confirmPassword}
                        onChange={handleChange}
                        startAdornment={
                            <InputAdornment position="start">
                                <LockOutlinedIcon sx={{ fontSize: "20px" }} />
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle confirm password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    edge="end"
                                >
                                    {showConfirmPassword ? <VisibilityOff sx={{ fontSize: "20px" }} /> : <Visibility sx={{ fontSize: "20px" }} />}
                                </IconButton>
                            </InputAdornment>
                        }
                        placeholder="Confirm Password"
                        sx={{ marginBottom: "18px", borderRadius: '10px', height: '33px', fontSize: "12px" }}
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
};
