import React from 'react'
import { Box, Grid, MenuItem, Paper, Select, Typography } from '@mui/material'
import SalesVolumeChart from './SalesVolumeChart';
import { useTranslation } from 'react-i18next';
import { DashboardDataContext } from '../../../../../../context/DashboardDataContext';

const SalesVolumeCard = () => {
    const [year, setYear] = React.useState('30');
    const { t } = useTranslation()

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };
    const { salesVolumeData, getSalesVolumeDashboard } = React.useContext(DashboardDataContext);

    React.useEffect(() => {
        getSalesVolumeDashboard(year);
    }, [year]);
    return (
        <Paper sx={{ borderRadius: "20px", marginTop: "20px", padding: "10px" }}>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ padding: "10px 20px", }} >
                <Grid item>
                    <Typography variant="body1" component="div" sx={{ color: "#575756", fontSize: '13px' }}>
                        {t("salesVolume")}
                    </Typography>
                </Grid>
                <Grid item>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Select
                            value={year}
                            onChange={handleYearChange}
                            sx={{
                                height: '24px',
                                color: "#575756", fontSize: '13px',
                                '.MuiOutlinedInput-notchedOutline': { border: 0 },
                                '.MuiSelect-icon': { fontSize: '20px' },
                            }}
                            MenuProps={{
                                disableScrollLock: true,
                            }}
                        >
                            <MenuItem value="30" sx={{ fontSize: "10px", color: "gray" }}>30d</MenuItem>
                            <MenuItem value="40" sx={{ fontSize: "10px", color: "gray" }}>40d</MenuItem>
                            <MenuItem value="50" sx={{ fontSize: "10px", color: "gray" }}>50d</MenuItem>
                        </Select>
                    </Box>
                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>

                <SalesVolumeChart salesVolumeData={salesVolumeData} />

                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: "30px"
                    }}
                >
                    <span class="icon-wallet1" style={{ fontSize: '26px' }} ></span>
                    <Typography variant="h5"
                        sx={{ fontSize: "20px", color: 'textSecondary', marginTop: '8px', border: "2px solid #ef7d00", padding: "3px 25px", borderRadius: "20px" }}>
                        501,420
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        EGP
                    </Typography>
                </Box>
            </Box>
        </Paper>
    )
}
export default SalesVolumeCard;
