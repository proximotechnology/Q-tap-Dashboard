import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Paper, IconButton, useTheme } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useTranslation } from 'react-i18next';
import axios from 'axios';



export const Transactions = () => {
    const theme = useTheme();
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
    const [transData, settransData] = useState([]);
    const getTransactions = async () => {
        try {
            const response = await axios.get(
                "https://highleveltecknology.com/Qtap/api/affiliate_transactions",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                    },
                }
            );

            if (response.data.success) {
                settransData(response?.data?.transactions);
                console.log("Fetched transactions:", response?.data?.transactions);

            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
    useEffect(() => {
        let isMounted = true; // Flag to prevent setting state if component is unmounted
        const fetchTransactions = async () => {
            if (isMounted) {
                await getTransactions();
            }
        };
        fetchTransactions();
        return () => {
            isMounted = false; // Cleanup to prevent multiple requests
        };
    }, []);

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


                <TableContainer sx={{ mt: 1 , whiteSpace:'nowrap' }}>
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
                            {transData?.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ padding: "0px", textAlign: "left", border: "none", color: "#575756" }}>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <Avatar sx={{ mr: 1 }}>
                                                <PersonOutlineOutlinedIcon sx={{ fontSize: "25px" }} />
                                            </Avatar>

                                            <Box sx={{ fontSize: "12px", }}>
                                                {row.affiliate}
                                                <Typography sx={{ fontSize: "11px", marginTop: "5px", color: "#AAAAAA", width: "100%" }}>
                                                    ID: #<span style={{ borderBottom: "1px solid #AAAAAA" }}>{row.Reverence_no}</span></Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>

                                    <TableCell sx={{ padding: "0px 10px", textAlign: "left", border: "none" }}>
                                        <span style={{ fontSize: "12px", color: "#AAAAAA", borderBottom: "1px solid #AAAAAA" }}>
                                            {row.Reverence_no}</span>
                                    </TableCell>


                                    <TableCell sx={{ padding: "0px 10px", textAlign: "left", color: "#AAAAAA", border: "none" }}>
                                        {row.updated_at?.split('T')[0].split('-').reverse().join('/')}
                                    </TableCell>
                                    <TableCell sx={{ padding: "0px 10px", textAlign: "left", color: "#AAAAAA", border: "none" }}>
                                        {new Date(row.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                    </TableCell>



                                    {/* Amount */}
                                    <TableCell sx={{
                                        textAlign: "left", fontSize: "22px", color: theme.palette.orangePrimary.main,
                                        border: "none"
                                    }} >
                                        {row.amount}
                                        <span style={{ color: "#AAAAAA", fontSize: "12px" }}>EGP</span>
                                    </TableCell>


                                    <TableCell sx={{ textAlign: "center", border: "none", color: "gray" }}>
                                        <Box display="flex" alignItems="center" justifyContent="start">
                                            {row.status === "Done" && (
                                                <span className="icon-double-check" style={{ color: "#30AEF8", fontSize: "20px" }}>
                                                    <span className="path1"></span>
                                                    <span className="path2"></span>
                                                    <span className="path3"></span>
                                                    <span className="path4"></span>
                                                </span>
                                            )}
                                            {row.status === "pending" && (
                                                <span className="icon-pending" style={{ color: "#AC4182", fontSize: "20px" }}></span>
                                            )}
                                            {row.status === "failed" && (
                                                <span className="icon-close" style={{ color: "#AC4182", fontSize: "15px" }}></span>
                                            )}
                                            <Box sx={{ ml: 1, color: '#AAAAAA', fontSize: "13px" }}>{t(row.status)}</Box>
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
