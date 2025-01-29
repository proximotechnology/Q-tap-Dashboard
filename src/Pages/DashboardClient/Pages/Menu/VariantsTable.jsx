import { Button, Divider, IconButton, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { AddVariant } from './AddVariant';
import DoneIcon from '@mui/icons-material/Done';
export const VariantsTable = () => {
    const [openVariant, setOpenOffers] = useState(false);
    const handleOffersOpen = () => {
        setOpenOffers(true);
    };

    const handleClose = () => {
        setOpenOffers(false);
    };

    const Variants = [
        {
            id: 1,
            price: '5.00 EGP',
            action: 'Name of option here',
        }];

    return (
        <Paper
            sx={{
                borderRadius: "10px", padding: "20px 30px", marginTop: "-20px"
            }} >

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="body1" sx={{ fontSize: "13px", color: "#575756" }}>
                    Variants
                </Typography>
                <Box sx={{ display: "flex" }}>
                    <Box sx={{ display: "flex", alignItems: "center", marginRight: "15px" }}>
                        <Typography sx={{ fontSize: "10px", color: "gray", marginRight: "5px" }}>Limit</Typography>
                        <TextField
                            placeholder='0.0'
                            variant="outlined"
                            fullWidth
                            type="number"
                            InputProps={{
                                sx:
                                    { height: '20px', fontSize: "9px", width: "55px" },
                            }}
                        />
                        <DoneIcon sx={{ color: "#ef7d00", fontSize: "16px" }} />
                    </Box>

                    <Button onClick={handleOffersOpen} >
                        <Typography variant='body1' sx={{ fontSize: "13px", textTransform: "capitalize", color: "#ef7d00" }}>
                            + Add One</Typography>
                    </Button>
                    <AddVariant open={openVariant} handleClose={handleClose} />
                </Box>
            </Box>


            <Divider sx={{ backgroundColor: '#ef7d00' }} />

            <Table sx={{ mt: 3, mb: 5, width: '100%', tableLayout: 'fixed' }}>
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#EBEDF3" }}>
                        <TableCell sx={{ fontSize: "10px", padding: '3px 10px', borderBottom: "none", textAlign: "left", color: "#575756" }}>Price</TableCell>
                        <TableCell sx={{ fontSize: "10px", padding: '3px 10px', borderBottom: "none", textAlign: "left", color: "#575756" }}>Options</TableCell>
                        <TableCell sx={{ fontSize: "10px", padding: '3px 10px', borderBottom: "none", textAlign: "left", color: "#575756" }}></TableCell>
                    </TableRow>
                </TableHead>


                <TableBody>
                    {Variants.map((discount, index) => (
                        <TableRow key={index} sx={{ height: '36px' }}>
                            <TableCell sx={{ textAlign: "left", fontSize: "11px", color: "gray", padding: '3px 10px', width: `${100 / 3}%` }}>{discount.price}</TableCell>
                            <TableCell sx={{ textAlign: "left", fontSize: "11px", color: "gray", padding: '3px 10px', width: `${100 / 3}%` }}>{discount.action}</TableCell>

                            <TableCell sx={{ fontSize: "12px", padding: '3px 10px', width: `${100 / 3}%`, textAlign: "center" }}>
                                <IconButton size="small" color='success'  >
                                    <span class="icon-edit" style={{ fontSize: "18px"  }} />
                                </IconButton>
                                <IconButton size="small" color='error'>
                                    <span class="icon-delete" style={{ fontSize: "18px"}} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    )
}
