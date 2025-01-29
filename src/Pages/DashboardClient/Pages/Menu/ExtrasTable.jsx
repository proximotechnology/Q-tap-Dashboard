import { Button, Divider, FormControl, IconButton, MenuItem, Paper, Select, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { AddExtras } from './AddExtras';

export const ExtrasTable = () => {
    const Extras = [
        {
            id: 1,
            price: '5.00 EGP',
            name: 'Name of extra here',
            for: "All",
        }];
        const [openExtras, setOpenExtras] = useState(false);

        const handleExtrasOpen = () => {
            setOpenExtras(true);
        };
    
        const handleClose = () => {
            setOpenExtras(false);
        };
    
    return (
        <Paper
            sx={{
                borderRadius: "10px", padding: "20px 30px", marginTop: "20px"
            }} >

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="body1" sx={{ fontSize: "13px", color: "#424242" }}>
                    Extras
                </Typography>
                <Button onClick={handleExtrasOpen} >
                    <Typography variant='body1' sx={{ fontSize: "12px",textTransform:"capitalize", color: "#ef7d00" }}>
                        + Add One</Typography>
                </Button>
                <AddExtras open={openExtras} handleClose={handleClose} />
            </Box>
            <Divider sx={{ backgroundColor: '#ef7d00',  }} />

            <Table sx={{ mt: 3, mb: 5, width: '100%', tableLayout: 'fixed' }}>
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#EBEDF3" }}>
                        <TableCell sx={{ fontSize: "10px", padding: '3px 10px', borderBottom: "none", textAlign: "left"  }}>Price</TableCell>
                        <TableCell sx={{ fontSize: "10px", padding: '3px 10px', borderBottom: "none", textAlign: "left"  }}>Name</TableCell>
                        <TableCell sx={{ fontSize: "10px", padding: '3px 10px', borderBottom: "none", textAlign: "center"}}>For</TableCell>
                        <TableCell sx={{ fontSize: "10px", padding: '3px 10px', borderBottom: "none", textAlign: "left"  }}></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {Extras.map((discount, index) => (
                        <TableRow key={index} sx={{ height: '36px' }}>
                            <TableCell sx={{ textAlign: "left", fontSize: "10px", color: "gray", padding: '3px 10px', width: `${100 / 4}%` }}>{discount.price}</TableCell>
                            <TableCell sx={{ textAlign: "left", fontSize: "10px", color: "gray", padding: '3px 10px', width: `${100 / 4}%` }}>{discount.name}</TableCell>
                            <TableCell sx={{ textAlign: "center", fontSize: "10px", color: "gray", padding: '3px 10px', width: '25%' }}>
                                <FormControl fullWidth size="small" sx={{ minWidth: 80 }}>
                                    <Select
                                        displayEmpty
                                        placeholder='All'
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        sx={{
                                            fontSize: '10px',
                                            height: '25px',
                                            lineHeight:"30px",
                                            borderRadius: "5px",
                                            color:"gray",
                                            '& .MuiSelect-select': {
                                                padding: '5px',
                                                fontSize: "10px",
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
                                        <MenuItem value="variant1" sx={{ color: "gray", fontSize: "10px", textAlign: 'center' }}>{discount.for}</MenuItem>
                                        <MenuItem value="variant2" sx={{ color: "gray", fontSize: "10px", textAlign: 'center' }}>Variants Name</MenuItem>
                                    </Select>

                                </FormControl>
                            </TableCell>

                            <TableCell sx={{ fontSize: "12px", padding: '3px 10px', width: `${100 / 4}%`, textAlign: "center" }}>
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
