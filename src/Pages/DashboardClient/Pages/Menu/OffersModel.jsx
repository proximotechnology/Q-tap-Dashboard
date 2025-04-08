import { Button, Divider, FormControl, IconButton, MenuItem, Modal, Select, TextField, Typography, useTheme } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useBranch } from '../../../../context/BranchContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ContentMenu } from '../../../../context/ContentMenuContext';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next'; 

export const OffersModel = ({ open, handleClose }) => {
    const { selectedBranch } = useBranch();
    const theme = useTheme();
    const [discounts, setDiscounts] = useState([
        { code: '123456', discount: '10%', date: '8/10/2024', status: 'Active' },
        { code: '123457', discount: '10%', date: '8/10/2024', status: 'Inactive' }
    ]);
    const { contentForMenu } = useContext(ContentMenu);
    // console.log("contentForMenu", contentForMenu);
    const {t} = useTranslation();
    const handleAdd = async () => {
        const newOffer = {
            discount: "0%", // قيمة ثابتة
            before_discount: "0", // قيمة ثابتة
            after_discount: "0", // قيمة ثابتة
            meals_id: "4", // قيمة ثابتة
            brunch_id: selectedBranch // يتم استخدام الـ branch المحدد
        };

        try {
            // إرسال البيانات إلى الـ API
            const response = await axios.post('https://highleveltecknology.com/Qtap/api/meals_special_offers', newOffer, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('clientToken')}`,
                }
            });

            if (response.data) {
                toast.success(t("offer.addSucc"));
                getOffers(); // إعادة جلب البيانات لتحديث الجدول
            }
        } catch (error) {
            console.error('Error adding offer:', error);
            toast.error(t("offer.addErr"));
        }
    };
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://highleveltecknology.com/Qtap/api/meals_special_offers/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('clientToken')}`,
                }
            });
            toast.success(t("offer.deleteSucc"));
            getOffers(); // إعادة جلب البيانات بعد الحذف
        } catch (error) {
            console.error('Error deleting offer:', error);
            toast.error(t("offer.deleteErr"));
        }
    };


    const [offers, setOffers] = useState([
        { id: 1, item: 'food', discount: '10%', priceBefore: '6.00 EGP', priceAfter: '0.00 EGP', isEditing: false },
        { id: 2, item: 'drink', discount: '10%', priceBefore: '5.00 EGP', priceAfter: '0.00 EGP', isEditing: false },
    ]);

    const handleEditToggle = async (index) => {
        const updatedOffers = [...offers];
        const offer = updatedOffers[index];

        if (offer.isEditing) {
            try {
                const response = await axios.put(
                    `https://highleveltecknology.com/Qtap/api/meals_special_offers/${offer.id}`,
                    {
                        discount: offer.discount, 
                        before_discount: offer.priceBefore,
                        after_discount: offer.priceAfter, 
                        meals_id: offer.item, 
                        brunch_id: selectedBranch 
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('clientToken')}`,
                        }
                    }
                );

                if (response.data) {
                    toast.success(t("offer.updateSucc"));
                    getOffers(); // إعادة جلب البيانات لتحديث الجدول
                }
            } catch (error) {
                console.error('Error updating offer:', error);
                toast.error(t("updateErr"));
            }
        }

        offer.isEditing = !offer.isEditing; // تبديل حالة التعديل
        setOffers(updatedOffers); // تحديث الحالة
    };

    const handleInputChange = (index, field, value) => {
        const updatedOffers = [...offers];
        updatedOffers[index][field] = value; // تحديث الحقل المحدد
        setOffers(updatedOffers); // تحديث الحالة
    };
    const getOffers = async () => {
        try {
            const response = await axios.get('https://highleveltecknology.com/Qtap/api/meals_special_offers', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('clientToken')}`,
                },
                params: {
                    brunch_id: selectedBranch
                }
            });
            // console.log("response offers", response?.data);

            if (response.data) {
                const formattedOffers = response.data.map(offer => ({
                    id: offer.id,
                    item: offer.meals_id, // يمكن تعديل هذا الحقل حسب الحاجة
                    discount: offer.discount,
                    priceBefore: offer.before_discount,
                    priceAfter: offer.after_discount,
                    isEditing: false // جعل الحالة الافتراضية غير قابلة للتعديل
                }));
                setOffers(formattedOffers); // تحديث الحالة
            }
        } catch (error) {
            console.error('Error fetching discounts:', error);
            // toast.error('Error fetching discounts'); 
        }
    };
    useEffect(() => {
        getOffers();
    }, [selectedBranch]);



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
                        {t("specialOffers")}
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
                            <TableCell sx={{ fontSize: '10px', padding: '3px 0px', borderBottom: 'none', textAlign: 'center', color: '#575756' }}>{t("item.one")}</TableCell>
                            <TableCell sx={{ fontSize: '10px', padding: '3px 0px', borderBottom: 'none', textAlign: 'center', color: '#575756' }}>{t("discount.one")}</TableCell>
                            <TableCell sx={{ fontSize: '10px', padding: '3px 0px', borderBottom: 'none', textAlign: 'center', color: '#575756' }}>{t("price.before")}</TableCell>
                            <TableCell sx={{ fontSize: '10px', padding: '3px 0px', borderBottom: 'none', textAlign: 'center', color: '#575756' }}>{t("price.after")}</TableCell>
                            <TableCell sx={{ fontSize: '10px', padding: '3px 0px', borderBottom: 'none', textAlign: 'center', color: '#575756' }}>{t("action")}</TableCell>
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
                                            sx={{ width: "70px", height: "30px", "& .MuiInputBase-root": { height: "30px", fontSize: "10px" } }}>
                                            <Select
                                                value={offer.item}
                                                onChange={(e) => handleInputChange(index, 'item', e.target.value)}
                                                displayEmpty
                                            >
                                                {contentForMenu.map((item) => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    ) : (
                                        <span style={{ fontSize: '10px', color: 'gray' }}>{offer.item}</span>
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
                                            sx={{ width: "70px", height: "30px", "& .MuiInputBase-root": { height: "30px", fontSize: "10px" } }}
                                        />
                                    ) : (
                                        <span style={{ fontSize: '10px', color: 'gray' }}>{offer.discount}</span>
                                    )}
                                </TableCell>

                                {/* Price Before Field */}
                                <TableCell sx={{ textAlign: 'center', fontSize: '12px', color: 'gray', padding: '3px 0px', borderBottom: 'none' }}>
                                    {offer.isEditing ? (
                                        <TextField
                                            value={offer.priceBefore}
                                            onChange={(e) => handleInputChange(index, 'priceBefore', e.target.value)}
                                            variant="outlined"
                                            size="small"
                                            sx={{ width: "70px", height: "30px", "& .MuiInputBase-root": { height: "30px", fontSize: "10px" } }}
                                        />
                                    ) : (
                                        <span style={{ fontSize: '10px', color: 'gray' }}>{offer.priceBefore}</span>
                                    )}
                                </TableCell>

                                {/* Price After Field */}
                                <TableCell sx={{ textAlign: 'center', fontSize: '12px', color: 'gray', padding: '3px 0px', borderBottom: 'none' }}>
                                    {offer.isEditing ? (
                                        <TextField
                                            value={offer.priceAfter}
                                            onChange={(e) => handleInputChange(index, 'priceAfter', e.target.value)}
                                            variant="outlined"
                                            size="small"
                                            sx={{ width: "70px", height: "30px", "& .MuiInputBase-root": { height: "30px", fontSize: "10px" } }}
                                        />
                                    ) : (
                                        <span style={{ fontSize: '10px', color: 'gray' }}>{offer.priceAfter}</span>
                                    )}
                                </TableCell>

                                {/* Actions */}
                                <TableCell sx={{ fontSize: "10px", textAlign: "center", padding: '3px 0px', borderBottom: "none" }}>
                                    {offer.isEditing ? (
                                        <IconButton size="small" onClick={() => handleEditToggle(index)} color="primary">
                                            <img src="/assets/true.svg" alt="save icon" />
                                        </IconButton>
                                    ) : (
                                        <>
                                            <IconButton size="small" onClick={() => handleEditToggle(index)}>
                                                <span class="icon-edit" sx={{ fontSize: "10px", color: "black" }}></span>
                                            </IconButton>
                                            <IconButton size="small" onClick={() => handleDelete(offer.id)} color="error">
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
                            backgroundColor: theme.palette.orangePrimary.main,
                            borderRadius: '25px',
                            color: 'white',
                            width: "30%",
                            textTransform: 'none',
                            padding: '3px 12px', fontSize: "12px",
                            display: 'flex',
                            justifyContent: "center",
                            alignItems: "center",
                            '&:hover': {
                                backgroundColor: '#f18101',
                            },
                        }}
                    >
                         <AddIcon sx={{ margin: "0 2px 2px 0", fontSize: "11px", color: "white", "& path": { stroke: "white", strokeWidth: 3 } }} /> {t("add")}
                    </Button>
                </Box>

            </Box >
        </Modal >
    );
};
