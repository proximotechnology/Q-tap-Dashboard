import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, CardContent, Divider, Grid, IconButton, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import TableBarOutlinedIcon from '@mui/icons-material/TableBarOutlined';
import ChairAltOutlinedIcon from '@mui/icons-material/ChairAltOutlined';

import { QRCodeSVG } from 'qrcode.react';
import AddTableModal from './AddTable';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClientLoginData } from '../../../../context/ClientLoginDataContext';

const TableCard = ({ table, onDeleteTable }) => (
    <Card sx={{ height: "270px", maxWidth: 180, width: "140px", borderRadius: "10px", backgroundColor: '#EBEDF3', position: 'relative' }}>
        <CardContent>
            <Box display={"flex"} justifyContent={"space-between"} >
                <Typography variant="subtitle2" sx={{ fontSize: "11px", color: "#E57C00" }}>
                    ID <span style={{ fontSize: "10px", color: "#AAAAAA", borderBottom: "1px solid #AAAAAA" }}>{table.id}</span></Typography>
                <span onClick={onDeleteTable} class="icon-delete" style={{ fontSize: "15px", color: "red" , cursor: "pointer" }} />
            </Box>
            <Divider
                sx={{
                    backgroundImage: "linear-gradient(to right, #FDB913, #F2672E)",
                    height: "2px",
                    marginTop: "2px",
                    border: "none",
                }}
            />


            <Typography sx={{ fontSize: "12px", display: "flex", color: "#7b6a6a", marginTop: "9px" }}>
                <TableBarOutlinedIcon sx={{ fontSize: "12px", mr: "5px" }} /> Name</Typography>
            <Typography variant="body2" component="div"
                sx={{ fontSize: "9px", display: "flex", color: "#9d9d9c", marginLeft: "5px" }}>{table.name}
            </Typography>

            <Box display={"flex"} justifyContent={"space-between"}>
                <Box>
                    <Typography variant="body2" sx={{ fontSize: "10px", display: "flex", color: "#7b6a6a", marginTop: "10px" }}>
                        <ChairAltOutlinedIcon sx={{ fontSize: "14px", mr: "5px" }} />
                        Chairs
                    </Typography>

                    <Typography variant="body2"
                        sx={{ fontSize: "10px", display: "flex", color: "#9d9d9c", marginLeft: "5px" }}
                    >{table.chairs} ch</Typography>

                </Box>
                <Box>
                    <Typography variant="body2" sx={{ fontSize: "10px", display: "flex", color: "#7b6a6a", marginTop: "10px" }}>
                        <img src="/assets/location.svg" alt='location icon'
                            style={{ width: "13px", height: "13px" }} />
                        Area</Typography>
                    <Typography variant="body2" sx={{ fontSize: "10px", display: "flex", color: "#9d9d9c", marginLeft: "10px" }}>{table.area}</Typography>
                </Box>

            </Box>

            <Box sx={{
                height: '100px', textAlign: "center", borderRadius: '10px', border: '3px solid #ef7d00',
                margin: "10px auto", display: "flex", width: "90%", padding: "2px 5px",
                justifyContent: "center", alignContent: "cneter",
            }}>
                <QRCodeSVG
                    value={`https://highleveltecknology.com/Qtap${table.link}`}
                    size={90}
                    fgColor="#000000"
                    bgColor="#FFFFFF"
                    level="Q"
                />
            </Box>


            <Grid container justifyContent="center" alignItems="center" >
                <IconButton>
                    <span class="icon-link" style={{ fontSize: "15px", color: "black" }} ></span>
                </IconButton>
                <IconButton>
                    <span class=" icon-qr-code" style={{ fontSize: "15px", color: "black" }} ></span>
                </IconButton>
                <IconButton>
                    <span class="icon-edit" style={{ fontSize: "18px", color: "black" }} ></span>
                </IconButton>
            </Grid>
        </CardContent>
    </Card>
);

export const Tables = ({ openOldMenu }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const { tableDataRes ,getTableDataRes } = useContext(ClientLoginData);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };
    const handleSaveTable = (tableData) => {
        console.log('Saved Table:', tableData);
    };


    //========================================== handle delete table

    const handleDeleteTable = async (id) => {
        try {
            const response = await axios.delete(`https://highleveltecknology.com/Qtap/api/tables/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('clientToken')}`
                }
            })

            if (response.data) {
                toast.success("table deleted successfully!");
                getTableDataRes();
            }
        } catch (error) {
            console.log("error delete table ", error);
            toast.error("Error deleting table");

        }
    }
    return (
        <Paper style={{ padding: '20px 30px', borderRadius: "10px", marginTop: '16px' }}>

            <Box
                sx={{
                    maxWidth: '100%',
                    padding: "6px"
                }}
            >
                <Typography
                    variant="body1"
                    sx={{
                        textAlign: "left",
                        fontSize: "13px",
                        color: "#4b4a4a"
                    }}
                >
                    Add Tables
                </Typography>

                <Divider
                    sx={{
                        backgroundColor: '#E57C00',
                        height: '1px',
                        margin: '8px 0px',
                    }}
                />

                <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                    {tableDataRes.map((table, index) => (
                        <Grid item key={index}>
                            <TableCard table={table} onDeleteTable={() => handleDeleteTable(table.id)} />
                        </Grid>
                    ))}
                    <Grid item>
                        <Card
                            onClick={handleOpenModal}
                            sx={{
                                height: "270px", maxWidth: 180, width: "140px", borderRadius: "10px", cursor: "pointer",
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                backgroundColor: '#EBEDF3'
                            }}>
                            <img src='/assets/add.svg' alt="add icon " style={{ width: "35px", height: "35px" }} />

                        </Card>

                        <AddTableModal
                            open={modalOpen}
                            onClose={handleCloseModal}
                            onSave={handleSaveTable}
                        />

                    </Grid>
                </Grid>

                <Box textAlign="center" mt={4}>
                    <Button sx={{
                        fontSize: "13px", padding: "3px 50px", margin: "20px 0px",
                        borderRadius: "20px", backgroundColor: "#ef7d00",
                        color: "white", textTransform: "capitalize",
                        '&:hover': {
                            backgroundColor: "#ef7d00",
                        }
                    }}
                        startIcon={<CheckOutlinedIcon />}>Save</Button>
                </Box>


            </Box>
        </Paper>
    )
}
