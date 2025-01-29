import { Button, Divider, FormControl, IconButton, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

export const OffersModel = ({ open, handleClose }) => {

    const handleAdd = () => {
        //  adding a new discount
    };
    const [discounts, setDiscounts] = useState([
        { code: '123456', discount: '10%', date: '8/10/2024', status: 'Active' },
        { code: '123457', discount: '10%', date: '8/10/2024', status: 'Inactive' }
    ]);

    const handleDelete = (index) => {
        const updatedDiscounts = discounts.filter((_, i) => i !== index);
        setDiscounts(updatedDiscounts);
    };

    const [offers, setOffers] = useState([
        { id: 1, item: 'food', discount: '10%', priceBefore: '6.00 EGP', priceAfter: '0.00 EGP', isEditing: false },
        { id: 2, item: 'drink', discount: '10%', priceBefore: '5.00 EGP', priceAfter: '0.00 EGP', isEditing: false },
    ]);

    const handleEditToggle = (index) => {
        const updatedOffers = [...offers];
        updatedOffers[index].isEditing = !updatedOffers[index].isEditing;
        setOffers(updatedOffers);
    };

    const handleInputChange = (index, field, value) => {
        const updatedOffers = [...offers];
        updatedOffers[index][field] = value;
        setOffers(updatedOffers);
    };


    return (
        <Modal open={open} onClose={handleClose} disableScrollLock>
            <Box
                sx={{
                    width: 500,
                    height: "400px",
                    bgcolor: 'background.paper',
                    p: 4,
                    borderRadius: 3,
                    boxShadow: 24,
                    mx: 'auto',
                    mt: '20vh',
                    position: 'relative'
                }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body1" sx={{ fontSize: "13px", color: "#575756" }}>
                        Special Offers
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <span class="icon-close-1" style={{ fontSize: "12px", color: "gray" }} />
                    </IconButton>
                </Box>

                <Divider
                    sx={{
                        backgroundColor: '#FF6600',
                        height: '1px',
                    }}
                />

                <Table sx={{ mt: 3, mb: 5, width: '500px', marginLeft: '-32px', tableLayout: 'fixed' }}>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell sx={{ fontSize: '10px', padding: '3px 0px', borderBottom: 'none', textAlign: 'center', color: '#575756' }}>Item</TableCell>
                            <TableCell sx={{ fontSize: '10px', padding: '3px 0px', borderBottom: 'none', textAlign: 'center', color: '#575756' }}>Discount</TableCell>
                            <TableCell sx={{ fontSize: '10px', padding: '3px 0px', borderBottom: 'none', textAlign: 'center', color: '#575756' }}>Price Before</TableCell>
                            <TableCell sx={{ fontSize: '10px', padding: '3px 0px', borderBottom: 'none', textAlign: 'center', color: '#575756' }}>Price After</TableCell>
                            <TableCell sx={{ fontSize: '10px', padding: '3px 0px', borderBottom: 'none', textAlign: 'center', color: '#575756' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {offers.map((offer, index) => (
                            <TableRow key={index} sx={{ height: '36px' }}>

                                {/* Item Field */}
                                <TableCell sx={{ textAlign: 'center', fontSize: '12px', color: 'gray', padding: '3px 0px', borderBottom: 'none' }}>
                                    {offer.isEditing ? (
                                        <FormControl
                                            size="small"
                                            sx={{
                                                width: '110px', height: "30px",
                                                padding: "0px 10px ", textAlign: 'left',

                                                '.MuiSelect-select': {
                                                    fontSize: '10px', color: 'gray', padding: "1px 10px",
                                                },
                                                '.MuiOutlinedInput-notchedOutline': { borderColor: '#d3d3d3', borderRadius: "8px" },
                                            }}
                                        >
                                            <Select
                                                value={offer.item}
                                                onChange={(e) => handleInputChange(index, 'item', e.target.value)}
                                                displayEmpty
                                            >
                                                <MenuItem value="drink" sx={{ fontSize: '10px', color: 'gray' }}>
                                                    drink
                                                </MenuItem>
                                                <MenuItem value="food" sx={{ fontSize: '10px', color: 'gray' }}>
                                                    food
                                                </MenuItem>
                                                <MenuItem value="juice" sx={{ fontSize: '10px', color: 'gray' }}>
                                                    juice
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    ) : (
                                        
                                        <span style={{ fontSize: '10px', color: 'gray' }}>{ offer.item} 
                                        </span>
                                    )}
                                </TableCell>

                                {/* Discount Field */}
                                <TableCell sx={{ textAlign: 'center', fontSize: '12px', color: 'gray', padding: '3px 0px', borderBottom: 'none' }}>
                                    {offer.isEditing ? (
                                        <TextField
                                            value={offer.discount}
                                            onChange={(e) => handleInputChange(index, 'discount', e.target.value)}
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                width: '70px',  
                                                fontSize: '12px',  
                                                color: 'gray',  
                                                textAlign: 'left',
                                                '.MuiOutlinedInput-root': {
                                                    fontSize: '12px', 
                                                    color: 'gray',
                                                },
                                                '.MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#d3d3d3',  
                                                    borderRadius: '8px', 
                                                },
                                                '& .MuiInputBase-input': {
                                                    fontSize: '12px',  
                                                    color: 'gray', 
                                                    padding: '3px 10px', 
                                                },
                                            }}
                                        />
                                    ) : (
                                        <span style={{ fontSize: '10px', color: 'gray' }}>{offer.discount} 
                                        </span>
                                    )}
                                </TableCell>


                                {/* Price Before Field (non-editable) */}
                                <TableCell sx={{ textAlign: 'center', fontSize: '11px', color: 'gray', padding: '3px 0px', borderBottom: 'none' }}>
                                    {offer.priceBefore}
                                </TableCell>

                                {/* Price After Field (non-editable) */}
                                <TableCell sx={{ textAlign: 'center', fontSize: '11px', color: 'gray', padding: '3px 0px', borderBottom: 'none' }}>
                                    {offer.priceAfter}
                                </TableCell>

                                {/* Actions */}
                                <TableCell sx={{ fontSize: "10px", textAlign: "center", padding: '3px 0px', borderBottom: "none" }}>
                                    {offer.isEditing ? (
                                        <IconButton size="small" onClick={() => handleEditToggle(index)} color="primary">
                                            <img src="/assets/true.svg" alt="save icon" sx={{ fontSize: '16px', color: "#E57C00" }} />
                                        </IconButton>
                                    ) : (
                                        <>
                                            <IconButton size="small" onClick={() => handleEditToggle(index)}>
                                                <span class="icon-edit" sx={{ fontSize: "10px", color: "black" }}></span>
                                            </IconButton>
                                            <IconButton size="small" onClick={() => handleDelete(index)} color="error">
                                                <span class="icon-delete" sx={{ fontSize: "10px" }}></span>
                                            </IconButton>
                                        </>
                                    )}

                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* add button */}
                <Box sx={{ display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center", }}>
                    <Button
                        onClick={handleAdd}
                        variant="contained"
                        sx={{
                            backgroundColor: '#ef7d00',
                            borderRadius: '25px',
                            color: 'white',
                            width: "30%",
                            textTransform: 'none',
                            padding: '3px 12px', fontSize: "12px",

                            '&:hover': {
                                backgroundColor: '#f18101',
                            },
                        }}
                    >
                        + Add
                    </Button>
                </Box>

            </Box >
        </Modal >
    );
};
