import { Box, Button, Checkbox, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, MenuItem, OutlinedInput, Select, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { updatePersonalData } from "../../store/register/personalSlice";
import { useDispatch, useSelector } from 'react-redux';
import { Country, Governorates } from '../../utils/city';


const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const personalData = useSelector((state) => state.personalStore.personalData);


    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // const [user_type, setUserType] = useState('');

    const [apiError, setApiError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [apiSuccess, setApiSuccess] = useState('');
    const [clientDataFromRegist, setClientDataFromRegist] = useState()


    const { t } = useTranslation();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const theme = useTheme()
    const isValidPassword = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        return regex.test(password);
    }
    // call api to register
    const handleSignUp = async () => {

        setApiError('');
        setApiSuccess('');

        // inputs validate 
        if (!fullName || !phone || !email || !password || !confirmPassword) {
            setApiError(t("fieldAreRequired"));
            return;
        }
        if (!isValidPassword(password)) {
            setApiError(t("passTooShortOrDontHaveNumber"));
            return;
        }
        if (password !== confirmPassword) {
            setApiError(t("PasswordsDoNotMatch"));
            return;
        }
        if (!day || !month || !year) {
            setApiError(t('BirthDateFieldMustBeValid'));
            return;
        }
        if (!country) {
            setApiError(t("countryFieldIsRequired"));
            return;
        }


        // if (!user_type) {
        //     setApiError(t("userTypeRequired"));
        //     return;
        // }

        // resive data from user 
        const data = {
            name: fullName,
            mobile: phone,
            email,
            password,
            confirmPassword,
            birth_date: `${year}-${month}-${day}`,
            country,
            user_type: "qtap_clients"
        };


        const personalContextData = {
            fullName,
            phone,
            email,
            month,
            day,
            year,
            country,
            password,
            confirmPassword,
            user_type: "qtap_clients"
        };
        dispatch(updatePersonalData(personalContextData));
        navigate("/product")
        return;

    };

    return (
        <Box width="100%" maxWidth="400px" marginTop={"-30px"} mx="auto" px={2}>

            <FormControl variant="outlined" fullWidth >
                <OutlinedInput
                    id="outlined-fullname"
                    startAdornment={
                        <InputAdornment position="start">
                            <PersonOutlinedIcon sx={{ color: theme.palette.text.fixedGray, fontSize: "16px" }} />
                        </InputAdornment>
                    }
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t("fullName")}
                    sx={{
                        color: theme.palette.text.fixedGray,
                        borderRadius: '50px',
                        marginTop: "10px",
                        height: '33px', fontSize: "10px"
                    }}
                />
            </FormControl>

            <FormControl variant="outlined" fullWidth >
                <OutlinedInput
                    id="outlined-phone"
                    endAdornment={
                        <InputAdornment position="end">
                            <Typography sx={{ color: theme.palette.text.fixedGray, fontSize: "10px", color: theme.palette.text.fixedBlack }} >{t("verify")}</Typography>
                        </InputAdornment>
                    }
                    startAdornment={
                        <InputAdornment position="start">
                            <PhoneOutlinedIcon sx={{ color: theme.palette.text.fixedGray, fontSize: "16px" }} />
                        </InputAdornment>
                    }
                    placeholder={t("mobileNumber")}
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    sx={{ color: theme.palette.text.fixedGray, borderRadius: '50px', marginTop: "10px", height: '33px', fontSize: "10px" }}
                />
            </FormControl>

            <FormControl required variant="outlined" fullWidth >
                <OutlinedInput
                    id="outlined-email"
                    type="email"
                    startAdornment={
                        <InputAdornment position="start">
                            <EmailOutlinedIcon sx={{ color: theme.palette.text.fixedGray, fontSize: "16px" }} />
                        </InputAdornment>
                    }
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("email")}
                    sx={{ color: theme.palette.text.fixedGray, borderRadius: '50px', marginTop: "10px", height: '33px', fontSize: "10px" }}
                />
            </FormControl>

            <Grid container alignItems="center" sx={{ marginTop: "10px", }}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid container alignItems="center" sx={{ color: theme.palette.text.fixedGray, marginTop: "5px", marginBottom: "2px" }} >
                        <CalendarMonthOutlinedIcon sx={{ marginRight: 1, fontSize: "15px" }} />
                        <Typography variant="body1" sx={{ fontSize: "11px" }}>{t("dateOfBirth")}</Typography>
                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <Select
                            id="outlined-country"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            displayEmpty
                            sx={{ borderRadius: '50px', height: '33px', fontSize: "10px", color: theme.palette.text.fixedGray, marginRight: "5px" }}
                        >
                            <MenuItem value="" disabled sx={{ fontSize: "10px", color: theme.palette.text.fixedGray }} >
                                {t("month")}
                            </MenuItem>
                            <MenuItem value="01" sx={{ fontSize: "10px", color: theme.palette.text.fixedGray }}>01</MenuItem>
                            <MenuItem value="02" sx={{ fontSize: "10px", color: theme.palette.text.fixedGray }}>02</MenuItem>
                            <MenuItem value="03" sx={{ fontSize: "10px", color: theme.palette.text.fixedGray }}>03</MenuItem>
                            <MenuItem value="04" sx={{ fontSize: "10px", color: theme.palette.text.fixedGray }}>04</MenuItem>
                            <MenuItem value="05" sx={{ fontSize: "10px", color: theme.palette.text.fixedGray }}>05</MenuItem>
                            <MenuItem value="06" sx={{ fontSize: "10px", color: theme.palette.text.fixedGray }}>06</MenuItem>
                            <MenuItem value="07" sx={{ fontSize: "10px", color: theme.palette.text.fixedGray }}>07</MenuItem>
                            <MenuItem value="08" sx={{ fontSize: "10px", color: theme.palette.text.fixedGray }}>08</MenuItem>
                            <MenuItem value="09" sx={{ fontSize: "10px", color: theme.palette.text.fixedGray }}>09</MenuItem>
                            <MenuItem value="10" sx={{ fontSize: "10px", color: theme.palette.text.fixedGray }}>10</MenuItem>
                            <MenuItem value="11" sx={{ fontSize: "10px", color: theme.palette.text.fixedGray }}>11</MenuItem>
                            <MenuItem value="12" sx={{ fontSize: "10px", color: theme.palette.text.fixedGray }}>12</MenuItem>
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
                            sx={{
                                borderRadius: '50px',
                                height: '33px',
                                fontSize: "10px",
                                color: theme.palette.text.fixedGray,
                                marginRight: "5px"
                            }}
                        >
                            <MenuItem
                                value=""
                                disabled
                                sx={{ fontSize: "10px", color: theme.palette.text.fixedGray }}
                            >
                                {t("day")}
                            </MenuItem>

                            {[...Array(31).keys()].map((i) => {
                                const dayStr = String(i + 1).padStart(2, '0');
                                return (
                                    <MenuItem
                                        key={dayStr}
                                        value={dayStr}
                                        sx={{ fontSize: "10px", color: theme.palette.text.fixedGray }}
                                    >
                                        {dayStr}
                                    </MenuItem>
                                );
                            })}
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
                            sx={{ borderRadius: '50px', height: '33px', fontSize: "10px", color: theme.palette.text.fixedGray }}
                        >
                            <MenuItem value="" disabled sx={{ fontSize: "10px", color: theme.palette.text.fixedGray }}>
                                {t("year")}
                            </MenuItem>
                            {Array.from({ length: 2025 - 2000 + 1 }, (_, i) => (
                                <MenuItem key={i + 2000} value={i + 2000} sx={{ fontSize: "10px", color: theme.palette.text.fixedGray }}>
                                    {i + 2000}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>


            <FormControl variant="outlined" fullWidth  >
                <Select
                    id="outlined-country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    displayEmpty
                    sx={{ color: theme.palette.text.fixedGray, borderRadius: '50px', marginTop: "10px", height: '33px', fontSize: "10px", }}
                    startAdornment={
                        <InputAdornment position="start">
                            <span class="icon-map" style={{ color: theme.palette.text.fixedGray, fontSize: "14px" }}></span>
                        </InputAdornment>
                    }
                >
                    <MenuItem value="" disabled >
                        {t("country")}
                    </MenuItem>
                    {Governorates[Country.EGYPT].map((governorate) => (
                        <MenuItem key={governorate} value={governorate} sx={{ fontSize: "10px", color: theme.palette.text.fixedGray }} >
                            {governorate}
                        </MenuItem>
                    ))}
                    <MenuItem value="US" sx={{ fontSize: "10px", color: theme.palette.text.fixedGray }} >United States</MenuItem>
                    <MenuItem value="CA" sx={{ fontSize: "10px", color: theme.palette.text.fixedGray }} >Canada</MenuItem>
                    <MenuItem value="UK" sx={{ fontSize: "10px", color: theme.palette.text.fixedGray }} >United Kingdom</MenuItem>
                </Select>
            </FormControl>
            {/* <FormControl variant="outlined" fullWidth  >
                <Select
                    id="outlined-user-type"
                    value={user_type}
                    onChange={(e) => setUserType(e.target.value)}
                    displayEmpty
                    sx={{ borderRadius: '50px', marginTop: "10px", height: '33px', fontSize: "10px", color: theme.palette.text.fixedGray }}
                    startAdornment={
                        <InputAdornment position="start">
                            <PeopleOutlineIcon style={{ fontSize: "18px" }}></PeopleOutlineIcon>
                        </InputAdornment>
                    }
                >
                    <MenuItem value="" disabled >
                        {t("userType")}
                    </MenuItem>
                    <MenuItem value="qtap_admins" sx={{ fontSize: "10px", color: theme.palette.text.fixedGray }} >{t("admin")}</MenuItem>
                    <MenuItem value="qtap_clients" sx={{ fontSize: "10px", color: theme.palette.text.fixedGray }} >{t("client")}</MenuItem>
                    <MenuItem value="qtap_affiliates" sx={{ fontSize: "10px", color: theme.palette.text.fixedGray }} >{t("affiliate")}</MenuItem>
                </Select>
            </FormControl> */}

            <FormControl variant="outlined" fullWidth  >
                <OutlinedInput
                    id="outlined-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    startAdornment={
                        <InputAdornment position="start">
                            <span class="icon-padlock" style={{ color: theme.palette.text.fixedGray, fontSize: "18px" }}></span>
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOffOutlinedIcon sx={{ color: theme.palette.text.fixedGray, fontSize: "18px" }} />
                                    :
                                    <span class="icon-show" style={{ color: theme.palette.text.fixedGray, fontSize: "16px" }}></span>
                                }

                            </IconButton>
                        </InputAdornment>
                    }
                    placeholder={t("password")}
                    sx={{ color: theme.palette.text.fixedGray, borderRadius: '50px', marginTop: "10px", height: '33px', fontSize: "10px" }}
                />
            </FormControl>


            <FormControl variant="outlined" fullWidth >
                <OutlinedInput
                    id="outlined-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    startAdornment={
                        <InputAdornment position="start">
                            <span class="icon-padlock" style={{ color: theme.palette.text.fixedGray, fontSize: "18px" }}></span>

                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle confirm password visibility"
                                onClick={handleClickShowConfirmPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOffOutlinedIcon sx={{ color: theme.palette.text.fixedGray, fontSize: "18px" }} />
                                    :
                                    <span class="icon-show" style={{ color: theme.palette.text.fixedGray, fontSize: "16px" }}></span>
                                }
                            </IconButton>
                        </InputAdornment>
                    }
                    placeholder={t("confirmPass")}
                    sx={{ color: theme.palette.text.fixedGray, borderRadius: '50px', marginTop: "10px", height: '33px', fontSize: "10px" }}
                />
            </FormControl>

            <FormControlLabel sx={{ display: "flex", justifyContent: "center", width: "90%", marginTop: "20px", padding: "15px 25px 0 25px" }}
                control={<Checkbox
                    sx={{
                        color: "#c2bbbb",
                        transform: "scale(0.7)"
                    }}
                />}
                label={<Typography sx={{ fontSize: "10px", color: theme.palette.text.fixedGray }}> {t("registerAgree")}</Typography>}
            />
            {apiError && <Typography sx={{ color: theme.palette.text.red, fontSize: '13px', textAlign: "center" }}>{apiError}</Typography>}
            {apiSuccess && <Typography sx={{ color: theme.palette.text.green, fontSize: '13px', textAlign: "center" }}>{apiSuccess}</Typography>}
            <Button
                disabled={isLoading}
                variant="contained"
                fullWidth
                sx={{
                    marginTop: 2,
                    borderRadius: '50px',
                    backgroundColor: theme.palette.orangePrimary.main,
                    color: theme.palette.text.fixedWhite,
                    height: '35px',
                    textTransform: "capitalize",
                    '&:hover': {
                        backgroundColor: theme.palette.orangePrimary.main,
                    }
                }}
                onClick={() => { handleSignUp() }}
            >

                {t("signUp")}
            </Button>
        </Box>
    );
};

export default SignUp;
