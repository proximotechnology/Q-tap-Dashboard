import React from 'react'
import { Box, Grid, MenuItem, Paper, Select, Typography } from '@mui/material'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LineChart1 from '../../Wallet/Row1/LineChart1';



export const Revenue = () => {
    const [year, setYear] = React.useState('2024');

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    return (
        <Paper sx={{ padding: "30px 20px", height: "250px", borderRadius: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Grid width={"85%"} display={"flex"} flexDirection="column">
                <Grid container display={"flex"} flexDirection="column">
                    <Box display={"flex"} justifyContent="space-between" >
                        <Typography variant="body1" sx={{ fontSize: '12px', color: "#575756" }}>
                            Revenue
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Select
                                value={year}
                                onChange={handleYearChange}
                                sx={{
                                    height: '24px',
                                    fontSize: '14px',
                                    '.MuiOutlinedInput-notchedOutline': { border: 0 },
                                    '.MuiSelect-icon': { fontSize: '20px' },
                                }}
                            >
                                <MenuItem value="2022" sx={{ fontSize: "10px", color: "gray" }}>2022</MenuItem>
                                <MenuItem value="2023" sx={{ fontSize: "10px", color: "gray" }}>2023</MenuItem>
                                <MenuItem value="2024" sx={{ fontSize: "10px", color: "gray" }}>2024</MenuItem>
                            </Select>
                        </Box>
                    </Box>
                    <span style={{ color: "#D8E0E0", fontSize: "8px", marginTop: "-10px" }}>Affiliate Marketing</span>

                    <Typography variant="body1" sx={{ fontSize: '20px', marginTop: "-5px", color: "#ef7d00" }}>
                        200.234 <span style={{ fontSize: "12px", color: "gray" }}>EGP</span>
                    </Typography>

                </Grid>

                <Grid sx={{ height: "170px", width: "430px", marginTop: "15px", marginLeft: "-50px" }}>
                    <LineChart1 />
                </Grid>
            </Grid>


            <Grid width={"25%"}>
                <Box sx={{ position: "relative", top: "-40px", left: "60px" }}>
                    <span class="icon-social" style={{ fontSize: "30px", color: "#D8E0E0" }} > </span>
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: "10px"
                    }}
                >
                    <Typography variant='body1' sx={{ fontSize: "14px", alignItems: "center", display: "flex", color: "#575756" }}>
                        <PersonOutlinedIcon sx={{ fontSize: '16px', color: "#575756" }} /> users</Typography>
                    <Typography variant="body2"
                        sx={{
                            color: '#575756', marginBottom: "10px", fontSize: "20px",
                            border: "1px solid #575756", padding: "4px 20px", borderRadius: "30px",

                        }}>
                        50,000
                    </Typography>
                    <Box marginTop="20px" justifyContent="left">

                        <Box display={"flex"} textAlign={"center"} alignItems={"center"}>
                            <Box component="span" sx={{ backgroundColor: "#2DA0F6", width: '20px', borderRadius: "20px", height: '8px', display: 'inline-block', marginRight: '8px' }} />
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "9px" }}>Revenue</Typography>
                        </Box>
                        <Box display={"flex"} textAlign={"center"} alignItems={"center"} marginTop="5px">
                            <Box component="span" sx={{ backgroundColor: "#AD4081", width: '20px', borderRadius: "20px", height: '8px', display: 'inline-block', marginRight: '8px' }} />
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "9px" }}>users</Typography>
                        </Box>
                    </Box>
                </Box>
            </Grid>

        </Paper>
    )
}
