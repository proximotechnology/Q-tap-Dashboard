import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CircleIcon from '@mui/icons-material/Circle';

export const ClientsLog = () => {
    const rows = [
        { userName: 'name', time: '11:15 PM', date: '22.06.2024', status: 'Active now', statusColor: 'orange' },
        { userName: 'name', time: '11:15 PM', date: '22.06.2024', status: 'Active now', statusColor: 'orange' },
        { userName: 'name', time: '11:15 PM', date: '22.06.2024', status: 'Inactive', statusColor: 'gray' },
        {}, {}, {}, {}, {}, {}, {}, {}, {}

    ];

    
    return (
        <TableContainer component={Paper} sx={{ borderRadius: "20px", boxShadow: 'none', minHeight:"50vh" , maxHeight:"62vh"  }}>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ padding: "20px 20px 0px 20px" }}>
                <Grid item>
                    <Typography variant="body1" component="div" sx={{ fontSize: '13px', color: "#575756" }}>
                        Clients Log
                    </Typography>
                </Grid>
                <Grid item>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img src="/assets/Clients.svg" alt="icon" style={{ color: "#D8E0E0", width: "18px", height: "18px" }} />
                    </Box>
                </Grid>
            </Grid>



            <Table sx={{ borderCollapse: 'separate', borderSpacing: '0px', padding: "10px" }}>
                <TableHead>
                    <TableRow sx={{ height: "30px" }}>
                        <TableCell sx={{ textAlign: "left", fontSize: "11px", border: 'none', padding: "0px 20px" }}>Business</TableCell>
                        <TableCell sx={{ textAlign: "center", fontSize: "11px", border: 'none', padding: "0px 0px" }}>Time</TableCell>
                        <TableCell sx={{ textAlign: "center", fontSize: "11px", border: 'none', padding: "0px 0px" }}>Date</TableCell>
                        <TableCell sx={{ textAlign: "center", fontSize: "11px", border: 'none', padding: "0px 0px" }}>Status</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody  >
                    {rows.map((row, index) => (
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
                            <TableCell sx={{ textAlign: 'center', border: 'none', padding: '0px', fontSize: '11px', color: '#222240' }}>
                                <Box
                                    sx={{
                                        padding: '0px 8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            padding: '0px 3px',
                                            alignItems: 'center',
                                            backgroundColor: 'white',
                                            borderRadius: '50%',
                                            marginRight: '8px',
                                        }}
                                    >
                                        <PersonOutlineOutlinedIcon sx={{ color: 'gray', fontSize: '15px' }} />
                                    </Box>
                                    {row.userName}
                                </Box>
                            </TableCell>

                            <TableCell sx={{ textAlign: 'center', border: 'none', fontSize: '11px', color: 'gray', padding: '0px' }}>
                                {row.time}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center', border: 'none', fontSize: '11px', color: 'gray', padding: '0px' }}>
                                {row.date}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center', border: 'none', fontSize: '11px', color: row.statusColor, padding: '0px' }}>
                                {row.status ? <CircleIcon sx={{ fontSize: "7px" }} /> : null} {row.status}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>

        </TableContainer>
    );
};
