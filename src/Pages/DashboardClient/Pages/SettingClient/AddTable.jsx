import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton, Divider, FormControl, Select, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AddAreaModal from './AddAreaModal';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

const AddTableModal = ({ open, onClose, onSave }) => {


    const [area, setArea] = useState('');
    const handleSave = () => {
        onSave({ area });
        onClose();
    };

    const [modalOpen, setModalOpen] = useState(false);

    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
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
                    <Typography variant="body1" sx={{ fontSize: "13px", color: "#424242" }}>Add Table</Typography>
                    <IconButton onClick={onClose} >
                        <CloseIcon sx={{ fontSize: "20px", color: "gray" }} />
                    </IconButton>
                </Box>
                <Divider
                    sx={{
                        backgroundColor: '#FF6600',
                        height: '1px',
                    }}
                />
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
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                    }}>
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
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    alignItems: "left",
                }}>
                    <Typography variant='body2' sx={{ width: "25%", textAlign: "center" }} color={"#424242"} fontSize={"12px"}>
                        Size
                    </Typography>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                    }}>
                        <TextField
                            sx={{
                                width: "90%",
                                '& .MuiInputBase-input': {
                                    height: "35px",
                                    padding: "0px 14px",
                                    color: "gray",
                                    textAlign: "left", fontSize: "12px",

                                }
                            }}
                            fullWidth
                            placeholder="Chairs"
                        />
                    </Box>
                </Box>

                <Box sx={{
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    alignItems: "flex-start",
                }}>
                    <Typography variant='body2' sx={{ width: "25%", textAlign: "center" }} color={"#424242"} fontSize={"12px"}>
                        Area
                    </Typography>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                    }}>
                        <FormControl sx={{ width: "90%" }}>
                            <Select
                                sx={{
                                    '& .MuiInputBase-input': {
                                        height: "35px",
                                        padding: "0px 14px",
                                        textAlign: "left",
                                        fontSize: "12px",
                                        color: "gray",
                                        lineHeight: "35px",
                                    }
                                }}
                                fullWidth
                                displayEmpty
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                placeholder="Select Area"
                            >
                                <MenuItem value="" disabled sx={{ fontSize: "12PX", color: "gray" }}>Select Area</MenuItem>
                                <MenuItem value={"B"} sx={{ fontSize: "12PX", color: "gray" }}>B01</MenuItem>
                                <MenuItem value={"C"} sx={{ fontSize: "12PX", color: "gray" }}>C01</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                <Box
                    onClick={handleOpen}
                    sx={{ float: "right", position: "relative", top: "-30px", left: "20px", cursor: "pointer" }}>
                    <AddOutlinedIcon sx={{ fontSize: "32px", color: "#ef7d00" }} />
                </Box>
                    <AddAreaModal open={modalOpen} onClose={handleClose} />


                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                }}>
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={handleSave}
                        sx={{
                            mt: 4,
                            borderRadius: '20px',
                            height: "30px",
                            width: "50%",
                            textTransform: "capitalize",
                        }}
                    >
                        <CheckOutlinedIcon /> Save
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddTableModal;
