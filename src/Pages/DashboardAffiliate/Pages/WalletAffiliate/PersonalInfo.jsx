import React, { useState } from 'react';
import { Grid, Typography, Divider, FormControl, OutlinedInput, InputAdornment, MenuItem, Select } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';

import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { Box, useTheme } from '@mui/system';
import { useTranslation } from 'react-i18next';

export const PersonalInfo = () => {

    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');
    const [country, setCountry] = useState('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { t } = useTranslation();
    const theme = useTheme();
    return (
        <Grid container spacing={2} justifyContent="center" >

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
                    <Typography variant="body2" sx={{ fontSize: "15px", color: theme.palette.text.gray, marginTop: "8px" }}>
                        User01
                    </Typography>
                </Box>

            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="body2" sx={{ fontSize: "14px" }} color={theme.palette.text.gray} gutterBottom>
                    {t("personalInfo")}
                </Typography>
                <Divider sx={{ borderRadius: "30px", width: "28%", borderBottom: "4px solid #ef7d00", marginBottom: "18px" }} />

                <FormControl variant="outlined" fullWidth >
                    <OutlinedInput
                        id="outlined-fullname"
                        startAdornment={
                            <InputAdornment position="start">
                                <PersonOutlinedIcon sx={{ fontSize: "18px" }} />
                            </InputAdornment>
                        }
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={t("fullName")}
                        sx={{ borderRadius: '6px', width: "85%", marginBottom: "18px", height: '30px', fontSize: "10px" }}
                    />
                </FormControl>

                <FormControl variant="outlined" fullWidth  >
                    <OutlinedInput
                        id="outlined-phone"
                        startAdornment={
                            <InputAdornment position="start">
                                <PhoneOutlinedIcon sx={{ fontSize: "18px" }} />
                            </InputAdornment>
                        }
                        placeholder={t("mobileNumber")}
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        sx={{ borderRadius: '6px', width: "85%", marginBottom: "18px", height: '30px', fontSize: "10px" }}
                    />
                </FormControl>

                <FormControl variant="outlined" fullWidth >
                    <OutlinedInput
                        id="outlined-email"
                        type="email"
                        startAdornment={
                            <InputAdornment position="start">
                                <MailOutlinedIcon sx={{ fontSize: "18px" }} />
                            </InputAdornment>
                        }
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("email")}
                        sx={{ borderRadius: '6px', width: "85%", marginBottom: "18px", height: '30px', fontSize: "10px" }}
                    />
                </FormControl>

                <Grid container alignItems="center" sx={{ marginBottom: "18px", width: "85%" }}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Grid container alignItems="center" sx={{ color: theme.palette.text.gray }} >
                            <CalendarMonthOutlinedIcon sx={{ marginRight: 1, fontSize: "15px" }} />
                            <Typography variant="body1" sx={{ fontSize: "10px" }}>{t("dateOfBirth")}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <Select
                                id="outlined-country"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                displayEmpty
                                sx={{ borderRadius: '6px', height: '30px', fontSize: "10px", color: "gray", marginRight: "5px" }}
                            >
                                <MenuItem value="" disabled >
                                    {t("month")}
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
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                displayEmpty
                                sx={{ borderRadius: '6px', height: '30px', fontSize: "10px", color: "gray", marginRight: "5px" }}
                            >
                                <MenuItem value="" disabled >
                                    {t("day")}
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
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                displayEmpty
                                sx={{ borderRadius: '6px', height: '30px', fontSize: "10px", color: "gray" }}
                            >
                                <MenuItem value="" disabled >
                                    {t("year")}
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
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        displayEmpty
                        sx={{ borderRadius: '6px', width: "85%", marginBottom: "18px", height: '30px', fontSize: "10px" }}

                        startAdornment={
                            <InputAdornment position="start">
                                <img src="/assets/location.svg" alt="location icon" style={{ width: "16px", height: "16px" }} />
                            </InputAdornment>
                        }
                    >
                        <MenuItem value="" disabled sx={{ fontSize: "12px", color: "gray" }} >
                            {t("country")}
                        </MenuItem>
                        <MenuItem value="US" sx={{ fontSize: "12px", color: "gray" }}>United States</MenuItem>
                        <MenuItem value="CA" sx={{ fontSize: "12px", color: "gray" }}>Canada</MenuItem>
                        <MenuItem value="UK" sx={{ fontSize: "12px", color: "gray" }}>United Kingdom</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="outlined" fullWidth  >
                    <OutlinedInput
                        id="outlined-password"
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        startAdornment={
                            <InputAdornment position="start">
                                <span class="icon-padlock" style={{ fontSize: "18px" }} />
                            </InputAdornment>
                        }
                        placeholder={t("password")}
                        sx={{ borderRadius: '6px', width: "85%", marginBottom: "18px", height: '30px', fontSize: "10px" }}
                    />
                </FormControl>

                <FormControl variant="outlined" fullWidth  >
                    <OutlinedInput
                        id="outlined-confirm-password"
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        startAdornment={
                            <InputAdornment position="start">
                                <span class="icon-padlock" style={{ fontSize: "18px" }} />
                            </InputAdornment>
                        }

                        placeholder={t("confirmPass")}
                        sx={{ borderRadius: '6px', width: "85%", marginBottom: "18px", height: '30px', fontSize: "10px" }}

                    />
                </FormControl>

            </Grid>
        </Grid>
    )
}


