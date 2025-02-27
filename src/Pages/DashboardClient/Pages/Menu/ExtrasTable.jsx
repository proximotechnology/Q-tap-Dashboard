

import { Button, Divider, FormControl, IconButton, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { AddExtras } from './AddExtras';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ContentMenu } from '../../../../context/ContentMenuContext';

export const ExtrasTable = () => {
    const [openVariant, setOpenOffers] = useState(false);
    const [allExtras, setAllExtras] = useState([]);
    const [variantIdFromMenuUpdate, setVariantIdFromMenuUpdate] = useState([])
    const selectedBranch = localStorage.getItem('selectedBranch');
    const { variantsContext } = useContext(ContentMenu);


    useEffect(() => {
        getExtras();
        // console.log("variantsContext extara table page ", variantsContext)

    }, [selectedBranch]);

    const handleOffersOpen = () => {
        setOpenOffers(true);
    };

    const handleClose = () => {
        setOpenOffers(false);
    };
    const getExtras = async () => {
        try {
            const response = await axios.get('https://highleveltecknology.com/Qtap/api/meals_extra', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('clientToken')}` },
                params: { brunch_id: selectedBranch }
            });

            if (response.data) {
                const updatedExtras = response.data.map(extra => ({
                    ...extra,
                    isEditing: false,
                }));
                console.log("extra data", response?.data)
                setAllExtras(updatedExtras);
            }
        } catch (error) {
            console.error('Error fetching extras:', error);
            toast.error('Error fetching extras');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://highleveltecknology.com/Qtap/api/meals_extra/${id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('clientToken')}` }
            });
            toast.success("Extra deleted");
            getExtras();
        } catch (error) {
            console.error('Error deleting extra:', error);
            toast.error('Error deleting extra');
        }
    };

    const handleEditToggle = (index) => {
        const updatedExtras = [...allExtras];
        updatedExtras[index].isEditing = !updatedExtras[index].isEditing;
        setAllExtras(updatedExtras);
    };

    const handleInputChange = (index, field, value) => {
        const updatedExtras = [...allExtras];
        updatedExtras[index][field] = value;
        setAllExtras(updatedExtras);
    };

    const handleUpdate = async (index) => {
        const extra = allExtras[index];

        try {

            const response = await axios.put(
                `https://highleveltecknology.com/Qtap/api/meals_extra/${extra.id}`,
                {
                    name: extra.name,
                    price: extra.price,
                    variants_id: variantIdFromMenuUpdate,
                    brunch_id: selectedBranch
                },
                {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('clientToken')}` }
                }
            );

            if (response.data) {
                toast.success('Updated successfully');
                handleEditToggle(index);
                getExtras();
            }
        } catch (error) {
            console.error('Error updating extra:', error);
            toast.error('Error updating extra');
        }
    };

    return (
        <Paper sx={{ borderRadius: "10px", padding: "20px 30px", marginTop: "-20px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="body1" sx={{ fontSize: "13px", color: "#575756" }}>
                    Extras
                </Typography>
                <Button>
                    <Typography
                        onClick={handleOffersOpen}
                        variant='body1' sx={{ fontSize: "13px", textTransform: "capitalize", color: "#ef7d00" }}>
                        + Add One
                    </Typography>
                </Button>
                <AddExtras open={openVariant} handleClose={handleClose} />
            </Box>

            <Divider sx={{ backgroundColor: '#ef7d00' }} />

            <Table sx={{ mt: 3, mb: 5, width: '100%', tableLayout: 'fixed' }}>
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#EBEDF3"}}>
                        <TableCell sx={{ fontSize: "10px", textAlign: "left", color: "#575756" , padding:"3px 10px"}}>Price</TableCell>
                        <TableCell sx={{ fontSize: "10px", textAlign: "left", color: "#575756", padding:"3px 10px" }}>Name</TableCell>
                        <TableCell sx={{ fontSize: "10px", textAlign: "center", color: "#575756", padding:"3px 10px" }}>Actions</TableCell>
                        <TableCell sx={{ fontSize: "10px", textAlign: "center", color: "#575756", padding:"3px 10px" }}></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {allExtras.map((extra, index) => (
                        <TableRow key={extra.id} sx={{ height: '36px' }}>
                            <TableCell sx={{ textAlign: "left", fontSize: "11px", color: "gray" }}>
                                {extra.isEditing ? (
                                    <TextField
                                        value={extra.price}
                                        onChange={(e) => handleInputChange(index, "price", e.target.value)}
                                        variant="outlined"
                                        size="small"
                                    />
                                ) : (
                                    extra.price
                                )}
                            </TableCell>

                            <TableCell sx={{ textAlign: "left", fontSize: "11px", color: "gray" }}>
                                {extra.isEditing ? (
                                    <TextField
                                        value={extra.name}
                                        onChange={(e) => handleInputChange(index, "name", e.target.value)}
                                        variant="outlined"
                                        size="small"
                                    />
                                ) : (
                                    extra.name
                                )}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center", fontSize: "10px", color: "gray", padding: '3px 10px', width: '25%' }}>
                                <FormControl fullWidth size="small" sx={{ minWidth: 80 }}>
                                    <Select
                                        displayEmpty
                                        placeholder='All'
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        sx={{
                                            fontSize: '10px',
                                            height: '25px',
                                            lineHeight: "30px",
                                            borderRadius: "5px",
                                            color: "gray",
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
                                        {
                                            variantsContext?.map((variant) => (
                                                <MenuItem
                                                    key={variant.id}
                                                    value={variant.id}
                                                    selected={variant.id === variantIdFromMenuUpdate}
                                                    onClick={() => setVariantIdFromMenuUpdate(variant.id)}
                                                    sx={{ color: "gray", fontSize: "10px", textAlign: 'center' }}>
                                                    {variant.name}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>

                                </FormControl>
                            </TableCell>
                            <TableCell sx={{ textAlign: "center", fontSize: "12px" }}>
                                {extra.isEditing ? (
                                    <IconButton size="small" color='success' onClick={() => handleUpdate(index)}>
                                        <DoneIcon sx={{ fontSize: "18px" }} />
                                    </IconButton>
                                ) : (
                                    <IconButton size="small" color='success' onClick={() => handleEditToggle(index)}>
                                    <span class="icon-edit" style={{ fontSize: "18px" }} />
                                    </IconButton>
                                )}
                                <IconButton size="small" color='error' onClick={() => handleDelete(extra.id)}>
                                <span class="icon-delete" style={{ fontSize: "18px" }} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};
