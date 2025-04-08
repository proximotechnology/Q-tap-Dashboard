import React from 'react';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import {
    Table, TableBody, TableCell, TableHead, TableRow, Box, TextField, Button,
    Card,
    CardContent,
    Typography,
    useTheme,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { transactionsData } from './transactionsData';
import MinimizeOutlinedIcon from '@mui/icons-material/MinimizeOutlined';
import * as XLSX from 'xlsx';
import { useTranslation } from 'react-i18next';

export const TableTransaction = () => {
    const handleExport = () => {
        const data = [
            { ID: "#123467567", Date: "20/05/2024", Time: "03:30pm", Amount: "20,657 £", Status: "Done" },
            { ID: "#123467568", Date: "17/05/2024", Time: "03:30pm", Amount: "25,657 £", Status: "Failed" },
        ];
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
        XLSX.writeFile(workbook, "transactions.xlsx");
    };
    const {t} = useTranslation();
    const theme = useTheme();
    return (
        <Card Card sx={{ borderRadius: 4, height: "100%",overflowX:'auto' }}>
            <CardContent>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                    marginBottom={"10px"}
                    flexWrap={'nowrap'}
                    whiteSpace={'nowrap'}
                >
                    <Box variant="body2" sx={{ fontSize: "13px", display: "flex" }}>
                        <span class="icon-transfer" style={{ fontSize: "22px", color: "#D8E0E0" }} ></span>
                        {t("transactions")}
                    </Box>
                    <Box>
                        <span class="icon-magnifier" style={{ cursor: "pointer", color: "#575756", marginRight: "15px", fontSize: "13px" }}></span>

                        <TextField
                            variant="outlined"
                            type='number'
                            size="small"
                            placeholder={t("from")}
                            style={{ padding: "2px", marginRight: '5px', width: "85px" }}
                            InputProps={{
                                startAdornment: <CalendarMonthOutlinedIcon sx={{ color: "gray", fontSize: "12px", marginRight: "10px" }} />,
                                endAdornment: <ArrowDropDownIcon sx={{ color: "gray", fontSize: "18px", }} />,
                                style: { fontSize: '8px', color: "gray", borderRadius: "6px", padding: "0px 5px", height: "25px" },
                            }}
                            InputLabelProps={{
                                style: { fontSize: '10px' },
                            }}
                        />

                        <TextField
                            variant="outlined"
                            type='number'
                            size="small"
                            placeholder={t("to")}
                            style={{ padding: "2px", marginRight: '5px', width: "85px" }}
                            InputProps={{
                                startAdornment: <CalendarMonthOutlinedIcon sx={{ color: "gray", fontSize: "12px", marginRight: "10px" }} />,
                                endAdornment: <ArrowDropDownIcon sx={{ color: "gray", fontSize: "18px", }} />,
                                style: { fontSize: '8px', color: "gray", borderRadius: "6px", padding: "0px 5px", height: "25px" },
                            }}
                            InputLabelProps={{
                                style: { fontSize: '10px' },
                            }}
                        />
                        <Button
                            onClick={handleExport}
                            variant="text"
                            style={{ fontSize: "12px", color: theme.palette.orangePrimary.main, textTransform: "capitalize" }}>
                            {t("export")}
                            <ArrowForwardIosIcon sx={{ fontSize: "10px", color: "black" }} />
                        </Button>
                    </Box>
                </Box>

                <Table>
                    <TableHead sx={{
                        height: "30px",
                        borderBottom: "1px solid #EBEDF3",
                        padding: "0px",
                        marginBottom: "0px",
                        width: "100%",

                    }}>
                        <TableRow sx={{ height: "auto" }}>
                            <TableCell sx={{
                                borderBottom: "none",
                                fontSize: "10px",
                                textAlign: "left",
                                padding: "0px 20px",
                                margin: "0px"
                            }}>ID</TableCell>
                            <TableCell sx={{
                                borderBottom: "none",
                                fontSize: "10px",
                                textAlign: "center",
                                padding: "0px",
                                margin: "0px",
                            }}>{t("date")}</TableCell>
                            <TableCell sx={{
                                borderBottom: "none",
                                fontSize: "10px",
                                textAlign: "center",
                                padding: "0px",
                                margin: "0px"
                            }}>{t("time")}</TableCell>
                            <TableCell sx={{
                                borderBottom: "none",
                                fontSize: "10px",
                                textAlign: "center",
                                padding: "0px",
                                margin: "0px"
                            }}>{t("amount")}</TableCell>
                            <TableCell sx={{
                                borderBottom: "none",
                                fontSize: "10px",
                                textAlign: "center",
                                padding: "0px",
                                margin: "0px"
                            }}>{t("status")}</TableCell>
                        </TableRow>
                    </TableHead>


                    <TableBody>
                        {transactionsData.map((transaction, index) => (
                            <>

                                <TableRow key={index}>
                                    <TableCell sx={{
                                        display: "flex", textAlign: "center", justifyContent: "left", color: "gray",
                                        borderBottom: "none", height: "30px", padding: "15px 0px 0px 10px"
                                    }}>
                                        <MinimizeOutlinedIcon sx={{ color: theme.palette.orangePrimary.main, fontSize: "15px" }} />
                                        <Typography sx={{ fontSize: "11px", borderBottom: "1px solid #9d9d9c" }}> {transaction.id}</Typography>
                                    </TableCell>

                                    <TableCell sx={{ fontSize: "11px", textAlign: "center", color: "gray", borderBottom: "none", height: "30px", padding: "10px 0px 0px 10px" }}>{transaction.date}</TableCell>
                                    <TableCell sx={{ fontSize: "11px", textAlign: "center", color: "gray", borderBottom: "none", height: "30px", padding: "10px 0px 0px 10px" }}>{transaction.time}</TableCell>
                                    <TableCell sx={{ fontSize: "12px", textAlign: "center", color: "#575756", borderBottom: "none", height: "30px", padding: "10px 0px 0px 10px" }}>{transaction.amount}</TableCell>
                                    <TableCell sx={{ fontSize: "11px", textAlign: "center", color: "black", borderBottom: "none", height: "30px", padding: "10px 0px 0px 10px" }}>
                                        <Typography
                                            sx={{
                                                padding: "3px 5px", backgroundColor: transaction.statusColor, borderRadius: "20px",
                                                fontSize: "11px"
                                            }}>{t(transaction.status)} </Typography>
                                    </TableCell>
                                </TableRow>
                            </>
                        ))}
                    </TableBody>



                </Table>
            </CardContent>
        </Card>

    )
}
