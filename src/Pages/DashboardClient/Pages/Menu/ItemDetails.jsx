

import CheckIcon from '@mui/icons-material/Check';
import React, { useState, useEffect, useContext } from 'react';
import { Typography, Box, Paper, Divider, Grid, TextField, Button } from '@mui/material';
import StraightOutlinedIcon from '@mui/icons-material/StraightOutlined';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useBranch } from '../../../../context/BranchContext';
import { ContentMenu } from '../../../../context/ContentMenuContext';
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';

export const ItemDetails = ({ categoryId }) => {
    const {t} = useTranslation();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const itemId = queryParams.get('itemId');

    const [name, setName] = useState('');
    const [brief, setBrief] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [calories, setCalories] = useState('');
    const [time, setTime] = useState('');
    const [tax, setTax] = useState('');
    const [priceSmall, setPriceSmall] = useState('');
    const [priceMedium, setPriceMedium] = useState('');
    const [priceLarge, setPriceLarge] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [image, setImage] = useState(null);
    const selectedBranch = localStorage.getItem('selectedBranch');
    const { discountContent } = useBranch();
    const [loading, setLoading] = useState(false);
    const { contentForMenu } = useContext(ContentMenu);
    const [isEditing, setIsEditing] = useState(false); // Track if editing an existing meal

    useEffect(() => {
        if (contentForMenu && itemId) {
            const itemToUpdate = contentForMenu.find(item => item.id === parseInt(itemId));
            if (itemToUpdate) {
                setName(itemToUpdate.name || '');
                setBrief(itemToUpdate.Brief || '');
                setDescription(itemToUpdate.Description || '');
                setIngredients(itemToUpdate.Ingredients || '');
                setCalories(itemToUpdate.Calories || '');
                setTime(itemToUpdate.Time || '');
                setTax(itemToUpdate.Tax || '');
                setPriceSmall(itemToUpdate.price_small || '');
                setPriceMedium(itemToUpdate.price_medium || '');
                setPriceLarge(itemToUpdate.price_large || '');
                setPrice(itemToUpdate.price || '');
                const discountItem = discountContent.find(item => item.id === itemToUpdate.discount_id);
                setDiscount(discountItem ? discountItem.code : '');
                setImage(itemToUpdate.img || null); // Assuming `img` is a URL
                setIsEditing(true); // Set editing mode to true
            }
        }
    }, [contentForMenu, itemId, discountContent]);

    const handleImageUpload = (e) => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = (e) => {
            if (!e.target || !e.target.files || e.target.files.length === 0) {
                console.warn('No file selected');
                return;
            }
            const file = e.target.files[0];
            if (file) {
                setImage(file); // Set the image state to the File object
            }
        };
        fileInput.click();
    };

    const handleSaveOrUpdate = async () => {
        try {
            setLoading(true);

            // Check if all fields are filled
            if (!name || !brief || !description || !ingredients || !calories || !time || !tax || !priceSmall || !priceMedium || !priceLarge || !price || !discount || !image) {
                toast.error(t("plFillAllField"));
                return;
            }

            const discountId = discountContent?.find((item) => item.code === discount)?.id;
            if (!discountId) {
                toast.error(t("discount.notFound"));
                return;
            }

            // Create form data
            const formData = new FormData();
            formData.append('name', name);
            formData.append('img', image);
            formData.append('Brief', brief);
            formData.append('Description', description);
            formData.append('Ingredients', ingredients);
            formData.append('Calories', calories);
            formData.append('Time', time);
            formData.append('Tax', tax);
            formData.append('price_small', priceSmall);
            formData.append('price_medium', priceMedium);
            formData.append('price_large', priceLarge);
            formData.append('price', price);
            formData.append('discount_id', discountId);
            formData.append('categories_id', categoryId);
            formData.append('brunch_id', selectedBranch);

            let response;
            if (isEditing) {
                // Update existing meal
                response = await axios.post(
                    `https://highleveltecknology.com/Qtap/api/meals/${itemId}`,
                    formData,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('clientToken')}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );
            } else {
                // Create new meal
                response = await axios.post(
                    "https://highleveltecknology.com/Qtap/api/meals",
                    formData,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('clientToken')}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );
            }

            // Check if request was successful
            if (response.status === 200 || response.status === 201) {
                toast.success(isEditing ? t("item.updateSucc") : t("item.addSucc"));
                window.location.reload();
            }
        } catch (error) {
            if (error.response?.data?.errors) {
                Object.values(error.response.data.errors).forEach(err => {
                    toast.error(err.join(', '));
                });
            } else {
                toast.error(error.response?.data?.message || t("errorOccurred"));
            }
            console.log("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper sx={{ marginTop: "-20px", marginBottom: "30px", borderRadius: "10px", padding: "20px 50px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1" fontSize={"15px"} color={"#575756"}>{t("item.details")}</Typography>
            </Box>

            <Divider sx={{ backgroundColor: "#ef7d00" }} />

            <Box >
                <Grid container spacing={5}>
                    {/* Left Side: Form Fields */}
                    <Grid item xs={12} md={7} marginTop={"15px"}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant='body2' sx={{ fontSize: "10px", color: "gray" }}>{t("item.name")}</Typography>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{ sx: { height: '35px', fontSize: "10px" } }}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='body2' sx={{ fontSize: "10px", color: "gray" }}>{t("brief")}</Typography>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{ sx: { height: '35px', fontSize: "10px" } }}
                                    value={brief}
                                    onChange={(e) => setBrief(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='body2' sx={{ fontSize: "10px", color: "gray" }}> {t("discription")}</Typography>
                                <TextField
                                    variant="outlined"
                                    multiline
                                    rows={2}
                                    fullWidth
                                    InputProps={{ sx: { fontSize: "10px" } }}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='body2' sx={{ fontSize: "10px", color: "gray" }}>{t("ingredients")}</Typography>
                                <TextField
                                    variant="outlined"
                                    multiline
                                    rows={2}
                                    fullWidth
                                    InputProps={{ sx: { fontSize: "10px" } }}
                                    value={ingredients}
                                    onChange={(e) => setIngredients(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='body2' sx={{ fontSize: "10px", color: "gray" }}>{t("calories")} </Typography>
                                <TextField
                                    value={calories}
                                    onChange={(e) => setCalories(e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        sx: { height: '35px', fontSize: "10px" },
                                        endAdornment: <Typography sx={{ fontSize: "10px", color: "gray" }}>{t("kcal")}</Typography>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='body2' sx={{ fontSize: "10px", color: "gray" }}>{t("time")}</Typography>
                                <TextField
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        sx: { height: '35px', fontSize: "10px" },
                                        endAdornment: <Typography sx={{ fontSize: "10px", color: "gray" }}>{t("min")}</Typography>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='body2' sx={{ fontSize: "10px", color: "gray" }}>{t("tax")}</Typography>
                                <TextField
                                    value={tax}
                                    onChange={(e) => setTax(e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        sx: { height: '35px', fontSize: "10px" },
                                        endAdornment: <Typography sx={{ fontSize: "10px", color: "gray" }}>%</Typography>,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Right Side: Image and Upload Button */}
                    <Grid item xs={12} md={5} marginTop={"25px"}>
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ width: "160px", height: "90px", backgroundColor: "#f4f6fc", borderRadius: '8px', overflow: 'hidden' }}
                        >
                            {image ? (
                                typeof image === 'string' ? (
                                    <img
                                        src={image}
                                        alt="Uploaded item"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                ) : (
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt="Uploaded item"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                )
                            ) : (
                                <Box display="flex" justifyContent="center" alignItems="center" width={"80%"}>
                                    <span className="icon-image-gallery" style={{ fontSize: "40px", color: "gray" }}></span>
                                </Box>
                            )}
                        </Box>

                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typography variant="body2" sx={{ fontSize: "8px", color: "gray", margin: "5px" }}>{t("item.image")}</Typography>
                            <Button
                                onClick={handleImageUpload}
                                variant="contained"
                                startIcon={<StraightOutlinedIcon sx={{ fontSize: '10px', color: '#ef7d00' }} />}
                                sx={{
                                    minWidth: 'auto', backgroundColor: '#222240', fontSize: "10px", padding: "2px 20px", color: '#fff', textTransform: 'none', borderRadius: "20px",
                                    "&:hover": {
                                        backgroundColor: '#222242',
                                    }
                                }}
                            >
                                {t("upload")}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

                <Grid item xs={12} alignItems="center" marginTop={"30px"} >
                    <Grid display="flex" alignItems="center">
                        <Typography variant='body2' sx={{ fontSize: "10px", color: "gray" }}>
                            {t("size.many")}
                        </Typography>

                        {/* Input Fields */}
                        <Grid container spacing={1} alignItems="center">
                            <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                <Box
                                    sx={{
                                        borderRadius: "50%",
                                        width: "25px",
                                        height: "25px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginRight: "5px",
                                        marginTop: "10px",
                                        backgroundColor: "#ef7d00",
                                        color: "white",
                                        fontSize: "10px",
                                    }}
                                >
                                    S
                                </Box>
                                <Grid item xs={3}>
                                    <Typography variant='body2' sx={{ fontSize: "10px", color: "gray" }}>
                                        {t("price.one")}
                                    </Typography>
                                    <TextField
                                        value={priceSmall}
                                        onChange={(e) => setPriceSmall(e.target.value)}
                                        placeholder='0.00'
                                        variant="outlined"
                                        fullWidth
                                        type="number"
                                        InputProps={{
                                            sx: { height: '30px', fontSize: "10px", width: "100px" },
                                            endAdornment: <Typography sx={{ fontSize: "9px", color: "gray" }}>EGP</Typography>,
                                        }}
                                    />
                                </Grid>
                            </Box>

                            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} margin={"0px 12px"}>
                                <Box
                                    sx={{
                                        borderRadius: "50%",
                                        width: "25px",
                                        height: "25px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: "#ef7d00",
                                        color: "white",
                                        fontSize: "10px", marginRight: "5px",
                                        marginTop: "10px",
                                    }}
                                >
                                    M
                                </Box>

                                <Grid item xs={3} alignItems="center">
                                    <Typography variant='body2' sx={{ fontSize: "10px", color: "gray" }}>
                                    {t("price.one")}
                                    </Typography>
                                    <TextField
                                        value={priceMedium}
                                        onChange={(e) => setPriceMedium(e.target.value)}
                                        placeholder='0.00'
                                        variant="outlined"
                                        fullWidth
                                        InputProps={{
                                            sx: { height: '30px', fontSize: "10px", width: "100px" },
                                            endAdornment: <Typography sx={{ fontSize: "10px", color: "gray" }}>EGP</Typography>,
                                        }}
                                    />
                                </Grid>
                            </Box>
                            <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                <Box
                                    sx={{
                                        borderRadius: "50%",
                                        width: "25px",
                                        height: "25px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        textAlign: "center",
                                        backgroundColor: "#9d9d9c",
                                        color: "white",
                                        fontSize: "10px",
                                        marginRight: "5px",
                                        marginTop: "10px",
                                    }}
                                >
                                    L
                                </Box>

                                <Grid item xs={3} alignItems="center">
                                    <Typography variant='body2' sx={{ fontSize: "10px", color: "gray" }}>
                                    {t("price.one")}
                                    </Typography>
                                    <TextField
                                        value={priceLarge}
                                        onChange={(e) => setPriceLarge(e.target.value)}
                                        placeholder='0.00'
                                        variant="outlined"
                                        fullWidth
                                        type="number"
                                        InputProps={{
                                            sx:
                                                { height: '30px', fontSize: "10px", width: "100px" },
                                            endAdornment: <Typography sx={{ fontSize: "9px", color: "gray" }}>EGP</Typography>,
                                        }}
                                    />
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid item xs={6} marginTop={"20px"} marginBottom={"20px"}>
                        <Typography variant='body2' sx={{ fontSize: "10px", color: "gray" }}>{t("price.one")}</Typography>
                        <TextField
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            variant="outlined"
                            fullWidth
                            type="number"
                            InputProps={{
                                sx: { height: '35px', fontSize: "10px" },
                                endAdornment: <Typography sx={{ fontSize: "10px", color: "gray" }}>EGP</Typography>,
                            }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant='body2' sx={{ fontSize: "10px", color: "gray" }}>{t("discount.one")}</Typography>
                        <TextField
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                            variant="outlined"
                            fullWidth
                            type="number"
                            InputProps={{
                                sx: { height: '35px', fontSize: "10x" },
                                endAdornment: <Typography sx={{ fontSize: "12px", color: "gray" }}>%</Typography>,
                            }}
                        />
                    </Grid>
                </Grid>

                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                    textAlign={"center"}
                    margin={"40px 0px"}
                >
                    <Button
                        onClick={handleSaveOrUpdate}
                        variant="contained"
                        sx={{
                            width: "33%", backgroundColor: "#ef7d00", padding: "4px", borderRadius: "20px", textTransform: "capitalize",

                            '&:hover': {
                                backgroundColor: "#ef7d00",
                            },
                        }}
                    >
                        <CheckIcon sx={{ fontSize: "18px", marginRight: "5px" }} />
                        {loading ? "loading.." : isEditing ? t("update") : t("save")}
                    </Button>

                    <span className="icon-delete" style={{ fontSize: "25px", cursor: "pointer" }} />
                </Box>
            </Box>
        </Paper>
    )
};