import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, IconButton, AppBar, Toolbar, CardMedia, Divider, } from '@mui/material';
 
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import { ingrediants, itemsData, options } from '../data/itemsData';
import Cart from './Cart';
import Language from '../../ComponentDashClient/TopBar/Language';
import { useTranslation } from 'react-i18next';


const ProductDetails = ({ item, activeItemId, handleOptionClick, selectedItemOptions, selectedSize, handleSizeClick, isCartOpen, toggleCart,
    selectedItemExtra, handleExtraClick
}) => {

    const {t} = useTranslation()
    const sizes = ["S", "M", "L"];
    // ___________________________________________________________________

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
    }, []);

    

    const cartCount = cartItems.length;

    const updateCart = (itemId, action) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === itemId) {
                if (action === 'increase') {
                    return { ...item, quantity: item.quantity + 1 };
                } else if (action === 'decrease' && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
            }
            return item;
        }).filter(item => !(action === 'remove' && item.id === itemId));

        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const addItemToCart = (newItem) => {
        const existingItem = cartItems.find(item => item.id === newItem.id);

        if (existingItem) {

            updateCart(newItem.id, 'increase');
        } else {

            const updatedCart = [...cartItems, { ...newItem, quantity: 1 }];
            setCartItems(updatedCart);
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        }
    };

    // ___________________________________________________________________
    const [itemCount, setItemCount] = useState([]);

    const handleAddItem = (itemId) => {
        setItemCount((prevItems) => {
            const existingItem = prevItems.find(item => item.id === itemId);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === itemId ? { ...item, count: item.count + 1 } : item
                );
            } else {
                return [...prevItems, { id: itemId, count: 1 }];
            }
        });
    };

    const handleMinusItem = (itemId) => {
        setItemCount((prevItems) => {
            const existingItem = prevItems.find(item => item.id === itemId);
            if (existingItem && existingItem.count > 1) {
                return prevItems.map(item =>
                    item.id === itemId ? { ...item, count: item.count - 1 } : item
                );
            } else {
                return prevItems.filter(item => item.id !== itemId);  
            }
        });
    };

    const getItemCount = (itemId) => {
        const item = itemCount.find(item => item.id === itemId);
        return item ? item.count : 0;
    };

    return (
        <>
            <Box sx={{overflowY: "auto", width: '340px', boxShadow: 3, bgcolor: 'white', position: 'fixed', right: 0, top: 0, height: '100vh' }}>
                <Box sx={{ position: "fixed", top: 0, width: "340px", zIndex: 1201 }}>
                    <AppBar position="static" color="inherit" sx={{ boxShadow: "none" }}>
                        <Toolbar>
                            <IconButton onClick={toggleCart} edge="start" color="inherit" aria-label="cart">
                                <ShoppingCartOutlinedIcon sx={{ color: "#ef7d00", fontSize: "25px" }} />
                                <Typography sx={{
                                    position: "relative", top: "-10px", left: "-10px", fontSize: "8px", padding: "0px 3px", borderRadius: "50%",
                                    backgroundColor: "#ef7d00", color: "white"
                                }}>{cartCount}</Typography>
                            </IconButton>

                            <Box sx={{ flexGrow: 1 }} />
                            <Language />

                            <Box sx={{ display: "flex", textAlign: "center", alignItems: "center", cursor: "pointer" }}  >
                                <PersonOutlineOutlinedIcon
                                    sx={{ color: "white", fontSize: "18px", borderRadius: "10px", padding: "5px", backgroundColor: "#ef7d00" }} />
                                <Typography variant='body2' sx={{ color: "#575756", fontSize: "10px", padding: "0px 5px" }}>Admin</Typography>
                                <KeyboardArrowDownOutlinedIcon sx={{ color: "#575756", fontSize: "13px" }} />
                            </Box>
                        </Toolbar>


                        <Box>
                            <CardMedia
                                component="img"
                                height="300"
                                src={item.image} alt={item.name}
                                style={{ width: '100%', height: '270px', objectFit: 'cover' }}
                            />  {/* img */}

                            {itemsData.map(item => (
                                <Box key={item.id}>
                                    <Box sx={{ position: 'relative', top: '-40px', marginRight: "50px", float: "right" }}>
                                        {activeItemId === item.id && (
                                            <Box sx={{
                                                background: "white", width: "40px", color: "#575756", borderRadius: "10px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                                justifyContent: "center", textAlign: "center", alignItems: "center", padding: "5px 2px",
                                            }}>
                                                <AddCircleOutlinedIcon
                                                    onClick={() => handleAddItem(item.id)}
                                                    sx={{ fontSize: "18px", color: "#ef7d00", cursor: "pointer" }}
                                                />
                                                <Typography sx={{ fontSize: "11px", padding: "4px 0px", color: "#272725" }}>
                                                    {getItemCount(item.id)}
                                                </Typography>
                                                <RemoveCircleOutlinedIcon
                                                    onClick={() => handleMinusItem(item.id)}
                                                    sx={{ fontSize: "18px", color: "#ef7d00", cursor: "pointer" }}
                                                />
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                            ))}

                            <Box
                                sx={{ zIndex: "5000", padding: "15px 20px" }} >
                                <Typography variant="h6" sx={{ fontSize: "18px", fontWeight: 'bold', color: '#40403D' }}>{item.name}</Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ fontSize: "11px" }}>{item.description}</Typography>
                                <Box width={"100%"}>
                                    <Divider sx={{ width: "100%", height: "1px", color: "gray" }} />
                                    <Box sx={{ display: "flex", alignItems: "center", textAlign: "center", padding: "5px 0px", justifyContent: "space-around" }}>
                                        <Box display="flex" alignItems="center">
                                            <span class="icon-star" style={{ color: "#ef7d00", fontSize: "15px" }}></span>
                                            <Typography variant="body2" color="black" sx={{ fontSize: '11px', marginLeft: "3px" }}  >
                                                {item.rating}
                                            </Typography>
                                        </Box>

                                        <Box display="flex" alignItems="center">
                                        <span class="icon-calories-1"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span></span>
                                            <Typography variant="body2" color="black" sx={{ fontSize: '11px', marginLeft: "3px" }} >
                                                {item.calories} <span style={{ fontSize: '10px', color: "#ef7d00" }}>Kcal</span></Typography>
                                        </Box>

                                        <Box display="flex" alignItems="center">
                                            <span class="icon-chronometer" ><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span></span>
                                            <Typography variant="body2" color="black" sx={{ fontSize: '11px', marginLeft: "3px" }} >
                                                {item.prepTime} <span style={{ fontSize: '10px', color: "#ef7d00" }}>Min</span></Typography>
                                        </Box>
                                    </Box>
                                    <Divider sx={{ width: "100%", height: "1px", color: "gray" }} />
                                </Box>
                            </Box>  {/* name ,description */}
                        </Box>

                    </AppBar>  {/* Header */}
                </Box>

                <Box sx={{ position: "relative", top: "430px", padding: "15px 20px" }} >

                    <Box display="flex" alignItems="center" gap={2} sx={{ padding: "20px 0px" }}>
                        <Typography variant="h6" sx={{ fontSize: '11px', fontWeight: "bold", color: '#3A3A38' }}>
                            {t("size.one")}
                        </Typography>
                        {sizes.map((size) => {
                            return (
                                <Button
                                    key={size}
                                    onClick={() => handleSizeClick(item.id, size)}
                                    sx={{
                                        width: "20px",
                                        height: "20px",
                                        fontSize: "8px",
                                        borderRadius: "50%",
                                        minWidth: "20px",
                                        backgroundColor: selectedSize[item.id] === size ? "#ef7d00" : "#E0E0E0",
                                        color: selectedSize[item.id] === size ? "white" : "black",
                                        "&:hover": {
                                            backgroundColor: selectedSize[item.id] === size ? "#D47A1C" : "#D0D0D0",
                                        },
                                    }}
                                >
                                    {size}
                                </Button>
                            );
                        })}
                    </Box>   {/* size */}

                    <Box>
                        <Typography variant="h6" sx={{ fontSize: "10px", fontWeight: 'bold', color: '#40403D' }}>
                            {t("yourOptions")} <span style={{ fontSize: "8px", fontWeight: '300', color: "black" }}>({t("required")})</span>
                        </Typography>

                        <Box>
                            {itemsData.map(item => (
                                <Box key={item.id}>

                                    {activeItemId === item.id && (
                                        <Box display="flex" flexWrap="wrap" gap={1}>
                                            {options.map((option, index) => (
                                                <Button
                                                    key={index}
                                                    onClick={() => handleOptionClick(item.id, option)}
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        width: "47%",
                                                        height: "20px",
                                                        backgroundColor: selectedItemOptions[item.id]?.includes(option) ? "#F28C1F" : "#FFFFFF",
                                                        color: selectedItemOptions[item.id]?.includes(option) ? "white" : "#575756",
                                                        border: selectedItemOptions[item.id]?.includes(option) ? "none" : "1px solid #E0E0E0",
                                                        borderRadius: "8px",
                                                        padding: "0 10px",
                                                        "&:hover": {
                                                            backgroundColor: selectedItemOptions[item.id]?.includes(option) ? "#D47A1C" : "#F5F5F5",
                                                        },
                                                    }}
                                                >
                                                    <Typography variant="body2" sx={{ fontSize: "10px", textTransform: "capitalize" }}>
                                                        {option.name}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ marginLeft: "auto", fontSize: "8px", textTransform: "capitalize", fontWeight: "bold" }}>
                                                        {option.price === 0 ? <span style={{ fontWeight: 400 }}>{t("free")}</span>
                                                            : `+${option.price} EGP`}
                                                    </Typography>
                                                </Button>
                                            ))}
                                        </Box>
                                    )}
                                </Box>
                            ))}
                        </Box>
                    </Box> {/* Options */}

                    <Box Box sx={{ marginTop: "15px" }}>
                        <Typography variant="h6" sx={{ fontSize: "10px", fontWeight: 'bold', color: '#40403D' }}>
                            {t("extra.one")}
                        </Typography>

                        <Box>
                            {itemsData.map(item => (
                                <Box key={item.id}>
                                    {activeItemId === item.id && (
                                        <Box display="flex" flexWrap="wrap" gap={1}>
                                            {options.map((extra, index) => (
                                                <Button
                                                    key={index}
                                                    onClick={() => handleExtraClick(item.id, extra)}
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        // minWidth: "100px",
                                                        width: "47%",
                                                        height: "20px",
                                                        backgroundColor: selectedItemExtra[item.id]?.includes(extra) ? "#222240" : "#FFFFFF",
                                                        color:  selectedItemExtra[item.id]?.includes(extra) ? "white" : "#575756",
                                                        border:  selectedItemExtra[item.id]?.includes(extra) ? "none" :"1px solid #E0E0E0",
                                                        borderRadius: "8px",
                                                        padding: "0 10px",
                                                        "&:hover": {
                                                            backgroundColor:  selectedItemExtra[item.id]?.includes(extra) ? "#222240" : "#F5F5F5",
                                                        },
                                                    }}
                                                >
                                                    <Typography variant="body2" sx={{ fontSize: "10px", textTransform: "capitalize" }}>
                                                        {extra.name}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ marginLeft: "auto", fontSize: "8px", textTransform: "capitalize", fontWeight: "bold" }}>

                                                        {extra.price === 0 ? <span style={{ fontWeight: 400 }}>{t("free")}</span>
                                                            : `+${extra.price} EGP`}
                                                    </Typography>
                                                </Button>
                                            ))}
                                        </Box>
                                    )}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    {/* Extra */}

                    <Box Box sx={{ marginTop: "15px" }}>
                        <Typography variant="h6" sx={{ fontSize: "10px", fontWeight: 'bold', color: '#40403D' }}>
                            {t("ingrediants")}
                        </Typography>
                        <Box display="flex" flexWrap="wrap" gap={1}>
                            {ingrediants.map((option, index) => (
                                <Button key={index}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        width: "22%",
                                        height: "20px",
                                        backgroundColor: "#E0E6E6",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        padding: "0 10px",
                                        "&:hover": {
                                            backgroundColor: "#E0E6E6",
                                        },
                                    }}
                                >
                                    <Typography variant="body2" sx={{ fontSize: "7px", textTransform: "capitalize" }}>
                                        {option.name}
                                    </Typography>
                                </Button>
                            ))}
                        </Box>

                    </Box> {/* Ingrediants */}


                    <Box sx={{ marginTop: "15px", marginBottom: "70px" }}>
                        <Typography variant="h6" sx={{ fontSize: "10px", fontWeight: 'bold', color: '#40403D' }}>
                            {t("discription")}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: "8px", color: 'gray', width: "70%" }}>
                            Lorem, ipsum dolor sit perspiciatis magnam pariatur neque repellat veritatis asperiores repellat veritatis asperiores !</Typography>
                    </Box>{/* Description */}

                </Box>

                <Box
                    sx={{
                        position: "fixed", bottom: 0, backgroundColor: "white", height: "40px", width: "300px", padding: "20px",
                        boxShadow: 3, borderRadius: "30px 30px 0px 0px", display: "flex", justifyContent: "space-between",
                    }}>
                    <Box>
                        <Typography variant="h6" sx={{ fontSize: '11px', fontWeight: "bold", color: '#3A3A38' }}>
                            {t("price.one")}
                        </Typography>
                        <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: "bold", color: '#ef7d00' }}>
                            {item.newPrice} <span style={{ fontSize: "10px", fontWeight: "400", color: '#575756' }}>EGP</span>
                        </Typography>
                    </Box>
                    <Button
                        onClick={() => addItemToCart(item)}
                        sx={{
                            backgroundColor: "#ef7d00", color: "white", textTransform: "capitalize", fontSize: "10px",
                            float: "right", borderRadius: "20px", width: "55%", height: "30px",
                            "&:hover": {
                                backgroundColor: "#ef7d10",
                            }
                        }}>
                        {t("addToCart")}
                    </Button>
                </Box>   {/* Footer */}
            </Box >

            {isCartOpen &&
                <Cart itemCount={itemCount} cartItems={cartItems} updateCart={updateCart}
                    getItemCount={getItemCount}
                    handleMinusItem={handleMinusItem}
                    handleAddItem={handleAddItem}
                    selectedSize={selectedSize}
                    selectedItemOptions={selectedItemOptions}
                    selectedItemExtra={selectedItemExtra} />
            }

        </>
    );
};

export default ProductDetails;
