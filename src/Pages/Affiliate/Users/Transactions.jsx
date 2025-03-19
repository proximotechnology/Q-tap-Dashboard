import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Paper, IconButton } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useTranslation } from 'react-i18next';



export const Transactions = () => {
    const tableData = [
        {
            user: 'First Name', reverence: '#1234567', date: '20/05/2024', time: '5:00 Am', amount: '100', status: 'Done',
            icon: <span class="icon-double-check" style={{ color: "#30AEF8", fontSize: "20px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span></span>
        },
        {
            user: 'First Name', reverence: '#1234567', date: '20/05/2024', time: '6:00 Pm', amount: '200', status: 'Pending',
            icon: <span class="icon-pending" style={{ color: "#AC4182", fontSize: "20px" }}></span>,

        },

        {
            user: 'First Name', reverence: '#1234567', date: '20/05/2024', time: '5:00 Am', amount: '300', status: 'Failed',
            icon: <span class="icon-close" style={{ color: "#AC4182", fontSize: "15px" }}></span>,
        },

        {
            user: 'First Name', reverence: '#1234567', date: '20/05/2024', time: '6:00 Pm', amount: '400', status: 'Pending',
            icon: <span class="icon-pending" style={{ color: "#AC4182", fontSize: "20px" }}></span>,
        },

        {
            user: 'First Name', reverence: '#1234567', date: '20/05/2024', time: '5:00 Am', amount: '500', status: 'Done',
            icon: <span class="icon-double-check" style={{ color: "#30AEF8", fontSize: "20px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span></span>

        }
    ];
    const { t } = useTranslation();

    return (
        <Paper sx={{ padding: "20px", borderRadius: '20px', mt: 2 }}>
            <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body1"
                        sx={{ fontSize: "13px", color: "#575756", display: "flex", alignItems: "center" }}
                    >
                        <span class="icon-transfer" style={{ fontSize: "22px", color: "#D8E0E0", marginRight: "10px" }} ></span>
                        {t("transactions")}
                    </Typography>

                    <Box>
                        <IconButton sx={{ marginRight: "15px" }}>
                            <span class="icon-magnifier" style={{ fontSize: "18px" }} ></span>
                        </IconButton>
                        <IconButton>
                            <span class="icon-printer" style={{ fontSize: "16px" }} ></span>
                        </IconButton>
                    </Box>
                </Box>


                <TableContainer sx={{ mt: 1 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ height: "25px" }}>
                            {/* Amount */}     {[t("user"), t("reverenceNO"), t("date"), t("time"), t("amount"), t("status")].map((header) => (
                                    <TableCell
                                        key={header}
                                        sx={{
                                            fontSize: "12px", padding: "0px 10px", textAlign: "left",
                                            borderBottom: "1px solid #bbb9b9fa", color: "#575756"
                                        }}
                                    >
                                        {header}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody >
                            {tableData.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ padding: "0px", textAlign: "left", border: "none", color: "#575756" }}>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <Avatar sx={{ mr: 1 }}>
                                                <PersonOutlineOutlinedIcon sx={{ fontSize: "25px" }} />
                                            </Avatar>

                                            <Box sx={{ fontSize: "12px", }}>
                                                {row.user}
                                                <Typography sx={{ fontSize: "11px", marginTop: "5px", color: "#AAAAAA", width: "100%" }}>
                                                    ID: <span style={{ borderBottom: "1px solid #AAAAAA" }}>{row.reverence}</span></Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>

                                    <TableCell sx={{ padding: "0px 10px", textAlign: "left", border: "none" }}>
                                        <span style={{ fontSize: "12px", color: "#AAAAAA", borderBottom: "1px solid #AAAAAA" }}>
                                            {row.reverence}</span>
                                    </TableCell>


                                    <TableCell sx={{ padding: "0px 10px", textAlign: "left", color: "#AAAAAA", border: "none" }}>{row.date}</TableCell>
                                    <TableCell sx={{ padding: "0px 10px", textAlign: "left", color: "#AAAAAA", border: "none" }}>{row.time}</TableCell>
                                    <TableCell sx={{
                                        textAlign: "left", fontSize: "22px", color: "#ef7d00",
                                        border: "none"
                                    }} >
                                        {row.amount}
                                        <span style={{ color: "#AAAAAA", fontSize: "12px" }}>EGP</span>
                                    </TableCell>


                                    <TableCell sx={{ textAlign: "center", border: "none", color: "gray" }}>
                                        <Box display="flex" alignItems="center">
                                            {row.icon}
                                            <Box sx={{ ml: 1, color: '#AAAAAA', fontSize: "13px" }}>{row.status}</Box>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Paper>
    )
}
