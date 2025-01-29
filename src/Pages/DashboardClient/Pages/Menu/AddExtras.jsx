import { Button, Box, Divider, IconButton, Modal, Typography, TextField, Grid, MenuItem, Select, FormControl } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

export const AddExtras = ({ open, handleClose }) => {
    const handleAdd = () => {
        //  adding a new discount
    };
    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    width: 350,
                    bgcolor: 'background.paper',
                    p: 4,
                    borderRadius: 3,
                    boxShadow: 24,
                    mx: 'auto',
                    mt: '20vh',
                    position: 'relative'
                }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body1" sx={{ fontSize: "12px", color: "#424242" }}>
                        Add Extras
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon sx={{ fontSize: "20px", color: "gray" }} />
                    </IconButton>
                </Box>
                <Divider sx={{ backgroundColor: '#FF6600', }} />


                <Grid container spacing={2}
                    sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>

                    <Grid item xs={10}>
                        <Typography variant='body2' sx={{ fontSize: "10px" }}>Name</Typography>
                        <TextField
                            variant="outlined"
                            fullWidth
                            placeholder='Extra Name'
                            InputProps={{ sx: { height: '30px', fontSize: "10px" } }}
                        />
                    </Grid>

                    <Grid item xs={10}>
                        <Typography variant='body2' sx={{ fontSize: "10px" }}>Price</Typography>
                        <TextField
                            variant="outlined"
                            fullWidth
                            placeholder='0:00'
                            InputProps={{
                                sx: { height: '30px', fontSize: "10px" },
                                endAdornment: <Typography sx={{ fontSize: "10px", color: "gray" }}>EGP</Typography>,
                            }}
                        />
                    </Grid>
                    <Grid item xs={10}> 
                    <FormControl fullWidth size="small" sx={{ minWidth: 90 }}>
                        <Select
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            sx={{
                                fontSize: '10px',
                                height: '30px',
                                borderRadius: "5px",
                                color: "gray",
                                '& .MuiSelect-select': {
                                    padding: '5px',
                                    fontSize: "12px",
                                    textAlign: 'center',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                },
                                '& .MuiSelect-select:focus': {
                                    backgroundColor: 'transparent'
                                }
                            }}
                        >
                            <MenuItem value="variant1" sx={{ color: "gray", fontSize: "10px", textAlign: 'center' }}>All</MenuItem>
                            <MenuItem value="variant2" sx={{ color: "gray", fontSize: "10px", textAlign: 'center' }}>Variants Name</MenuItem>
                        </Select>

                    </FormControl>
                    </Grid>
                    <Box sx={{ marginTop: "30px", display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center", }}>
                        <Button
                            onClick={handleAdd}
                            variant="contained"
                            sx={{
                                backgroundColor: '#ef7d00',
                                borderRadius: '25px',
                                color: 'white',
                                textTransform: 'none',
                                padding: '3px 52px',

                                '&:hover': {
                                    backgroundColor: '#f18101',
                                },
                            }}
                        >
                            <CheckOutlinedIcon /> Save
                        </Button>
                    </Box>
                </Grid>
            </Box>
        </Modal>
    );
};
