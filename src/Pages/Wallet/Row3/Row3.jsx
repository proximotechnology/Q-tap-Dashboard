import { Button, Grid, IconButton, useTheme } from '@mui/material'
import React from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Table, TableBody, TableCell, TableHead, TableRow, Box, TextField, Card, CardContent, } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import MinimizeOutlinedIcon from '@mui/icons-material/MinimizeOutlined';
import { transactionsData } from './transactionsData';
import { useTranslation } from 'react-i18next';
import { DashboardDataContext } from '../../../context/DashboardDataContext';

export const Row3 = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const [deposits, setdeposits] = React.useState([]);
    const { depositsData, getDeposits } = React.useContext(DashboardDataContext);
    React.useEffect(() => {
        getDeposits("2024-03-01/2025-06-31");
        if (depositsData) {
            setdeposits(depositsData);
            console.log("depositsData", depositsData);

        }
    }, [depositsData]);
    console.log("depositsData", deposits);

    return (
        <Grid container spacing={2} sx={{ marginTop: "5px" }}>
            <Grid item xs={12} md={6} lg={6} >
                <Card sx={{ borderRadius: 4, height: "100%", overflow: 'auto' }}>
                    <CardContent>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            width="100%" marginBottom={"7px"}
                        >
                            <Box variant="body2" sx={{ fontSize: "13px", display: "flex", color: "#575756" }}>
                                <span class="icon-transfer" style={{ fontSize: "22px", color: "#D8E0E0" }} ></span>
                                {t("withdrawals")}
                            </Box>
                            <Box sx={{ display: "flex", textAlign: "center", alignItems: "center" }} gap={1}>
                                <IconButton>
                                    <span class="icon-magnifier" style={{ fontSize: "14px" }}></span>
                                </IconButton>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    placeholder={t("from")}
                                    style={{ width: "80px" }}
                                    InputProps={{

                                        startAdornment: <span className="icon-calendar" style={{ color: "gray", fontSize: '10px', marginRight: "3px" }} />,
                                        endAdornment: <KeyboardArrowDownIcon sx={{ color: "gray", fontSize: '12px' }} />,
                                        style: { fontSize: '9px', borderRadius: "5px", padding: "2px 8px" },
                                    }}
                                    inputProps={{
                                        style: { padding: '3px 0' },
                                    }}
                                />
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    placeholder={t("to")}
                                    style={{ width: "80px" }}
                                    InputProps={{

                                        startAdornment: <span className="icon-calendar" style={{ color: "gray", fontSize: '10px', marginRight: "3px" }} />,
                                        endAdornment: <KeyboardArrowDownIcon sx={{ color: "gray", fontSize: '12px' }} />,
                                        style: { fontSize: '9px', borderRadius: "5px", padding: "2px 8px" },
                                    }}
                                    inputProps={{
                                        style: { padding: '3px 0' },
                                    }}
                                />
                                <Button sx={{ color: theme.palette.orangePrimary.main, fontSize: "11px", textTransform: "capitalize" }}>
                                    {t("export")} <KeyboardArrowRightIcon sx={{ color: "#575756", fontSize: "12px", }} /> </Button>
                            </Box>
                        </Box>

                        <Table>
                            <TableHead sx={{ height: "20px", borderBottom: "1px solid #e7e3e3" }}>
                                <TableRow>
                                    <TableCell sx={{ color: "#575756", borderBottom: "none", fontSize: "10px", textAlign: "left", padding: "0px 30px" }}>{t("id")}</TableCell>
                                    <TableCell sx={{ color: "#575756", borderBottom: "none", fontSize: "10px", textAlign: "center", padding: "0px" }}>{t("date")}</TableCell>
                                    <TableCell sx={{ color: "#575756", borderBottom: "none", fontSize: "10px", textAlign: "center", padding: "0px" }}>{t("time")}</TableCell>
                                    <TableCell sx={{ color: "#575756", borderBottom: "none", fontSize: "10px", textAlign: "center", padding: "0px" }}>{t("amount")}</TableCell>
                                    <TableCell sx={{ color: "#575756", borderBottom: "none", fontSize: "10px", textAlign: "center", padding: "0px" }}>{t("status")}</TableCell>

                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {transactionsData.map((transaction, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            textAlign: "center",
                                            justifyContent: "left",
                                            fontSize: "10px",
                                            color: "gray",
                                            borderBottom: "none",
                                            height: "35px",
                                            width: "25%",
                                        }}>
                                            <MinimizeOutlinedIcon sx={{ color: theme.palette.orangePrimary.main, fontSize: "14px" }} />
                                            <span style={{ borderBottom: "1px solid #9d9d9c" }}>{transaction.id}</span>
                                        </TableCell>

                                        <TableCell sx={{
                                            textAlign: "center",
                                            fontSize: "10px",
                                            color: "gray",
                                            borderBottom: "none",
                                            height: "35px",
                                            padding: "10px 0px 0px 10px",
                                            width: "25%",
                                        }}>
                                            {transaction.date}
                                        </TableCell>

                                        <TableCell sx={{
                                            textAlign: "center",
                                            fontSize: "10px",
                                            color: "gray",
                                            borderBottom: "none",
                                            height: "35px",
                                            padding: "10px 0px 0px 10px",
                                            width: "25%",
                                        }}>
                                            {transaction.time}
                                        </TableCell>

                                        <TableCell sx={{
                                            textAlign: "center",
                                            fontSize: "10px",
                                            color: "#2e2c2c",
                                            borderBottom: "none",
                                            height: "35px",
                                            padding: "10px 0px 0px 10px",
                                            width: "25%",
                                        }}>
                                            {transaction.amount}
                                        </TableCell>
                                        <TableCell sx={{
                                            textAlign: "center",
                                            fontSize: "10px",
                                            color: "#2e2c2c",
                                            borderBottom: "none",
                                            height: "35px",
                                            padding: "10px 0px 0px 10px",
                                            width: "25%",

                                        }}>
                                            <span style={{
                                                backgroundColor: transaction.status === "Done"
                                                    ? "#58DC95" : "#EB8084",
                                                padding: "3px 15px",
                                                borderRadius: "20px",
                                            }}>
                                                {t(transaction.status)}
                                            </span>

                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={6} >
                <Card sx={{ borderRadius: 4, height: "100%", overflow: 'auto' }}>
                    <CardContent>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            width="100%" marginBottom={"7px"}
                        >
                            <Box variant="body2" sx={{ fontSize: "13px", display: "flex", color: "#575756" }}>
                                <span class="icon-transfer" style={{ fontSize: "22px", color: "#D8E0E0" }} ></span>
                                {t("deposits")}
                            </Box>

                            <Box sx={{ display: "flex", textAlign: "center", alignItems: "center" }} gap={1}>
                                <IconButton>
                                    <span class="icon-magnifier" style={{ fontSize: "14px" }}></span>
                                </IconButton>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    placeholder={t("from")}
                                    style={{ width: "80px" }}
                                    InputProps={{

                                        startAdornment: <span className="icon-calendar" style={{ color: "gray", fontSize: '10px', marginRight: "3px" }} />,
                                        endAdornment: <KeyboardArrowDownIcon sx={{ color: "gray", fontSize: '12px' }} />,
                                        style: { fontSize: '9px', borderRadius: "5px", padding: "2px 8px" },
                                    }}
                                    inputProps={{
                                        style: { padding: '3px 0' },
                                    }}
                                />
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    placeholder={t("to")}
                                    style={{ width: "80px" }}
                                    InputProps={{

                                        startAdornment: <span className="icon-calendar" style={{ color: "gray", fontSize: '10px', marginRight: "3px" }} />,
                                        endAdornment: <KeyboardArrowDownIcon sx={{ color: "gray", fontSize: '12px' }} />,
                                        style: { fontSize: '9px', borderRadius: "5px", padding: "2px 8px" },
                                    }}
                                    inputProps={{
                                        style: { padding: '3px 0' },
                                    }}
                                />
                                <Button sx={{ color: theme.palette.orangePrimary.main, fontSize: "11px", textTransform: "capitalize" }}>
                                    {t("export")} <KeyboardArrowRightIcon sx={{ color: "#575756", fontSize: "12px", }} /> </Button>
                            </Box>
                        </Box>

                        <Table>
                            <TableHead sx={{ height: "20px", borderBottom: "1px solid #e7e3e3" }}>
                                <TableRow>
                                    <TableCell sx={{ color: "#575756", borderBottom: "none", fontSize: "10px", textAlign: "left", padding: "0px 30px" }}>{t("id")}</TableCell>
                                    <TableCell sx={{ color: "#575756", borderBottom: "none", fontSize: "10px", textAlign: "center", padding: "0px" }}>{t("date")}</TableCell>
                                    <TableCell sx={{ color: "#575756", borderBottom: "none", fontSize: "10px", textAlign: "center", padding: "0px" }}>{t("time")}</TableCell>
                                    <TableCell sx={{ color: "#575756", borderBottom: "none", fontSize: "10px", textAlign: "center", padding: "0px" }}>{t("amount")}</TableCell>
                                    <TableCell sx={{ color: "#575756", borderBottom: "none", fontSize: "10px", textAlign: "center", padding: "0px" }}>{t("status")}</TableCell>

                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {transactionsData.map((transaction, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            textAlign: "center",
                                            justifyContent: "left",
                                            fontSize: "10px",
                                            color: "gray",
                                            borderBottom: "none",
                                            height: "35px",
                                            width: "25%",
                                        }}>
                                            <MinimizeOutlinedIcon sx={{ color: theme.palette.orangePrimary.main, fontSize: "14px" }} />
                                            <span style={{ borderBottom: "1px solid #9d9d9c" }}>{transaction.id}</span>
                                        </TableCell>

                                        <TableCell sx={{
                                            textAlign: "center",
                                            fontSize: "10px",
                                            color: "gray",
                                            borderBottom: "none",
                                            height: "35px",
                                            padding: "10px 0px 0px 10px",
                                            width: "25%",
                                        }}>
                                            {transaction.date}
                                        </TableCell>

                                        <TableCell sx={{
                                            textAlign: "center",
                                            fontSize: "10px",
                                            color: "gray",
                                            borderBottom: "none",
                                            height: "35px",
                                            padding: "10px 0px 0px 10px",
                                            width: "25%",
                                        }}>
                                            {transaction.time}
                                        </TableCell>

                                        <TableCell sx={{
                                            textAlign: "center",
                                            fontSize: "10px",
                                            color: "#2e2c2c",
                                            borderBottom: "none",
                                            height: "35px",
                                            padding: "10px 0px 0px 10px",
                                            width: "25%",
                                        }}>
                                            {transaction.amount}
                                        </TableCell>
                                        <TableCell sx={{
                                            textAlign: "center",
                                            fontSize: "10px",
                                            color: "#2e2c2c",
                                            borderBottom: "none",
                                            height: "35px",
                                            padding: "10px 0px 0px 10px",
                                            width: "25%",

                                        }}>
                                            <span style={{
                                                backgroundColor: transaction.status === "Done"
                                                    ? "#58DC95" : "#EB8084",
                                                padding: "3px 15px",
                                                borderRadius: "20px",
                                            }}>
                                                {t(transaction.status)}
                                            </span>

                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

    )
}
