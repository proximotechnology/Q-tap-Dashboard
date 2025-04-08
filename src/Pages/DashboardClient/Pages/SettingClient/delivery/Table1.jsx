import { Box, Divider, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Table, TableBody, TableCell, IconButton, TableContainer, TableHead, TableRow } from '@mui/material';
import { rows1 } from './DeliveryData';
import AddArea from './AddArea';
import { useTranslation } from 'react-i18next';

export const Table1 = () => {
    const {t} = useTranslation();
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpen = () => setModalOpen(true);

    const handleClose = () => setModalOpen(false);


    return (
        <Box
            sx={{
                maxWidth: '100%',
                padding: "10px"
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="body2" sx={{ fontSize: "15px", color: "#575756", display: "flex" }}>
                    <span class="icon-scooter-1" style={{ fontSize: "25px", color: "#D8E0E0", marginRight: "6px" }}></span>
                   {t("deliveryArea")}
                </Typography>

                <Box display="flex">
                    <span class="icon-magnifier" style={{ fontSize: "16px", marginRight: "20px" }}></span>
                    <Typography
                        onClick={handleOpen}
                        variant='body2' sx={{ fontSize: "13px", color: "#ef7d00", display: "flex", cursor: "Pointer" }} >{t("add")}
                        <span style={{ fontSize: "15px", color: "#424242", fontWeight: 700, paddingLeft: "6px" }}>+</span>
                    </Typography>
                    <AddArea open={modalOpen} onClose={handleClose} />
                </Box>
            </Box>  {/*Header*/}

            <Divider
                sx={{
                    backgroundColor: '#ef7d00',
                    height: '1px',
                    margin: '8px 0px',
                }}
            />

            {/* <TableContainer> */}
                <Table sx={{ borderCollapse: 'separate', borderSpacing: '0 5px' }}>
                    <TableHead>
                        <TableRow sx={{ height: "25px", borderBottom: "2px solid #f0f0f0" }}>
                            {[t("country"), t("state"), t("city"), t("mobileNumber"), t("cost"), ""].map((header) => (
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
                        {rows1.map((row, index) => (
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
                                <TableCell sx={{ color: "#222240", fontSize: '11px', padding: "2px 20px", width: `${100 / 6}%`, textAlign: "center", borderBottom: "none" }}>
                                    <span sx={{ alignItems: "center", display: "flex" }}>{row.icon} {row.country}</span>
                                </TableCell>
                                <TableCell sx={{ color: "#222240", fontSize: '11px', padding: "2px", width: `${100 / 6}%`, textAlign: "center", borderBottom: "none" }}>{row.state}</TableCell>
                                <TableCell sx={{ color: "#222240", fontSize: '11px', padding: "2px", width: `${100 / 6}%`, textAlign: "center", borderBottom: "none" }}>{row.city}</TableCell>
                                <TableCell sx={{ color: "#222240", fontSize: '11px', padding: "2px", width: `${100 / 6}%`, textAlign: "center", borderBottom: "none" }}>{row.phone}</TableCell>
                                <TableCell sx={{ color: "#222240", fontSize: '11px', padding: "2px", width: `${100 / 6}%`, textAlign: "center", borderBottom: "none" }}>{row.cost}
                                    <span style={{ color: 'gray' }}> EGP</span>
                                </TableCell>

                                <TableCell sx={{ color: "#222240", padding: "2px", width: `${100 / 6}%`, textAlign: "center", borderBottom: "none" }}>
                                    <IconButton size="small"  >
                                        <span class="icon-edit" style={{ color: "black", fontSize: "18px" }} />
                                    </IconButton>
                                    <IconButton size="small" color='error'>
                                        <span class="icon-delete" style={{ fontSize: "18px" }} />
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
