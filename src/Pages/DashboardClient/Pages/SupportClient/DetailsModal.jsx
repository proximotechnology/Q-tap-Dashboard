import React from 'react';
import { Modal, Box, Typography, Divider, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';


const DetailsModal = ({ open, onClose, rowData }) => {
    const { rate, satisfied } = rowData;

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    width: 400,
                    bgcolor: 'background.paper',
                    p: 3,
                    borderRadius: 3,
                    boxShadow: 24,
                    mx: 'auto',
                    mt: '20vh',
                    position: 'relative',
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body1" sx={{ fontSize: "13px", color: "#575756" }}>
                        Add Question
                    </Typography>
                    <IconButton onClick={onClose}>
                        <span className="icon-close-1" style={{ fontSize: "12px", color: "#AAAAAA" }} />
                    </IconButton>
                </Box>
                <Divider
                    sx={{
                        backgroundColor: '#FF6600',
                        height: '1px',
                    }}
                />

                <Typography variant="body1" sx={{
                    color: "#575756", fontSize: "12px", marginTop: "10px",
                    marginBottom: "15px"
                }}>
                    Order ID:<span style={{ color: "#E57C00", marginLeft: "20px", }}> #{rowData.orderId}</span>
                </Typography>

                <Typography variant="body1" sx={{ color: "#575756", fontSize: "12px", marginBottom: "15px" }}>
                    Name :<span style={{ color: "#949493", marginLeft: "20px", }}>{rowData.name}</span>
                </Typography>

                <Typography variant="body1" sx={{ color: "#575756", fontSize: "12px", marginBottom: "15px" }}>
                    Phone :<span style={{ color: "#949493", marginLeft: "20px", }}>{rowData.phone}</span>
                </Typography>

                <Box sx={{ marginBottom: "15px" }}>
                    <Typography variant="body1" sx={{ color: "#575756", fontSize: "12px", }}>
                        Rate
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <IconButton key={index} disableRipple sx={{ padding:"0px"}}>
                                {index < rate ? (
                                    <StarIcon sx={{ fontSize: "22px", color: "#E57C00" }} />
                                ) : (
                                    <StarOutlineIcon sx={{ fontSize: "22px", color: "#E57C00" }} />
                                )}
                            </IconButton>
                        ))}
                    </Box>
                </Box>

                <Box sx={{ marginBottom: "15px" }}>
                    <Typography variant="body1" sx={{ color: "#575756", fontSize: "12px", }}>
                        How much you satisfied with the product?
                    </Typography>
                    <Box sx={{ display: 'flex', }}>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <IconButton key={index} disableRipple  sx={{ padding:"3px"}}>
                                {index < satisfied ? (
                                    <Box sx={{
                                        width: "22px", height: "22px", borderRadius: "50%", justifyContent: "center",
                                        alignItems: "center", backgroundColor: "#575756",
                                        color: "white", fontSize: "11px", position: "relative",display: "flex",
                                    }} >{index}</Box>
                                ) : (
                                    <Box sx={{
                                        width: "22px", height: "22px", borderRadius: "50%", display: "flex", justifyContent: "center",
                                        alignItems: "center", backgroundColor: "white", border: "1px solid #575756",
                                        color: "#575756", fontSize: "11px",
                                        position: "relative",

                                    }}>{index}</Box>
                                )}
                            </IconButton>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Modal >
    );
};

export default DetailsModal;
