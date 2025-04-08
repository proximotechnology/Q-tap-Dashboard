import { Modal, Box, Typography, TextField, Button, Chip, useTheme } from '@mui/material';
import React, { useState } from "react";

const RejectionModal = ({ open, onClose }) => {
    const [textFieldValue, setTextFieldValue] = useState("");
    const theme = useTheme();
    const handleChipClick = (value) => {
        setTextFieldValue(value);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box style={{ width: 350, margin: 'auto', marginTop: 100, padding: 20, backgroundColor: 'white', borderRadius: 8 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6" sx={{ color: theme.palette.secondaryColor.main, fontSize: "12px" }}>Rejection Reason</Typography>
                    <span className="icon-close-1" style={{ fontSize: "12px", cursor: "pointer", color: "gray" }} onClick={onClose}></span>
                </Box>
                <hr style={{ width: "100%" }} />

                <div>
                    <TextField
                        fullWidth
                        rows={2}
                        placeholder="Type here..."
                        variant="outlined"
                        multiline
                        value={textFieldValue}
                        onChange={(e) => setTextFieldValue(e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "16px",
                                fontSize: "12px",color:"gray",
                            },
                            "& .MuiInputBase-input": {
                                fontSize: "12px",color:"gray",
                            },
                        }}
                    />

                    <Box style={{ marginTop: 10 }}>
                        <Chip label="Item out of stock"
                            onClick={() => handleChipClick("Item out of stock")}
                            style={{ margin: 5, height: "25px", fontSize: "9px", color: "white", backgroundColor: "#9d9d9c" }} />
                        <Chip label="We have technical issue"
                            onClick={() => handleChipClick("We have technical issue")}
                            style={{ margin: 5, height: "25px", fontSize: "9px", color: "white", backgroundColor: "#9d9d9c" }} />
                        <Chip label="Crowded time"
                            onClick={() => handleChipClick("Crowded time")}
                            style={{ margin: 5, height: "25px", fontSize: "9px", color: "white", backgroundColor: "#9d9d9c" }} />
                        <Chip label="Out of working hours"
                            onClick={() => handleChipClick("Out of working hours")}
                            style={{ margin: 5, height: "25px", fontSize: "9px", color: "white", backgroundColor: "#9d9d9c" }} />
                    </Box>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        sx={{
                            marginTop: 1,
                            borderRadius: '20px',
                            textAlign: 'center',
                            backgroundColor: theme.palette.secondaryColor.main,
                            color: 'white',
                            fontSize: "11px",
                            textTransform: "capitalize",
                            '&:hover': {
                                backgroundColor: '#222240',
                            }
                        }}
                    >
                        Submit
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default RejectionModal;
