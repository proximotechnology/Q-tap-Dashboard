import { Box, Divider, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { Table, TableBody, TableCell, IconButton, TableContainer, TableHead, TableRow } from '@mui/material';
import rows2 from './DeliveryData';
import AddRider from './AddRider';
import LoginIcon from '@mui/icons-material/Login';
import { useTranslation } from 'react-i18next';
export const Table2 = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpen = () => setModalOpen(true);

    const handleClose = () => setModalOpen(false);

    const {t} = useTranslation();
    const theme = useTheme();
    return (

        <Box
            sx={{
                maxWidth: '100%',
                padding: "10px",
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="body2" sx={{ fontSize: "15px", color: "#575756", display: "flex" }}>
                    <span class="icon-rider" style={{ fontSize: "25px", color: "#D8E0E0", marginRight: "6px" }}></span>
                    {t("deliveryRiders")}
                </Typography>
                <Box display="flex">

                    <span class="icon-magnifier" style={{ fontSize: "16px", marginRight: "20px" }}></span>
                    <Typography
                        onClick={handleOpen}
                        variant='body2' sx={{ fontSize: "13px", color: theme.palette.orangePrimary.main, display: "flex", cursor: "Pointer" }} >{t("add")}
                        <span style={{ fontSize: "15px", color: "#424242", fontWeight: 700, paddingLeft: "6px" }}>+</span>
                    </Typography>
                    <AddRider open={modalOpen} onClose={handleClose} />
                </Box>
            </Box>  {/*Header*/}

            <Divider
                sx={{
                    backgroundColor: theme.palette.orangePrimary.main,
                    height: '1px',
                    margin: '8px 0px',
                }}
            />

            {/* <TableContainer> */}
                <Table sx={{ borderCollapse: 'separate', borderSpacing: '0 5px' }}>
                    <TableHead>
                        <TableRow sx={{ height: "25px", borderBottom: "2px solid #f0f0f0" }}>
                            {[t("name"), t("city"), t("mobileNumber"),t("orders"),t("status"), ""].map((header) => (
                                <TableCell
                                    key={header}
                                    sx={{ fontSize: "11px", padding: "0px", width: `${100 / 6}%`, textAlign: "center" }}
                                >
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows2.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    backgroundColor: index % 2 === 0 ? '#EBEDF3' : 'white',
                                    height: "25px",
                                    borderRadius: '20px',
                                    '&:nth-of-type(odd)': {
                                        borderRadius: '20px',
                                    },
                                    '&:nth-of-type(even)': {
                                        borderRadius: '20px',
                                    },
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
                                <TableCell sx={{ color: theme.palette.secondaryColor.main, fontSize: '11px', padding: "2px 20px", width: `${100 / 6}%`, textAlign: "center", borderBottom: "none" }}>{row.name}</TableCell>
                                <TableCell sx={{ color: theme.palette.secondaryColor.main, fontSize: '11px', padding: "2px", width: `${100 / 6}%`, textAlign: "center", borderBottom: "none" }}>{row.city}</TableCell>
                                <TableCell sx={{ color: theme.palette.secondaryColor.main, fontSize: '11px', padding: "2px", width: `${100 / 6}%`, textAlign: "center", borderBottom: "none" }}>{row.whatsapp}</TableCell>

                                <TableCell sx={{ color: theme.palette.orangePrimary.main, fontSize: '13px', fontWeight: "900", padding: "2px", width: `${100 / 6}%`, textAlign: "center", borderBottom: "none" }}>
                                    {row.order}</TableCell>

                                <TableCell
                                    sx={{
                                        fontSize: '11px',
                                        padding: "2px",
                                        width: `${100 / 6}%`,
                                        textAlign: "center",
                                        borderBottom: "none",
                                        color: row.status === 'Available' ? 'green' : row.status === 'Busy' ? 'red' : 'defaultColor'
                                    }}
                                >

                                    <span
                                        style={{
                                            display: 'inline-block',
                                            width: '6px',
                                            height: '6px',
                                            borderRadius: '50%',
                                            backgroundColor: row.status === 'Available' ? 'green' : row.status === 'Busy' ? 'red' : 'defaultColor',
                                            marginRight: '5px',
                                        }}
                                    ></span>
                                    {t(row.status)}
                                </TableCell>

                                <TableCell sx={{ padding: "2px", width: `${100 / 6}%`, textAlign: "center", borderBottom: "none" }}>
                                    <IconButton size="small"  >
                                        <span class="icon-edit" style={{ color: "black", fontSize: "18px" }} />
                                    </IconButton>
                                    <IconButton size="small" color='error'>
                                        <span class="icon-delete" style={{ fontSize: "18px" }} />
                                    </IconButton>
                                    <IconButton size="small" sx={{ marginLeft: "15px" }}>
                                        <LoginIcon sx={{ color:' #ef7d00' }} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            {/* </TableContainer> */}
        </Box>
    )

}

