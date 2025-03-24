import React, { useState } from 'react';
import { Box, Modal, Typography, IconButton, Divider, Button, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { FormControl, Select, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

const AddArea = ({ open, onClose }) => {
    const {t} = useTranslation();
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('')
    const [countryCode, setCountryCode] = useState('+20')
    return (
        <Modal disableScrollLock
            open={open}
            onClose={onClose}
            aria-labelledby="add-area-modal"
            aria-describedby="add-area-description"
        >
            <Box
                sx={{
                    width: 400,
                    bgcolor: 'background.paper',
                    p: 4,
                    borderRadius: 3,
                    boxShadow: 24,
                    mx: 'auto',
                    mt: '20vh',
                    position: 'relative'
                }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body1" sx={{ fontSize: "13px", color: "#424242" }}>{t("addDeliveryArea")}</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon sx={{ fontSize: "20px", color: "gray" }} />
                    </IconButton>
                </Box>

                <Divider sx={{ backgroundColor: '#FF6600', height: '1px' }} />

                <Box
                    sx={{
                        marginTop: "20px",
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        alignItems: "flex-start",
                    }}>
                    <Typography variant='body2' sx={{ width: "25%", textAlign: "center" }} color={"#424242"} fontSize={"12px"}>
                        {t("country")}
                    </Typography>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                    }}>
                        <FormControl sx={{ width: "90%" }}>
                            <Select
                                sx={{
                                    '& .MuiInputBase-input': {
                                        height: "35px",
                                        padding: "0px 14px",
                                        textAlign: "left",
                                        fontSize: "12px",
                                        color: "gray",
                                        lineHeight: "35px"
                                    }
                                }}
                                fullWidth
                                displayEmpty
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                placeholder={t("selectCountry")}
                            >
                                <MenuItem value="" disabled sx={{ fontSize: "12PX", color: "gray" }}>{t("selectCountry")}</MenuItem>
                                <MenuItem value={"B"} sx={{ fontSize: "12PX", color: "gray" }}>Cairo </MenuItem>
                                <MenuItem value={"C"} sx={{ fontSize: "12PX", color: "gray" }}>Alex </MenuItem>
                                <MenuItem value={"C"} sx={{ fontSize: "12PX", color: "gray" }}>Tanta </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                <Box sx={{
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    alignItems: "flex-start",
                }}>
                    <Typography variant='body2' sx={{ width: "25%", textAlign: "center" }} color={"#424242"} fontSize={"12px"}>
                        {t("state")}
                    </Typography>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                    }}>
                        <FormControl sx={{ width: "90%" }}>
                            <Select
                                sx={{
                                    '& .MuiInputBase-input': {
                                        height: "35px",
                                        padding: "0px 14px",
                                        textAlign: "left",
                                        fontSize: "12px",
                                        lineHeight: "35px",
                                        color: "gray",
                                    }
                                }}
                                fullWidth
                                displayEmpty
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                placeholder={t("selectState")}
                            >
                                <MenuItem value="" disabled sx={{ fontSize: "12PX", color: "gray" }}>{t("selectState")}</MenuItem>
                                <MenuItem value={"B"} sx={{ fontSize: "12PX", color: "gray" }}>Available</MenuItem>
                                <MenuItem value={"C"} sx={{ fontSize: "12PX", color: "gray" }}>Busy</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                <Box sx={{
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    alignItems: "flex-start",
                }}>
                    <Typography variant='body2' sx={{ width: "25%", textAlign: "center" }} color={"#424242"} fontSize={"12px"}>
                        {t("city")}
                    </Typography>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                    }}>
                        <FormControl sx={{ width: "90%" }}>
                            <Select
                                sx={{
                                    '& .MuiInputBase-input': {
                                        height: "35px",
                                        padding: "0px 14px",
                                        textAlign: "left",
                                        fontSize: "12px",
                                        color: "gray",
                                        lineHeight: "35px"

                                    }
                                }}
                                fullWidth
                                displayEmpty
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Select City"
                            >
                                <MenuItem value="" disabled sx={{ fontSize: "12PX", color: "gray" }}>{t("selectCity")}</MenuItem>
                                <MenuItem value={"B"} sx={{ fontSize: "12PX", color: "gray" }}>Egypt</MenuItem>
                                <MenuItem value={"C"} sx={{ fontSize: "12PX", color: "gray" }}>cairo</MenuItem>
                                <MenuItem value={"C"} sx={{ fontSize: "12PX", color: "gray" }}>Tanta</MenuItem>

                            </Select>
                        </FormControl>
                    </Box>
                </Box>


                <Box
                    sx={{
                        marginTop: "20px",
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        alignItems:"flex-start", 
                    }}
                >
                    <Typography variant='body2'  sx={{ width: "22%", textAlign: "center"}}
                        color={"#424242"} fontSize={"12px"}>
                        {t("mobileNumber")}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            width: "100%",
                            maxWidth: "400px",  
                            alignItems: "center",
                            justifyContent: "center", 
                        }}
                    >
                        <FormControl
                            sx={{
                                width: "20%",
                            }}
                        >
                            <Select
                                sx={{
                                    '& .MuiInputBase-input': {
                                        height: "35px",
                                        padding: "0px 14px",
                                        textAlign: "left",
                                        fontSize: "12px",
                                        color: "gray",
                                        lineHeight: "35px"
                                    }
                                }}
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                displayEmpty
                            >
                                <MenuItem value="+20" sx={{ fontSize: "12px", color: "gray" }}>
                                    <img src="/images/Egypt.PNG" alt="Egypt Flag" width="20" height="15" style={{ marginRight: '5px' }} />
                                    +20
                                </MenuItem>
                                <MenuItem value="+1" sx={{ fontSize: "12px", color: "gray" }}>
                                    <img src="/images/USA.png" alt="USA Flag" width="20" height="15" style={{ marginRight: '5px' }} />
                                    +1
                                </MenuItem>
                                <MenuItem value="+39" sx={{ fontSize: "12px", color: "gray" }}>
                                    <img src="/images/Italy.jpeg" alt="Italy" width="20" height="15" style={{ marginRight: '5px' }} />
                                    +39
                                </MenuItem>
                                <MenuItem value="+33" sx={{ fontSize: "12px", color: "gray" }}>
                                    <img src="/images/France.jpeg" alt="France" width="20" height="15" style={{ marginRight: '5px' }} />
                                    +33
                                </MenuItem>
                                
                            </Select>
                        </FormControl>
                        <TextField
                            sx={{
                                width: "70%",
                                '& .MuiInputBase-input': {
                                    height: "35px",
                                    padding: "0px 14px",
                                    fontSize: "12px",
                                    color: "gray",
                                    lineHeight: "35px",
                                }
                            }}
                            placeholder="100 123 4567"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </Box>
                </Box>



                <Box sx={{
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    alignItems: "left",
                }}>

                    <Typography variant='body2' sx={{ width: "25%", textAlign: "center" }} color={"#424242"} fontSize={"12px"}>
                        {t("cost")}
                    </Typography>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                    }}>
                        <TextField
                            sx={{
                                width: "90%",
                                '& .MuiInputBase-input': {
                                    height: "35px",
                                    padding: "0px 14px",
                                    textAlign: "left", fontSize: "12px",
                                    color: "gray",

                                }
                            }}
                            fullWidth
                            placeholder="0.00 EGP"
                        />
                    </Box>
                </Box>

                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                }}>
                    <Button
                        variant="contained"
                        color="warning"
                        sx={{
                            mt: 4,
                            borderRadius: '20px',
                            height: "30px",
                            width: "50%",
                            textTransform: "capitalize",
                        }}
                    >
                        <DoneIcon sx={{ fontSize: "20px", mr: 1 }} /> {t("save")}
                    </Button>
                </Box> {/* Save button */}
            </Box>
        </Modal>
    );
};

export default AddArea;
