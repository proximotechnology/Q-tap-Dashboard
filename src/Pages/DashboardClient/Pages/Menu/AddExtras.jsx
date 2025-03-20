import { Button, Box, Divider, IconButton, Modal, Typography, TextField, Grid, MenuItem, Select, FormControl } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useContext, useEffect, useState } from 'react';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { ContentMenu } from '../../../../context/ContentMenuContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export const AddExtras = ({ open, handleClose }) => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [variantsId, setVariantsId] = useState("");
    const [loading, setLoading] = useState(false)
    const selectedBranch = localStorage.getItem('selectedBranch')
    const { variantsContext } = useContext(ContentMenu);
    const {t} = useTranslation();
    useEffect(() => {
        console.log("varianet page new", selectedBranch, variantsContext)
    }, [])

    const handleAdd = async () => {
        try {
            setLoading(true);
            if (!name || !price) {
                toast.error(t("plFillAllField"));
                setLoading(false);
                return;
            }


            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            formData.append("variants_id", variantsId)
            formData.append('brunch_id', selectedBranch);

            const response = await axios({
                method: 'POST',
                url: 'https://highleveltecknology.com/Qtap/api/meals_extra',
                data: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('clientToken')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data) {
                toast.success(t("extra.addSucc"));
                // reload page to get new variants whic added now
                const today = new Date().toLocaleDateString();
                setName('');
                setPrice('');
                window.location.reload();

            }
        } catch (error) {
            console.error('Error adding variants:', error);
            const errorMessage = error.response?.data?.message || t("extra.addErr");
            if (error.response?.data?.errors) {
                Object.values(error.response.data.errors).forEach(err => {
                    toast.error(err.join(', '));
                });
            } else {
                toast.error(errorMessage);
            }
        } finally {
            setLoading(false);
        }
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
                        {t("extra.add")}
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon sx={{ fontSize: "20px", color: "gray" }} />
                    </IconButton>
                </Box>
                <Divider sx={{ backgroundColor: '#FF6600', }} />


                <Grid container spacing={2}
                    sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>

                    <Grid item xs={10}>
                        <Typography variant='body2' sx={{ fontSize: "10px" }}>{t("name")}</Typography>
                        <TextField
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            variant="outlined"
                            fullWidth
                            placeholder='Extra Name'
                            InputProps={{ sx: { height: '30px', fontSize: "10px" } }}
                        />
                    </Grid>

                    <Grid item xs={10}>
                        <Typography variant='body2' sx={{ fontSize: "10px" }}>{t("price.one")}</Typography>
                        <TextField
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
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
                                {variantsContext?.map((variant) => (
                                    <MenuItem
                                        key={variant.id}
                                        value={variant.id}
                                        selected={variantsId === variant.id}
                                        onClick={() => setVariantsId(variant.id)}
                                        sx={{ color: "gray", fontSize: "10px", textAlign: 'center' }}
                                    >
                                        {variant.name}
                                    </MenuItem>
                                ))}
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
                            <CheckOutlinedIcon /> {t("save")}
                        </Button>
                    </Box>
                </Grid>
            </Box>
        </Modal>
    );
};
