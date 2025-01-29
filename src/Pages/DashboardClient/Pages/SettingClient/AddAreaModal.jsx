import React from 'react';
import { Box, Modal, TextField, Button, Typography, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const AddAreaModal = ({ open, onClose }) => {
    const rows = [
        { id: 'B01' },
        { id: 'C04' }
    ];

    return (
        <Modal
        open={open} onClose={onClose}
            aria-labelledby="add-area-modal"
            aria-describedby="add-area-description"
        >
            <Box
                sx={{
                    width: 400,
                    bgcolor: 'background.paper',
                    p: 4,
                    borderRadius: 3,
                    boxShadow: 24,
                    mx: 'auto',
                    mt: '20vh',
                    position: 'relative'
                }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body1" sx={{ fontSize: "13px", color: "#424242" }}>Add Area</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon sx={{ fontSize: "20px", color: "gray" }} />
                    </IconButton>
                </Box>

                <Divider sx={{ backgroundColor: '#FF6600', height: '1px' }} />
                <Box sx={{
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    alignItems: "left",
                }}>
                    <Typography variant='body2' sx={{ width: "25%", textAlign: "center" }} color={"#424242"} fontSize={"12px"}>
                        Name
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                        <TextField
                            sx={{
                                width: "90%",
                                '& .MuiInputBase-input': {
                                    height: "35px",
                                    padding: "0px 14px",
                                    textAlign: "left", fontSize: "12px",
                                    color: "gray",
                                }
                            }}
                            fullWidth
                            placeholder="Table Name"
                        />
                    </Box>
                </Box>

                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                }}>
                    <Button
                        variant="contained"
                        color="warning"
                        sx={{
                            mt: 4,
                            mb: 2,
                            borderRadius: '20px',
                            height: "30px",
                            width: "30%",
                            textTransform: "capitalize",
                        }}
                    >
                        <AddOutlinedIcon sx={{ fontSize: "18px", color: "white", mr: 1 }} /> Add
                    </Button>
                </Box>

                <TableContainer sx={{ marginTop: "20px", marginBottom: "20px", width: "400px", marginLeft: "-32px" }}>
                    <Table sx={{ width: "100%" }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ height: "24px" }}>
                                <TableCell align="center" sx={{
                                    fontSize: "10px",
                                    borderBottom: "none",
                                    backgroundColor: '#EBEDF3',
                                    padding: "0px"
                                }}>Name</TableCell>
                                <TableCell align="center" sx={{ fontSize: "10px", borderBottom: "none", backgroundColor: '#EBEDF3', padding: "0px" }}>Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id} sx={{ height: "30px" }}>
                                    <TableCell align="center" sx={{ padding: "0px", fontSize: "10px", color: "gray" }}>{row.id}</TableCell>
                                    <TableCell align="center" sx={{ padding: "0px" }}>

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
                </TableContainer>
            </Box>
        </Modal>
    );
};

export default AddAreaModal;
