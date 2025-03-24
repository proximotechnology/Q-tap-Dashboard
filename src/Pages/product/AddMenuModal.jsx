import React, { useState } from 'react';
import {
    Box,
    Modal,
    Typography,
    TextField,
    Button,
    IconButton,
    Divider,
    CircularProgress
} from '@mui/material';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const AddMenuModal = ({ open, handleClose, onSuccess }) => {
    const [menuData, setMenuData] = useState({
        name: '',
        img: null
    });
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMenuData(prev => ({ ...prev, img: file }));
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', menuData.name);
            if (menuData.img) {
                formData.append('img', menuData.img);
            }

            const response = await axios.post(
                'https://highleveltecknology.com/Qtap/api/products',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    }
                }
            );

            if (response.data) {
                onSuccess();
                handleClose();
                setMenuData({ name: '', img: null });
                setPreviewUrl(null);
            }
        } catch (error) {
            console.error('Error creating menu:', error);
        } finally {
            setLoading(false);
        }
    };
    const {t} = useTranslation()
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">{t("addNewMenu")}</Typography>
                    <IconButton onClick={handleClose}>
                        <span className="icon-close-1" style={{ fontSize: "15px" }}></span>
                    </IconButton>
                </Box>
                <Divider sx={{ backgroundColor: "#E57C00", mb: 3 }} />

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label={t("menuName")}
                        value={menuData.name}
                        onChange={(e) => setMenuData(prev => ({ ...prev, name: e.target.value }))}
                        margin="normal"
                        required
                    />

                    <Box sx={{ mt: 2, mb: 2 }}>
                        <input
                            accept="image/*"
                            type="file"
                            id="menu-image"
                            hidden
                            onChange={handleImageChange}
                        />
                        <label htmlFor="menu-image">
                            <Button
                                variant="outlined"
                                component="span"
                                sx={{
                                    mr: 2,
                                    borderRadius: '10px',
                                    textTransform: 'capitalize',
                                    borderColor: '#ef7d00',
                                    color: '#ef7d00',
                                    '&:hover': {
                                        borderColor: '#ef7d00',
                                        backgroundColor: 'rgba(239, 125, 0, 0.1)'
                                    }
                                }}
                            >
                                {t("uploadImage")}
                            </Button>
                        </label>
                        {previewUrl && (
                            <Box sx={{ mt: 2 }}>
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '200px',
                                        objectFit: 'cover',
                                        borderRadius: '10px'
                                    }}
                                />
                            </Box>
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: "#ef7d00",
                                borderRadius: '10px',
                                textTransform: 'capitalize',
                                '&:hover': {
                                    backgroundColor: "#ef7d00",
                                }
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={20} color="inherit" />
                            ) : (
                                t("addMenu")
                            )}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default AddMenuModal;