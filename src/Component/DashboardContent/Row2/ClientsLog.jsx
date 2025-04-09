import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import { useTranslation } from 'react-i18next';
import { DashboardDataContext } from '../../../context/DashboardDataContext';
import React from 'react';

// Add the formatDateTime function
const formatDateTime = (updatedAt) => {
    if (!updatedAt) return { time: '', date: '' };
    
    const date = new Date(updatedAt);
    const time = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
    
    return { time, date: formattedDate };
};

export const ClientsLog = () => {
    const { t } = useTranslation();
    const { dashboardData, getDashboard } = React.useContext(DashboardDataContext);
    const { Clients_Log } = dashboardData || {};

    React.useEffect(() => {
        getDashboard();
    }, [getDashboard]); // Added getDashboard to dependency array

    // Prepare data with fallback
    const clientData = Clients_Log?.map(log => ({
        client_id: log.client_id || 'N/A',
        updated_at: log.updated_at || '',
        status: log.status || 'Unknown',
        action: log.action || false,
        statusColor: log.status === 'Active now' ? 'orange' : 'gray'
    })) || [];

    return (
        <TableContainer component={Paper} sx={{ 
            borderRadius: "20px", 
            boxShadow: 'none', 
            minHeight: "50vh", 
            maxHeight: "62vh", 
            whiteSpace: "nowrap" 
        }}>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ padding: "20px 20px 0px 20px" }}>
                <Grid item>
                    <Typography variant="body1" component="div" sx={{ fontSize: '13px', color: "#575756" }}>
                        {t("clientLog")}
                    </Typography>
                </Grid>
                <Grid item>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img src="/assets/Clients.svg" alt="icon" style={{ color: "#D8E0E0", width: "18px", height: "18px" }} />
                    </Box>
                </Grid>
            </Grid>

            <Table sx={{ borderCollapse: 'separate', borderSpacing: '0px', padding: "10px", width: "100%" }}>
                <TableHead>
                    <TableRow sx={{ height: "30px" }}>
                        <TableCell sx={{ textAlign: "left", fontSize: "11px", border: 'none', padding: "0px 20px" }}>
                            {t("business")}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center", fontSize: "11px", border: 'none', padding: "0px 0px" }}>
                            {t("time")}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center", fontSize: "11px", border: 'none', padding: "0px 0px" }}>
                            {t("date")}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center", fontSize: "11px", border: 'none', padding: "0px 0px" }}>
                            {t("status")}
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {clientData.length > 0 ? (
                        clientData.map((row, index) => {
                            const { time, date } = formatDateTime(row.updated_at);
                            return (
                                <TableRow
                                    key={index}
                                    sx={{
                                        padding: '0px',
                                        height: '30px',
                                        borderRadius: '20px',
                                        overflow: 'hidden',
                                        margin: '2px 0px',
                                        backgroundColor: index % 2 === 0 ? '#EBEDF3' : '#ffffff',
                                        '& td:first-of-type': {
                                            borderTopLeftRadius: '20px',
                                            borderBottomLeftRadius: '20px',
                                        },
                                        '& td:last-of-type': {
                                            borderTopRightRadius: '20px',
                                            borderBottomRightRadius: '20px',
                                        },
                                    }}
                                >
                                    <TableCell sx={{ textAlign: 'center', border: 'none', padding: '0px', fontSize: '11px', color: '#222240', paddingX: '1px' }}>
                                        <Box sx={{ padding: '0px 8px', display: 'flex', alignItems: 'center' }}>
                                            <Box sx={{ 
                                                padding: '0px 3px',
                                                alignItems: 'center',
                                                backgroundColor: 'white',
                                                borderRadius: '50%',
                                                marginRight: '8px',
                                            }}>
                                                <PersonOutlineOutlinedIcon sx={{ color: 'gray', fontSize: '15px' }} />
                                            </Box>
                                            {row.client_id}
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'center', border: 'none', fontSize: '11px', color: 'gray', padding: '0px', paddingX: '1px' }}>
                                        {time}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'center', border: 'none', fontSize: '11px', color: 'gray', padding: '0px', paddingX: '1px' }}>
                                        {date}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'center', border: 'none', fontSize: '11px', color: row.action ? 'orange' : 'gray', padding: '0px', paddingX: '1px' }}>
                                        {row.action && <CircleIcon sx={{ fontSize: "7px" }} />} {t(row.action ? "active Now" : "inactive")}
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} sx={{ textAlign: 'center', border: 'none', padding: '20px' }}>
                                <Typography sx={{ fontSize: '11px', color: 'gray' }}>
                                    {t("noDataAvailable")}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};