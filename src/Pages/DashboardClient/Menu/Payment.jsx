import { AppBar, Button, Divider, IconButton, Toolbar, Typography } from '@mui/material'
import { Box, useTheme } from '@mui/system'
import React, { useState } from 'react'

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

import { Done } from './Done';
import { useTranslation } from 'react-i18next';
import { customWidth } from './utils';
import Language from '../../../Component/dashboard/TopBar/Language';
import axios from 'axios';




export const Payment = ({
    cartItems, selectedSize,
    phone, selectedName, comment, selectedType,
    selectedValue, selectedItemOptions, selectedItemExtra,
    address, selectedCity, selectedTable,
    subTotal, tax, discount, total
}) => {
    const { t } = useTranslation()
    const theme = useTheme();
    const [isDone, setIsDone] = useState(false);
    console.log(selectedType)
    const toggleDone = async () => {
        try {
            let data = {
                name: selectedName,
                phone: phone,
                comments: comment,
                brunch_id: localStorage.getItem('branchId'),
                type: 'takeaway',
            }
            if (selectedType === 'Delivery') {
                data = {
                    ...data,
                    city: selectedCity,
                    address: address,
                    latitude: 24.7136,
                    longitude: 46.6753,
                    type: selectedType,
                }
            }
            if (selectedType === 'Dine In') {
                data = {
                    ...data,
                    table_id: 1,
                    type: selectedType,
                }
            }
            //Takeaway
            data = {
                ...data,
                discount_code: "DISCOUNT10", //may be nullable
                "tax": 15.0, //may be nullable
                "total_price": 150.75,

                "payment_way": "cash",

                "meal_id": cartItems[0].id,
                "quantity": "1",

                "variants": [],

                "extras": [],
            }
            console.log('order payment data', data)
            const response = await axios.post(
                `https://highleveltecknology.com/Qtap/api/add_orders`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },

                }
            );
            console.log('order payment response', response)
            setIsDone(!isDone);
        } catch (error) {
            console.log('order payment errror', error)
        }
        finally {

        }
    };

    return (
        <>
            <Box sx={{ overflowY: "auto", width: customWidth.itemSectionWidth, boxShadow: 3, bgcolor: 'white', position: 'fixed', right: 0, top: 0, height: '100vh' }}>
                <AppBar position="sticky" color="inherit">
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
                </AppBar> {/* header */}

                <Box display="flex" flexDirection="column" sx={{ padding: "30px", }}>
                    <Typography variant="body1" sx={{ fontSize: "10px", display: "flex", letterSpacing: 1 }}>
                        {t("item.many")}
                    </Typography>
                    {cartItems.map((item) => {
                        console.log('itm', item); return (
                            <Box display={"flex"} justifyContent={"space-between"}>
                                <Box sx={{ paddingLeft: "10px", marginTop: "15px" }}>
                                    <Typography
                                        variant="h1"
                                        sx={{ fontSize: '11px', fontWeight: '900', color: '#575756' }}>
                                        {item.name}
                                    </Typography>

                                    <Typography variant="body2" sx={{ marginTop: '2px', fontSize: '9px', color: "gray" }}>
                                        <span style={{ color: theme.palette.orangePrimary.main }}>{t("option")} | </span>
                                        {selectedItemOptions[item.id] && selectedItemOptions[item.id].length > 0
                                            ? selectedItemOptions[item.id].map(option => option.name).join(', ')
                                            : 'No options selected'}

                                    </Typography>
                                    <Typography variant="body2" sx={{ marginTop: '2px', fontSize: '9px', color: "gray" }} >
                                        <span style={{ color: theme.palette.orangePrimary.main }}>{t("extra.one")} |</span>
                                        {selectedItemExtra[item.id] && selectedItemExtra[item.id].length > 0
                                            ? selectedItemExtra[item.id].map(extra => extra.name).join(', ')
                                            : 'No extra selected'}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Box textAlign={"center"} justifyContent={"center"} alignItems={"center"}  >
                                        <Button
                                            sx={{
                                                height: "15px",
                                                width: "15px",
                                                minWidth: "15px",
                                                fontSize: "7px",
                                                borderRadius: "50%",
                                                backgroundColor: theme.palette.orangePrimary.main,
                                                color: "white",
                                                "&:hover": {
                                                    backgroundColor: "#D47A1C"
                                                },
                                            }}
                                        >
                                            {selectedSize[item.id]}
                                        </Button>
                                        <span style={{ fontSize: "10px", color: "#575756", marginLeft: "10px" }}> <span style={{ color: theme.palette.orangePrimary.main }}>x</span> {item.quantity}</span>
                                    </Box>
                                    <Typography variant="h6" sx={{ marginTop: "5px", fontSize: '13px', fontWeight: "bold", color: theme.palette.orangePrimary.main }}>
                                        {item.price * item.quantity} <span style={{ fontSize: "8px", fontWeight: "400", color: '#575756' }}>EGP</span>
                                    </Typography>
                                </Box>
                            </Box>
                        )
                    })}

                    <Divider sx={{ margin: "10px 0px" }} />
                    <Box>
                        <Box  >
                            <Typography color="#262624" fontSize="12px"  >{t("dineMethod")}</Typography>
                            <Typography color="textSecondary" fontSize="11px" margin={"5px 10px"} display={"flex"}>{t(selectedType)} ,
                                <span class="icon-scooter" style={{ fontSize: "18px", marginLeft: "7px", color: theme.palette.orangePrimary.main }}></span>
                            </Typography>
                        </Box>
                        <Typography color="textSecondary" fontSize="11px" >
                            <span style={{ color: theme.palette.orangePrimary.main, marginLeft: "10px" }}>{t("address")} </span>
                            {address}</Typography>

                        <Typography color="textSecondary" fontSize="11px" >
                            <span style={{ color: theme.palette.orangePrimary.main, marginLeft: "10px" }}>{t("name")} : </span>
                            {selectedName}</Typography>

                        <Box display={"flex"} textAlign={"center"} alignItems={"center"} justifyContent={"space-between"}>
                            <Box>
                                <Typography color="textSecondary" fontSize="11px" >
                                    <span style={{ color: theme.palette.orangePrimary.main, marginLeft: "10px" }}>{t("mobileNumber")} : </span>
                                    {phone}</Typography>
                            </Box>
                            <Button sx={{
                                backgroundColor: theme.palette.secondaryColor.main, borderRadius: "5px", display: "flex",
                                justifyContent: "center", padding: "5px 15px",
                                alignItems: "center", color: "white", textTransform: "capitalize", fontSize: "9px",
                                "&:hover": {
                                    backgroundColor: "#222245",
                                }
                            }}>
                                <span class="icon-map-1" style={{ fontSize: "15px", marginRight: "5px" }}>
                                    <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span></span>
                                {t("location")}
                            </Button>
                        </Box>
                    </Box>
                    <Divider sx={{ margin: "10px 0px" }} />

                    <Box>
                        <Box display={"flex"} textAlign={"center"} alignItems={"center"} justifyContent={"space-between"} >
                            <Typography color="#262624" fontSize="12px"  >{t("paymentMethod")}</Typography>
                            <Typography>
                                <span style={{ color: "#262624", fontSize: "10px", borderBottom: "1px solid #262624" }}>{t("change")}</span>
                            </Typography>
                        </Box>
                        <Typography color="textSecondary" fontSize="11px" margin={"5px 10px"} display={"flex"} alignItems={"center"}>
                            <span class="icon-wallet" style={{ fontSize: "20px", marginRight: "6px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span></span>
                            {t(selectedValue)}
                        </Typography>
                    </Box>
                    <Divider sx={{ margin: "10px 0px" }} />
                    <Box>
                        <Typography color="#262624" fontSize="12px" >{t("comments")}</Typography>
                        <Typography color="textSecondary" fontSize="11px" margin={"5px 10px"} display={"flex"} alignItems={"center"}>
                            - {comment}
                        </Typography>
                    </Box>
                    <Divider sx={{ margin: "10px 0px" }} />

                    <Box display={"flex"} justifyContent={"space-between"} marginBottom={"50px"}>
                        <Box sx={{ width: "100%" }}>
                            <Typography variant="h6" sx={{ fontSize: '9px', color: 'gray' }}>
                                {t("subTotal")} <span style={{ color: '#3A3A38' }}>{subTotal} EGP</span>
                            </Typography>

                            <Typography variant="h6" sx={{ fontSize: '9px', color: 'gray' }}>
                                {t("tax")} <span style={{ color: '#3A3A38' }}>{tax} EGP</span>
                            </Typography>

                            <Typography variant="h6" sx={{ fontSize: '9px', color: 'gray' }}>
                                {t("discounts")} <span style={{ color: '#3A3A38' }}>{discount} EGP</span>
                            </Typography>
                        </Box>
                        <Box sx={{ width: "100%", textAlign: "left", marginLeft: "70px" }}>
                            <Typography variant="h6" sx={{ fontSize: '10px', fontWeight: "bold", color: '#3A3A38' }}>
                                {t("totalPrice")}
                            </Typography>
                            <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: "bold", color: theme.palette.orangePrimary.main }}>
                                {total} <span style={{ fontSize: "10px", fontWeight: "400", color: '#575756' }}>EGP</span>
                            </Typography>
                        </Box>


                    </Box>
                    <Divider sx={{ margin: "10px 0px" }} />

                </Box >

                <Box
                    sx={{
                        position: "fixed", bottom: 0, backgroundColor: "white", height: "40px", width: customWidth.buttonSectionWidth, padding: "20px",
                        boxShadow: 3, borderRadius: "30px 30px 0px 0px",
                        display: "flex", justifyContent: "space-between", textAlign: "center", alignItems: "center"
                    }}>
                    <Box sx={{ display: "flex", width: "100%" }}>
                        <Typography variant="body2" sx={{ cursor: "pointer", color: "#262624", fontSize: "12px", fontWeight: "bold" }}>
                            <span class="icon-close" style={{ fontSize: "12px", marginRight: "5px" }}></span>
                            {t("cancel")}</Typography>

                        <Typography variant="body2" sx={{ cursor: "pointer", marginLeft: "25px", color: "#262624", fontSize: "12px", fontWeight: "bold" }}>
                            <span class="icon-edit" style={{ fontSize: "15px", color: theme.palette.orangePrimary.main, marginRight: "5px" }}></span>
                            {t("edit")}</Typography>
                    </Box>

                    <Box width={"100%"} float={"right"} display={"flex"} alignItems={"center"} >
                        <Button
                            onClick={toggleDone}
                            sx={{
                                backgroundColor: theme.palette.secondaryColor.main, color: "white", textTransform: "capitalize", fontSize: "10px",
                                borderRadius: "20px", width: "65%", height: "30px",
                                "&:hover": {
                                    backgroundColor: "#222245",
                                }
                            }}>
                            <img src="/assets/balance.svg" alt="icon" style={{ width: "16px", height: "16px", marginRight: "5px" }} />
                            {t("pay")}
                        </Button>
                        <span class="icon-printer" style={{ width: "25px", height: "22px", marginLeft: "15px" }} ></span>
                    </Box>
                </Box> {/* footer */}
            </Box>
            {isDone && <Done />}


        </>
    )
}
