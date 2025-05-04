import React from 'react'
import { Box, Grid, MenuItem, Paper, Select, Typography, useTheme } from '@mui/material'
import SalesVolumeChart from './SalesVolumeChart';
import { useTranslation } from 'react-i18next';
import { DashboardDataContext } from '../../../../../../context/DashboardDataContext';

const SalesVolumeCard = () => {
    const [year, setYear] = React.useState('30');
    const { t } = useTranslation()
    const theme = useTheme()

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };
    const { salesVolumeData, getSalesVolumeDashboard } = React.useContext(DashboardDataContext);

    React.useEffect(() => {
        let isMounted = true; // Flag to prevent setting state if component is unmounted
        const fetchSalesVolumeData = async () => {
            if (isMounted) {
                await getSalesVolumeDashboard(year);
                console.log("salesVolumeData", salesVolumeData);
                
            }
        };
        fetchSalesVolumeData();
        return () => {
            isMounted = false; // Cleanup to prevent multiple requests
        }
    }, [year]);
    return (
        <Paper sx={{ borderRadius: "20px", marginTop: "20px", backgroundColor: theme.palette.bodyColor.secandary,
         padding:"10px 15px",

         }}>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ padding: "10px 20px", }} >
                <Grid item>
                    <Typography variant="body1" component="div" sx={{ color: theme.palette.text.gray, fontSize: '13px' }}>
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
                                color: theme.palette.text.gray, fontSize: '13px',
                                '.MuiOutlinedInput-notchedOutline': { border: 0 },
                                '.MuiSelect-icon': { fontSize: '20px' },
                            }}
                            MenuProps={{
                                disableScrollLock: true,
                            }}
                        >
                            <MenuItem value="30" sx={{ fontSize: "10px", color: theme.palette.text.gray }}>30d</MenuItem>
                            <MenuItem value="40" sx={{ fontSize: "10px", color: theme.palette.text.gray }}>40d</MenuItem>
                            <MenuItem value="50" sx={{ fontSize: "10px", color: theme.palette.text.gray }}>50d</MenuItem>
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
                        sx={{ fontSize: "20px", color: theme.palette.text.default, marginTop: '8px', border: `2px solid${theme.palette.orangePrimary.main}`, padding: "3px 25px", borderRadius: "20px" }}>
                        501,420
                    </Typography>
                    <Typography variant="body2" color={theme.palette.text.default}>
                        EGP
                    </Typography>
                </Box>
            </Box>
        </Paper>
    )
}
export default SalesVolumeCard;
