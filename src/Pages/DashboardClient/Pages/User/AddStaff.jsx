import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, TextField, IconButton, Divider, MenuItem, FormControl, Select, Button, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AddStaff = ({ open, onClose, onSave, userStaff }) => {
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();
    const [rolesData, setRolesData] = useState([]);

    const getRoles = async () => {
        try {
            const response = await axios.get(`https://highleveltecknology.com/Qtap/api/roles`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("clientToken")}`
                },
                params: {
                    brunch_id: localStorage.getItem("selectedBranch")
                }
            });
            if (response.data) {
                setRolesData(response.data.roles);
            }
        } catch (e) {
            console.log("error fetching roles");
        }
    };

    useEffect(() => {
        getRoles();
    }, []);

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const userId = userStaff?.find((user) => user.name === name)?.id;
            if (!userId || !role) {
                toast.error("enter exist user");
                setIsLoading(false);
                return;
            }

            const response = await axios.put(`https://highleveltecknology.com/Qtap/api/link_user_role/${userId}`, {
                role_id: role,
                brunch_id: localStorage.getItem("selectedBranch")
            }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("clientToken")}`
                }
            });

            if (response.data) {
                onClose(); // Close the modal on successful save
                toast.success("add user staff")
            }
        } catch (e) {
            console.log("error linking user role:", e);
            toast.error("user not found")
        } finally {
            setIsLoading(false);
        }
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
                    mt: '20vh',
                    position: 'relative'
                }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body1" sx={{ fontSize: "13px", color: "#424242" }}>{t("userStaff.add")}</Typography>
                    <IconButton onClick={onClose} disabled={isLoading}>
                        <CloseIcon sx={{ fontSize: "20px", color: "gray" }} />
                    </IconButton>
                </Box>
                <Divider
                    sx={{
                        backgroundColor: '#FF6600',
                        height: '1px',
                    }}
                />
                <Box sx={{
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    alignTexts: "left",
                }}>
                    <Typography variant='body2' sx={{ width: "25%", textAlign: "center" }} color={"#424242"} fontSize={"12px"}>
                        {t("name")}
                    </Typography>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                    }}>
                        <TextField
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{
                                width: "90%",
                                '& .MuiInputBase-input': {
                                    height: "35px",
                                    padding: "0px 14px",
                                    textAlign: "left",
                                    fontSize: "12px",
                                    color: "gray",
                                }
                            }}
                            fullWidth
                            placeholder={t("tableName")}
                            disabled={isLoading}
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
                    <Typography variant='body2' sx={{ width: "25%", textAlign: "center" }} color={"#424242"} fontSize={"12px"}>
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
                                        height: "35px",
                                        padding: "1px 14px",
                                        textAlign: "left",
                                        fontSize: "12px",
                                        height: "35px",
                                        padding: "1px 14px",
                                        textAlign: "left",
                                        fontSize: "12px",
                                        color: "gray",
                                        lineHeight: "35px"
                                    }

                                }}
                                fullWidth
                                displayEmpty
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                placeholder={t("selectRole")}
                                disabled={isLoading}
                            >
                                <MenuItem value="" disabled sx={{ fontSize: "12px", color: "gray" }}>
                                    {t("selectRole")}
                                </MenuItem>
                                {rolesData?.map((role) => (
                                    <MenuItem key={role.id} value={role.id} sx={{ fontSize: "12px", color: "gray" }}>
                                        {role.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                }}>
                    <Button
                        onClick={handleSave}
                        variant="contained"
                        color="warning"
                        sx={{
                            mt: 4,
                            borderRadius: '20px',
                            height: "30px",
                            width: "50%",
                            textTransform: "capitalize",
                        }}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            <>
                                <CheckOutlinedIcon />
                                {t("save")}
                            </>
                        )}
                    </Button>
                </Box>
            </Box>
        </Modal >
    );
};