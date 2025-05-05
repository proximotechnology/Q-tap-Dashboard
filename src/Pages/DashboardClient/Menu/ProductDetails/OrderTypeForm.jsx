import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, AppBar, Toolbar, Typography, TextField, Divider, MenuItem, InputAdornment, OutlinedInput, FormControl, Select, FormControlLabel, Radio, RadioGroup, useTheme } from '@mui/material';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { TypeForm } from '../data/itemsData';
import PhoneInput from 'react-phone-input-2';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import 'react-phone-input-2/lib/style.css';
import TableBarOutlinedIcon from '@mui/icons-material/TableBarOutlined';
import { Payment } from '../Payment';

import { useTranslation } from 'react-i18next';
import { customWidth } from '../utils';
import Language from '../../../../Component/dashboard/TopBar/Language';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../../utils/helperFunction';
import axios from 'axios';
import { egyptGovernorates } from '../../../../utils/city';
const OrderTypeForm = ({ selectedItemOptions, selectedItemExtra, cartItems, totalCart, setCartItems }) => {

    const [selectedType, setSelectedType] = useState('Dine In');
    const theme = useTheme();

    const handleSelectType = (type) => {
        setSelectedType(type);
    };
    const [phone, setPhone] = useState('');
    const [selectedTable, setSelectedTable] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedName, setSelectedName] = useState("");
    const [comment, setComment] = useState("");
    const [address, setAddress] = useState("");


    const [table, setTable] = useState([])

    const [selectedValue, setSelectedValue] = useState('cash');
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const [isPayment, setIsPayment] = useState(false);
    const toggleTypeForm = () => {

        if (!selectedName.trim()) {
            toast.error("name required")
            return;
        }

        if (selectedType === 'Dine In') {
            if (!selectedTable) {
                toast.error("select table required")
                return;
            }

        }
        if (selectedType === 'Delivery') {
            if (!selectedCity) {
                toast.error("select city required")
                return;
            }

            if (!address) {
                toast.error("select address required")
                return;
            }

        }
        if (!phone) {
            toast.error("select phone required")
            return;
        }
        setIsPayment(!isPayment);
    };
    const { t } = useTranslation()
    const [subTotal, setSubTotal] = useState(0)
    const [tax, setTax] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [total, setTotal] = useState(0)

    const calculateTotalPrice = () => { /// TODO: what if the user select multi size of same meal
        let calsubtotal = 0;
        let caltax = 0;
        let caldiscount = 0

        for (const meal of cartItems) {
            let priceOfItem = 0;
            if (meal.selectedSize === 'S') {
                priceOfItem = meal.price_small
            }
            if (meal.selectedSize === 'M') {
                priceOfItem = meal.price_medium
            }
            if (meal.selectedSize === 'L') {
                priceOfItem = meal.price_large
            }
            calsubtotal += (priceOfItem * meal.quantity);
            caltax += priceOfItem * (meal.Tax / 100);
            caldiscount += priceOfItem * (meal.discounts?.discount ? meal.discounts?.discount / 100 : 0)

        }
        let totalCal = calsubtotal - caldiscount
        totalCal += caltax
        setSubTotal(calsubtotal.toFixed(2))
        setTax(caltax.toFixed(2))
        setDiscount(caldiscount.toFixed(2))
        setTotal(totalCal.toFixed(2))
    }
    const getBranchTable = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}tables`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('clientToken')}`
                    }

                }
            )
            console.log(response)
            setTable(response.data.tables)
        } catch (error) {
            console.log(error)
            console.log(error?.response?.data?.error)
            if (error?.response?.data?.error === 'Unauthorized.' && error?.status === 403){
                toast.error(t("yourNotAuthorized"))
            }
        }
    }
    useEffect(() => {
        calculateTotalPrice()
        getBranchTable()
    }, [])

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
                            }}>{cartItems?.length}</Typography>
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

                <Box display="flex" flexDirection="column" alignItems="center" sx={{ padding: "30px", }}>
                    {/* الأيقونات */}
                    <Box display="flex" justifyContent="center" gap={3}>
                        {TypeForm.map((type) => (
                            <Box key={type.id}>
                                <Button

                                    onClick={() => handleSelectType(type.type)}
                                    sx={{
                                        backgroundColor: selectedType === type.type ? theme.palette.secondaryColor.main : '#949493',
                                        color: selectedType === type.type ? theme.palette.orangePrimary.main : '#3A3A38',
                                        '&:hover': {
                                            backgroundColor: selectedType === type.type ? '#222250' : '#B2B2AD'
                                        },
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        padding: '15px 12px',
                                        borderRadius: '12px',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            color: selectedType === type.type ? theme.palette.orangePrimary.main : 'white',
                                            display: 'flex', alignItems: "center", textAlign: "center"
                                        }} >
                                        {type.icon}
                                    </Box>
                                </Button>
                                <Typography variant='body2' sx={{
                                    fontSize: "11px", marginTop: "6px", textAlign: "center",
                                    color: selectedType === type.type ? '#30302D' : '#949493',
                                    textTransform: "capitalize"
                                }}>
                                    {t(type.type)} </Typography>
                            </Box>
                        ))}

                    </Box>
                    <Divider sx={{ width: "100%", height: "1px", color: "gray", margin: "15px 0px" }} />

                    {/* الحقول*/}
                    {selectedType && (
                        <Box width="100%" maxWidth="400px"  >

                            <Typography variant='body2' sx={{ fontSize: "11px", marginBottom: "3px", color: "#444442" }}>{t("name")}</Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={selectedName}
                                onChange={(e) => setSelectedName(e.target.value)}
                                placeholder={t("customerName")}
                                sx={{ marginBottom: "15px" }}
                                InputProps={{
                                    sx: {
                                        borderRadius: "5px",
                                        height: "35px", fontSize: "11px", color: "#5D5D59", width: "100%"
                                    }
                                }}
                            />
                            <Typography variant='body2' sx={{ fontSize: "11px", marginBottom: "3px", color: "#444442" }}>{t("mobileNumber")}</Typography>
                            <PhoneInput
                                country={'eg'}
                                value={phone}
                                onChange={(phone) => setPhone(phone)}
                                inputStyle={{
                                    width: '100%',
                                    height: '35px',
                                    fontSize: "11px", color: "#5D5D59",
                                }}
                                buttonStyle={{
                                    borderRadius: '5px 0 0 5px',
                                }}
                            />
                            <Divider sx={{ width: "100%", height: "1px", color: "gray", margin: "15px 0px" }} />


                            {selectedType === 'Dine In' && (
                                <>
                                    <Box display={"flex"} justifyContent={"space-between"}>
                                        <Typography variant='body2' sx={{ fontSize: "11px", marginBottom: "3px", color: "#444442" }}>{t("table.one")}</Typography>
                                        <Typography variant='body2' sx={{ fontSize: "10px", marginBottom: "3px", color: "gray" }}>4 {t("seats")}</Typography>
                                    </Box>

                                    <FormControl fullWidth variant="outlined">
                                        <Select
                                            value={selectedTable}
                                            onChange={(e) => setSelectedTable(e.target.value)}
                                            displayEmpty
                                            MenuProps={{
                                                PaperProps: {
                                                    style: {
                                                        maxHeight: 200,
                                                        overflow: 'auto',
                                                    },
                                                },
                                                disableScrollLock: true,
                                            }}
                                            sx={{ marginBottom: "15px", borderRadius: "5px", height: "35px", fontSize: "11px", color: "#5D5D59", width: "100%" }}
                                            input={
                                                <OutlinedInput
                                                    startAdornment={
                                                        <InputAdornment position="start">
                                                            <TableBarOutlinedIcon sx={{ fontSize: "20px" }} />
                                                        </InputAdornment>
                                                    }
                                                />
                                            }
                                        >
                                            <MenuItem value="" disabled sx={{ fontSize: "11px", color: "#5D5D59", }}>
                                                {t("selectTable")}
                                            </MenuItem>
                                            {table?.map((item) => (<MenuItem value={item?.id} sx={{ fontSize: "11px", color: "#5D5D59", }}>
                                                {item?.name + " -size:" + item?.size}
                                            </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </>
                            )}

                            {selectedType === 'Delivery' && (
                                <>
                                    <Typography variant='body2' sx={{ fontSize: "11px", marginBottom: "3px", color: "#444442" }}>{t("city")}</Typography>
                                    <FormControl fullWidth variant="outlined">
                                        <Select
                                            value={selectedCity}
                                            onChange={(e) => setSelectedCity(e.target.value)}
                                            displayEmpty
                                            MenuProps={{
                                                PaperProps: {
                                                    style: {
                                                        maxHeight: 200,
                                                        overflow: 'auto',
                                                    },
                                                },
                                                disableScrollLock: true,
                                            }}
                                            sx={{ marginBottom: "15px", borderRadius: "5px", height: "35px", fontSize: "11px", color: "#5D5D59", width: "100%" }}
                                        >
                                            <MenuItem value="" disabled sx={{ fontSize: "11px", color: "#5D5D59", }}>
                                                {t("plSelectCity")}
                                            </MenuItem>
                                            {egyptGovernorates.map(item => <MenuItem value={item} sx={{ fontSize: "11px", color: "#5D5D59", }}>{t(item)}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                    <Typography variant='body2' sx={{ fontSize: "11px", marginBottom: "3px", color: "#444442" }}>{t("address")}</Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        placeholder={t("addressDisc")}
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}

                                        sx={{ marginBottom: "15px" }}
                                        InputProps={{
                                            sx: {
                                                borderRadius: "5px",
                                                height: "35px", fontSize: "11px", color: "#5D5D59", width: "100%"
                                            }
                                        }}
                                    />
                                    <Box sx={{ display: "flex", marginBottom: "20px", textAlign: "center", alignItems: "center", justifyContent: "center" }}>
                                        <Button sx={{
                                            backgroundColor: theme.palette.secondaryColor.main, color: "white", height: "32px", width: "100%", borderRadius: "20px", fontSize: "10px", textTransform: "capitalize",
                                            "&:hover": {
                                                backgroundColor: "#222243",
                                            }
                                        }}>
                                            <span class="icon-map-1" style={{ fontSize: "17px", marginRight: "5px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span></span>
                                            {t("pinYourLocation")}</Button>
                                    </Box>
                                </>
                            )}

                            {selectedType === 'Takeaway' && (
                                <> </>
                            )}

                            <Typography variant='body2' sx={{ fontSize: "11px", marginBottom: "3px", color: "#444442" }}>{t("comments")}</Typography>
                            <TextField
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                InputProps={{
                                    sx: {
                                        borderRadius: "5px",
                                        height: "55px", marginBottom: "110px", fontSize: "11px", color: "#5D5D59", width: "100%"
                                    }
                                }}
                                fullWidth
                                variant="outlined"
                                multiline
                                rows={2}
                                placeholder={t("paymentComment")}
                            />
                        </Box>
                    )}
                </Box>

                <Box
                    sx={{
                        position: "fixed", bottom: 0, backgroundColor: "white", width: customWidth.buttonSectionWidth
                        , padding: "20px",
                        boxShadow: 3, borderRadius: "30px 30px 0px 0px", display: "flex", justifyContent: "space-between",
                    }}>
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

                        <Divider sx={{ margin: "3px 30px 3px 0px" }} />
                        <Typography variant="h6" sx={{ fontSize: '10px', fontWeight: "bold", color: '#3A3A38' }}>
                            {t("totalPrice")}
                        </Typography>
                        <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: "bold", color: theme.palette.orangePrimary.main }}>
                            {totalCart} <span style={{ fontSize: "10px", fontWeight: "400", color: '#575756' }}>EGP</span>
                        </Typography>
                    </Box>
                    <Box sx={{ width: "100%" }}>
                        <RadioGroup defaultValue="cash" onChange={handleChange} >
                            <FormControlLabel sx={{ color: 'gray' }} value="cash"
                                control={
                                    <Radio size="small"
                                        sx={{
                                            color: selectedValue === 'cash' ? theme.palette.orangePrimary.main : 'gray',
                                            fontSize: "8px",
                                            '&.Mui-checked': { color: theme.palette.orangePrimary.main },
                                            '& .MuiSvgIcon-root': { fontSize: 13 },
                                        }}
                                    />
                                }
                                label={
                                    <Box display="flex" alignItems="center">
                                        <img src='/assets/cash.svg' alt='cash icon' style={{ width: "12px", height: "12px", marginRight: "6px" }} />
                                        <Typography sx={{ fontSize: '10px' }}>{t("cashOrCard")}</Typography>
                                    </Box>}
                            />
                            <FormControlLabel sx={{ color: 'gray' }} value="wallet"
                                control={
                                    <Radio size="small"
                                        sx={{
                                            marginTop: "-10px",
                                            color: selectedValue === 'wallet' ? theme.palette.orangePrimary.main : 'gray',
                                            fontSize: "8px",
                                            '&.Mui-checked': { color: theme.palette.orangePrimary.main },
                                            '& .MuiSvgIcon-root': { fontSize: 13 },
                                        }}
                                    />
                                }
                                label={
                                    <Box display="flex" alignItems="center">
                                        <span class="icon-wallet" style={{ fontSize: '16px', marginRight: "4px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span></span>
                                        <Typography sx={{ fontSize: '10px' }}>{t("digitalWaller")}</Typography>
                                    </Box>}
                            />

                        </RadioGroup>
                        <Button
                            onClick={toggleTypeForm}
                            sx={{
                                width: "100%", marginTop: "15px",
                                backgroundColor: theme.palette.orangePrimary.main, color: "white", textTransform: "capitalize", fontSize: "10px",
                                float: "right", borderRadius: "20px", height: "30px",
                                "&:hover": {
                                    backgroundColor: "#ef7d10",
                                }
                            }}>
                            {t("placeOrder")}<DoneOutlinedIcon sx={{ fontSize: "18px", mr: 1 }} />
                        </Button>
                    </Box>
                </Box> {/* footer */}
            </Box >
            {isPayment &&
                <Payment
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    selectedType={selectedType}
                    phone={phone}
                    selectedValue={selectedValue}
                    totalCart={totalCart}
                    selectedItemOptions={selectedItemOptions}
                    selectedItemExtra={selectedItemExtra}
                    selectedName={selectedName}
                    comment={comment}
                    // Dine In
                    selectedTable={selectedTable}
                    // Delivery
                    selectedCity={selectedCity}
                    address={address}
                    //calulation of payment
                    subTotal={subTotal}
                    tax={tax}
                    discount={discount}
                    total={total}
                />}
        </>
    );
};

export default OrderTypeForm;
