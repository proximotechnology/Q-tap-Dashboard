import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';
import { timeOptions } from "../../Component/Business-info/WorkingHoursDays";
import { useState } from "react";
import { Button, IconButton, MenuItem, Typography , Grid, useTheme, Box, TextField } from "@mui/material"
import { useTranslation } from 'react-i18next';


const daysOfWeek = ['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'];

const fullDaysOfWeek = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const WorkDays = () => {
    const { t } = useTranslation()
    const theme = useTheme()
    const [selectedDays, setSelectedDays] = useState([]);

    const [currentDay, setCurrentDay] = useState('Saturday');
    const [fromTime, setFromTime] = useState();
    const [toTime, setToTime] = useState();

    const handleDayToggle = (action) => {

    }
    const handleDayClick = (day) => {

    }
    const handleTimeChange = (day) => {

    }
    return (
        <Grid  container spacing={2} alignItems="center" sx={{ marginTop: "40px" }}>
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
                                <IconButton onClick={() => handleDayToggle('prev')} sx={{ color: '#ef7d00' }}>
                                    <ArrowBackIos sx={{ fontSize: "11px" }} />
                                </IconButton>
                                <Typography sx={{ width: "60px", textTransform: "capitalize", color: 'white', fontSize: "10px" }}>
                                    {t(currentDay.toLowerCase())}
                                </Typography>
                                <IconButton onClick={() => handleDayToggle('next')} sx={{ color: '#ef7d00' }}>
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