import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, TextField, Paper, Button } from '@mui/material';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import axios from 'axios';
import { toast } from 'react-toastify';

const PaymentGatewayForm = () => {
    const [apiKey, setApiKey] = useState('');
    const [token1, setToken1] = useState('');
    const [token2, setToken2] = useState('');
    const [iframe, setIframe] = useState('');

    const handleSave = async () => {
        if (apiKey === '' || token1 === '' || token2 === '' || iframe === '') {
            toast.error("Please fill all fields");
            return;
        }
        const formData = {
            API_KEY: apiKey,
            Token1: token1,
            Token2: token2,
            Ifram: iframe,
            brunch_id: localStorage.getItem("selectedBranch")
        }

        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("clientToken")}`
                },
                body: JSON.stringify(formData)
            }
            const response = await fetch('https://highleveltecknology.com/Qtap/api/payment', options);
            // console.log("response payment", response);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            if (response.ok) {
                toast.success("Payment Gateway Saved Successfully");
                setApiKey('');
                setToken1('');
                setToken2('');
                setIframe('');
            }
            // console.log("data", data);

        } catch (error) {
            toast.error(error.message);
            console.error('Error:', error);
        }
    };


    return (
        <Paper elevation={3} style={{ padding: '20px 30px', borderRadius: "10px", marginTop: '16px' }}>
            <Box
                sx={{
                    maxWidth: '100%',
                    padding: "0px"
                }}
            >
                <Typography
                    variant="body1"
                    sx={{
                        textAlign: "left",
                        fontSize: "15px",
                        color: "#575756"
                    }}
                >
                    Payment Gateway
                </Typography>

                <Divider
                    sx={{
                        backgroundColor: 'gray',
                        height: '1px',
                        margin: '8px 0px',
                    }}
                />
                <Box
                    sx={{
                        width: "90%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        margin: "0 auto"
                    }}>
                    <img
                        src="/images/Payment.png"
                        alt="Paymob Logo"
                        style={{
                            display: 'block',
                            margin: '20px auto',
                            textAlign: "center",
                            width: "180px"
                        }}
                    />
                    <Typography variant='body2' sx={{ fontSize: "11px", color: "#4b4a4a", marginBottom: "5px" }}>API_KEY</Typography>
                    <TextField
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        variant="outlined"
                        fullWidth
                        sx={{
                            marginBottom: '20px',
                            '& .MuiOutlinedInput-root': {
                                height: "35px",
                                borderRadius: "10px",
                            },
                            '& .MuiOutlinedInput-input': {
                                padding: "10px",
                            }
                        }}
                    />

                    <Typography variant='body2' sx={{ fontSize: "11px", color: "#4b4a4a", marginBottom: "5px" }}>Token1</Typography>
                    <TextField
                        value={token1}
                        onChange={(e) => setToken1(e.target.value)}
                        variant="outlined"
                        fullWidth
                        sx={{
                            marginBottom: '20px',
                            '& .MuiOutlinedInput-root': {
                                height: "35px",
                                borderRadius: "10px",
                            },
                            '& .MuiOutlinedInput-input': {
                                padding: "10px",
                            }
                        }}
                    />

                    <Typography variant='body2' sx={{ fontSize: "11px", color: "#4b4a4a", marginBottom: "5px" }}>Token2</Typography>
                    <TextField
                        value={token2}
                        onChange={(e) => setToken2(e.target.value)}
                        variant="outlined"
                        fullWidth
                        sx={{
                            marginBottom: '20px',
                            '& .MuiOutlinedInput-root': {
                                height: "35px",
                                borderRadius: "10px",
                            },
                            '& .MuiOutlinedInput-input': {
                                padding: "10px",
                            }
                        }}
                    />

                    <Typography variant='body2' sx={{ fontSize: "11px", color: "#4b4a4a", marginBottom: "5px" }}>Ifram</Typography>
                    <TextField
                        value={iframe}
                        onChange={(e) => setIframe(e.target.value)}
                        variant="outlined"
                        fullWidth
                        sx={{
                            marginBottom: '20px',
                            '& .MuiOutlinedInput-root': {
                                height: "35px",
                                borderRadius: "10px",
                            },
                            '& .MuiOutlinedInput-input': {
                                padding: "10px",
                            }
                        }}
                    />
                    <Box textAlign="center" mt={2}>
                        <Button sx={{
                            fontSize: "13px", padding: "3px 50px",
                            borderRadius: "20px", backgroundColor: "#ef7d00", color: "white", textTransform: "capitalize",
                            '&:hover': {
                                backgroundColor: "#ef7d16",
                            }
                        }}
                            onClick={handleSave}
                            startIcon={<CheckOutlinedIcon />}>Save</Button>
                    </Box>
                </Box>

            </Box>
        </Paper>
    );
};

export default PaymentGatewayForm;
