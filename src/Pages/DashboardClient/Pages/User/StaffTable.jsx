import React, { useEffect, useState } from 'react';
import { Button, Divider, IconButton, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { staffData } from './userData';
import { AddStaff } from './AddStaff';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export const StaffTable = () => {
    const {t} = useTranslation();
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpen = () => setModalOpen(true);

    const handleClose = () => setModalOpen(false);

    const handleExport = () => {

        const dataToExport = staffData.map((row) => ({
            "Name": row.name,
            "Role": row.role,
            "Orders": row.orders,
            "Status": row.status,
        }));


        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");


        XLSX.writeFile(workbook, "User_Data.xlsx");
    };
    //========================================== get RestStaff data 

    const [RestStaff, setRestStaff] = useState([]);
    const selectedBranch = localStorage.getItem("selectedBranch")

    const getRestStaff = async () => {
        try {
            const response = await axios.get('https://highleveltecknology.com/Qtap/api/restaurant_staff', {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('clientToken')}`
                },
                params: {
                    brunch_id: selectedBranch
                }

            })

            if (response.data) {
                setRestStaff(response.data.restaurant_staff);
            }
            console.log("RestStaff data response ", response.data);

        } catch (error) {
            console.log("error RestStaff data ", error);

        }

    }
    useEffect(() => {
        getRestStaff();
    }, [])
    //========================================== handle delete RestStaff

    const handleDeleteRestStaff = async (id) => {
        try {
            const response = await axios.delete(`https://highleveltecknology.com/Qtap/api/restaurant_staff/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('clientToken')}`
                }
            })

            if (response.data) {
                toast.success(t("userStaff.restStaffDeletedSucc"));
                getRestStaff();
            }
        } catch (error) {
            console.log("error delete RestStaff ", error);
            toast.error(t("restStaffDeletedSucc"));

        }
    }

    return (
        <Paper sx={{ padding: "15px 30px 50px 30px", marginTop: "20px", borderRadius: "20px" }}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                padding="5px 0"
            >
                <Box sx={{ display: "flex", alignItem: "center" }}>
                    <span class="icon-manager" style={{ fontSize: "25px", color: "#D8E0E0", marginRight: "10px" }}></span>
                    <Typography variant='body1' sx={{ fontSize: "16px", color: "#575756" }}>{t("staff")}</Typography>
                </Box>


                <Box sx={{ display: "flex" }}>
                    <IconButton>
                        <span class="icon-magnifier" style={{ fontSize: "16px" }} />
                    </IconButton>
                    <Button
                        onClick={handleOpen}
                        sx={{ fontSize: "12px", color: "#ef7d00", display: "flex", cursor: "pointer", textTransform: "capitalize" }} >{t("add")}
                        <span style={{ fontSize: "15px", color: "#ef7d00", fontWeight: 700, paddingLeft: "6px" }}>+</span>
                    </Button>
                    <AddStaff open={modalOpen} onClose={handleClose} />

                    <Button onClick={handleExport}
                        variant="text"
                        sx={{ color: '#ef7d00', textTransform: "capitalize", fontSize: "12px" }}>
                        {t("export")}
                        <ArrowForwardIosIcon sx={{ fontSize: "10px", color: "#ef7d00" }} />
                    </Button>

                </Box>
            </Box> {/* Header */}
            <Divider sx={{
                width: "100%", height: "2px", background: "linear-gradient(45deg, #FDB913, #F2672E)", borderRadius: "50px",
            }} />

            <TableContainer>
                <Table sx={{ borderCollapse: 'separate', borderSpacing: '0 5px' }}>
                    <TableHead>
                        <TableRow sx={{ height: "20px", borderBottom: "2px solid #f0f0f0" }}>
                            {[t("name"), t("role"), t("Orders"), t("status"), " "].map((header) => (
                                <TableCell
                                    key={header}
                                    sx={{
                                        fontSize: "12px", padding: "3px", width: `${100 / 5}%`, textAlign: "left",
                                        color: "#575756"
                                    }}
                                >
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {RestStaff.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{
                                    backgroundColor: row.id % 2 !== 0 ? '#EBEDF3' : 'white',
                                    height: "20px",
                                    borderRadius: '20px',
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
                                <TableCell sx={{ color: "#575756", fontSize: '11px', padding: "0px 20px", width: `${100 / 4}%`, textAlign: "Left", borderBottom: "none" }}>
                                    {row.name}
                                </TableCell>

                                <TableCell sx={{ color: "#575756", fontSize: '11px', padding: "0px 2px", width: `${100 / 5}%`, textAlign: "Left", borderBottom: "none" }}>
                                    {row.role}
                                </TableCell>

                                <TableCell sx={{ fontWeight: 900, color: "#ef7d00", fontSize: '11px', padding: "0px 2px", width: `${100 / 5}%`, textAlign: "Left", borderBottom: "none" }}>
                                    {row.orders}
                                </TableCell>


                                <TableCell sx={{ color: "#575756", fontSize: '11px', padding: "0px 2px", width: `${100 / 5}%`, textAlign: "Left", borderBottom: "none" }}>
                                    <Button sx={{
                                        color: "white", textTransform: "capitalize", fontSize: "10px", padding: "3px 25px", borderRadius: "20px",
                                        backgroundColor: row.status === "Active" ? "#8DE6B6" : "#f05e5e",
                                        "&:hover": { backgroundColor: row.status === "Active" ? "#8DE6B6" : "#d04a4a" }
                                    }}>
                                        {row.status}
                                    </Button>
                                </TableCell>

                                <TableCell sx={{ padding: "0px 2px", width: `${100 / 5}%`, textAlign: "left", borderBottom: "none" }}>
                                    <IconButton>
                                        <span class="icon-delete" style={{ fontSize: "16px", color: "black" }} />
                                    </IconButton>
                                    <IconButton>
                                        <img src="/assets/setting.svg" alt="icon" style={{ width: "18px", height: "18px" }} />
                                    </IconButton>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default StaffTable;
