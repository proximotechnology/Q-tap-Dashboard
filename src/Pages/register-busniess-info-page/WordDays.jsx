import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';
import { timeOptions } from "../../Component/Business-info/WorkingHoursDays";
import { useState } from "react";
import { Button, IconButton, MenuItem, Typography, Grid, useTheme, Box, TextField } from "@mui/material"
import { useTranslation } from 'react-i18next';


const daysOfWeek = [
    { symbol: 'Sa', value: 'Saturday' },
    { symbol: 'Su', value: 'Sunday' },
    { symbol: 'Mo', value: 'Monday' },
    { symbol: 'Tu', value: 'Tuesday' },
    { symbol: 'We', value: 'Wednesday' },
    { symbol: 'Th', value: 'Thursday' },
    { symbol: 'Fr', value: 'Friday' },
];


const WorkDays = ({ watch, setValue, getValues }) => {
    const { t } = useTranslation()
    const theme = useTheme()
    // const [selectedDays, setSelectedDays] = useState([]);

    const [currentDay, setCurrentDay] = useState('Saturday');
    const [fromTime, setFromTime] = useState();
    const [toTime, setToTime] = useState();

    // const handleDayToggle = (action) => {

    // }
    const handleSelectedDayChange = (action) => {

        if (action === 'prev') {
            const currentIndex = daysOfWeek.findIndex((day) => day.value === currentDay);
            const nextIndex = (currentIndex - 1 + daysOfWeek.length) % daysOfWeek.length;

            setCurrentDay(daysOfWeek[nextIndex].value);
        } else if (action === 'next') {
            const currentIndex = daysOfWeek.findIndex((day) => day.value === currentDay);
            const nextIndex = (currentIndex + 1) % daysOfWeek.length;

            setCurrentDay(daysOfWeek[nextIndex].value);
        }

    }
    const handleTimeChange = (e, day) => {

    }


    const selectedDaysWatch = watch("workschedules");

    const selectedDays = Object.keys(selectedDaysWatch || {})

    const handleDayToggle = (day) => {
        const current = getValues(`workschedules.${day}`);
        if (current) {
            const prev = getValues("workschedules") || {};
            const updated = { ...prev };
            delete updated[day];
            setValue("workschedules", updated);
        } else {
            setValue(`workschedules.${day}`, ["09:00 AM", "05:00 PM"]);
        }
    };

    const isSelected = (day) => Object.keys(selectedDaysWatch || {}).includes(day)
    return (
        <Grid container spacing={2} alignItems="center" sx={{ marginTop: "40px" }}>
            <Typography variant="body1" display="flex" alignItems="center"
                sx={{ fontSize: '15px', marginLeft: "20px" }}>
                <span className="icon-working-hour" style={{ marginRight: "10px", fontSize: "20px" }}>
                    <span className="path1"></span><span className="path2"></span><span className="path3"></span>
                    <span className="path4"></span><span className="path5"></span><span className="path6"></span>
                    <span className="path7"></span><span className="path8"></span>
                </span>
                {t("workHours")}
            </Typography>
            <Grid item xs={12} display={"flex"} justifyContent={"space-between"}>
                <Grid item xs={7}>
                    <Box display="flex" flexWrap="wrap">
                        {daysOfWeek.map((day) => (
                            <Button
                                key={day.value}
                                onClick={() => {
                                    console.log("Click")
                                    handleDayToggle(day.value)
                                }}
                                sx={{
                                    minWidth: '25px',
                                    height: "45px",
                                    width: "45px",
                                    margin: '3px',
                                    borderRadius: '5px',
                                    textTransform: "capitalize",
                                    fontSize: "14px",
                                    border: isSelected(day.value) ? '1px solid #ef7d00' : '1px solid gray',
                                    color: isSelected(day.value) ? '#ef7d00' : 'gray',
                                }}
                            >
                                {day.symbol}
                            </Button>
                        ))}
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Grid container spacing={2} alignItems="center" justifyContent="end">
                        <Grid item xs={3} display="flex" justifyContent="end" alignItems="center">
                            <Box display="flex" alignItems="center"
                                sx={{
                                    backgroundColor: theme.palette.secondaryColor.main,
                                    borderRadius: '20px',
                                    height: "30px",
                                    padding: "0 5px",
                                }}>
                                <IconButton onClick={() => handleSelectedDayChange('prev')} sx={{ color: '#ef7d00' }}>
                                    <ArrowBackIos sx={{ fontSize: "11px" }} />
                                </IconButton>
                                <Typography sx={{ width: "60px", textTransform: "capitalize", color: 'white', fontSize: "10px" }}>
                                    {t(currentDay.toLowerCase())}
                                </Typography>
                                <IconButton onClick={() => handleSelectedDayChange('next')} sx={{ color: '#ef7d00' }}>
                                    <ArrowForwardIos sx={{ fontSize: "11px" }} />
                                </IconButton>
                            </Box>
                        </Grid>
                        <Box display={"flex"} sx={{ margin: "10px 10px 0 0" }}>
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
                                    SelectProps={{
                                        MenuProps: {
                                            PaperProps: {
                                                style: {
                                                    maxHeight: 150, // <-- 👈 الارتفاع الثابت للقائمة المنسدلة (يمكنك تعديله)
                                                },
                                            },
                                        },
                                    }}
                                >
                                    {timeOptions.map((time) => (
                                        <MenuItem key={time} value={time} sx={{ color: "gray", fontSize: "12px" }}>
                                            <span style={{ fontSize: "10px", color: "gray" }}>{time}</span>
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Box>
                        <Box display={"flex"} sx={{ margin: "3px 10px" }}>
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
                                    SelectProps={{
                                        MenuProps: {
                                            PaperProps: {
                                                style: {
                                                    maxHeight: 150, // <-- 👈 الارتفاع الثابت للقائمة المنسدلة (يمكنك تعديله)
                                                },
                                            },
                                        },
                                    }}
                                >
                                    {timeOptions.map((time) => (
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
        </Grid>
    )
}


export default WorkDays