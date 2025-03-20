import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, IconButton, Divider, MenuItem, FormControl, Select, Button, Grid, Checkbox, FormControlLabel } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { useTranslation } from 'react-i18next';

const iconsArray = [
    { name: 'Dashboard', icon: <img src="/assets/dashboard.svg" alt="icon" style={{ width: "16px", height: "16px" }} /> },
    { name: 'Support', icon: <span class="icon-messenger" style={{ width: "34.539", height: "34.544" }}></span> },

    { name: 'Orders', icon: <span class="icon-shopping-bag" style={{ width: "34.539", height: "34.544" }}></span> },
    { name: 'Users', icon: <PersonOutlineOutlinedIcon sx={{ fontSize: "18px", color: "gray" }} /> },

    { name: 'Wallet', icon: <span class="icon-wallet1" style={{ width: "34.539", height: "34.544" }}></span> },
    { name: 'Customers Log', icon: <span class="icon-show"></span> },
    { name: 'Menu', icon: <img src="/assets/menu.svg" alt="menu icon" style={{ width: "17px", height: "17px" }} />, },

    { name: 'Setting', icon: <img src="/assets/setting.svg" alt="icon" style={{ width: "16px", height: "16px" }} /> },
];
export const AddUser = ({ open, onClose, onSave }) => {
    const { t } = useTranslation();
    const [role, setRole] = useState('');
    const [checkedItems, setCheckedItems] = useState({
        Dashboard: true,
        Orders: false,
        Wallet: false,
        Menu: false,
        Support: false,
        Users: false,
        'Customers Log': false,
        Setting: false,
    });

    const handleCheck = (name) => {
        setCheckedItems((prevState) => ({
            ...prevState,
            [name]: !prevState[name],
        }));
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    width: 400,
                    bgcolor: 'background.paper',
                    p: 4,
                    borderRadius: 3,
                    boxShadow: 24,
                    mx: 'auto',
                    mt: '10vh',
                    position: 'relative'
                }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body1" sx={{ fontSize: "13px", color: "#424242" }}>{t("userAdd")}</Typography>
                    <IconButton onClick={onClose} >
                        <span class="icon-close-1" style={{ fontSize: "15px", color: "gray" }} />
                    </IconButton>
                </Box>
                <Divider sx={{ backgroundColor: '#ef7d00', }} />

                <Box sx={{
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    alignItems: "left",
                }}>

                    <Typography variant='body2' sx={{ width: "22%", textAlign: "center" }} color={"#424242"} fontSize={"10px"}>
                        {t("name")}
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
                                    height: "30px",
                                    padding: "0px 14px",
                                    textAlign: "left", fontSize: "10px",
                                    color: "gray",

                                }
                            }}
                            fullWidth
                            placeholder={t("tableName")}
                        />
                    </Box>
                </Box>

                <Box sx={{
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    alignItems: "flex-start",
                }}>
                    <Typography variant='body2' sx={{ width: "22%", textAlign: "center" }} color={"#424242"} fontSize={"10px"}>
                        {t("pin")}
                    </Typography>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                    }}>
                        <Grid container spacing={1} sx={{ width: "90%" }} >
                            {Array(6).fill().map((_, index) => (
                                <Grid item xs={2} key={index}>
                                    <TextField variant="outlined" inputProps={{ maxLength: 1, style: { textAlign: 'center', width: "14px", height: "6px" } }} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>

                <Box sx={{
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    alignItems: "flex-start",
                }}>
                    <Typography variant='body2' sx={{ width: "25%", textAlign: "center" }} color={"#424242"} fontSize={"10px"}>
                        {t("role")}
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
                                        height: "30px",
                                        padding: "1px 14px",
                                        textAlign: "left",
                                        fontSize: "10px",
                                        color: "gray",
                                        lineHeight: "30px"

                                    }
                                }}
                                fullWidth
                                displayEmpty
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                placeholder="Select Role"
                            >
                                <MenuItem value="" disabled sx={{ fontSize: "10px", color: "gray" }}>{t("selectRole")}</MenuItem>
                                <MenuItem value={"chef"} sx={{ fontSize: "10px", color: "gray" }}>{t("Chef")}</MenuItem>
                                <MenuItem value={"cashier"} sx={{ fontSize: "10px", color: "gray" }}>{t("Cashier")}</MenuItem>
                                <MenuItem value={"waiter"} sx={{ fontSize: "10px", color: "gray" }}>{t("Waiter")}</MenuItem>

                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                <Grid container justifyContent="center" alignItems="center" spacing={2} width={"100%"} marginTop={"10px"} marginLeft="6%">
                    {iconsArray.map((item, index) => (
                        <Grid item xs={6} key={index}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checkedItems[item.name]}
                                        onChange={() => handleCheck(item.name)}
                                        icon={<Box sx={{ border: '1px solid gray', width: '16px', height: '16px', borderRadius: '4px' }} />}
                                        checkedIcon={<Box sx={{ border: '1px solid #ef7d00', backgroundColor: '#ef7d00', color: 'white', width: '16px', height: '16px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Typography variant="caption" sx={{ color: 'white' }}>✔</Typography>
                                        </Box>}
                                        sx={{
                                            padding: '5px',
                                            '& .MuiSvgIcon-root': { fontSize: 18 },
                                        }}
                                    />
                                }
                                label={
                                    <Box display="flex" alignItems="center">
                                        <Typography >{item.icon}</Typography>

                                        <Typography variant="body2" sx={{ marginLeft: '6px', fontSize: '11px', color: "gray" }}>
                                            {t(item.name)}
                                        </Typography>
                                    </Box>
                                }
                            />
                        </Grid>
                    ))}
                </Grid>

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
                        <CheckOutlinedIcon /> {t("save")}
                    </Button>
                </Box>


            </Box>
        </Modal>
    )
}
