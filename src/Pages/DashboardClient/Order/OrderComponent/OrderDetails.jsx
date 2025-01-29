import { Box } from '@mui/system';
import React, { useRef, useState } from 'react';
import { Typography, Button, Divider, Card, CardContent, TextField, InputAdornment, Grid, IconButton, Select, MenuItem } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router';
import { Alarm } from './Alarm';

const OrderDetails = ({ order, onReject, onAccept, isAccepted,
    onPayment, onServe, isPayment, isServed, onDone, isDone, isClose, onClose }) => {
    const navigate = useNavigate();
    const printRef = useRef();
    const [selectedChef, setSelectedChef] = useState('');

    const handleChefChange = (e) => {
        setSelectedChef(e.target.value);
    };

    const [preparingTime, setPreparingTime] = useState('');

    const handleChange = (e) => {
        setPreparingTime(e.target.value);
    };
    const [selectedCashier, setSelectedCashier] = useState('');

    const handleCashierChange = (e) => {
        setSelectedCashier(e.target.value);
    };
    const [selectedWaiter, setSelectedWaiter] = useState('');

    const handleWaiterChange = (e) => {
        setSelectedWaiter(e.target.value);
    };


    if (!order) {
        return <div>No order selected</div>;
    }
    // ===========================================================================

    const handlePrint = () => {
        const printContents = printRef.current.innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload(); 
    };
    return (
        <Card sx={{ maxWidth: 400, height: "auto", minHeight: "100vh", zIndex: 5, width: "22%", backgroundColor: "white", position: "absolute", top: 0, right: 0 }}>

            <Alarm />

            <CardContent>
                <Box sx={{ padding: '5px 10px' }} ref={printRef}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ backgroundColor: '#73CB3C', padding: '3px 13px', borderRadius: '20px', }}>
                            <Typography variant="body2" sx={{ fontSize: "11px", color: "#222240" }}>
                                ID #{order.id}</Typography>
                        </Box>

                        <Typography color={isPayment ? "green" : "red"} fontSize="11px" display={"flex"} alignItems={"center"}>
                            <img src="/assets/balance.svg" alt="icon" style={{ width: "18px", marginRight: "6px", height: "18px" }} />
                            {isPayment ? 'Paid' : order.pay}
                        </Typography>
                    </Box>

                    <Divider sx={{ margin: '10px 0' }} />

                    <Typography variant="subtitle1" sx={{ fontSize: "12px" }}>Order details
                        <span class="icon-edit" style={{ fontSize: "15px", marginLeft: "12px", color: "#E57C00" }}></span>
                    </Typography>

                    {order.orderDetails.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "4px 0",
                                fontSize: "10px", color: "gray",
                            }}
                        >
                            <Typography variant="body2" sx={{ fontSize: "10px", color: "#AAAAAA" }}>
                                {item.num} x {item.item} {item.size && `(size: ${item.size})`}
                                {item.extras && ` + ${item.extras}`}
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Box
                                    sx={{
                                        height: "15px",
                                        borderRight: "1px solid #ef7d00",
                                        margin: "0 6px",
                                    }}
                                />
                                <Typography variant="body2" sx={{ fontSize: "10px", color: "#AAAAAA" }}>
                                    {item.price.toFixed(2)} EGP
                                </Typography>
                            </Box>
                        </Box>
                    ))}


                    <Typography variant="subtitle1" fontSize="12px" paddingTop="6px">Comment</Typography>
                    <Typography variant="body2" fontSize="11px" color="#AAAAAA" padding="0px 8px">{order.comment}</Typography>

                    <Typography variant="subtitle1" fontSize="12px" paddingTop="6px">Payment Method</Typography>
                    <Typography variant="body2" color="#AAAAAA" fontSize="11px" padding="0px 8px">{order.paymentMethod}</Typography>

                    <Typography variant="subtitle1" fontSize="12px" paddingTop="6px">Dine Method</Typography>
                    {order.dineMethod.type === 'Dine in' ?
                        <Typography variant="body2" color="#AAAAAA" fontSize="11px" padding="0px 8px">
                            {order.dineMethod.type}
                            <Typography sx={{ color: "#AAAAAA", fontSize: "10px" }}>
                                <span style={{ color: '#E57C00', fontSize: "11px" }}>Table: </span>
                                {order.dineMethod.name}
                            </Typography>
                            <Typography sx={{ color: "#AAAAAA", fontSize: "10px" }}>
                                <span style={{ color: '#E57C00', fontSize: "11px" }}> Area: </span>
                                {order.dineMethod.phone}
                            </Typography>
                        </Typography>
                        : order.dineMethod.type === 'Delivery' ?
                            (
                                <>
                                    <Typography variant="body2" color="textSecondary" fontSize="12px" padding="0px 8px">
                                        {order.dineMethod.type}
                                        <Typography sx={{ color: "gray", fontSize: "11px" }}>
                                            <span style={{ color: '#E57C00', fontSize: "10px" }}>Name:</span>
                                            {order.dineMethod.name}
                                        </Typography>
                                        <Typography sx={{ color: "gray", fontSize: "11px" }}>
                                            <span style={{ color: '#E57C00', fontSize: "10px" }}> Phone :</span>
                                            {order.dineMethod.phone}
                                        </Typography>
                                        <Typography sx={{ color: "gray", fontSize: "11px" }}>
                                            <span style={{ color: '#E57C00', fontSize: "10px" }}> Address :</span>
                                            {order.dineMethod.address}
                                        </Typography>
                                    </Typography>
                                    <Typography variant="subtitle1" fontSize="12px" paddingTop="6px">Delivery Rider</Typography>
                                    <Box display="flex" alignItems="center"  >
                                        <TextField
                                            select
                                            placeholder='Delivery Rider'
                                            SelectProps={{
                                                native: true,
                                            }}
                                            sx={{
                                                minWidth: '150px',
                                                marginRight: '10px',
                                                '& .MuiInputBase-root': {
                                                    padding: '0px 3px',
                                                    fontSize: '10px',
                                                    height: '30px', borderRadius: "8px", color: "gray"
                                                },
                                                '& .MuiInputLabel-root': {
                                                    fontSize: '12px',
                                                },

                                            }}
                                        >

                                            <option value="Rider1" sx={{ fontSize: '12px', color: "gray" }}>Rider 1</option>
                                            <option value="Rider2" sx={{ fontSize: '12px', color: "gray" }}>Rider 2</option>
                                            <option value="Rider3" sx={{ fontSize: '12px', color: "gray" }}>Rider 3</option>
                                        </TextField>

                                        <IconButton sx={{ backgroundColor: '#E57C00', color: 'white', marginRight: '5px', borderRadius: "8px" }}>
                                            <span class="icon-send" style={{ fontSize: "16px", color: "white" }} />
                                        </IconButton>

                                        <IconButton sx={{ backgroundColor: '#222240', color: 'white', borderRadius: "8px" }}>
                                            <span class="icon-map-1" style={{ fontSize: "16px", color: "white" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span></span>
                                        </IconButton>
                                    </Box>
                                </>
                            )
                            : null
                    }


                    {isAccepted ? (
                        <>
                            <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>

                                <Grid item xs={5}>

                                    <Typography variant="subtitle1" fontSize="11px" paddingTop="6px" >
                                        <span class="icon-chef" style={{ fontSize: "14px", marginRight: "6px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>
                                        Chef
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" fontSize={"10px"} marginLeft={"10px"}>{selectedChef}</Typography>
                                </Grid>


                                <Grid item xs={7}>
                                    <Typography variant="subtitle1" fontSize="11px" paddingTop="6px" >
                                        <span class="icon-circular-clock" style={{ fontSize: "14px", marginRight: "6px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>
                                        Preparing Time</Typography>
                                    <Typography variant="body2" color="textSecondary" fontSize={"10px"} marginLeft={"10px"}>{preparingTime}
                                        <span style={{ marginLeft: "5px" }}>Min</span>
                                    </Typography>

                                </Grid>

                                {
                                    isPayment ? (
                                        <>
                                            <Grid item xs={5} sx={{ marginTop: "-10px" }}>
                                                <Typography variant="subtitle1" fontSize="11px" paddingTop="6px" >
                                                    <span class="icon-cashier" style={{ fontSize: "14px", marginRight: "6px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>
                                                    Cashier
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" fontSize={"10px"} marginLeft={"10px"}>{selectedCashier}</Typography>
                                            </Grid>

                                            {
                                                isServed ?
                                                    (<>
                                                        {
                                                            isDone ? (
                                                                <>
                                                                    <Grid item xs={7} sx={{ marginTop: "-10px" }}>
                                                                        <Typography variant="subtitle1" fontSize="11px" paddingTop="6px" >
                                                                            <span class="icon-waiter-1" style={{ fontSize: "14px", marginRight: "6px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span></span>
                                                                            Waiter
                                                                        </Typography>
                                                                        <Typography variant="body2" color="textSecondary" fontSize={"10px"} marginLeft={"10px"}>{selectedWaiter}</Typography>
                                                                    </Grid>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Grid item xs={12} sx={{ marginTop: "-10px" }} >
                                                                        <Typography variant="subtitle1" fontSize="11px" paddingTop="6px" >
                                                                            <span class="icon-waiter-1" style={{ fontSize: "14px", marginRight: "6px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span></span>
                                                                            Waiter
                                                                        </Typography>
                                                                        <Select

                                                                            value={selectedWaiter}
                                                                            onChange={handleWaiterChange}
                                                                            displayEmpty
                                                                            sx={{
                                                                                width: '100%',
                                                                                '& .MuiInputBase-root': {
                                                                                    height: '28px',
                                                                                    fontSize: '10px',
                                                                                    color: "gray",
                                                                                    '& fieldset': {
                                                                                        borderRadius: '12px',
                                                                                    },

                                                                                },
                                                                                '& .MuiInputBase-input': {
                                                                                    padding: '2px 8px',
                                                                                    fontSize: '10px',
                                                                                    color: "gray", borderRadius: "20px",
                                                                                },
                                                                                '& .MuiOutlinedInput-notchedOutline': {
                                                                                    borderColor: 'gray',
                                                                                },
                                                                            }}
                                                                            renderValue={(value) => (value ? value : 'Waiter Name')}
                                                                        >
                                                                            <MenuItem value="" disabled sx={{ fontSize: '10px', color: "gray", }}> Select Waiter Name </MenuItem>
                                                                            <MenuItem value="Waiter aya" sx={{ fontSize: '10px', color: "gray", }}>Waiter aya</MenuItem>
                                                                            <MenuItem value="Waiter afaf" sx={{ fontSize: '10px', color: "gray", }}>Waiter afaf</MenuItem>
                                                                            <MenuItem value="Waiter ahmed" sx={{ fontSize: '10px', color: "gray", }}>Waiter ahmed</MenuItem>
                                                                            <MenuItem value="Waiter Sarah" sx={{ fontSize: '10px', color: "gray", }}>Waiter Sarah</MenuItem>
                                                                        </Select>
                                                                    </Grid>
                                                                </>
                                                            )
                                                        }


                                                    </>
                                                    ) : (
                                                        <>
                                                        </>
                                                    )
                                            }

                                        </>

                                    ) :

                                        (
                                            <>
                                                <Grid item xs={12} sx={{ marginTop: "-10px" }} >
                                                    <Typography variant="subtitle1" fontSize="11px" paddingTop="6px" >
                                                        <span class="icon-cashier" style={{ fontSize: "14px", marginRight: "6px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>
                                                        Cashier
                                                    </Typography>
                                                    <Select disableScrollLock
                                                        value={selectedCashier}
                                                        onChange={handleCashierChange}
                                                        displayEmpty
                                                        sx={{
                                                            width: '100%',
                                                            '& .MuiInputBase-root': {
                                                                height: '28px',
                                                                fontSize: '10px',
                                                                color: "gray",
                                                                '& fieldset': {
                                                                    borderRadius: '12px',
                                                                },

                                                            },
                                                            '& .MuiInputBase-input': {
                                                                padding: '2px 8px',
                                                                fontSize: '10px',
                                                                color: "gray", borderRadius: "20px",
                                                            },
                                                            '& .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'gray',
                                                            },
                                                        }}
                                                        renderValue={(value) => (value ? value : 'Cashier Name')}
                                                        MenuProps={{
                                                            PaperProps: {
                                                                style: {
                                                                    maxHeight: 200,
                                                                    overflow: 'auto',
                                                                },
                                                            },
                                                            disableScrollLock: true,
                                                        }}
                                                    >
                                                        <MenuItem value="" disabled sx={{ fontSize: '10px', color: "gray", }}> Select Cashier Name </MenuItem>
                                                        <MenuItem value="Cashier aya" sx={{ fontSize: '10px', color: "gray", }}>Cashier aya</MenuItem>
                                                        <MenuItem value="Cashier afaf" sx={{ fontSize: '10px', color: "gray", }}>Cashier afaf</MenuItem>
                                                        <MenuItem value="Cashier ahmed" sx={{ fontSize: '10px', color: "gray", }}>Cashier ahmed</MenuItem>
                                                        <MenuItem value="Cashier Sarah" sx={{ fontSize: '10px', color: "gray", }}>Cashier Sarah</MenuItem>
                                                    </Select>
                                                </Grid>
                                            </>
                                        )
                                }
                            </Grid>
                        </>
                    ) : (
                        <>

                            <Typography variant="subtitle1" fontSize="11px" paddingTop="6px" >
                                <span class="icon-chef" style={{ fontSize: "14px", marginRight: "6px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>
                                Chef
                            </Typography>
                            <Select
                                value={selectedChef}
                                onChange={handleChefChange}
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
                                sx={{
                                    width: '100%',
                                    '& .MuiInputBase-root': {
                                        height: '28px',
                                        fontSize: '10px',
                                        color: "gray",
                                        '& fieldset': {
                                            borderRadius: '12px',
                                        },

                                    },
                                    '& .MuiInputBase-input': {
                                        padding: '2px 8px',
                                        fontSize: '10px',
                                        borderRadius: '12px',
                                        color: "gray",
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'gray',
                                    },
                                }}
                                renderValue={(value) => (value ? value : 'Chef Name')}
                            >
                                <MenuItem value="" disabled sx={{ fontSize: '10px', color: "gray", }}> Select Chef Name </MenuItem>
                                <MenuItem value="Chef John" sx={{ fontSize: '10px', color: "gray", }}>Chef John</MenuItem>
                                <MenuItem value="Chef Mary" sx={{ fontSize: '10px', color: "gray", }}>Chef Mary</MenuItem>
                                <MenuItem value="Chef Alex" sx={{ fontSize: '10px', color: "gray", }}>Chef Alex</MenuItem>
                                <MenuItem value="Chef Sarah" sx={{ fontSize: '10px', color: "gray", }}>Chef Sarah</MenuItem>
                            </Select>
                            <Typography variant="subtitle1" fontSize="11px" paddingTop="6px" >
                                <span class="icon-circular-clock" style={{ fontSize: "14px", marginRight: "6px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>
                                Preparing Time</Typography>
                            <TextField
                                placeholder="0.0"
                                type="number"
                                variant="outlined"
                                fullWidth
                                value={preparingTime}
                                onChange={handleChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <span style={{ fontSize: "8px" }}>minute</span>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    width: '100%',
                                    '& .MuiInputBase-root': {
                                        height: '28px',
                                        fontSize: '12px',
                                        color: "gray",
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'gray',
                                    },
                                }}
                            />
                        </>
                    )}
                    <Divider sx={{ margin: '10px 0' }} />

                    <Grid container>
                        <Grid item xs={8}>
                            <Typography variant="body2" fontSize="10px" padding="0px 3px">
                                <span style={{ color: '#9d9d9c' }}>Sub Total:</span> {order.subTotal.toFixed(2)} EGP
                            </Typography>
                            <Typography variant="body2" fontSize="10px" padding="0px 3px">
                                <span style={{ color: '#9d9d9c' }}>Tax:</span> {order.tax.toFixed(2)} EGP
                            </Typography>
                            <Typography variant="body2" fontSize="10px" padding="0px 3px">
                                <span style={{ color: '#9d9d9c' }}>Discount: -</span> {order.discount.toFixed(2)} EGP
                            </Typography>
                            <Typography variant="h6" sx={{ marginTop: '8px', fontSize: "10px" }}>
                                <span style={{ color: '#9d9d9c' }}>TOTAL:</span> {order.total.toFixed(2)} EGP
                            </Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ textAlign: 'right', width: "20%" }}>
                            <Typography variant="body2" fontSize="9px" color='#9d9d9c'>{order.date}</Typography>
                        </Grid>
                    </Grid>

                    <Divider sx={{ margin: '10px 0' }} />

                    {isAccepted ? (
                        <>
                            {
                                isPayment ? (
                                    <>
                                        {
                                            isServed ? (
                                                <>
                                                    {
                                                        isDone ? (
                                                            <>
                                                                {
                                                                    isClose ? (
                                                                        <>
                                                                            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", textAlign: "center", }}>
                                                                                <Button
                                                                                    onClick={() => navigate('/dashboard-client')}
                                                                                    variant="contained"
                                                                                    sx={{
                                                                                        textTransform: "capitalize",
                                                                                        backgroundColor: "#222240",
                                                                                        fontSize: "12px",
                                                                                        width: "60%",
                                                                                        borderRadius: "20px",
                                                                                        '&:hover': {
                                                                                            backgroundColor: '#222240',
                                                                                        }
                                                                                    }}
                                                                                >
                                                                                    <span class="icon-close-1"
                                                                                        style={{ color: "#E57C00", fontSize: "13px", marginRight: "6px" }}></span>
                                                                                    Close
                                                                                </Button>
                                                                            </Grid>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Grid item xs={12} display={"flex"}>
                                                                                <Button
                                                                                    onClick={onClose}
                                                                                    variant="contained"
                                                                                    sx={{
                                                                                        textTransform: "capitalize",
                                                                                        backgroundColor: "#222240",
                                                                                        fontSize: "13px",
                                                                                        width: "70%",
                                                                                        borderRadius: "20px",
                                                                                        '&:hover': {
                                                                                            backgroundColor: '#222240',
                                                                                        }
                                                                                    }}
                                                                                >
                                                                                    <span class="icon-double-check" style={{ fontSize: "22px", marginRight: "6px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span></span>

                                                                                    Done
                                                                                </Button>
                                                                            </Grid>
                                                                        </>
                                                                    )
                                                                }

                                                            </>
                                                        ) : (
                                                            <>
                                                                <Grid item xs={12} display={"flex"}>
                                                                    <Button
                                                                        onClick={onDone}
                                                                        variant="contained"
                                                                        sx={{
                                                                            textTransform: "capitalize",
                                                                            backgroundColor: "#222240",
                                                                            fontSize: "13px",
                                                                            width: "70%",
                                                                            borderRadius: "20px",
                                                                            '&:hover': {
                                                                                backgroundColor: '#2a2a60',
                                                                            }
                                                                        }}
                                                                    >
                                                                        <span class="icon-waiter" style={{ fontSize: "16px", color: "#E57C00", marginRight: "6px" }}></span>
                                                                        served
                                                                    </Button>
                                                                </Grid>
                                                            </>
                                                        )
                                                    }
                                                </>
                                            ) : (
                                                <>
                                                <Grid item xs={12} display={"flex"}>
                                                        <Button
                                                            onClick={onServe}
                                                            variant="contained"
                                                            sx={{
                                                                textTransform: "capitalize",
                                                                backgroundColor: "#222240",
                                                                fontSize: "11px",
                                                                width: "90%",
                                                                borderRadius: "20px",
                                                                '&:hover': {
                                                                    backgroundColor: '#222240',
                                                                }
                                                            }}
                                                        >
                                                            <span class="icon-chef" style={{ fontSize: "18px", marginRight: "6px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>
                                                            Prepared
                                                        </Button>

                                                        <Button  onClick={handlePrint}>
                                                            <span class="icon-printer" style={{ color: "gray", fontSize: "22px", marginRight: "3px" }} ></span>
                                                        </Button>
                                                    </Grid>
                                                </>
                                            )
                                        }
                                    </>

                                ) : (
                                    <>
                                        <Grid item xs={12} display={"flex"}>
                                            <Button
                                                onClick={onPayment}
                                                variant="contained"
                                                sx={{
                                                    textTransform: "capitalize",
                                                    backgroundColor: "#222240",
                                                    fontSize: "11px",
                                                    width: "90%",
                                                    padding: 0,
                                                    borderRadius: "20px",
                                                    '&:hover': {
                                                        backgroundColor: '#222240',
                                                    }
                                                }}
                                            >
                                                <img src="/assets/balance.svg" alt="icon" style={{ color: "#E57C00", width: "18px", marginRight: "6px", height: "18px" }} />
                                                Payment Received
                                            </Button>

                                            <Button>
                                                <span class="icon-delete" style={{ color: "red", fontSize: "20px" }} />
                                            </Button>
                                        </Grid>
                                    </>
                                )
                            }
                        </>


                    ) : (
                        <>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Button
                                        variant="contained"
                                        onClick={onReject}
                                        sx={{
                                            textTransform: "capitalize",
                                            backgroundColor: "#222240",
                                            fontSize: "11px",
                                            width: "100%",
                                            borderRadius: "20px",
                                            '&:hover': {
                                                backgroundColor: '#2a2a60',
                                            }
                                        }}
                                    >
                                        <span class="icon-close" style={{ fontSize: "10px", marginRight: "6px" }}></span>
                                        Reject
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        variant="contained"
                                        onClick={onAccept}
                                        sx={{
                                            textTransform: "capitalize",
                                            backgroundColor: "#ef7d00",
                                            fontSize: "11px",
                                            width: "100%",
                                            borderRadius: "20px",
                                            '&:hover': {
                                                backgroundColor: '#D96A09',
                                            }
                                        }}
                                    >
                                        <CheckIcon sx={{ color: "green", fontSize: "18px", marginRight: "3px" }} />
                                        Accept
                                    </Button>
                                </Grid>
                            </Grid>
                        </>
                    )}
                </Box>

            </CardContent>
        </Card>
    );
}

export default OrderDetails;
