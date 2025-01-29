import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, IconButton, Divider, MenuItem, FormControl, Select, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

export const AddStaff = ({ open, onClose, onSave }) => {
    const [role, setRole] = useState('');
    return (
        <Modal open={open} onClose={onClose}>
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
                    <Typography variant="body1" sx={{ fontSize: "13px", color: "#424242" }}>Add Staff</Typography>
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
                    alignItems: "flex-start",
                }}>
                    <Typography variant='body2' sx={{ width: "25%", textAlign: "center" }} color={"#424242"} fontSize={"12px"}>
                        Role
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
                                        padding: "1px 14px",
                                        textAlign: "left",
                                        fontSize: "12px",
                                        color: "gray",
                                        lineHeight: "35px"

                                    }
                                }}
                                fullWidth
                                displayEmpty
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                placeholder="Select Role"
                            >
                                <MenuItem value="" disabled sx={{ fontSize: "12PX", color: "gray" }}>Select Role</MenuItem>
                                <MenuItem value={"chef"} sx={{ fontSize: "12PX", color: "gray" }}>Chef</MenuItem>
                                <MenuItem value={"cashier"} sx={{ fontSize: "12PX", color: "gray" }}>Cashier</MenuItem>
                                <MenuItem value={"waiter"} sx={{ fontSize: "12PX", color: "gray" }}>Waiter</MenuItem>

                            </Select>
                        </FormControl>
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
                            borderRadius: '20px',
                            height: "30px",
                            width: "50%",
                            textTransform: "capitalize",
                        }}
                    >
                        <CheckOutlinedIcon />
                        Save
                    </Button>
                </Box>


            </Box>
        </Modal>
    )
}
