import { Button, Box, Divider, IconButton, Modal, Typography, Grid, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
export const AddVariant = ({ open, handleClose }) => {
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
                        Add Variants
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon sx={{ fontSize: "20px", color: "gray" }} />
                    </IconButton>
                </Box>
                <Divider sx={{backgroundColor: '#FF6600',}} />

                <Grid container spacing={2}
                sx={{display:"flex", justifyContent:"center" , marginTop:"10px"}}>

                <Grid item xs={10}>
                    <Typography variant='body2' sx={{ fontSize: "10px" }}>Optain</Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        placeholder='Variant Name'
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

                <Box sx={{ marginTop:"30px",display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center", }}>
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
