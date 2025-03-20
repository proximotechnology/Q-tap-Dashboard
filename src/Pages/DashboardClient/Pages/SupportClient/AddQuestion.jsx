import React, { useState } from 'react';
import { IconButton, Modal, Typography, Divider, Grid, TextField, Button } from '@mui/material';
import { Box } from '@mui/system';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { useTranslation } from 'react-i18next';

export const AddQuestion = ({ open, handleCloseModel, onAddQuestion }) => {
    const [inputValue, setInputValue] = useState("");
    const {t} = useTranslation();
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSave = () => {
        if (inputValue.trim() !== "") {
            onAddQuestion(inputValue); 
            setInputValue(""); 
            handleCloseModel(); 
        }
    };

    return (
        <Modal disableScrollLock open={open} onClose={handleCloseModel}>
            <Box
                sx={{
                    width: 400,
                    height: "auto",
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
                        {t("addQuestion")}
                    </Typography>
                    <IconButton onClick={handleCloseModel}>
                        <span className="icon-close-1" style={{ fontSize: "12px", color: "#AAAAAA" }} />
                    </IconButton>
                </Box>
                <Divider
                    sx={{
                        backgroundColor: '#FF6600',
                        height: '1px',
                    }}
                />
                <Grid item xs={10} sx={{ margin: "20px 0px" }}>
                    <Typography variant="body2" sx={{ fontSize: "10px", color: "#575756", marginBottom: "3px" }}>
                        {t("question")}
                    </Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        placeholder={t("typeHere")}
                        value={inputValue}
                        onChange={handleInputChange}
                        InputProps={{ sx: { height: '30px', fontSize: "10px" } }}
                    />
                </Grid>

                <Grid item xs={10} sx={{ margin: "20px 0px" }}>
                    <Typography variant="body2" sx={{ fontSize: "10px", color: "#575756", marginBottom: "6px" }}>
                        {t("answer")}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }} gap={1}>
                        <Typography variant="body2" sx={{ fontSize: "10px", color: "#AAAAAA" }}>
                            {t("from")}
                        </Typography>
                        <Box
                            sx={{
                                width: "22px",
                                height: "22px",
                                border: "1px solid #AAAAAA",
                                fontSize: "9px",
                                color: "#AAAAAA",
                                borderRadius: "50%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            1
                        </Box>
                        <Typography variant="body2" sx={{ fontSize: "10px", color: "#AAAAAA" }}>
                            {t("to")}
                        </Typography>
                        <Box
                            sx={{
                                width: "22px",
                                height: "22px",
                                border: "1px solid #AAAAAA",
                                fontSize: "9px",
                                color: "#AAAAAA",
                                borderRadius: "50%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            10
                        </Box>
                    </Box>
                </Grid>
                <Box
                    sx={{
                        marginTop: "50px",
                        display: "flex",
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Button
                        onClick={handleSave}
                        variant="contained"
                        sx={{
                            backgroundColor: '#ef7d00',
                            borderRadius: '25px',
                            color: 'white',
                            textTransform: 'none',
                            padding: '2px 50px',
                            '&:hover': {
                                backgroundColor: '#f18101',
                            },
                        }}
                    >
                        <CheckOutlinedIcon /> {t("save")}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};
