import React, { useState } from 'react';
import { Box, Typography, IconButton, AppBar, Toolbar, Button, useTheme, } from '@mui/material';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import OrderTypeForm from './OrderTypeForm';
import { useTranslation } from 'react-i18next';
import { customWidth } from '../utils';
import Language from '../../../../Component/dashboard/TopBar/Language';


const Cart = ({ selectedItemOptions, selectedItemExtra, cartItems, selectedSize, handleMinusItem, handleAddItem, getItemCount }) => {
    const {t} = useTranslation()
    const theme = useTheme();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const toggleTypeForm = () => {
        setIsFormOpen(!isFormOpen);
    };

    const totalCart = cartItems.reduce((acc, item) => {
        const itemCount = getItemCount(item.id);
        const validItemCount = isNaN(itemCount) ? 0 : itemCount;
        const validPrice = isNaN(item.newPrice) ? 0 : item.newPrice;

        return acc + validPrice * validItemCount;
    }, 0);

    return (

        <>
            <Box sx={{ overflowY: "auto", width:  customWidth.itemSectionWidth, boxShadow: 3, bgcolor: 'white', position: 'fixed', right: 0, top: 0, height: '100vh' }}>
                <Box sx={{ position: "fixed", top: 0, width: customWidth.itemSectionWidth, zIndex: 1201 }}>

                    <AppBar position="static" color="inherit">
                        <Toolbar>
                            <IconButton edge="start" color="inherit" aria-label="cart">
                                <ShoppingCartOutlinedIcon sx={{ color: theme.palette.orangePrimary.main, fontSize: "25px" }} />
                                <Typography sx={{
                                    position: "relative", top: "-10px", left: "-10px", fontSize: "8px", padding: "0px 3px", borderRadius: "50%",
                                    backgroundColor: theme.palette.orangePrimary.main, color: "white"
                                }}>{cartItems.length}</Typography>
                            </IconButton>

                            <Box sx={{ flexGrow: 1 }} />
                            <Language />

                            <Box sx={{ display: "flex", textAlign: "center", alignItems: "center", cursor: "pointer" }}  >
                                <PersonOutlineOutlinedIcon
                                    sx={{ color: "white", fontSize: "18px", borderRadius: "10px", padding: "5px", backgroundColor: theme.palette.orangePrimary.main }} />
                                <Typography variant='body2' sx={{ color: "#575756", fontSize: "10px", padding: "0px 5px" }}>Admin</Typography>
                                <KeyboardArrowDownOutlinedIcon sx={{ color: "#575756", fontSize: "13px" }} />
                            </Box>
                        </Toolbar>
                    </AppBar>  {/* Header */}

                    <Box sx={{ padding: 2 }}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                            <Typography variant="body1" sx={{ fontSize: "10px", display: "flex", letterSpacing: 1 }}>
                                <ShoppingCartOutlinedIcon sx={{ color: theme.palette.orangePrimary.main, marginRight: "5px", fontSize: "17px" }} /> {t("yourCart")}
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: "9px", color: "gray", letterSpacing: 1 }}>{cartItems.length} {t("item.many")}</Typography>
                        </Box>
                        {cartItems.map((item) => (
                            <Box
                                key={item.id}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginY: 2,
                                    borderBottom: '1px solid #e0e0e0',
                                    paddingBottom: "5px",
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{ width: '50px', height: '50px', borderRadius: "10px", marginRight: '10px' }}
                                    />
                                    <Box>
                                        <Typography
                                            variant="h1"
                                            sx={{ fontSize: '11px', fontWeight: '900', color: '#575756' }}>
                                            {item.name}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            sx={{ fontSize: '9px', marginTop: '3px' }}>
                                            {item.description}
                                        </Typography>

                                        <Typography variant="body2" sx={{ marginTop: '2px', fontSize: '9px', color: "#575756" }}>
                                            <span style={{ color: theme.palette.orangePrimary.main }}>{t("option")} | </span>
                                            {selectedItemOptions[item.id] && selectedItemOptions[item.id].length > 0
                                                ? selectedItemOptions[item.id].map(option => option.name).join(', ')
                                                : t("noOptionsSelected")}

                                        </Typography>

                                        <Typography variant="body2" sx={{ marginTop: '2px', fontSize: '9px', color: "#575756" }}>
                                            <span style={{ color: theme.palette.orangePrimary.main }}>{t("extra.one")} |</span>
                                            {selectedItemExtra[item.id] && selectedItemExtra[item.id].length > 0
                                                ? selectedItemExtra[item.id].map(extra => extra.name).join(', ')
                                                : t("noOptionsSelected")}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: "column", alignItems: 'center' }}>
                                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                                        <AddCircleOutlinedIcon
                                            onClick={() => handleAddItem(item.id)}
                                            sx={{ fontSize: "18px", color: "black", cursor: "pointer" }} />
                                        <Typography sx={{ fontSize: "11px", padding: "0px 8px", color: "#272725" }}> {getItemCount(item.id)}</Typography>
                                        <RemoveCircleOutlinedIcon
                                            onClick={() => handleMinusItem(item.id)}

                                            sx={{ fontSize: "18px", color: "black", cursor: "pointer" }}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" sx={{ marginTop: "5px", fontSize: '15px', fontWeight: "bold", color: theme.palette.orangePrimary.main }}>
                                            {item.newPrice} <span style={{ fontSize: "9px", fontWeight: "400", color: '#575756' }}>EGP</span>
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        ))}

                    </Box>
                                                  
                    <Box
                        sx={{
                            position: "fixed", bottom: 0, backgroundColor: "white", height: "40px", width:customWidth.buttonSectionWidth, padding: "20px",
                            boxShadow: 3, borderRadius: "30px 30px 0px 0px", display: "flex", justifyContent: "space-between",
                        }}>
                        <Box>
                            <Typography variant="h6" sx={{ fontSize: '11px', fontWeight: "bold", color: '#3A3A38' }}>
                                {t("totalPrice")}
                            </Typography>
                            <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: "bold", color: theme.palette.orangePrimary.main }}>
                                {isNaN(totalCart) ? 0 : totalCart}
                                <span style={{ fontSize: "10px", fontWeight: "400", color: '#575756' }}>EGP</span>
                            </Typography>
                        </Box>
                        <Button
                            onClick={toggleTypeForm}
                            sx={{
                                backgroundColor: theme.palette.orangePrimary.main, color: "white", textTransform: "capitalize", fontSize: "10px",
                                float: "right", borderRadius: "20px", width: "55%", height: "30px",
                                "&:hover": {
                                    backgroundColor: "#ef7d10",
                                }
                            }}>
                            {t("checkout")}<TrendingFlatIcon sx={{ fontSize: "18px", mr: 1 }} />
                        </Button>
                    </Box> {/* footer */}
                </Box>
            </Box >
            {isFormOpen &&
                <OrderTypeForm cartItems={cartItems} 
                selectedSize={selectedSize}
                    getItemCount={getItemCount} 
                    totalCart={totalCart} 
                    selectedItemOptions={selectedItemOptions} 
                    selectedItemExtra={selectedItemExtra} 
                    />}

        </>
    );
};

export default Cart;
