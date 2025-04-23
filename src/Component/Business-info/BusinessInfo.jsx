import { Box, Button, MenuItem, styled, TextField, ToggleButton, ToggleButtonGroup, Typography, Grid, InputAdornment, Select, FormControl, useTheme, IconButton, Checkbox, FormControlLabel, Radio } from '@mui/material'
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
import { useTranslation } from 'react-i18next';
import GridViewIcon from '@mui/icons-material/GridView';
import ListIcon from '@mui/icons-material/List';
import { toast } from 'react-toastify';

const daysOfWeek = ['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'];



export const BusinessInfo = () => {
    const theme = useTheme();
    const Divider = styled(Box)({
    width: '5%',
    height: '3px',
    backgroundColor: theme.palette.orangePrimary.main,
    borderRadius: "20px",
    marginBottom: "20px"
});
    const { businessData, updateBusinessData } = useBusinessContext();
    const navigate = useNavigate();
    


    // Initialize all state values from context
    const [mode, setMode] = React.useState(businessData.mode || 'white');
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
    const [paymentMethods, setPaymentMethods] = useState(businessData.paymentMethods || []);
    const [paymentTime, setPaymentTime] = useState(businessData.paymentTime || '');
    const [activeWaiter, setActiveWaiter] = useState(businessData.callWaiter || 'inactive');

    const { t } = useTranslation()
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
            callWaiter: activeWaiter,
            paymentTime,
            paymentMethods,
            workingHours: {
                selectedDays,
                currentDay,
                fromTime,
                toTime,
            }
        });
    }, [mode, design, format, currency, country, city, businessName, website,
        businessEmail, businessPhone, selectedDays, currentDay, fromTime, toTime, activeWaiter, paymentTime, paymentMethods]);

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
        const days = [
            t("sunday"),
            t("monday"),
            t("tuesday"),
            t("wednesday"),
            t("thursday"),
            t("friday"),
            t("saturday")];
        const currentIndex = days.indexOf(currentDay);
        const newIndex = (currentIndex + (direction === 'next' ? 1 : -1) + days.length) % days.length;
        setCurrentDay(days[newIndex]);
    };

    const handleNextClick = () => {
        // Required fields validation
        if (!businessName.trim()) {
            toast.error(t("plEntBusinessName"));
            return;
        }

        if (!businessPhone.trim()) {
            toast.error(t("plEntBusinessPhone"));
            return;
        }

        if (!country) {
            toast.error(t("plSelectCountry"));
            return;
        }

        if (!city) {
            toast.error(t("plSelectCity"));
            return;
        }

        if (!currency) {
            toast.error(t("plSelectCurrency"));
            return;
        }

        if (!format) {
            alert(t("plSelectBusinessFormat"));
            return;
        }
        // console.log("Business Data:", {
        //     mode,
        //     design,
        //     format,
        //     currency,
        //     country,
        //     city,
        //     businessName,
        //     website,
        //     businessEmail,
        //     businessPhone,
        //     callWaiter: activeWaiter,
        //     paymentTime,
        //     paymentMethods,
        //     workingHours: {
        //     selectedDays,
        //     currentDay,
        //     fromTime,
        //     toTime,
        //     }
        // });
        

        // Add the current business data as a new branch

        setMode('white');
        setDesign('grid');
        setFormat('');
        setCurrency('');
        setCountry('');
        setCity('');
        setBusinessName('');
        setWebsite('');
        setBusinessEmail('');
        setBusinessPhone('');
        setSelectedDays(['Sa', 'Su']);
        setCurrentDay('Sunday');
        setFromTime('9:00 am');
        setToTime('5:00 pm');
        setPaymentMethods([]);
        setPaymentTime('');
        setActiveWaiter('inactive');
        navigate('/serving-ways');

    };

    return (
        <Box marginTop={"50px"} padding={"20px 0 0 40px "}>
            <Typography variant="body1" sx={{ fontSize: "18px", color: theme.palette.secondaryColor.main }}>
                {t("busnessInfo")}
            </Typography>
            <Divider />

            <Box sx={{ padding: "20px 50px" }}>

                <Grid container display="flex" justifyContent="space-between" alignItems="center" flexDirection='column'
                    gap='1rem' textAlign="center" spacing={2}>
                    <Grid container display={"flex"} justifyContent={"space-between"} >
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                placeholder={t("businessName")}
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <StorefrontOutlinedIcon sx={{ fontSize: "18px", color: "#575756" }} />
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        height: "40px",
                                        borderRadius: "10px",
                                        fontSize: "10px",
                                    }
                                }}
                                sx={{
                                    marginBottom: "15px",
                                    marginTop: "10px"
                                }}
                            />
                            <TextField
                                fullWidth
                                placeholder={t("website")}
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LanguageOutlinedIcon sx={{ fontSize: "18px", color: "#575756" }} />
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        height: "40px",
                                        borderRadius: "10px",
                                        fontSize: "10px",
                                    }
                                }}
                                sx={{
                                    marginBottom: "15px",
                                    
                                }}
                            />
                            <TextField
                                fullWidth
                                placeholder={t("businessEmail")}
                                value={businessEmail}
                                onChange={(e) => setBusinessEmail(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <MailOutlinedIcon sx={{ fontSize: "18px", color: "#575756" }} />
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        height: "40px",
                                        borderRadius: "10px",
                                        fontSize: "10px",
                                    }
                                }}
                                sx={{
                                    marginBottom: "15px",
                                }}
                            />
                            <FormControl variant="outlined" fullWidth sx={{ marginBottom: '10px' }} >
                                <Select
                                    id="outlined-country"
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    displayEmpty
                                    sx={{ borderRadius: '10px', height: '40px',marginBottom:"10px", fontSize: "10px", color: "gray" }}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <img src="/assets/revenue.svg" alt="icon"
                                                style={{ width: "16px", height: "16px" }} />

                                        </InputAdornment>
                                    }
                                >
                                    <MenuItem value="" disabled>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            {t("currency")}
                                        </Box>
                                    </MenuItem>
                                    <MenuItem value="US" sx={{ fontSize: "12px", color: "gray" }}>United States </MenuItem>
                                    <MenuItem value="CA" sx={{ fontSize: "12px", color: "gray" }}>Canada</MenuItem>
                                    <MenuItem value="UK" sx={{ fontSize: "12px", color: "gray" }}>United Kingdom</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl variant="outlined" fullWidth sx={{ marginBottom: '10px' }} >
                                <Select
                                    id="outlined-country"
                                    value={format}
                                    onChange={(e) => setFormat(e.target.value)}
                                    displayEmpty
                                    sx={{ borderRadius: '10px', height: '40px',marginBottom:"10px", fontSize: "10px", color: "gray" }}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <span className="icon-briefcase" style={{ fontSize: "18px" }} ></span>
                                        </InputAdornment>
                                    }
                                >
                                    <MenuItem value="" disabled>
                                        <Box sx={{ display: 'flex', alignItems: 'center', fontSize: "12px", color: "gray" }}>
                                            {t("businessFormat")}
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

                                        <span className="icon-working-hour" style={{ marginRight: "10px", fontSize: "20px" }}><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span><span className="path5"></span><span className="path6"></span><span className="path7"></span><span className="path8"></span></span>
                                        {t("workHours")}
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
                                            <Grid container spacing={2} alignItems="center">

                                                <Grid item xs={3} sx={{ margin: "5px 20px" }}>
                                                    <Box display="flex" alignItems="center"
                                                        sx={{
                                                            backgroundColor: theme.palette.secondaryColor.main,
                                                            borderRadius: '20px', width: "100px", height: "30px",
                                                            padding: "0 3px ",
                                                        }}>
                                                        <IconButton onClick={() => handleDayToggle('prev')} sx={{ color: '#ef7d00' }}>
                                                            <ArrowBackIos sx={{ fontSize: "11px" }} />
                                                        </IconButton>
                                                        <Typography sx={{ width: "60px", textTransform: "capitalize", color: 'white', fontSize: "10px" }}>
                                                            {t(currentDay)}
                                                        </Typography>

                                                        <IconButton onClick={() => handleDayToggle('next')} sx={{ color: '#ef7d00' }}>
                                                            <ArrowForwardIos sx={{ fontSize: "11px" }} />
                                                        </IconButton>
                                                    </Box>
                                                </Grid> {/* اليوم الحالي */}

                                                <Box display={"flex"} sx={{ margin: "3px 0 3px 10px" }}>
                                                    <Grid item>
                                                        <Typography variant='body1' sx={{ fontSize: '11px', color: "gray", mr: 1 }}>{t("from")}</Typography>
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

                                                <Box display={"flex"} marginTop={"3px"} marginLeft={"24px"}>
                                                    <Grid item>
                                                        <Typography variant='body1' sx={{ fontSize: '11px', color: "gray", mr: 1 }}>{t("to")}</Typography>
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
                                placeholder={t("businessPhone")}
                                value={businessPhone}
                                onChange={(e) => setBusinessPhone(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneOutlinedIcon sx={{ fontSize: "18px" }} />
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        height: "40px",
                                        borderRadius: "10px",
                                        fontSize: "10px"
                                    }
                                }}
                            />

                            <Box sx={{ marginTop: "15px", marginBottom: "10px" }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <FormControl variant="outlined" fullWidth >
                                            <Select
                                                id="outlined-country"
                                                value={country}
                                                onChange={(e) => setCountry(e.target.value)}
                                                displayEmpty
                                                sx={{ borderRadius: '10px', height: '40px',marginBottom:"10px", fontSize: "10px", color: "gray" }}
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <PinDropOutlinedIcon sx={{ fontSize: "18px" }} />
                                                    </InputAdornment>
                                                }
                                            >
                                                <MenuItem value="" disabled sx={{ fontSize: "12px", color: "gray" }}>
                                                    {t("country")}
                                                </MenuItem>
                                                <MenuItem value="US" sx={{ fontSize: "12px", color: "gray" }}>United States </MenuItem>
                                                <MenuItem value="CA" sx={{ fontSize: "12px", color: "gray" }}>Canada</MenuItem>
                                                <MenuItem value="UK" sx={{ fontSize: "12px", color: "gray" }}>United Kingdom</MenuItem>
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
                                                sx={{ borderRadius: '10px', height: '40px',marginBottom:"10px", fontSize: "10px", color: "gray" }}
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <PinDropOutlinedIcon sx={{ fontSize: "18px" }} />
                                                    </InputAdornment>
                                                }
                                            >
                                                <MenuItem value="" disabled sx={{ fontSize: "12px", color: "gray" }}>
                                                    {t("city")}
                                                </MenuItem>
                                                <MenuItem value="NY" sx={{ fontSize: "12px", color: "gray" }}>New York</MenuItem>
                                                <MenuItem value="LA" sx={{ fontSize: "12px", color: "gray" }}>Los Angeles</MenuItem>
                                                <MenuItem value="CHI" sx={{ fontSize: "12px", color: "gray" }}>Chicago</MenuItem>
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
                                        backgroundColor: theme.palette.secondaryColor.main,
                                    },
                                }}
                            >
                                <span className="icon-map-1" style={{ fontSize: "18px", marginRight: "5px" }}
                                ><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span><span className="path5"></span><span className="path6"></span><span className="path7"></span><span className="path8"></span><span className="path9"></span><span className="path10"></span><span className="path11"></span><span className="path12"></span><span className="path13"></span><span className="path14"></span><span className="path15"></span></span>

                                {t("pinYourLocation")}
                            </Button>


                            <Box sx={{ marginTop: "6px", display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                {/* Default Mode Section */}
                                <Grid container direction="column" spacing={1}>
                                    <Typography
                                        variant="body2"
                                        sx={{ fontSize: "14px", fontWeight: "500", color: "#AAAAAA", textAlign: "start", margin: "0 0 5px 5px" }}
                                    >
                                        {t("defaultMode")}
                                    </Typography>
                                    <ToggleButtonGroup
                                        value={mode}
                                        exclusive
                                        onChange={handleModeChange}
                                        sx={{ backgroundColor: 'transparent', display: "flex", justifyContent: "space-around", marginLeft: "-14px" }}
                                    >
                                        <ToggleButton
                                            value="white"
                                            sx={{
                                                padding: "10px",
                                                backgroundColor: mode === "white" ? theme.palette.orangePrimary.main : "transparent",
                                                border: `1px solid ${design === "white" ? theme.palette.orangePrimary.main : "#AAAAAA"} !important`,
                                                borderRadius: "8px !important",
                                                marginRight: "8px",
                                            }}
                                        >
                                            <WbSunnyIcon
                                                sx={{ fontSize: "35px", color: mode === "white" ? theme.palette.orangePrimary.main : "#AAAAAA" }}
                                            />
                                        </ToggleButton>
                                        <ToggleButton
                                            value="dark"
                                            sx={{
                                                padding: "10px",
                                                backgroundColor: mode === "dark" ? theme.palette.orangePrimary.main : "transparent",
                                                border: `1px solid ${design === "dark" ? theme.palette.orangePrimary.main : "#AAAAAA"} !important`,
                                                borderRadius: "8px !important",
                                            }}
                                        >
                                            <NightlightIcon
                                                sx={{ fontSize: "35px", color: mode === "dark" ? theme.palette.orangePrimary.main : "#AAAAAA" }}
                                            />
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>

                                {/* Divider */}
                                <Divider
                                    orientation="vertical"
                                    flexItem
                                    sx={{
                                        height: "40px",
                                        width: "2px",
                                        backgroundColor: theme.palette.orangePrimary.main,
                                        margin: "auto 20px",
                                    }}
                                />

                                {/* Menu Design Section */}
                                <Grid container direction="column" spacing={0.5}>
                                    <Typography
                                        variant="body2"
                                        sx={{ fontSize: "14px", fontWeight: "500", color: "#AAAAAA", textAlign: "start", margin: "0 0 5px 5px" }}
                                    >
                                        {t("menus.design")}
                                    </Typography>
                                    <ToggleButtonGroup
                                        value={design}
                                        exclusive
                                        onChange={handleDesignChange}
                                        sx={{ backgroundColor: 'transparent', display: "flex", justifyContent: "space-around", marginLeft: "-14px" }}
                                    >
                                        <ToggleButton
                                            value="grid"
                                            sx={{
                                                padding: "10px",
                                                backgroundColor: design === "grid" ? theme.palette.orangePrimary.main : "transparent",
                                                border: `1px solid ${design === "grid" ? theme.palette.orangePrimary.main : "#AAAAAA"} !important`,
                                                borderRadius: "8px !important",
                                                marginRight: "8px",
                                            }}
                                        >
                                            <GridViewIcon
                                                sx={{ fontSize: "35px", color: design === "grid" ? theme.palette.orangePrimary.main : "#AAAAAA" }}
                                            />
                                        </ToggleButton>
                                        <ToggleButton
                                            value="list"
                                            sx={{
                                                padding: "10px",
                                                backgroundColor: design === "list" ? theme.palette.orangePrimary.main : "transparent",
                                                border: `1px solid ${design === "list" ? theme.palette.orangePrimary.main : "#AAAAAA"} !important`,
                                                borderRadius: "8px !important",
                                                marginRight: "8px",
                                            }}
                                        >
                                            <ListIcon
                                                sx={{ fontSize: "35px", color: design === "list" ? theme.palette.orangePrimary.main : "#AAAAAA" }}
                                            />
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                            </Box>



                            <Box sx={{ marginTop: "20px" }}>
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
                                                defaultChecked={activeWaiter === 'active' ? true : false}
                                                onChange={() => setActiveWaiter(activeWaiter === 'active' ? 'inactive' : 'active')}
                                                sx={{
                                                    '& .MuiSvgIcon-root': { fontSize: 22 },
                                                    color: "gray",
                                                    '&.Mui-checked': {
                                                        color: theme.palette.orangePrimary.main,
                                                    }
                                                }}
                                            />
                                        }

                                        label={
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}>
                                                <span className="icon-hand-up" style={{ fontSize: "20px", color: 'gray', marginRight: "6px" }} ></span>
                                                <Typography sx={{ fontSize: "14px", color: "gray" }}>
                                                    {t("activeCallWaiter")}
                                                </Typography>
                                            </Box>
                                        }
                                        sx={{
                                            display: 'flex',
                                            alignItems: "center",
                                            '& .MuiTypography-root': {
                                                fontSize: "15px",
                                                color: "gray"
                                            }
                                        }}
                                    />
                                </Box>

                                <Box sx={{ margin: "18px 0px" }}>
                                    <Typography variant="body1" sx={{ display: "flex", fontSize: "14px", color: "gray" }}  >
                                        {t("paymentMethod")}</Typography>

                                    <Box display="flex" justifyContent="left"  >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    onChange={() => setPaymentMethods(paymentMethods.includes("cash") ? paymentMethods.filter(method => method !== "cash") : [...paymentMethods, "cash"])}
                                                    defaultChecked={paymentMethods.includes("cash")}
                                                    sx={{
                                                        '& .MuiSvgIcon-root': { fontSize: 22 },
                                                        color: "gray",
                                                        '&.Mui-checked': {
                                                            color: theme.palette.orangePrimary.main,
                                                        }
                                                    }}
                                                />
                                            }
                                            label={
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <img
                                                        src="/assets/cash.svg"
                                                        alt="cash icon"
                                                        style={{ width: '15px', height: '15px', marginRight: '4px', marginLeft: '-5px' }}
                                                    />
                                                    <span>{t("cash")}</span>
                                                </Box>
                                            }
                                            sx={{
                                                '& .MuiTypography-root': {
                                                    fontSize: "13px", color: "gray"
                                                }
                                            }}
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    onChange={() => setPaymentMethods(paymentMethods.includes("wallet") ? paymentMethods.filter(method => method !== "wallet") : [...paymentMethods, "wallet"])}
                                                    defaultChecked={paymentMethods.includes("wallet")}
                                                    sx={{
                                                        '& .MuiSvgIcon-root': { fontSize: 22 },
                                                        color: "gray",
                                                        '&.Mui-checked': {
                                                            color: theme.palette.orangePrimary.main,
                                                        }
                                                    }}
                                                />
                                            }
                                            label={
                                                <span style={{ display: 'flex', fontSize: "13px", alignItems: 'center' }}>
                                                    <span className="icon-wallet" style={{ marginRight: '2px', fontSize: "20px" }} ><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span><span className="path5"></span><span className="path6"></span><span className="path7"></span><span className="path8"></span><span className="path9"></span><span className="path10"></span><span className="path11"></span><span className="path12"></span></span>
                                                    {t("digitalWaller")}
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
                                                    onChange={() => setPaymentMethods(paymentMethods.includes("card") ? paymentMethods.filter(method => method !== "card") : [...paymentMethods, "card"])}
                                                    defaultChecked={paymentMethods.includes("card")}
                                                    sx={{
                                                        '& .MuiSvgIcon-root': { fontSize: 22 },
                                                        color: "gray",
                                                        '&.Mui-checked': {
                                                            color: theme.palette.orangePrimary.main,
                                                        }
                                                    }}
                                                />
                                            }
                                            label={
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <img
                                                        src="/assets/cardColor.svg"
                                                        alt="card icon"
                                                        style={{ width: '15px', height: '15px', marginRight: '4px', marginLeft: '-5px' }}
                                                    />
                                                    <span>{t("card")}</span>
                                                </Box>
                                            }
                                            sx={{
                                                '& .MuiTypography-root': {
                                                    fontSize: "13px", color: "gray",
                                                }
                                            }}
                                        />
                                    </Box>

                                </Box>
                                <Box >
                                    <Typography variant="body1" sx={{ display: "flex", fontSize: "14px", color: "gray" }}  >
                                        {t("paymentTime")}  </Typography>

                                    <Box display="flex" justifyContent="left"  >
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    checked={paymentTime === 'before'}
                                                    onChange={() => setPaymentTime('before')}
                                                    sx={{
                                                        '& .MuiSvgIcon-root': { fontSize: 20 },
                                                        color: "gray",
                                                        '&.Mui-checked': {
                                                            color: theme.palette.orangePrimary.main,
                                                        }
                                                    }}
                                                />
                                            }
                                            label={t("beforeServing")}
                                            sx={{
                                                '& .MuiTypography-root': {
                                                    fontSize: "13px", color: "gray"
                                                }
                                            }}
                                        />
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    checked={paymentTime === 'after'}
                                                    onChange={() => setPaymentTime('after')}
                                                    sx={{
                                                        '& .MuiSvgIcon-root': { fontSize: 20 },
                                                        color: "gray",
                                                        '&.Mui-checked': {
                                                            color: theme.palette.orangePrimary.main,
                                                        }
                                                    }}
                                                />
                                            }
                                            label={t("afterServing")}
                                            sx={{
                                                '& .MuiTypography-root': {
                                                    fontSize: "13px", color: "gray"
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
                                width: '300px',
                                fontSize: "13px",
                                borderRadius: '50px',
                                backgroundColor: theme.palette.orangePrimary.main,
                                textTransform: 'none',
                                padding: "6px 15px",
                                // position: "fixed",
                                // bottom: "30px",
                                // left: "55%",
                                '&:hover': {
                                    backgroundColor: theme.palette.orangePrimary.main,
                                },
                                color: "#fff",
                            }}
                            onClick={handleNextClick}
                        >
                            {t("next")}
                            <TrendingFlatIcon sx={{ marginLeft: "8px", fontSize: "18px" }} />
                        </Button>
                    </Grid> {/* الزرار  */}


                </Grid>
            </Box>
        </Box>
    );
};
