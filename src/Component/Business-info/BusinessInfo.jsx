import { Box, Button, MenuItem, styled, TextField, ToggleButton, ToggleButtonGroup, Typography, Grid, InputAdornment, Select, FormControl, useTheme, IconButton, Checkbox, FormControlLabel } from '@mui/material'
import React, { useState, useEffect } from 'react'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { useNavigate } from 'react-router';
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { useBusinessContext } from '../../context/BusinessContext';

const daysOfWeek = ['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'];

const Divider = styled(Box)({
    width: '5%',
    height: '3px',
    backgroundColor: '#E57C00',
    borderRadius: "20px",
    marginBottom: "20px"
});

export const BusinessInfo = () => {
    const { businessData, updateBusinessData } = useBusinessContext();
    const navigate = useNavigate();
    const theme = useTheme();

    // Initialize all state values from context
    const [mode, setMode] = React.useState(businessData.mode || 'light');
    const [design, setDesign] = React.useState(businessData.design || 'grid');
    const [format, setFormat] = useState(businessData.format || '');
    const [currency, setCurrency] = useState(businessData.currency || '');
    const [country, setCountry] = useState(businessData.country || '');
    const [city, setCity] = useState(businessData.city || '');
    const [businessName, setBusinessName] = useState(businessData.businessName || '');
    const [website, setWebsite] = useState(businessData.website || '');
    const [businessEmail, setBusinessEmail] = useState(businessData.businessEmail || '');
    const [businessPhone, setBusinessPhone] = useState(businessData.businessPhone || '');
    const [selectedDays, setSelectedDays] = useState(businessData.workingHours?.selectedDays || ['Sa', 'Su']);
    const [currentDay, setCurrentDay] = useState(businessData.workingHours?.currentDay || 'Sunday');
    const [fromTime, setFromTime] = useState(businessData.workingHours?.fromTime || '9:00 am');
    const [toTime, setToTime] = useState(businessData.workingHours?.toTime || '5:00 pm');

    // Update context whenever any value changes
    useEffect(() => {
        updateBusinessData({
            mode,
            design,
            format,
            currency,
            country,
            city,
            businessName,
            website,
            businessEmail,
            businessPhone,
            workingHours: {
                selectedDays,
                currentDay,
                fromTime,
                toTime,
            }
        });
    }, [mode, design, format, currency, country, city, businessName, website, 
        businessEmail, businessPhone, selectedDays, currentDay, fromTime, toTime]);

    // Modify existing handlers to update both state and context
    const handleModeChange = (event, newMode) => {
        if (newMode !== null) {
            setMode(newMode);
        }
    };

    const handleDesignChange = (event, newDesign) => {
        if (newDesign !== null) {
            setDesign(newDesign);
        }
    };

    const handleDayClick = (day) => {
        const newSelectedDays = selectedDays.includes(day) 
            ? selectedDays.filter((d) => d !== day) 
            : [...selectedDays, day];
        setSelectedDays(newSelectedDays);
    };

    const handleTimeChange = (event, type) => {
        if (type === 'from') {
            setFromTime(event.target.value);
        } else {
            setToTime(event.target.value);
        }
    };

    const handleDayToggle = (direction) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentIndex = days.indexOf(currentDay);
        const newIndex = (currentIndex + (direction === 'next' ? 1 : -1) + days.length) % days.length;
        setCurrentDay(days[newIndex]);
    };

    const handleNextClick = () => {
        // Required fields validation
        if (!businessName.trim()) {
            alert('Please enter Business Name');
            return;
        }

        if (!businessPhone.trim()) {
            alert('Please enter Business Phone');
            return;
        }

        if (!country) {
            alert('Please select Country');
            return;
        }

        if (!city) {
            alert('Please select City');
            return;
        }

        if (!currency) {
            alert('Please select Currency');
            return;
        }

        if (!format) {
            alert('Please select Business Format');
            return;
        }

        // If all required fields are filled, navigate to next page
        navigate('/serving-ways');
    };

    return (
        <Box marginTop={"50px"}>
            <Typography variant="body1" sx={{ fontSize: "18px", color: "#222240" }}>
                Business Info .
            </Typography>
            <Divider />

            <Box sx={{ padding: "20px 50px" }}>

                <Grid container display="flex" justifyContent="center" alignItems="center"
                    textAlign="center" spacing={2}>
                    <Grid display={"flex"} justifyContent={"space-between"} >
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                placeholder="Business Name"
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <StorefrontOutlinedIcon sx={{ fontSize: "18px", color: "#575756" }} />
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        height: "35px",
                                        borderRadius: "10px",
                                        fontSize: "10px",
                                    }
                                }}
                                sx={{
                                    marginBottom: "10px",
                                    marginTop: "10px"
                                }}
                            />
                            <TextField
                                fullWidth
                                placeholder="Website (Optional)"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LanguageOutlinedIcon sx={{ fontSize: "18px", color: "#575756" }} />
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        height: "35px",
                                        borderRadius: "10px",
                                        fontSize: "10px",
                                    }
                                }}
                                sx={{
                                    marginBottom: "10px",
                                }}
                            />
                            <TextField
                                fullWidth
                                placeholder="Business Email (Optional)"
                                value={businessEmail}
                                onChange={(e) => setBusinessEmail(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <MailOutlinedIcon sx={{ fontSize: "18px", color: "#575756" }} />
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        height: "35px",
                                        borderRadius: "10px",
                                        fontSize: "10px",
                                    }
                                }}
                                sx={{
                                    marginBottom: "10px",
                                }}
                            />
                            <FormControl variant="outlined" fullWidth sx={{ marginBottom: '10px' }} >
                                <Select
                                    id="outlined-country"
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    displayEmpty
                                    sx={{ borderRadius: '10px', height: '35px', fontSize: "10px", color: "gray" }}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <img src="/assets/revenue.svg" alt="icon"
                                                style={{ width: "16px", height: "16px" }} />

                                        </InputAdornment>
                                    }
                                >
                                    <MenuItem value="" disabled>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            Currency
                                        </Box>
                                    </MenuItem>
                                    <MenuItem value="ul" sx={{ fontSize: "12px", color: "gray" }}>UL</MenuItem>
                                    <MenuItem value="uk" sx={{ fontSize: "12px", color: "gray" }}>UK</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl variant="outlined" fullWidth sx={{ marginBottom: '10px' }} >
                                <Select
                                    id="outlined-country"
                                    value={format}
                                    onChange={(e) => setFormat(e.target.value)}
                                    displayEmpty
                                    sx={{ borderRadius: '10px', height: '35px', fontSize: "10px", color: "gray" }}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <span class="icon-briefcase" style={{ fontSize: "18px" }} ></span>
                                        </InputAdornment>
                                    }
                                >
                                    <MenuItem value="" disabled>
                                        <Box sx={{ display: 'flex', alignItems: 'center', fontSize: "12px", color: "gray" }}>
                                            business Format
                                        </Box>
                                    </MenuItem>
                                    <MenuItem value="ul" sx={{ fontSize: "12px", color: "gray" }}>UL</MenuItem>
                                    <MenuItem value="uk" sx={{ fontSize: "12px", color: "gray" }}>UK</MenuItem>
                                </Select>
                            </FormControl>

                            {/*  Working Hours */}
                            <Box>
                                <Grid container spacing={2} alignItems="center" sx={{ marginTop: "40px" }}>
                                    <Typography variant="body1" display="flex" alignItems="center"
                                        sx={{ fontSize: '15px', color: "gray" }}>

                                        <span class="icon-working-hour" style={{ marginRight: "10px", fontSize: "20px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span></span>
                                        Working Hours
                                    </Typography>

                                    <Grid item xs={12} display={"flex"} justifyContent={"space-between"}>

                                        <Grid item xs={7}>
                                            <Box display="flex" flexWrap="wrap">
                                                {daysOfWeek.map((day) => (
                                                    <Button
                                                        key={day}
                                                        onClick={() => handleDayClick(day)}
                                                        sx={{
                                                            minWidth: '25px',
                                                            height: "45px",
                                                            width: "45px",
                                                            margin: '3px',
                                                            borderRadius: '5px',
                                                            textTransform: "capitalize",
                                                            fontSize: "14px",
                                                            border: selectedDays.includes(day) ? '1px solid #ef7d00' : '1px solid gray',
                                                            color: selectedDays.includes(day) ? '#ef7d00' : 'gray',

                                                        }}
                                                    >
                                                        {day}
                                                    </Button>
                                                ))}
                                            </Box>
                                        </Grid>{/* المربعات */}

                                        <Grid item xs={4}>
                                            <Grid container spacing={2} aignItems="center">

                                                <Grid item xs={3} sx={{ margin: "5px 20px" }}>
                                                    <Box display="flex" alignItems="center"
                                                        sx={{
                                                            backgroundColor: '#222240',
                                                            borderRadius: '20px', width: "100px", height: "30px",

                                                        }}>
                                                        <IconButton onClick={() => handleDayToggle('prev')} sx={{ color: '#ef7d00' }}>
                                                            <ArrowBackIos sx={{ fontSize: "11px" }} />
                                                        </IconButton>
                                                        <Typography sx={{ width: "60px", textTransform: "capitalize", color: 'white', fontSize: "10px" }}>
                                                            {currentDay}
                                                        </Typography>

                                                        <IconButton onClick={() => handleDayToggle('next')} sx={{ color: '#ef7d00' }}>
                                                            <ArrowForwardIos sx={{ fontSize: "11px" }} />
                                                        </IconButton>
                                                    </Box>
                                                </Grid> {/* اليوم الحالي */}

                                                <Box display={"flex"}>
                                                    <Grid item>
                                                        <Typography variant='body1' sx={{ fontSize: '11px', color: "gray", mr: 1 }}>From:</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <TextField
                                                            select
                                                            value={fromTime}
                                                            onChange={(e) => handleTimeChange(e, 'from')}
                                                            size="small"
                                                            sx={{ width: "90px", height: "30px" }}
                                                            inputProps={{ sx: { padding: '2px 10px', fontSize: '12px' } }}
                                                        >
                                                            {['9:00 am', '10:00 am', '11:00 am'].map((time) => (
                                                                <MenuItem key={time} value={time} sx={{ color: "gray", fontSize: "12px" }}>
                                                                    <span style={{ fontSize: "10px", color: "gray" }}>{time}</span>
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                    </Grid>
                                                </Box>{/* from */}

                                                <Box display={"flex"} marginTop={"3px"} marginLeft={"10px"}>
                                                    <Grid item>
                                                        <Typography variant='body1' sx={{ fontSize: '11px', color: "gray", mr: 1 }}>To:</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <TextField
                                                            select
                                                            value={toTime}
                                                            onChange={(e) => handleTimeChange(e, 'to')}
                                                            size="small"
                                                            sx={{ width: "90px", height: "30px" }}
                                                            inputProps={{ sx: { padding: '2px 10px', fontSize: '12px' } }}
                                                        >
                                                            {['5:00 pm', '6:00 pm', '7:00 pm'].map((time) => (
                                                                <MenuItem key={time} value={time} sx={{ color: "gray", fontSize: "12px" }}>
                                                                    <span style={{ fontSize: "10px", color: "gray" }}>{time}</span>
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                    </Grid>
                                                </Box> {/* to */}
                                            </Grid>
                                        </Grid>

                                    </Grid>

                                </Grid>
                            </Box>

                        </Grid>

                        <Grid item xs={12} md={5} sx={{ marginTop: "10px" }}>
                            <TextField
                                fullWidth
                                placeholder="Business Phone"
                                value={businessPhone}
                                onChange={(e) => setBusinessPhone(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneOutlinedIcon sx={{ fontSize: "18px" }} />
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        height: "35px",
                                        borderRadius: "10px",
                                        fontSize: "10px"
                                    }
                                }}
                            />

                            <Box sx={{ marginTop: "10px", marginBottom: "10px" }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <FormControl variant="outlined" fullWidth >
                                            <Select
                                                id="outlined-country"
                                                value={country}
                                                onChange={(e) => setCountry(e.target.value)}
                                                displayEmpty
                                                sx={{ borderRadius: '10px', height: '35px', fontSize: "10px", color: "gray" }}
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <PinDropOutlinedIcon sx={{ fontSize: "18px" }} />
                                                    </InputAdornment>
                                                }
                                            >
                                                <MenuItem value="" disabled sx={{ fontSize: "12px", color: "gray" }}>
                                                    Country
                                                </MenuItem>
                                                <MenuItem value="ul" sx={{ fontSize: "12px", color: "gray" }}>Alex </MenuItem>
                                                <MenuItem value="uk" sx={{ fontSize: "12px", color: "gray" }}>Egypt</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <FormControl variant="outlined" fullWidth  >
                                            <Select
                                                id="outlined-country"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                displayEmpty
                                                sx={{ borderRadius: '10px', height: '35px', fontSize: "10px", color: "gray" }}
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <PinDropOutlinedIcon sx={{ fontSize: "18px" }} />
                                                    </InputAdornment>
                                                }
                                            >
                                                <MenuItem value="" disabled sx={{ fontSize: "12px", color: "gray" }}>
                                                    City
                                                </MenuItem>
                                                <MenuItem value="ul" sx={{ fontSize: "12px", color: "gray" }}>Alex </MenuItem>
                                                <MenuItem value="uk" sx={{ fontSize: "12px", color: "gray" }}>Egypt</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: theme.palette.bluePrimary.main,
                                    borderRadius: "10px",
                                    textTransform: "capitalize",
                                    marginBottom: 2,
                                    width: '100%', fontSize: "11px",
                                    '&:hover': {
                                        backgroundColor: "#222240",
                                    },
                                }}
                            >
                                <span class="icon-map-1" style={{ fontSize: "18px", marginRight: "5px" }}
                                ><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span></span>

                                Pin Your Location
                            </Button>

                            <Box sx={{ marginTop: "6px", display: 'flex', justifyContent: 'space-between', width: '100%' }} >
                                <Grid container spacing={1}>
                                    <Typography variant="h3"
                                        sx={{ fontSize: "12px", fontWeight: "500", color: "gray" }}>
                                        Default Mode
                                    </Typography>

                                    <ToggleButtonGroup
                                        value={mode}
                                        exclusive
                                        onChange={handleModeChange}
                                    >
                                        <ToggleButton
                                            value="light"
                                            sx={{
                                                padding: "4px 10px",
                                                backgroundColor: mode === "light" ? "#E57C00" : "inherit",
                                                color: mode === "light" ? "#FFFFFF" : "inherit"
                                            }}
                                        >
                                            <WbSunnyIcon sx={{ fontSize: "30px", color: mode === "light" ? "#E57C00" : "#AAAAAA" }} />
                                        </ToggleButton>

                                        <ToggleButton
                                            value="dark"
                                            sx={{
                                                padding: "4px 10px",
                                                backgroundColor: mode === "dark" ? "#E57C00" : "inherit",
                                                color: mode === "dark" ? "#FFFFFF" : "inherit"
                                            }}
                                        >
                                            <NightlightIcon sx={{ fontSize: "30px", color: mode === "dark" ? "#E57C00" : "#AAAAAA" }} />
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>

                                <Divider orientation="vertical" flexItem
                                    sx={{ height: "56px", width: "2px", margin: "10px 50px 0px 0px" }} />

                                <Grid container spacing={1}>
                                    <Typography variant="h6"
                                        sx={{ fontSize: "12px", fontWeight: "500", color: "gray" }} >
                                        Menu Design
                                    </Typography>

                                    <ToggleButtonGroup
                                        value={design}
                                        exclusive
                                        onChange={handleDesignChange}
                                    >
                                        <ToggleButton
                                            value="grid"
                                            sx={{
                                                padding: "4px 10px",
                                                backgroundColor: design === "grid" ? "#E57C00" : "inherit",
                                                color: design === "grid" ? "#E57C00" : "inherit"
                                            }}
                                        >
                                            <span class=" icon-grid"
                                                style={{ fontSize: "25px", color: design === "grid" ? "#E57C00" : "#AAAAAA" }} />
                                        </ToggleButton>
                                        <ToggleButton
                                            value="list"
                                            sx={{
                                                padding: "4px 10px",
                                                backgroundColor: design === "list" ? "#E57C00" : "inherit",
                                                color: design === "list" ? "##E57C00" : "inherit"
                                            }}
                                        >
                                            <span class="icon-list"
                                                style={{ fontSize: "25px", color: design === "list" ? "#E57C00" : "#AAAAAA" }} />
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>

                            </Box>  {/*  Menu Design */}

                            <Box sx={{marginTop:"20px"}}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: "flex-start",
                                    textAlign: 'left',
                                    width: '100%'
                                }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                defaultChecked
                                                sx={{
                                                    '& .MuiSvgIcon-root': { fontSize: 20 },
                                                    color: "gray",
                                                    '&.Mui-checked': {
                                                        color: "#ef7d00",
                                                    }
                                                }}
                                            />
                                        }

                                        label={
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}>
                                                <span class="icon-hand-up" style={{ fontSize: "20px", color: 'gray', marginRight: "6px" }} ></span>
                                                <Typography sx={{ fontSize: "14px", color: "gray" }}>
                                                    Activate Call Waiter
                                                </Typography>
                                            </Box>
                                        }
                                        sx={{
                                            display: 'flex',
                                            alignItems: "center",
                                            '& .MuiTypography-root': {
                                                fontSize: "14px",
                                                color: "gray"
                                            }
                                        }}
                                    />
                                </Box>

                                <Box sx={{margin: "10px 0px"}}>
                                    <Typography variant="body1" sx={{ display: "flex", fontSize: "13px", color: "gray" }}  >
                                        Payment Method</Typography>

                                    <Box display="flex" justifyContent="left"  >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    defaultChecked
                                                    sx={{
                                                        '& .MuiSvgIcon-root': { fontSize: 18 },
                                                        color: "gray",
                                                        '&.Mui-checked': {
                                                            color: "#ef7d00",
                                                        }
                                                    }}
                                                />
                                            }
                                            label="💸 Cash"
                                            sx={{
                                                '& .MuiTypography-root': {
                                                    fontSize: "11px", color: "gray"
                                                }
                                            }}
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    defaultChecked
                                                    sx={{
                                                        '& .MuiSvgIcon-root': { fontSize: 18 },
                                                        color: "gray",
                                                        '&.Mui-checked': {
                                                            color: "#ef7d00",
                                                        }
                                                    }}
                                                />
                                            }
                                            label={
                                                <span style={{ display: 'flex',fontSize:"11px", alignItems: 'center' }}>
                                                    <span class="icon-wallet" style={{ marginRight: '2px', fontSize: "15px" }} ><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span></span>
                                                    Digital Wallet
                                                </span>
                                            }
                                            sx={{
                                                '& .MuiTypography-root': {
                                                    fontSize: "10px", color: "gray"
                                                }
                                            }}
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    defaultChecked
                                                    sx={{
                                                        '& .MuiSvgIcon-root': { fontSize: 18 },
                                                        color: "gray",
                                                        '&.Mui-checked': {
                                                            color: "#ef7d00",
                                                        }
                                                    }}
                                                />
                                            }
                                            label="💳 Card"
                                            sx={{
                                                '& .MuiTypography-root': {
                                                    fontSize: "11px", color: "gray",
                                                }
                                            }}
                                        />
                                    </Box>

                                </Box>

                                <Box >
                                    <Typography variant="body1" sx={{ display: "flex", fontSize: "13px", color: "gray" }}  >
                                        Payment Time  </Typography>

                                    <Box display="flex" justifyContent="left"  >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    defaultChecked
                                                    sx={{
                                                        '& .MuiSvgIcon-root': { fontSize: 20 },
                                                        color: "gray",
                                                        '&.Mui-checked': {
                                                            color: "#ef7d00",
                                                        }
                                                    }}
                                                />
                                            }
                                            label="Before Serving"
                                            sx={{
                                                '& .MuiTypography-root': {
                                                    fontSize: "11px", color: "gray"
                                                }
                                            }}
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    defaultChecked
                                                    sx={{
                                                        '& .MuiSvgIcon-root': { fontSize: 20 },
                                                        color: "gray",
                                                        '&.Mui-checked': {
                                                            color: "#ef7d00",
                                                        }
                                                    }}
                                                />
                                            }
                                            label="After Serving "
                                            sx={{
                                                '& .MuiTypography-root': {
                                                    fontSize: "11px", color: "gray"
                                                }
                                            }}
                                        />
                                    </Box>

                                </Box>
                            </Box>

                        </Grid>
                    </Grid>



                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            sx={{
                                width: '20%',
                                fontSize: "13px",
                                borderRadius: '50px',
                                backgroundColor: "#E57C00",
                                textTransform: 'none',
                                padding: "6px 0",
                                position: "fixed",
                                bottom: "30px",
                                left: "55%",
                                '&:hover': {
                                    backgroundColor: "#E57C00",
                                },
                                color: "#fff"
                            }}
                            onClick={handleNextClick}
                        >
                            Nextdddddd
                            <TrendingFlatIcon sx={{ marginLeft: "8px", fontSize: "18px" }} />
                        </Button>
                    </Grid> {/* الزرار  */}


                </Grid>
            </Box>
        </Box>
    );
};
