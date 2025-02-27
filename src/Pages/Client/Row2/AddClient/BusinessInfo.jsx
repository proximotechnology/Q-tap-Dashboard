import React from 'react';
import { Grid, FormControl, OutlinedInput, InputAdornment, Select, MenuItem, Typography, Button, Checkbox, FormControlLabel, Divider, Box, IconButton, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useRegisterClient } from '../../../../context/RegisterClientContext';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CardTravelOutlinedIcon from '@mui/icons-material/CardTravelOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightIcon from '@mui/icons-material/Nightlight';

const daysOfWeek = ['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'];

export const BusinessInfo = () => {
    const { clientData, setClientData } = useRegisterClient();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClientData((prevData) => ({
            ...prevData,
            businessInfo: { ...prevData.businessInfo, [name]: value }
        }));
    };

    const handleContactChange = (e, field) => {
        const { value } = e.target;
        setClientData((prevData) => ({
            ...prevData,
            businessInfo: {
                ...prevData.businessInfo,
                contactInfo: { ...prevData.businessInfo.contactInfo, [field]: value }
            }
        }));
    };

    const handleBranchClick = (branch) => {
        setClientData((prevData) => ({
            ...prevData,
            businessInfo: { ...prevData.businessInfo, selectedBranch: branch }
        }));
    };

    const handleModeChange = (event, newMode) => {
        if (newMode !== null) {
            setClientData((prevData) => ({
                ...prevData,
                businessInfo: { ...prevData.businessInfo, mode: newMode }
            }));
        }
    };

    const handleDesignChange = (event, newDesign) => {
        if (newDesign !== null) {
            setClientData((prevData) => ({
                ...prevData,
                businessInfo: { ...prevData.businessInfo, design: newDesign }
            }));
        }
    };

    const handleDayClick = (day) => {
        setClientData((prevData) => ({
            ...prevData,
            businessInfo: {
                ...prevData.businessInfo,
                selectedDays: prevData.businessInfo.selectedDays.includes(day)
                    ? prevData.businessInfo.selectedDays.filter((d) => d !== day)
                    : [...prevData.businessInfo.selectedDays, day]
            }
        }));
    };

    const handleTimeChange = (event, type) => {
        setClientData((prevData) => ({
            ...prevData,
            businessInfo: {
                ...prevData.businessInfo,
                workSchedules: { ...prevData.businessInfo.workSchedules, [type]: event.target.value }
            }
        }));
    };

    const handleDayToggle = (direction) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentIndex = days.indexOf(clientData.businessInfo.currentDay);
        const newIndex = (currentIndex + (direction === 'next' ? 1 : -1) + days.length) % days.length;
        setClientData((prevData) => ({
            ...prevData,
            businessInfo: { ...prevData.businessInfo, currentDay: days[newIndex] }
        }));
    };

    // const handleCheckboxChange = (e, category) => {
    //     const { name, checked } = e.target;
    //     setClientData((prevData) => ({
    //         ...prevData,
    //         businessInfo: {
    //             ...prevData.businessInfo,
    //             [category]: { ...prevData.businessInfo[category], [name]: checked }
    //         }
    //     }));
    // };

    const handleCheckboxChange = (e, category) => {
        const { name, checked } = e.target;

        if (category === 'businessInfo') {
            // Handle non-nested properties (like callWaiter)
            setClientData((prevData) => ({
                ...prevData,
                businessInfo: {
                    ...prevData.businessInfo,
                    [name]: checked, // Directly update the property
                },
            }));
        } else {
            // Handle nested properties (like servingWays, paymentMethods, etc.)
            setClientData((prevData) => ({
                ...prevData,
                businessInfo: {
                    ...prevData.businessInfo,
                    [category]: {
                        ...prevData.businessInfo[category],
                        [name]: checked,
                    },
                },
            }));
        }
    };
    const handlePrint = () => {
        window.print();
    };

    return (
        <Grid container sx={{ marginTop: "20px", paddingLeft: "20px" }} >
            <Grid item xs={12}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Box>
                        <Typography variant="body2" sx={{ fontSize: "15px" }} color="#3b3a3a" gutterBottom>
                            Business Info
                        </Typography>
                        <Divider sx={{ width: "100%", borderBottom: "4px solid #ef7d00", marginBottom: "18px" }} />
                    </Box>
                    <Box>
                        <IconButton><span className="icon-delete" style={{ fontSize: "23px" }} ></span> </IconButton>
                        <IconButton onClick={handlePrint}>
                            <img src="/assets/print.svg" alt="icon" style={{ width: "22px", height: "22px" }} />
                        </IconButton>
                    </Box>
                </Box>
                <Box display="flex" gap={2}>
                    <Button
                        variant="contained"
                        onClick={() => handleBranchClick('branch1')}
                        sx={{
                            backgroundColor: clientData.businessInfo.selectedBranch === 'branch1' ? '#ef7d00' : '#bdbdbd',
                            color: 'white',
                            borderRadius: '10px',
                            padding: '3px 15px',
                            display: 'flex',
                            alignItems: 'center',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: clientData.businessInfo.selectedBranch === 'branch1' ? '#ef7d00' : '#bdbdbd',
                            },
                        }}
                    >
                        <StorefrontOutlinedIcon sx={{ marginRight: '5px', fontSize: "20px" }} />
                        Branch 01 Info
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => handleBranchClick('branch2')}
                        sx={{
                            backgroundColor: clientData.businessInfo.selectedBranch === 'branch2' ? '#ef7d00' : '#bdbdbd',
                            color: 'white',
                            borderRadius: '10px',
                            padding: '3px 15px',
                            display: 'flex',
                            alignItems: 'center',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: clientData.businessInfo.selectedBranch === 'branch2' ? '#ef7d00' : '#bdbdbd',
                            },
                        }}
                    >
                        <StorefrontOutlinedIcon sx={{ marginRight: '5px', fontSize: "20px" }} />
                        Branch 02 Info
                    </Button>
                </Box>
                <Divider sx={{ margin: "12px 0px" }} />
            </Grid>

            <Grid item xs={12} md={12} display={"flex"} justifyContent={"space-between"} >

                <Grid md={6} sx={{ marginRight: "40px" }}>
                    <FormControl variant="outlined" fullWidth  >
                        <OutlinedInput
                            id="outlined-businessName"
                            name="businessName"
                            value={clientData.businessInfo.businessName}
                            onChange={handleChange}
                            startAdornment={
                                <InputAdornment position="start">
                                    <StorefrontOutlinedIcon sx={{ fontSize: "20px" }} />
                                </InputAdornment>
                            }
                            required
                            placeholder="Business Name"
                            sx={{ borderRadius: '10px', marginBottom: "10px !important", height: '33px', fontSize: "12px" }}
                        />
                    </FormControl>

                    <FormControl variant="outlined" fullWidth width="100%" >
                        <OutlinedInput
                            id="outlined-businessPhone"
                            name="businessPhone"
                            value={clientData.businessInfo.contactInfo.businessPhone}
                            onChange={(e) => handleContactChange(e, 'businessPhone')}
                            startAdornment={
                                <InputAdornment position="start">
                                    <PhoneOutlinedIcon sx={{ fontSize: "20px" }} />
                                </InputAdornment>
                            }
                            required
                            placeholder="Business Phone"
                            sx={{ borderRadius: '10px', height: '33px', marginBottom: "10px", fontSize: "12px" }}
                        />
                    </FormControl>

                    <FormControl variant="outlined" fullWidth width="100%" >
                        <OutlinedInput
                            id="outlined-businessEmail"
                            name="businessEmail"
                            value={clientData.businessInfo.contactInfo.businessEmail}
                            onChange={(e) => handleContactChange(e, 'businessEmail')}
                            startAdornment={
                                <InputAdornment position="start">
                                    <MailOutlinedIcon sx={{ fontSize: "20px" }} />
                                </InputAdornment>
                            }
                            required
                            placeholder="Business Email"
                            type='email'
                            sx={{ borderRadius: '10px', marginBottom: "10px", height: '33px', fontSize: "12px" }}
                        />
                    </FormControl>

                    <Box display="flex" justifyContent="space-between" width="100%" marginBottom="10px">
                        <FormControl variant="outlined" sx={{ width: '48%' }}>
                            <Select
                                id="outlined-country"
                                name="country"
                                value={clientData.businessInfo.country}
                                onChange={handleChange}
                                displayEmpty
                                sx={{ borderRadius: '10px', height: '33px', fontSize: "12px", color: "gray" }}
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

                        <FormControl variant="outlined" sx={{ width: '48%' }}>
                            <Select
                                id="outlined-city"
                                name="city"
                                value={clientData.businessInfo.city}
                                onChange={handleChange}
                                displayEmpty
                                sx={{ borderRadius: '10px', height: '33px', fontSize: "12px", color: "gray" }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <PinDropOutlinedIcon sx={{ fontSize: "20px" }} />
                                    </InputAdornment>
                                }
                            >
                                <MenuItem value="" disabled >
                                    City
                                </MenuItem>
                                <MenuItem value="NY">New York</MenuItem>
                                <MenuItem value="LA">Los Angeles</MenuItem>
                                <MenuItem value="CHI">Chicago</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box display="flex" alignItems="center" marginBottom="10px" >
                        <Button variant="contained" fullWidth
                            sx={{
                                textTransform: "capitalize", backgroundColor: "#222240", color: "white",
                                borderRadius: "10px", fontSize: "11px", height: "30px",
                                '&:hover': {
                                    backgroundColor: "#222240",
                                }
                            }}>
                            <span className="icon-map-1" style={{ fontSize: "18px", marginRight: "6px" }}><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span><span className="path5"></span><span className="path6"></span><span className="path7"></span><span className="path8"></span><span className="path9"></span><span className="path10"></span><span className="path11"></span><span className="path12"></span><span className="path13"></span><span className="path14"></span><span className="path15"></span></span>
                            Pin Your Location
                        </Button>
                    </Box>

                    <FormControl variant="outlined" sx={{ width: '100%', marginBottom: "10px" }}>
                        <Select
                            id="outlined-currency"
                            name="currency"
                            value={clientData.businessInfo.currency}
                            onChange={handleChange}
                            displayEmpty
                            sx={{ borderRadius: '10px', height: '33px', fontSize: "12px", color: "gray" }}
                            startAdornment={
                                <InputAdornment position="start">
                                    <AttachMoneyIcon sx={{ fontSize: "20px" }} />
                                </InputAdornment>
                            }
                        >
                            <MenuItem value="" disabled >
                                Currency
                            </MenuItem>
                            <MenuItem value="USD">USD</MenuItem>
                            <MenuItem value="CAD">CAD</MenuItem>
                            <MenuItem value="GBP">GBP</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl variant="outlined" sx={{ width: '100%', marginBottom: "10px" }}>
                        <Select
                            id="outlined-businessType"
                            name="businessType"
                            value={clientData.businessInfo.businessType}
                            onChange={handleChange}
                            displayEmpty
                            sx={{ borderRadius: '10px', height: '33px', fontSize: "12px", color: "gray" }}
                            startAdornment={
                                <InputAdornment position="start">
                                    <CardTravelOutlinedIcon sx={{ fontSize: "20px" }} />
                                </InputAdornment>
                            }
                        >
                            <MenuItem value="" disabled >
                                Business Type
                            </MenuItem>
                            <MenuItem value="restaurant">Restaurant</MenuItem>
                            <MenuItem value="cafe">Cafe</MenuItem>
                            <MenuItem value="cloud">Cloud kitchens</MenuItem>
                            <MenuItem value="fast">Fast Food</MenuItem>
                            <MenuItem value="truck">Food Truck</MenuItem>
                            <MenuItem value="bakery">Bakery Store</MenuItem>
                            <MenuItem value="pastry">Pastry Store</MenuItem>
                            <MenuItem value="fruits">Fruits Store</MenuItem>
                            <MenuItem value="retail">Retail Store</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl variant="outlined" sx={{ width: '100%', marginBottom: "10px" }}>
                        <Select
                            id="outlined-menuDefaultLanguage"
                            name="menuDefaultLanguage"
                            value={clientData.businessInfo.menuDefaultLanguage}
                            onChange={handleChange}
                            displayEmpty
                            sx={{ borderRadius: '10px', height: '33px', fontSize: "12px", color: "gray" }}
                            startAdornment={
                                <InputAdornment position="start">
                                    <LanguageOutlinedIcon sx={{ fontSize: "20px" }} />
                                </InputAdornment>
                            }
                        >
                            <MenuItem value="" disabled >
                                Menu Default Language
                            </MenuItem>
                            <MenuItem value="EN">English</MenuItem>
                            <MenuItem value="FR">French</MenuItem>
                            <MenuItem value="ES">Spanish</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl variant="outlined" sx={{ width: '100%', marginBottom: "10px" }}>
                        <Select
                            id="outlined-numberOfTables"
                            name="numberOfTables"
                            value={clientData.businessInfo.numberOfTables}
                            onChange={handleChange}
                            displayEmpty
                            sx={{ borderRadius: '10px', height: '33px', fontSize: "12px", color: "gray" }}
                            startAdornment={
                                <InputAdornment position="start">
                                    {/* <TableBarIcon sx={{ fontSize: "20px" }} /> */}
                                </InputAdornment>
                            }
                        >
                            <MenuItem value="" disabled >
                                How Many Tables Do You Have
                            </MenuItem>
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="6">6</MenuItem>
                        </Select>
                    </FormControl>

                    <Divider sx={{ width: "100%", borderBottom: "1px solid #9d9d9c", marginBottom: "18px" }} />

                    <Typography variant='body2' sx={{ fontSize: "14px", color: "gray", display: "flex" }}>
                        <SellOutlinedIcon sx={{ color: "gray", fontSize: "20px", marginRight: "6px" }} /> Bundle</Typography>

                    <Box display="flex" alignItems="center" justifyContent="flex-start" mb={2}>
                        <Button variant="outlined"
                            sx={{
                                border: "1px solid gray ", textTransform: "capitalize", color: "gray", padding: "1px 25px",
                                borderRadius: "8px"
                            }}
                        ><CheckOutlinedIcon sx={{ fontSize: '20px', marginRight: "6px", color: "#ef7d00" }} /> Pro</Button>

                        <Button variant="contained"
                            sx={{
                                backgroundColor: "#222240", textTransform: "capitalize", color: "white", padding: "3px 30px",
                                borderRadius: "8px", marginLeft: "10px",
                                '&:hover': {
                                    backgroundColor: "#322240",
                                }
                            }}
                        >Change Bundle</Button>
                    </Box>

                </Grid>

                <Grid md={6}>
                    <Grid
                        sx={{
                            display: 'flex',
                            flexDirection: "column",
                            marginTop: "10px",
                            width: "100%"
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                width: '100%',
                            }}
                        >
                            <Grid container spacing={1}>
                                <Typography variant="h3"
                                    sx={{ fontSize: "13px", width: "100%", fontWeight: "500", color: "gray" }}
                                >
                                    Default Mode
                                </Typography>
                                <ToggleButtonGroup
                                    value={clientData.businessInfo.mode}
                                    exclusive
                                    onChange={handleModeChange}
                                >
                                    <ToggleButton
                                        value="white"
                                        sx={{
                                            padding: "5px 8px",
                                            backgroundColor: clientData.businessInfo.mode === "white" ? "#E57C00" : "inherit",
                                            color: clientData.businessInfo.mode === "white" ? "#FFFFFF" : "gray"
                                        }}
                                    >
                                        <WbSunnyIcon sx={{ fontSize: "30px", color: clientData.businessInfo.mode === "white" ? "#E57C00" : "inherit" }} />
                                    </ToggleButton>

                                    <ToggleButton
                                        value="dark"
                                        sx={{
                                            padding: "5px 8px",
                                            backgroundColor: clientData.businessInfo.mode === "dark" ? "#E57C00" : "inherit",
                                            color: clientData.businessInfo.mode === "dark" ? "#FFFFFF" : "gray"
                                        }}
                                    >
                                        <NightlightIcon sx={{ fontSize: "30px", color: clientData.businessInfo.mode === "dark" ? "#E57C00" : "inherit" }} />
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>

                            <Divider orientation="vertical" flexItem
                                sx={{ height: "50px", marginRight: "25px", width: "1px", backgroundColor: "orange" }} />

                            <Grid container spacing={1}>
                                <Typography variant="h6"
                                    sx={{ fontSize: "13px", width: "100%", fontWeight: "500", color: "gray" }}
                                >
                                    Menu Design
                                </Typography>
                                <ToggleButtonGroup
                                    value={clientData.businessInfo.design}
                                    exclusive
                                    onChange={handleDesignChange}
                                >
                                    <ToggleButton
                                        value="grid"
                                        sx={{
                                            padding: "5px 8px",
                                            backgroundColor: clientData.businessInfo.design === "grid" ? "#E57C00" : "inherit",
                                            color: clientData.businessInfo.design === "grid" ? "#E57C00" : "inherit"
                                        }}
                                    >
                                        <ViewQuiltIcon sx={{ fontSize: "30px", color: clientData.businessInfo.design === "grid" ? "#E57C00" : "gray" }} />
                                    </ToggleButton>
                                    <ToggleButton
                                        value="list"
                                        sx={{
                                            padding: "5px 8px",
                                            backgroundColor: clientData.businessInfo.design === "list" ? "#E57C00" : "inherit",
                                            color: clientData.businessInfo.design === "list" ? "#E57C00" : "inherit"
                                        }}
                                    >
                                        <FormatListBulletedIcon sx={{ fontSize: "30px", color: clientData.businessInfo.design === "list" ? "#E57C00" : "gray" }} />
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                        </Box>

                        <Divider sx={{ backgroundColor: "#f4f6fc", height: "2px", margin: "8px 0px" }} flexItem />
                        <Box>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} display={"flex"} justifyContent={"space-between"}>
                                    <Typography variant="body1" display="flex" alignItems="center"
                                        sx={{ fontSize: '12px', color: "gray" }}>
                                        <span className="icon-working-hour" style={{ marginRight: "10px", fontSize: "22px" }}><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span><span className="path5"></span><span className="path6"></span><span className="path7"></span><span className="path8"></span></span>
                                        Working Hours
                                    </Typography>

                                    <Grid item xs={3}>
                                        <Box display="flex" alignItems="center"
                                            sx={{
                                                backgroundColor: '#222240',
                                                borderRadius: '20px', width: "90px", height: "30px",

                                            }}>
                                            <IconButton onClick={() => handleDayToggle('prev')} sx={{ color: '#ef7d00' }}>
                                                <ArrowBackIos sx={{ fontSize: "11px" }} />
                                            </IconButton>
                                            <Typography sx={{ width: "60px", textTransform: "capitalize", color: 'white', fontSize: "10px" }}>
                                                {clientData.businessInfo.currentDay}
                                            </Typography>

                                            <IconButton onClick={() => handleDayToggle('next')} sx={{ color: '#ef7d00' }}>
                                                <ArrowForwardIos sx={{ fontSize: "11px" }} />
                                            </IconButton>
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Grid item xs={7}>
                                    <Box display="flex" flexWrap="wrap">
                                        {daysOfWeek.map((day) => (
                                            <Button
                                                key={day}
                                                onClick={() => handleDayClick(day)}
                                                sx={{
                                                    minWidth: '25px',
                                                    height: "30px",
                                                    width: "30px",
                                                    margin: '3px',
                                                    borderRadius: '5px',
                                                    textTransform: "capitalize",
                                                    fontSize: "12px",
                                                    border: clientData.businessInfo.selectedDays.includes(day) ? '1px solid #ef7d00' : '1px solid gray',
                                                    color: clientData.businessInfo.selectedDays.includes(day) ? '#ef7d00' : 'gray',

                                                }}
                                            >
                                                {day}
                                            </Button>
                                        ))}
                                    </Box>
                                </Grid>


                                <Grid item xs={4} sx={{ marginLeft: "20px" }}>
                                    <Grid container spacing={2} aignItems="center">
                                        <Box display={"flex"}>
                                            <Grid item>
                                                <Typography variant='body1' sx={{ fontSize: '11px', color: "gray", mr: 1 }}>From:</Typography>
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    select
                                                    value={clientData.businessInfo.fromTime}
                                                    onChange={(e) => handleTimeChange(e, 'fromTime')}
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
                                        </Box>
                                        <Box display={"flex"} marginTop={"3px"} marginLeft={"10px"}>
                                            <Grid item>
                                                <Typography variant='body1' sx={{ fontSize: '11px', color: "gray", mr: 1 }}>To:</Typography>
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    select
                                                    value={clientData.businessInfo.toTime}
                                                    onChange={(e) => handleTimeChange(e, 'toTime')}
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
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>


                        </Box>
                    </Grid>

                    <Divider sx={{ backgroundColor: "#f4f6fc", height: "2px", margin: "8px 0px" }} flexItem />

                    <Box >
                        <Typography variant="body1" sx={{ display: "flex", fontSize: "12px", color: "gray" }}  >
                            <span className="icon-waiter" style={{ fontSize: "20px", marginRight: "6px" }} ></span>
                            Serving Ways</Typography>
                        <Box display="flex"   >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="dine_in"
                                        checked={clientData.businessInfo.servingWays.dine_in}
                                        onChange={(e) => handleCheckboxChange(e, 'servingWays')}
                                        sx={{
                                            '& .MuiSvgIcon-root': { fontSize: 20 },
                                            color: "gray",
                                            '&.Mui-checked': {
                                                color: "#ef7d00",
                                            }
                                        }}
                                    />
                                }
                                label="Dine In"
                                sx={{
                                    '& .MuiTypography-root': {
                                        fontSize: "12px", color: "gray"
                                    }
                                }}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="take_away"
                                        checked={clientData.businessInfo.servingWays.take_away}
                                        onChange={(e) => handleCheckboxChange(e, 'servingWays')}
                                        sx={{
                                            '& .MuiSvgIcon-root': { fontSize: 20 },
                                            color: "gray",
                                            '&.Mui-checked': {
                                                color: "#ef7d00",
                                            }
                                        }}
                                    />
                                }
                                label="take Away"
                                sx={{
                                    '& .MuiTypography-root': {
                                        fontSize: "12px", color: "gray"
                                    }
                                }}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="delivery"
                                        checked={clientData.businessInfo.servingWays.delivery}
                                        onChange={(e) => handleCheckboxChange(e, 'servingWays')}
                                        sx={{
                                            '& .MuiSvgIcon-root': { fontSize: 20 },
                                            color: "gray",
                                            '&.Mui-checked': {
                                                color: "#ef7d00",
                                            }
                                        }}
                                    />
                                }
                                label="Delivery"
                                sx={{
                                    '& .MuiTypography-root': {
                                        fontSize: "12px", color: "gray"
                                    }
                                }}
                            />
                        </Box>

                    </Box>
                    <Divider sx={{ backgroundColor: "#f4f6fc", height: "2px", margin: "8px 0px" }} flexItem />

                    {/* <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: "flex-start",
                        textAlign: 'left',
                    }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="callWaiter"
                                    checked={clientData.businessInfo.callWaiter}
                                    onChange={(e) => handleCheckboxChange(e, 'businessInfo')}
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
                                    <span className="icon-hand-up" style={{ fontSize: "20px", color: 'gray', marginRight: "6px" }} ></span>
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
                    </Box> */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: "flex-start",
                        textAlign: 'left',
                    }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="callWaiter"
                                    checked={clientData.businessInfo.callWaiter}
                                    onChange={(e) => handleCheckboxChange(e, 'businessInfo')} // Pass 'businessInfo' as the category
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
                                    <span className="icon-hand-up" style={{ fontSize: "20px", color: 'gray', marginRight: "6px" }} ></span>
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
                    <Divider sx={{ backgroundColor: "#f4f6fc", height: "2px", margin: "8px 0x" }} flexItem />

                    <Box >
                        <Typography variant="body1" sx={{ marginTop: "10px", display: "flex", fontSize: "12px", color: "gray" }}  >
                            Payment Method</Typography>

                        <Box display="flex" justifyContent="left"  >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="cash"
                                        checked={clientData.businessInfo.paymentMethods.cash}
                                        onChange={(e) => handleCheckboxChange(e, 'paymentMethods')}
                                        sx={{
                                            '& .MuiSvgIcon-root': { fontSize: 18 },
                                            color: "gray",
                                            '&.Mui-checked': {
                                                color: "#ef7d00",
                                            }
                                        }}
                                    />
                                }
                                label="💸Cash"
                                sx={{
                                    '& .MuiTypography-root': {
                                        fontSize: "10px", color: "gray"
                                    }
                                }}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="wallet"
                                        checked={clientData.businessInfo.paymentMethods.wallet}
                                        onChange={(e) => handleCheckboxChange(e, 'paymentMethods')}
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
                                    <span style={{ display: 'flex', alignItems: 'center' }}>
                                        <span className="icon-wallet" style={{ marginRight: '2px', fontSize: "15px" }} ><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span><span className="path5"></span><span className="path6"></span><span className="path7"></span><span className="path8"></span><span className="path9"></span><span className="path10"></span><span className="path11"></span><span className="path12"></span></span>
                                        Wallet
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
                                        name="card"
                                        checked={clientData.businessInfo.paymentMethods.card}
                                        onChange={(e) => handleCheckboxChange(e, 'paymentMethods')}
                                        sx={{
                                            '& .MuiSvgIcon-root': { fontSize: 18 },
                                            color: "gray",
                                            '&.Mui-checked': {
                                                color: "#ef7d00",
                                            }
                                        }}
                                    />
                                }
                                label="💳Card"
                                sx={{
                                    '& .MuiTypography-root': {
                                        fontSize: "10px", color: "gray",
                                    }
                                }}
                            />
                        </Box>

                    </Box>
                    <Divider sx={{ backgroundColor: "#f4f6fc", height: "2px", margin: "8px 0px" }} flexItem />


                    <Box >
                        <Typography variant="body1" sx={{ display: "flex", fontSize: "12px", color: "gray" }}  >
                            Payment Time  </Typography>

                        <Box display="flex" justifyContent="left"  >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="beforeServing"
                                        checked={clientData.businessInfo.paymentTime.beforeServing}
                                        onChange={(e) => handleCheckboxChange(e, 'paymentTime')}
                                        sx={{
                                            '& .MuiSvgIcon-root': { fontSize: 22 },
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
                                        fontSize: "13px", color: "gray"
                                    }
                                }}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="afterServing"
                                        checked={clientData.businessInfo.paymentTime.afterServing}
                                        onChange={(e) => handleCheckboxChange(e, 'paymentTime')}
                                        sx={{
                                            '& .MuiSvgIcon-root': { fontSize: 22 },
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
                                        fontSize: "13px", color: "gray"
                                    }
                                }}
                            />
                        </Box>

                    </Box>

                </Grid>
            </Grid>
        </Grid>

    )
}
