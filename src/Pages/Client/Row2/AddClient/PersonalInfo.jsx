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

export const PersonalInfo = ({ personalData, onInputChange }) => { 
    const navigate = useNavigate();
    const { updatePersonalData, clearPersonalData } = usePersonalContext();
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

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <Grid container spacing={2} justifyContent="center" sx={{marginTop:"10px"}}>
            <Box><ArrowBackIosOutlinedIcon 
            onClick={() => navigate('/client')}
            sx={{color:"#4b4a4a" ,cursor:"pointer"}}/>
            </Box>

            <Grid item xs={12} md={3} sx={{marginRight:"40px"}}>
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
                        <img src="/images/User.jpg" alt="user" width="100%" />
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
                        </Box>
                    </Box>
                    <Typography variant="body2" sx={{ fontSize: "15px", color: "#3b3a3a", marginTop: "8px" }}>
                        User01d
                    </Typography>
                </Box>

            </Grid>

            <Grid item xs={12} md={6}>
                <Typography variant="body2" sx={{ fontSize: "15px" }} color="#3b3a3a" gutterBottom>
                    Personal Info
                </Typography>
                <Divider sx={{ width: "35%", borderBottom: "4px solid #ef7d00", marginBottom: "18px" }} />

                <FormControl variant="outlined" fullWidth>
                    <OutlinedInput
                        value={personalData.fullName || ''}
                        onChange={(e) => onInputChange('fullName', e.target.value)}
                        startAdornment={
                            <InputAdornment position="start">
                                <PersonOutlinedIcon sx={{ fontSize: "20px" }} />
                            </InputAdornment>
                        }
                        placeholder="Full Name"
                        sx={{ borderRadius: '10px', marginBottom: "18px", height: '33px', fontSize: "12px" }}
                    />
                </FormControl>


                <FormControl variant="outlined" fullWidth>
                    <OutlinedInput
                        value={personalData.phone || ''}
                        onChange={(e) => onInputChange('phone', e.target.value)}
                        startAdornment={
                            <InputAdornment position="start">
                                <PhoneOutlinedIcon sx={{ fontSize: "20px" }} />
                            </InputAdornment>
                        }
                        placeholder="Mobile Number"
                        sx={{ borderRadius: '10px', marginBottom: "18px", height: '33px', fontSize: "12px" }}
                    />
                </FormControl>

                <FormControl variant="outlined" fullWidth>
                    <OutlinedInput
                        value={personalData.email || ''}
                        onChange={(e) => onInputChange('email', e.target.value)}
                        startAdornment={
                            <InputAdornment position="start">
                                <MailOutlinedIcon sx={{ fontSize: "20px" }} />
                            </InputAdornment>
                        }
                        placeholder="Email"
                        sx={{ borderRadius: '10px', marginBottom: "18px", height: '33px', fontSize: "12px" }}
                    />
                </FormControl>

                <FormControl variant="outlined" fullWidth>
                    <OutlinedInput
                        value={personalData.website || ''}
                        onChange={(e) => onInputChange('website', e.target.value)}
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
                                id="outlined-country"
                                value={personalData.month || ''}
                                onChange={(e) => onInputChange('month', e.target.value)}
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
                                id="outlined-country"
                                value={personalData.day || ''}
                                onChange={(e) => onInputChange('day', e.target.value)}
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
                                id="outlined-country"
                                value={personalData.year || ''}
                                onChange={(e) => onInputChange('year', e.target.value)}
                                displayEmpty
                                sx={{ borderRadius: '10px', height: '33px', fontSize: "12px", color: "gray" }}
                            >
                                <MenuItem value="" disabled >
                                    Year
                                </MenuItem>
                                {Array.from({ length: 2025 - 1089 + 1 }, (_, i) => (
                                    <MenuItem key={i + 1089} value={i + 1089}>
                                        {i + 1089}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <FormControl variant="outlined" fullWidth >
                    <Select
                        id="outlined-country"
                        value={personalData.country || ''}
                        onChange={(e) => onInputChange('country', e.target.value)}
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

                <FormControl variant="outlined" fullWidth>
                    <OutlinedInput
                        id="outlined-password"
                        type={showPassword ? 'text' : 'password'}
                        value={personalData.password || ''}
                        onChange={(e) => onInputChange('password', e.target.value)}
                        startAdornment={
                            <InputAdornment position="start">
                                <LockOutlinedIcon sx={{ fontSize: "20px" }} />
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        placeholder="Password"
                        sx={{ borderRadius: '10px', marginBottom: "18px", height: '33px', fontSize: "12px" }}
                    />
                </FormControl>

                <FormControl variant="outlined" fullWidth>
                    <OutlinedInput
                        id="outlined-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={personalData.confirmPassword || ''}
                        onChange={(e) => onInputChange('confirmPassword', e.target.value)}
                        startAdornment={
                            <InputAdornment position="start">
                                <LockOutlinedIcon sx={{ fontSize: "20px" }} />
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowConfirmPassword}
                                    edge="end"
                                >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        placeholder="Confirm Password"
                        sx={{ marginBottom: "18px", borderRadius: '10px', height: '33px', fontSize: "12px" }}
                    />
                </FormControl>
            </Grid>
        </Grid>

    )
}
