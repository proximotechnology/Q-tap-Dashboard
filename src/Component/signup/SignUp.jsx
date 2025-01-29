import { Box, Button, Checkbox, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, MenuItem, OutlinedInput, Select, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { usePersonalContext } from '../../context/PersonalContext';


const SignUp = () => {
    const navigate = useNavigate();
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
    const [user_type, setUserType] = useState('');

    const [apiError, setApiError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [apiSuccess, setApiSuccess] = useState('');
     const [clientDataFromRegist , setClientDataFromRegist] = useState()

    const { updatePersonalData } = usePersonalContext();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const theme = useTheme()

    // call api to register
    const handleSignUp = async () => {

        setApiError('');
        setApiSuccess('');

        // inputs validate 
        if (!fullName || !phone || !email || !password || !confirmPassword) {
            setApiError('All fields are required!');
            return;
        }

        if (password !== confirmPassword) {
            setApiError('Passwords do not match!');
            return;
        }
        if (!day || !month || !year) {
            setApiError('The birth date field must be a valid date');
            return;
        }
        if (!country) {
            setApiError('The country field is required');
            return;
        }

        if (!user_type) {
            setApiError('The user type field is required');
            return;
        }

        // resive data from user 
        const data = {
            name: fullName,
            mobile: phone,
            email,
            password,
            confirmPassword,
            birth_date: `${year}-${month}-${day}`,
            country,
            user_type
        };        

        // Store data in PersonalContext if user is affiliate
        if (user_type === "qtap_clients") {
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
                user_type
            };
            updatePersonalData(personalContextData);
            navigate("/product")
            return;
        }


        // send data to api 
        try {
            setIsLoading(true);
            const options = {
                method: 'POST',
                url: "https://highleveltecknology.com/Qtap/api/register" ,
                headers: { 'Content-Type': 'application/json' },
                data

            }
            const response = await axios.request(options)
                .then(res => res)
                .catch(error => console.log(error))
            console.log(response);

            setIsLoading(false);


            if (response?.data?.status === "success") {
                setApiSuccess('Registration successful!');

                // dashboard-affiliate

            } else {
                setApiError(response?.data?.message || 'check email or phone again may be dublicated!');
            }
        } catch (error) {
            setIsLoading(false);
            setApiError(error.response?.data?.message || 'Failed to register. Please try again.');
        }
    };

    return (
        <Box width="100%" maxWidth="400px" marginTop={"-30px"} mx="auto" px={2}>

            <FormControl variant="outlined" fullWidth >
                <OutlinedInput
                    id="outlined-fullname"
                    startAdornment={
                        <InputAdornment position="start">
                            <PersonOutlinedIcon sx={{ fontSize: "16px" }} />
                        </InputAdornment>
                    }
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    sx={{ borderRadius: '50px', marginTop: "10px", height: '33px', fontSize: "10px" }}
                />
            </FormControl>

            <FormControl variant="outlined" fullWidth >
                <OutlinedInput
                    id="outlined-phone"
                    endAdornment={
                        <InputAdornment position="end">
                            <Typography sx={{ fontSize: "10px", color: "black" }} >Verify</Typography>
                        </InputAdornment>
                    }
                    startAdornment={
                        <InputAdornment position="start">
                            <PhoneOutlinedIcon sx={{ fontSize: "16px" }} />
                        </InputAdornment>
                    }
                    placeholder="Mobile Number"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    sx={{ borderRadius: '50px', marginTop: "10px", height: '33px', fontSize: "10px" }}
                />
            </FormControl>

            <FormControl required variant="outlined" fullWidth >
                <OutlinedInput
                    id="outlined-email"
                    type="email"
                    startAdornment={
                        <InputAdornment position="start">
                            <EmailOutlinedIcon sx={{ fontSize: "16px" }} />
                        </InputAdornment>
                    }
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    sx={{ borderRadius: '50px', marginTop: "10px", height: '33px', fontSize: "10px" }}
                />
            </FormControl>

            <Grid container alignItems="center" sx={{ marginTop: "10px", }}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid container alignItems="center" sx={{ color: "grey", marginTop: "5px" }} >
                        <CalendarMonthOutlinedIcon sx={{ marginRight: 1, fontSize: "15px" }} />
                        <Typography variant="body1" sx={{ fontSize: "11px" }}>Date of Birth:</Typography>
                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <Select
                            id="outlined-country"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            displayEmpty
                            sx={{ borderRadius: '50px', height: '33px', fontSize: "10px", color: "gray", marginRight: "5px" }}
                        >
                            <MenuItem value="" disabled sx={{ fontSize: "10px", color: "gray" }} >
                                Month
                            </MenuItem>
                            <MenuItem value="01" sx={{ fontSize: "10px", color: "gray" }}>01</MenuItem>
                            <MenuItem value="02" sx={{ fontSize: "10px", color: "gray" }}>02</MenuItem>
                            <MenuItem value="03" sx={{ fontSize: "10px", color: "gray" }}>03</MenuItem>
                            <MenuItem value="04" sx={{ fontSize: "10px", color: "gray" }}>04</MenuItem>
                            <MenuItem value="05" sx={{ fontSize: "10px", color: "gray" }}>05</MenuItem>
                            <MenuItem value="06" sx={{ fontSize: "10px", color: "gray" }}>06</MenuItem>
                            <MenuItem value="07" sx={{ fontSize: "10px", color: "gray" }}>07</MenuItem>
                            <MenuItem value="08" sx={{ fontSize: "10px", color: "gray" }}>08</MenuItem>
                            <MenuItem value="09" sx={{ fontSize: "10px", color: "gray" }}>09</MenuItem>
                            <MenuItem value="10" sx={{ fontSize: "10px", color: "gray" }}>10</MenuItem>
                            <MenuItem value="11" sx={{ fontSize: "10px", color: "gray" }}>11</MenuItem>
                            <MenuItem value="12" sx={{ fontSize: "10px", color: "gray" }}>12</MenuItem>
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
                            sx={{ borderRadius: '50px', height: '33px', fontSize: "10px", color: "gray", marginRight: "5px" }}
                        >
                            <MenuItem value="" disabled sx={{ fontSize: "10px", color: "gray" }}>
                                Day
                            </MenuItem>
                            {[...Array(31).keys()].map((i) => (
                                <MenuItem key={i + 1} value={i + 1} sx={{ fontSize: "10px", color: "gray" }} >
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
                            sx={{ borderRadius: '50px', height: '33px', fontSize: "10px", color: "gray" }}
                        >
                            <MenuItem value="" disabled sx={{ fontSize: "10px", color: "gray" }}>
                                Year
                            </MenuItem>
                            {Array.from({ length: 2025 - 2000 + 1 }, (_, i) => (
                                <MenuItem key={i + 2000} value={i + 2000} sx={{ fontSize: "10px", color: "gray" }}>
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
                    sx={{ borderRadius: '50px', marginTop: "10px", height: '33px', fontSize: "10px", color: "gray" }}
                    startAdornment={
                        <InputAdornment position="start">
                            <span class="icon-map" style={{ fontSize: "14px" }}></span>
                        </InputAdornment>
                    }
                >
                    <MenuItem value="" disabled >
                        Country
                    </MenuItem>
                    <MenuItem value="US" sx={{ fontSize: "10px", color: "gray" }} >United States</MenuItem>
                    <MenuItem value="CA" sx={{ fontSize: "10px", color: "gray" }} >Canada</MenuItem>
                    <MenuItem value="UK" sx={{ fontSize: "10px", color: "gray" }} >United Kingdom</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth  >
                <Select
                    id="outlined-user-type"
                    value={user_type}
                    onChange={(e) => setUserType(e.target.value)}
                    displayEmpty
                    sx={{ borderRadius: '50px', marginTop: "10px", height: '33px', fontSize: "10px", color: "gray" }}
                    startAdornment={
                        <InputAdornment position="start">
                            <span class="icon-map" style={{ fontSize: "14px" }}></span>
                        </InputAdornment>
                    }
                >
                    <MenuItem value="" disabled >
                        User Type
                    </MenuItem>
                    <MenuItem value="qtap_admins" sx={{ fontSize: "10px", color: "gray" }} >Admin</MenuItem>
                    <MenuItem value="qtap_clients" sx={{ fontSize: "10px", color: "gray" }} >Client</MenuItem>
                    <MenuItem value="qtap_affiliates" sx={{ fontSize: "10px", color: "gray" }} >Affiliate</MenuItem>
                </Select>
            </FormControl>

            <FormControl variant="outlined" fullWidth  >
                <OutlinedInput
                    id="outlined-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    startAdornment={
                        <InputAdornment position="start">
                            <span class="icon-padlock" style={{ fontSize: "18px" }}></span>
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOffOutlinedIcon sx={{ fontSize: "18px" }} />
                                    :
                                    <span class="icon-show" style={{ fontSize: "16px" }}></span>
                                }

                            </IconButton>
                        </InputAdornment>
                    }
                    placeholder="Password"
                    sx={{ borderRadius: '50px', marginTop: "10px", height: '33px', fontSize: "10px" }}
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
                            <span class="icon-padlock" style={{ fontSize: "18px" }}></span>

                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle confirm password visibility"
                                onClick={handleClickShowConfirmPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOffOutlinedIcon sx={{ fontSize: "18px" }} />
                                    :
                                    <span class="icon-show" style={{ fontSize: "16px" }}></span>
                                }
                            </IconButton>
                        </InputAdornment>
                    }
                    placeholder="Confirm Password"
                    sx={{ borderRadius: '50px', marginTop: "10px", height: '33px', fontSize: "10px" }}
                />
            </FormControl>

            <FormControlLabel sx={{ display: "flex", justifyContent: "center", width: "90%", marginTop: "10px" }}
                control={<Checkbox
                    sx={{
                        color: "#c2bbbb",
                        transform: "scale(0.7)"
                    }}
                />}
                label={<Typography sx={{ fontSize: "10px", color: "gray" }}> I agree to the terms and conditions and privacy policy. Learn More</Typography>}
            />
            {apiError && <Typography sx={{ color: 'red', fontSize: '13px', textAlign: "center" }}>{apiError}</Typography>}
            {apiSuccess && <Typography sx={{ color: 'green', fontSize: '13px', textAlign: "center" }}>{apiSuccess}</Typography>}
            <Button
                disabled={isLoading}
                variant="contained"
                fullWidth
                sx={{
                    marginTop: 2,
                    borderRadius: '50px',
                    backgroundColor: theme.palette.orangePrimary.main,
                    color: '#ffffff',
                    height: '35px',
                    textTransform: "capitalize",
                    '&:hover': {
                        backgroundColor: '#E57C00',
                    }
                }}
                onClick={() => { handleSignUp() }}
            >

                Sign Up
            </Button>
        </Box>
    );
};

export default SignUp;
