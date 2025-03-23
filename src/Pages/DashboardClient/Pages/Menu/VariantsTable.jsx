import { Button, Divider, IconButton, Paper, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { AddVariant } from './AddVariant';
import DoneIcon from '@mui/icons-material/Done';
import { useBranch } from '../../../../context/BranchContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ContentMenu } from '../../../../context/ContentMenuContext';
export const VariantsTable = () => {
    const [openVariant, setOpenOffers] = useState(false);
    const [allVariants, setAllVariants] = useState([])
    const { setVariantsContext } = useContext(ContentMenu);
    const selectedBranch = localStorage.getItem('selectedBranch');
    // useEffect(() => {
    //     console.log("varianet page data  ", selectedBranch)
    // }, [])
    const handleOffersOpen = () => {
        setOpenOffers(true);
    };

    const handleClose = () => {
        setOpenOffers(false);
    };

    useEffect(() => {
        getVariants();
    }, [selectedBranch]);

    const getVariants = async () => {
        try {
            const response = await axios.get('https://highleveltecknology.com/Qtap/api/meals_variants', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('clientToken')}` },
                params: { brunch_id: selectedBranch }
            });

            if (response.data) {
                // إضافة خاصية isEditing إلى كل عنصر
                const updatedVariants = response.data.map(variant => ({
                    ...variant,
                    isEditing: false,
                }));
                setAllVariants(updatedVariants);
                setVariantsContext(updatedVariants);
            }
        } catch (error) {
            console.error('Error fetching variants:', error);
            // toast.error('Error fetching variants');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://highleveltecknology.com/Qtap/api/meals_variants/${id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('clientToken')}` }
            });
            toast.success("Variant deleted");
            getVariants();
        } catch (error) {
            console.error('Error deleting variant:', error);
            toast.error('Error deleting variant');
        }
    };

    const handleEditToggle = (index) => {
        const updatedVariants = [...allVariants];
        updatedVariants[index].isEditing = !updatedVariants[index].isEditing;
        setAllVariants(updatedVariants);
    };

    const handleInputChange = (index, field, value) => {
        const updatedVariants = [...allVariants];
        updatedVariants[index][field] = value;
        setAllVariants(updatedVariants);
    };

    const handleUpdate = async (index) => {
        const variant = allVariants[index];

        try {
            const response = await axios.put(
                `https://highleveltecknology.com/Qtap/api/meals_variants/${variant.id}`,
                {
                    name: variant.name,
                    price: variant.price,
                    brunch_id: selectedBranch
                },
                {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('clientToken')}` }
                }
            );

            if (response.data) {
                toast.success('Updated successfully');
                handleEditToggle(index); // إغلاق وضع التعديل
                getVariants(); // تحديث البيانات
            }
        } catch (error) {
            console.error('Error updating variant:', error);
            toast.error('Error updating variant');
        }
    };

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
                    {allVariants.map((variant, index) => (
                        <TableRow key={variant.id} sx={{ height: '36px' }}>
                            {/* إذا كان في وضع التعديل، أظهر حقل إدخال، وإلا أظهر النص */}
                            <TableCell sx={{ textAlign: "left", fontSize: "11px", color: "gray" }}>
                                {variant.isEditing ? (
                                    <TextField
                                        value={variant.price}
                                        onChange={(e) => handleInputChange(index, "price", e.target.value)}
                                        variant="outlined"
                                        size="small"
                                    />
                                ) : (
                                    variant.price
                                )}
                            </TableCell>

                            <TableCell sx={{ textAlign: "left", fontSize: "11px", color: "gray" }}>
                                {variant.isEditing ? (
                                    <TextField
                                        value={variant.name}
                                        onChange={(e) => handleInputChange(index, "name", e.target.value)}
                                        variant="outlined"
                                        size="small"
                                    />
                                ) : (
                                    variant.name
                                )}
                            </TableCell>

                            <TableCell sx={{ textAlign: "center", fontSize: "12px" }}>
                                {variant.isEditing ? (
                                    <IconButton size="small" color='success' onClick={() => handleUpdate(index)}>
                                        <DoneIcon sx={{ fontSize: "18px" }} />
                                    </IconButton>
                                ) : (
                                    <IconButton size="small" color='success' onClick={() => handleEditToggle(index)}>
                                        <span class="icon-edit" style={{ fontSize: "18px" }} />
                                    </IconButton>
                                )}
                                <IconButton size="small" color='error' onClick={() => handleDelete(variant.id)}>
                                    <span class="icon-delete" style={{ fontSize: "18px" }} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    )
}
