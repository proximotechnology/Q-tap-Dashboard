import CheckIcon from '@mui/icons-material/Check';
import React from 'react';
import { Typography, Box, Paper, Divider, Grid, TextField, Button } from '@mui/material';
import StraightOutlinedIcon from '@mui/icons-material/StraightOutlined';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
export const ItemDetails = () => {

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
    const [image, setImage] = useState('');

    const selectedBranch = localStorage.getItem('selectedBranch');
    console.log("selectedBranch itemDetails", selectedBranch);

    // const handleImageUpload = (e) => {
    //     const fileInput = document.createElement('input');
    //     fileInput.type = 'file';
    //     fileInput.accept = 'image/*';
    //     fileInput.onchange = (e) => {
    //         if (!e.target || !e.target.files || e.target.files.length === 0) {
    //             console.warn('No file selected');
    //             return;
    //         }
    //         const file = e.target.files[0];
    //         if (file) {
    //             const reader = new FileReader();
    //             reader.onload = (e) => {
    //                 if (e.target && e.target.result) {
    //                     const imageUrl = e.target.result;
    //                     setImage(imageUrl);
    //                 }
    //             };
    //             reader.onerror = (error) => {
    //                 console.error('Error reading file:', error);
    //             };
    //             reader.readAsDataURL(file);
    //         }
    //     };
    //     fileInput.click();
    // }


    const handleSave = async () => {
        try {
            // التحقق من أن جميع الحقول ممتلئة
            if (!name || !brief || !description || !ingredients || !calories || !time || !tax || !priceSmall || !priceMedium || !priceLarge || !price || !discount) {
                toast.error("Please fill in all fields");
                return;
            }
            // إنشاء بيانات الطلب
            const formData = {
                name: name,
                img: image,
                Brief: brief,
                Description: description,
                Ingredients: ingredients,
                Calories: calories,
                Time: time,
                Tax: tax,
                price_small: priceSmall,
                price_medium: priceMedium,
                price_large: priceLarge,
                price: price,
                discount_id: "6",
                categories_id: "4",
                brunch_id: selectedBranch
            };

            console.log("formData", formData);

            // إرسال الطلب
            const response = await axios.post(
                "https://highleveltecknology.com/Qtap/api/meals",
                formData,  // البيانات يتم تمريرها هنا مباشرة
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('clientToken')}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            // التحقق من نجاح الطلب
            if (response.status === 201) {
                toast.success("Item added successfully");
                window.location.reload();
            }
            console.log("response itemDetails", response);

        } catch (error) {
            // const errorMes = error.response?.data?.errors.map(error => error[0])
            toast.error(error.response?.data?.message || "An error occurred");
            console.log("Error:", error);
        }
    };


    return (
        <Paper sx={{ marginTop: "-20px", marginBottom: "30px", borderRadius: "10px", padding: "20px 50px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1" fontSize={"15px"} color={"#575756"}>Item Details</Typography>
            </Box>

            <Divider sx={{ backgroundColor: "#ef7d00" }} />

            <Box >
                <Grid container spacing={5}>
                    {/* Left Side: Form Fields */}
                    <Grid item xs={12} md={7} marginTop={"15px"}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant='body2' sx={{ fontSize: "10px", color: "gray" }}>Item name</Typography>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{ sx: { height: '35px', fontSize: "10px" } }}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='body2' sx={{ fontSize: "10px", color: "gray" }}>Brief</Typography>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{ sx: { height: '35px', fontSize: "10px" } }}
                                    value={brief}
                                    onChange={(e) => setBrief(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='body2' sx={{ fontSize: "10px", color: "gray" }}> Description</Typography>
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
                                <Typography variant='body2' sx={{ fontSize: "10px", color: "gray" }}>Ingredients</Typography>
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
                                <Typography variant='body2' sx={{ fontSize: "10px", color: "gray" }}>Calories </Typography>
                                <TextField
                                    value={calories}
                                    onChange={(e) => setCalories(e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        sx: { height: '35px', fontSize: "10px" },
                                        endAdornment: <Typography sx={{ fontSize: "10px", color: "gray" }}>Kcal</Typography>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='body2' sx={{ fontSize: "10px", color: "gray" }}>Time</Typography>
                                <TextField
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        sx: { height: '35px', fontSize: "10px" },
                                        endAdornment: <Typography sx={{ fontSize: "10px", color: "gray" }}>Min</Typography>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='body2' sx={{ fontSize: "10px", color: "gray" }}>Tax</Typography>
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
                            sx={{ width: "160px", height: "90px", backgroundColor: "#f4f6fc", borderRadius: '8px', overflow: 'hidden' }}>
                            {image ? (
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
                                <Box display="flex" justifyContent="center" alignItems="center" width={"80%"}>
                                    <span class="icon-image-gallery" style={{ fontSize: "40px", color: "gray" }}></span>
                                </Box>
                            )}
                        </Box>

                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typography variant="body2" sx={{ fontSize: "8px", color: "gray", margin: "5px" }}>Item Image 200x200px</Typography>
                            <Button
                                // onClick={handleImageUpload}
                                variant="contained"
                                startIcon={<StraightOutlinedIcon sx={{ fontSize: '10px', color: '#ef7d00' }} />}
                                sx={{
                                    minWidth: 'auto', backgroundColor: '#222240', fontSize: "10px", padding: "2px 20px", color: '#fff', textTransform: 'none', borderRadius: "20px",
                                    "&:hover": {
                                        backgroundColor: '#222242',
                                    }
                                }}
                            >
                                Upload
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

                <Grid item xs={12} alignItems="center" marginTop={"30px"} >
                    <Grid display="flex" alignItems="center">
                        <Typography variant='body2' sx={{ fontSize: "10px", color: "gray" }}>
                            Sizes
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
                                        Price
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
                                        Price
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
                                        Price
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
                        <Typography variant='body2' sx={{ fontSize: "10px", color: "gray" }}>Price</Typography>
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
                        <Typography variant='body2' sx={{ fontSize: "10px", color: "gray" }}>Discount</Typography>
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
                        onClick={handleSave}
                        variant="contained"
                        sx={{
                            width: "33%", backgroundColor: "#ef7d00", padding: "4px", borderRadius: "20px", textTransform: "capitalize",

                            '&:hover': {
                                backgroundColor: "#ef7d00",
                            },
                        }}
                    >
                        <CheckIcon sx={{ fontSize: "18px", marginRight: "5px" }} />
                        Save
                    </Button>

                    <span class="icon-delete" style={{ fontSize: "25px", cursor: "pointer" }} />
                </Box>

            </Box>
        </Paper>

    )
}
