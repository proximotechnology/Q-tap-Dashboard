import React, { useState, useContext, useEffect } from 'react';
import {
    Grid,
    Divider,
    Box,
    Typography,
    Button,
    Checkbox,
    FormControlLabel,
    ToggleButton,
    ToggleButtonGroup,
    FormControl,
    MenuItem,
    Select,
    Paper,
    Radio,
} from '@mui/material';
import { styled } from '@mui/system';
import StraightIcon from '@mui/icons-material/Straight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightIcon from '@mui/icons-material/Nightlight';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { ClientLoginData } from '../../../../context/ClientLoginDataContext';
import Days from '../Menu/Days';
import { toast } from 'react-toastify';

const StyledButton = styled(Button)(() => ({
    backgroundColor: '#222240',
    color: '#fff',
    padding: '1px 30px',
    textTransform: 'capitalize',
    borderRadius: '20px',
    fontSize: '9px',
    textAlign: 'center',
    justifyContent: 'center',
    '&:hover': {
        backgroundColor: '#222240',
    },
}));

const ImageBox = styled(Box)(({ imageUrl }) => ({
    width: '120px',
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
    backgroundColor: imageUrl ? 'transparent' : '#F1F2F2',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '50%',
}));

const Menu = () => {
    const { clientData, getClientData } = useContext(ClientLoginData);
    const { qtap_clients } = clientData;
    const selectedBranch = localStorage.getItem('selectedBranch');

    const existBranch = qtap_clients?.brunchs?.find((branch) => branch?.id == selectedBranch) || {};
    const [mode, setMode] = useState(existBranch?.default_mode?.toLowerCase() || 'light');
    const [design, setDesign] = useState(existBranch?.menu_design?.toLowerCase() || 'grid');
    const [logoImage, setLogoImage] = useState(existBranch?.logo || null);
    const [bannerImage, setBannerImage] = useState(existBranch?.cover || null);
    const [servingWays, setServingWays] = useState(
        existBranch?.serving_ways?.map((way) => way.name) || []
    );
    const [tablesNumber, setTablesNumber] = useState(
        existBranch?.serving_ways?.find((way) => way.name === 'dine_in')?.tables_number || '12'
    );
    const [paymentServices, setPaymentServices] = useState(
        existBranch?.payment_services?.map((service) => service.name) || []
    );
    const [callWaiter, setCallWaiter] = useState(existBranch?.call_waiter || 'active');
    const [paymentTime, setPaymentTime] = useState(existBranch?.payment_time || 'before');
    const [selectedButtons, setSelectedButtons] = useState(
        existBranch?.workschedule?.map((day) => day.day) || []
    );

    // Initialize workSchedules from API
    const [workSchedules, setWorkSchedules] = useState(
        existBranch?.workschedule?.filter((day) => day.day) || []
    );

    // Helper function to format API time (e.g., "9am" to "9:00 am")
    const formatTime = (time) => {
        if (!time) return '9:00 am'; // Default fallback
        const match = time.match(/(\d+)(am|pm)/i);
        if (match) {
            return `${match[1]}:00 ${match[2].toLowerCase()}`;
        }
        return time; // Return as-is if format doesn't match
    };

    // Initialize times state as an object mapping each day to its start and end times
    const [times, setTimes] = useState(() => {
        const initialTimes = {};
        Days.forEach((day) => {
            const schedule = existBranch?.workschedule?.find((s) => s.day === day.day);
            initialTimes[day.day] = {
                startTime: schedule ? formatTime(schedule.opening_time) : '9:00 am',
                endTime: schedule ? formatTime(schedule.closing_time) : '5:00 pm',
            };
        });
        return initialTimes;
    });

    // Handle save
    const handleSave = async (id) => {
        const updatedData = {
            brunch_id: selectedBranch,
            default_mode: mode,
            menu_design: design,
            serving_ways: servingWays,
            tables_number: tablesNumber,
            workschedules: workSchedules.reduce((acc, schedule) => {
                acc[schedule.day] = [schedule.opening_time, schedule.closing_time];
                return acc;
            }, {}),
            payment_services: paymentServices,
            call_waiter: callWaiter,
            payment_time: paymentTime,
        };

        try {
            const response = await fetch(`https://highleveltecknology.com/Qtap/api/clients_update_menu/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('clientToken')}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                toast.success('Menu updated successfully!');
                getClientData();
            } else {
                toast.error('Failed to update menu.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while updating the menu.');
        }
    };

    const handleLogoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setLogoImage(imageUrl);
        }
    };

    const handleBannerUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setBannerImage(imageUrl);
        }
    };

    const handleDesignChange = (event, newDesign) => {
        if (newDesign !== null) {
            setDesign(newDesign);
        }
    };

    const handleServingWayChange = (way) => {
        if (servingWays.includes(way)) {
            setServingWays(servingWays.filter((w) => w !== way));
        } else {
            setServingWays([...servingWays, way]);
        }
    };

    const handlePaymentServiceChange = (service) =>
        setPaymentServices(
            paymentServices.includes(service)
                ? paymentServices.filter((s) => s !== service)
                : [...paymentServices, service]
        );

    const handleButtonClick = (day) => {
        if (selectedButtons?.includes(day)) {
            // Remove the day from selectedButtons
            setSelectedButtons(selectedButtons.filter((d) => d !== day));
            // Remove the corresponding entry from workSchedules
            setWorkSchedules(workSchedules.filter((schedule) => schedule.day !== day));
        } else {
            // Add the day to selectedButtons
            setSelectedButtons([...selectedButtons, day]);
            // Add a new entry to workSchedules
            setWorkSchedules([
                ...workSchedules,
                {
                    day,
                    opening_time: times[day].startTime,
                    closing_time: times[day].endTime,
                },
            ]);
        }
    };

    const handleTimeChange = (day) => (event) => {
        const { name, value } = event.target;
        // Update times for the specific day
        setTimes((prev) => ({
            ...prev,
            [day]: {
                ...prev[day],
                [name]: value,
            },
        }));

        // Update workSchedules for the selected day
        const updatedSchedules = workSchedules.map((schedule) => {
            if (schedule.day === day) {
                return {
                    ...schedule,
                    opening_time: name === 'startTime' ? value : schedule.opening_time,
                    closing_time: name === 'endTime' ? value : schedule.closing_time,
                };
            }
            return schedule;
        });

        // If the day is selected but not in workSchedules, add it
        if (selectedButtons.includes(day) && !workSchedules.some((s) => s.day === day)) {
            updatedSchedules.push({
                day,
                opening_time: name === 'startTime' ? value : times[day].startTime,
                closing_time: name === 'endTime' ? value : times[day].endTime,
            });
        }

        setWorkSchedules(updatedSchedules);
    };

    return (
        <Paper style={{ padding: '20px 30px', borderRadius: '10px', marginTop: '16px' }}>
            <Grid container spacing={2}>
                {/* First Column */}
                <Grid item xs={4} direction="column" sx={{ padding: '30px' }}>
                    <Box
                        mb={5}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingTop: '20px',
                        }}
                    >
                        <ImageBox imageUrl={logoImage}>
                            {!logoImage && (
                                <span className="icon-image-gallery" style={{ fontSize: '40px', color: '#AAAAAA' }}></span>
                            )}
                        </ImageBox>
                        <Typography variant="subtitle1" sx={{ fontSize: '8px', color: '#AAAAAA', mb: 1, mt: 1 }}>
                            Logo 500x500px
                        </Typography>
                        <StyledButton variant="contained" component="label">
                            <StraightIcon sx={{ color: '#ef7d00', fontSize: '16px' }} /> Upload
                            <input type="file" accept="image/*" hidden onChange={handleLogoUpload} />
                        </StyledButton>
                    </Box>

                    <Box
                        mb={4}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                width: '250px',
                                height: '125px',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                backgroundImage: bannerImage ? `url(${bannerImage})` : 'none',
                                backgroundColor: bannerImage ? 'transparent' : '#F1F2F2',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            {!bannerImage && (
                                <span className="icon-image-gallery" style={{ fontSize: '40px', color: '#AAAAAA' }}></span>
                            )}
                        </Box>
                        <Typography variant="subtitle1" align="center" sx={{ fontSize: '8px', color: '#AAAAAA', mt: 1 }}>
                            Banner 1000x500px
                        </Typography>
                        <StyledButton variant="contained" component="label" sx={{ mt: 1 }}>
                            <StraightIcon sx={{ color: '#ef7d00', fontSize: '16px' }} /> Upload
                            <input type="file" accept="image/*" hidden onChange={handleBannerUpload} />
                        </StyledButton>
                    </Box>
                </Grid>

                <Divider orientation="vertical" flexItem />

                {/* Second Column */}
                <Grid item xs={4}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '20px',
                        }}
                    >
                        {/* Default Mode and Menu Design */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '80%',
                            }}
                        >
                            <Grid container spacing={1}>
                                <Typography
                                    variant="h3"
                                    sx={{ fontSize: '13px', width: '100%', fontWeight: '500', color: 'gray' }}
                                >
                                    Default Mode
                                </Typography>
                                <ToggleButtonGroup
                                    value={mode}
                                    exclusive
                                    onChange={(e) => setMode(e.target.value)}
                                >
                                    <ToggleButton
                                        value="white"
                                        sx={{
                                            padding: '5px 8px',
                                            backgroundColor: mode === 'white' ? '#E57C00' : 'AAAAAA',
                                            color: mode === 'white' ? '#FFFFFF' : 'gray',
                                        }}
                                    >
                                        <WbSunnyIcon
                                            sx={{ fontSize: '30px', color: mode === 'white' ? '#E57C00' : '#AAAAAA' }}
                                        />
                                    </ToggleButton>

                                    <ToggleButton
                                        value="dark"
                                        sx={{
                                            padding: '5px 8px',
                                            backgroundColor: mode === 'dark' ? '#E57C00' : 'inherit',
                                            color: mode === 'dark' ? '#FFFFFF' : 'gray',
                                        }}
                                    >
                                        <NightlightIcon
                                            sx={{ fontSize: '30px', color: mode === 'dark' ? '#E57C00' : '#AAAAAA' }}
                                        />
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>

                            <Divider
                                orientation="vertical"
                                flexItem
                                sx={{ height: '50px', marginRight: '25px', width: '1px', backgroundColor: 'orange' }}
                            />

                            <Grid container spacing={1}>
                                <Typography
                                    variant="h6"
                                    sx={{ fontSize: '13px', width: '100%', fontWeight: '500', color: 'gray' }}
                                >
                                    Menu Design
                                </Typography>
                                <ToggleButtonGroup value={design} exclusive onChange={handleDesignChange}>
                                    <ToggleButton
                                        value="grid"
                                        sx={{
                                            padding: '5px 8px',
                                            backgroundColor: design === 'grid' ? '#E57C00' : 'inherit',
                                            color: design === 'grid' ? '#E57C00' : 'inherit',
                                        }}
                                    >
                                        <span
                                            className="icon-grid"
                                            style={{ fontSize: '30px', color: design === 'grid' ? '#E57C00' : '#AAAAAA' }}
                                        />
                                    </ToggleButton>
                                    <ToggleButton
                                        value="list"
                                        sx={{
                                            padding: '5px 8px',
                                            backgroundColor: design === 'list' ? '#E57C00' : 'inherit',
                                            color: design === 'list' ? '#E57C00' : 'inherit',
                                        }}
                                    >
                                        <span
                                            className="icon-list"
                                            style={{ fontSize: '30px', color: design === 'list' ? '#E57C00' : '#AAAAAA' }}
                                        />
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                        </Box>
                        <Divider
                            sx={{ backgroundColor: '#f4f6fc', height: '2px', margin: '25px 0 12px 0' }}
                            flexItem
                        />

                        {/* Serving Ways */}
                        <Box sx={{ width: '100%' }}>
                            <Typography
                                variant="body1"
                                sx={{ display: 'flex', fontSize: '15px', color: 'gray', alignItems: 'center' }}
                            >
                                <span className="icon-waiter" style={{ fontSize: '18px', marginRight: '10px' }}></span>{' '}
                                Serving Ways
                            </Typography>
                            <Box display="flex" justifyContent="space-between">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={servingWays.includes('dine_in')}
                                            onChange={() => handleServingWayChange('dine_in')}
                                            sx={{
                                                '& .MuiSvgIcon-root': { fontSize: 22 },
                                                color: 'gray',
                                                '&.Mui-checked': {
                                                    color: '#ef7d00',
                                                },
                                            }}
                                        />
                                    }
                                    label="Dine In"
                                    sx={{
                                        '& .MuiTypography-root': {
                                            fontSize: '13px',
                                            color: 'gray',
                                        },
                                    }}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={servingWays.includes('take_away')}
                                            onChange={() => handleServingWayChange('take_away')}
                                            sx={{
                                                '& .MuiSvgIcon-root': { fontSize: 22 },
                                                color: 'gray',
                                                '&.Mui-checked': {
                                                    color: '#ef7d00',
                                                },
                                            }}
                                        />
                                    }
                                    label="Takeaway"
                                    sx={{
                                        '& .MuiTypography-root': {
                                            fontSize: '13px',
                                            color: 'gray',
                                        },
                                    }}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={servingWays.includes('delivery')}
                                            onChange={() => handleServingWayChange('delivery')}
                                            sx={{
                                                '& .MuiSvgIcon-root': { fontSize: 22 },
                                                color: 'gray',
                                                '&.Mui-checked': {
                                                    color: '#ef7d00',
                                                },
                                            }}
                                        />
                                    }
                                    label="Delivery"
                                    sx={{
                                        '& .MuiTypography-root': {
                                            fontSize: '13px',
                                            color: 'gray',
                                        },
                                    }}
                                />
                            </Box>
                        </Box>

                        <Divider
                            sx={{ backgroundColor: '#f4f6fc', height: '2px', margin: '18px 0 12px 0' }}
                            flexItem
                        />

                        {/* Activate Call Waiter */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'left',
                                width: '100%',
                            }}
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={callWaiter === 'active'}
                                        onChange={(e) => setCallWaiter(e.target.checked ? 'active' : 'inactive')}
                                        sx={{
                                            '& .MuiSvgIcon-root': { fontSize: 22 },
                                            color: 'gray',
                                            '&.Mui-checked': {
                                                color: '#ef7d00',
                                            },
                                        }}
                                    />
                                }
                                label={
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <span
                                            className="icon-hand-up"
                                            style={{ fontSize: 16, color: '#222240', marginRight: '10px' }}
                                        ></span>
                                        <Typography sx={{ fontSize: '15px', color: 'gray' }}>
                                            Activate Call Waiter
                                        </Typography>
                                    </Box>
                                }
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    '& .MuiTypography-root': {
                                        fontSize: '15px',
                                        color: 'gray',
                                    },
                                }}
                            />
                        </Box>

                        <Divider
                            sx={{ backgroundColor: '#f4f6fc', height: '2px', margin: '25px 0 15px 0' }}
                            flexItem
                        />

                        {/* Payment Method */}
                        <Box sx={{ width: '100%' }}>
                            <Typography variant="body1" sx={{ display: 'flex', fontSize: '15px', color: 'gray' }}>
                                Payment Method
                            </Typography>
                            <Box display="flex" justifyContent="space-between">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={paymentServices.includes('cash')}
                                            onChange={() => handlePaymentServiceChange('cash')}
                                            sx={{
                                                '& .MuiSvgIcon-root': { fontSize: 22, borderRadius: '10px' },
                                                color: 'gray',
                                                '&.Mui-checked': {
                                                    color: '#ef7d00',
                                                },
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
                                            <span>Cash</span>
                                        </Box>
                                    }
                                    sx={{
                                        '& .MuiTypography-root': {
                                            fontSize: '11px',
                                            color: 'gray',
                                        },
                                    }}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={paymentServices.includes('wallet')}
                                            onChange={() => handlePaymentServiceChange('wallet')}
                                            sx={{
                                                '& .MuiSvgIcon-root': { fontSize: 22 },
                                                color: 'gray',
                                                '&.Mui-checked': {
                                                    color: '#ef7d00',
                                                },
                                            }}
                                        />
                                    }
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <span
                                                className="icon-wallet"
                                                style={{ fontSize: 20, marginRight: '4px', marginLeft: '-5px' }}
                                            >
                                                <span className="path1"></span>
                                                <span className="path2"></span>
                                                <span className="path3"></span>
                                                <span className="path4"></span>
                                                <span className="path5"></span>
                                                <span className="path6"></span>
                                                <span className="path7"></span>
                                                <span className="path8"></span>
                                                <span className="path9"></span>
                                                <span className="path10"></span>
                                                <span className="path11"></span>
                                                <span className="path12"></span>
                                            </span>
                                            <span>Digital Wallet</span>
                                        </Box>
                                    }
                                    sx={{
                                        '& .MuiTypography-root': {
                                            fontSize: '11px',
                                            color: 'gray',
                                        },
                                    }}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={paymentServices.includes('card')}
                                            onChange={() => handlePaymentServiceChange('card')}
                                            sx={{
                                                '& .MuiSvgIcon-root': { fontSize: 22 },
                                                color: 'gray',
                                                '&.Mui-checked': {
                                                    color: '#ef7d00',
                                                },
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
                                            <span>Card</span>
                                        </Box>
                                    }
                                    sx={{
                                        '& .MuiTypography-root': {
                                            fontSize: '11px',
                                            color: 'gray',
                                        },
                                    }}
                                />
                            </Box>
                        </Box>

                        <Divider
                            sx={{ backgroundColor: '#f4f6fc', height: '2px', margin: '18px 0 12px 0' }}
                            flexItem
                        />

                        {/* Payment Time */}
                        <Box sx={{ width: '100%' }}>
                            <Typography variant="body1" sx={{ display: 'flex', fontSize: '15px', color: 'gray' }}>
                                Payment Time
                            </Typography>
                            <Box display="flex" justifyContent="left">
                                <FormControlLabel
                                    control={
                                        <Radio
                                            checked={paymentTime === 'before'}
                                            onChange={() => setPaymentTime('before')}
                                            sx={{
                                                '& .MuiSvgIcon-root': { fontSize: 22 },
                                                color: 'gray',
                                                '&.Mui-checked': {
                                                    color: '#ef7d00',
                                                },
                                            }}
                                        />
                                    }
                                    label="Before Serving"
                                    sx={{
                                        '& .MuiTypography-root': {
                                            fontSize: '13px',
                                            color: 'gray',
                                        },
                                    }}
                                />
                                <FormControlLabel
                                    control={
                                        <Radio
                                            checked={paymentTime === 'after'}
                                            onChange={() => setPaymentTime('after')}
                                            sx={{
                                                '& .MuiSvgIcon-root': { fontSize: 22 },
                                                color: 'gray',
                                                '&.Mui-checked': {
                                                    color: '#ef7d00',
                                                },
                                            }}
                                        />
                                    }
                                    label="After Serving"
                                    sx={{
                                        '& .MuiTypography-root': {
                                            fontSize: '13px',
                                            color: 'gray',
                                        },
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Grid>

                <Divider orientation="vertical" flexItem />

                {/* Third Column */}
                <Grid
                    item
                    xs={3}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {/* Working Hours Title */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'left',
                            marginBottom: 1,
                            padding: '10px 0px',
                            width: '100%',
                        }}
                    >
                        <span className="icon-working-hour">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                            <span className="path5"></span>
                            <span className="path6"></span>
                            <span className="path7"></span>
                            <span className="path8"></span>
                        </span>
                        <Typography variant="h6" sx={{ fontSize: '13px', color: 'gray', marginLeft: '5px' }}>
                            Working Hours
                        </Typography>
                    </Box>

                    {/* Days and Time Selectors */}
                    <Box
                        sx={{
                            padding: '0 10px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        {Days.map((item) => (
                            <Box
                                key={item.day}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    borderRadius: 2,
                                    marginBottom: '20px',
                                    width: '100%',
                                }}
                            >
                                {/* Day Button (Aligned Left) */}
                                <Button
                                    sx={{
                                        color: selectedButtons.includes(item.day) ? '#FFA500' : '#9d9d9c',
                                        minWidth: 32,
                                        height: 30,
                                        borderRadius: 2,
                                        fontSize: '13px',
                                        border: `1px solid ${selectedButtons.includes(item.day) ? '#ef7d00' : '#9d9d9c'}`,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginRight: '10px',
                                    }}
                                    onClick={() => handleButtonClick(item.day)}
                                    value={existBranch?.workschedule?.find((day) => day.day === item.day)?.day}
                                >
                                    {item.value}
                                </Button>

                                {/* Time Selectors (Centered in Remaining Space) */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flex: 1,
                                    }}
                                >
                                    {/* To Time */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
                                        <Typography sx={{ fontSize: '11px', color: '#BDBDBD', marginRight: 1 }}>
                                            To:
                                        </Typography>
                                        <FormControl variant="outlined" size="small" sx={{ minWidth: 70 }}>
                                            <Select
                                                name="endTime"
                                                value={times[item.day]?.endTime || '5:00 pm'}
                                                onChange={handleTimeChange(item.day)}
                                                sx={{ fontSize: '10px', color: 'gray' }}
                                                MenuProps={{
                                                    disableScrollLock: true,
                                                }}
                                            >
                                                {['5:00 pm', '6:00 pm', '7:00 pm', '8:00 pm', '9:00 pm'].map((time) => (
                                                    <MenuItem key={time} value={time} sx={{ fontSize: '13px', color: 'gray' }}>
                                                        {time}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>

                                    {/* From Time */}
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography sx={{ fontSize: '11px', color: '#BDBDBD', marginRight: 1 }}>
                                            From:
                                        </Typography>
                                        <FormControl variant="outlined" size="small" sx={{ minWidth: 70 }}>
                                            <Select
                                                name="startTime"
                                                value={times[item.day]?.startTime || '9:00 am'}
                                                onChange={handleTimeChange(item.day)}
                                                sx={{ fontSize: '10px', color: 'gray' }}
                                                MenuProps={{
                                                    disableScrollLock: true,
                                                }}
                                            >
                                                {['7:00 am', '8:00 am', '9:00 am', '10:00 am', '11:00 am'].map((time) => (
                                                    <MenuItem key={time} value={time} sx={{ fontSize: '13px', color: 'gray' }}>
                                                        {time}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Grid>
            </Grid>

            <Box textAlign="center" mt={2}>
                <Button
                    variant="contained"
                    sx={{
                        fontSize: '13px',
                        padding: '3px 50px',
                        borderRadius: '20px',
                        backgroundColor: '#ef7d00',
                        color: 'white',
                        textTransform: 'capitalize',
                        '&:hover': {
                            backgroundColor: '#ef7d00',
                        },
                    }}
                    startIcon={<CheckOutlinedIcon />}
                    onClick={() => handleSave(qtap_clients?.id)}
                >
                    Save
                </Button>
            </Box>
        </Paper>
    );
};

export default Menu;