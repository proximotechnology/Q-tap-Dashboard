import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';


const OrderCard = ({ order, isSelected, onClick, isAccepted, isPayment, isServed, isDone, isClose }) => {

    if (!order || !order.id) {
        return null;
    }

    return (
        <Card
            sx={{
                width: "80%",
                margin: "10px 10%",
                marginBottom: "15px",
                borderRadius: "10px",
                backgroundColor: "white",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out, top 0.1s ease-in-out",

            }}

            onClick={onClick}
        >
            <CardContent sx={{ padding: 0, width: "100%" }}>
                <Typography
                    variant="body1"
                    sx={{
                        backgroundColor: isAccepted || isSelected ? "#222240" : "#9d9d9c",
                        padding: "7px",
                        fontSize: "15px",
                        textAlign: "center",
                        borderRadius: "10px 10px 0px 0px",
                        color: "white",
                    }}
                >
                    ID #{order.id}
                </Typography>

                {isAccepted ? (
                    <>

                        <Box display="flex" justifyContent="space-between">
                            <Typography color="textSecondary" fontSize="12px" padding="10px 20px 5px 20px">
                                Chef: <span>{order.chef}</span>
                            </Typography>

                            <Typography color={isPayment ? "green" : "red"}
                                fontSize="11px" padding="10px 20px 5px 20px" sx={{ display: "flex", alignItems: "center" }}>
                                <img src="/assets/balance.svg" alt="icon" style={{ width: "18px", marginRight: "6px", height: "18px" }} />
                                {isPayment ? 'Paid' : order.pay}
                            </Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between">
                            <Typography color="textSecondary" fontSize="12px" padding="0px 0px 5px 20px">
                                Pr Time: <span>{order.preparingTime}</span> mins
                            </Typography>
                            <Typography color="textSecondary" fontSize="12px" padding="0px 10px 5px 10px">
                                {isClose ?
                                    <Box component="span" sx={{ display: "inline-flex", alignItems: "center", color: "black" }}>
                                        <span class="icon-double-check" style={{ fontSize: "20px", marginRight: "6px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span></span>
                                        Done
                                    </Box>
                                    :
                                    isServed ? (
                                        isDone ?

                                            <Box component="span" sx={{ display: "inline-flex", alignItems: "center", color: "black" }}>
                                                <span class="icon-waiter" style={{ fontSize: "16px", color: "#E57C00", marginRight: "6px" }}></span>
                                                Served
                                            </Box>
                                            : (
                                                <Box component="span" sx={{ display: "inline-flex", alignItems: "center", color: "black" }}>
                                                    <span className="icon-chef" style={{ fontSize: "16px", marginRight: "4px" }}><span className="path1"></span><span className="path2"></span><span className="path3"></span></span>
                                                    Prepared
                                                </Box>
                                            )
                                    ) : " "
                                }
                            </Typography>
                        </Box>

                        <Typography color="textSecondary" fontSize="12px" padding="0px 20px 5px 20px">
                            Dine In: <span style={{ color: '#ef7d00' }}>{order.table}</span>
                        </Typography>
                        <hr width="90%" />
                        <Typography variant="body2" fontSize="12px" padding="0px 20px">
                            Total: <span style={{ color: '#ef7d00' }}>{order.total.toFixed(2)}</span>
                            <span style={{ fontSize: "9px", color: "gray" }}>EGP</span>
                        </Typography>
                    </>
                ) : (
                    <>
                        <Typography color="textSecondary" fontSize="12px" padding="10px 20px 5px 20px">
                            {order.order}
                        </Typography>
                        <Typography color="textSecondary" fontSize="12px" padding="0px 18px 5px 20px">
                            {order.date}
                        </Typography>
                        <Typography color="textSecondary" fontSize="12px" padding="0px 20px 10px 20px">
                            Dine in, <span style={{ color: '#ef7d00' }}>{order.table}</span>
                        </Typography>
                        <hr style={{ width: "80%" }} />
                        <Typography variant="body2" fontSize="12px" padding="0px 20px">
                            Total: {order.total.toFixed(2)}
                            <span style={{ fontSize: "9px", color: "gray" }}>EGP</span>
                        </Typography>
                    </>
                )}
            </CardContent>
        </Card>
    );

};

export default OrderCard;
