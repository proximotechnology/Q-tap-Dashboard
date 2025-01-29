import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { Box, Button, Grid, TextField, Paper, Typography, IconButton, Divider, CircularProgress } from '@mui/material';
import StraightIcon from '@mui/icons-material/Straight';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import { toast } from 'react-toastify';
import axios from 'axios';


export const Features = forwardRef((props, ref) => {
    const [feature, setFeature] = useState('');
    const [features, setFeatures] = useState([]);
    const [titleEn, setTitleEn] = useState('');
    const [descriptionEn, setDescriptionEn] = useState('');
    const [titleAr, setTitleAr] = useState('');
    const [descriptionAr, setDescriptionAr] = useState('');
    const [imgFile, setImgFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const fileInputRef = useRef(null);

    const handleAddFeature = () => {
        if (feature.trim()) {
            setFeatures((prevFeatures) => [...prevFeatures, feature.trim()]);
            setFeature('');
        }
    };

    const sendRequest = (imageBase64) => {
        // Validate required fields
        if (!titleEn || !titleAr) {
            toast.error("Both English and Arabic titles are required!");
            setIsSaving(false);
            return;
        }
        if (!descriptionEn || !descriptionAr) {
            toast.error("Both English and Arabic descriptions are required!");
            setIsSaving(false);
            return;
        }
        if (features.length === 0) {
            toast.error("At least one feature is required!");
            setIsSaving(false);
            return;
        }

        // Ensure image is in correct format
        const imgArray = Array.isArray(imageBase64) ? imageBase64 : [imageBase64];

        // Create the request data with proper structure
        const requestData = {
            titles: [titleEn, titleAr],
            descriptions: [descriptionEn, descriptionAr],
            features: [features],
            img: imgArray, // Ensure it's an array     ????????????????????????????????
        };

        console.log("Request Data:", requestData); // Debug log

        axios({
            method: 'post',
            url: 'https://highleveltecknology.com/Qtap/api/settings/features',
            data: requestData,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("adminToken")}`,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                console.log("API Response:", response.data.img); // Debug log
                if (response.data.error) {
                    throw new Error(response.data.error);
                }
                toast.success("Features added successfully!");
                // Reset form
                setFeatures([]);
                setTitleEn('');
                setTitleAr('');
                setDescriptionEn('');
                setDescriptionAr('');
                setImgFile(null);
            })
            .catch(error => {
                console.error("Full error object:", error); // Debug log
                if (error.response && error.response.data) {
                    console.error("API error response:", error.response.data); // Debug log
                    toast.error(error.response.data.error || "Failed to save features!");
                } else {
                    toast.error(error.message || "Failed to save features!");
                }
            })
            .finally(() => {
                setIsSaving(false);
            });
    };


    const handleSave = () => {
        if (features.length === 0) {
            toast.error("Please add at least one feature!");
            return;
        }
        if (!imgFile) {
            toast.error("Please upload an image!");
            return;
        }

        setIsSaving(true);
        try {
            if (imgFile instanceof File) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result;
                    sendRequest(base64String);
                };
                reader.readAsDataURL(imgFile);
            } else {
                sendRequest(imgFile);
            }
        } catch (error) {
            console.log("error", error);
            setIsSaving(false);
            toast.error("Error preparing data for submission");
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setIsUploading(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log("Image loaded, size:", reader.result.length);
                setImgFile(reader.result);
                setIsUploading(false);
            };
            reader.onerror = () => {
                toast.error("Error reading file!");
                setIsUploading(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileInputClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    useImperativeHandle(ref, () => ({
        saveFeatures: handleSave,
    }));

    return (
        <Paper sx={{ paddingTop: "10px", borderRadius: "20px", position: 'relative' }}>
            {isSaving && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        zIndex: 1000,
                        borderRadius: "20px",
                    }}
                >
                    <Box sx={{ textAlign: 'center' }}>
                        <CircularProgress sx={{ color: "#ef7d00" }} />
                        <Typography sx={{ mt: 2, color: '#222240' }}>Saving...</Typography>
                    </Box>
                </Box>
            )}
            <Grid
                container
                spacing={2}
                sx={{
                    padding: '30px',
                    marginBottom: '10px',
                }}
            >
                <Grid item xs={12} md={2} textAlign="center">
                    <Box
                        sx={{
                            width: '130px',
                            height: '95px',
                            backgroundColor: "#EBEDF3",
                            borderRadius: '10px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                        }}
                    >
                        {isUploading ? (
                            <CircularProgress size={24} sx={{ color: "#ef7d00" }} />
                        ) : imgFile ? (
                            <img
                                src={imgFile}
                                alt="Uploaded"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                }}
                            />
                        ) : (
                            <Typography color="gray">No Image</Typography>
                        )}
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "start" }}>
                        <Typography variant="subtitle1" sx={{ fontSize: "10px", color: "gray", margin: '5px 10px', textAlign: "center" }}>
                            Image 01
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<StraightIcon sx={{ fontSize: "8px", color: "#ef7d00" }} />}
                            sx={{
                                backgroundColor: '#222240', fontSize: "11px", padding: "1px 20px", borderRadius: "20px", textTransform: "capitalize", color: 'white',
                                '&:hover': {
                                    backgroundColor: '#222244',
                                },
                            }}
                            onClick={handleFileInputClick}
                        >
                            Upload
                        </Button>
                    </Box>

                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                    />
                </Grid>

                <Grid item xs={12} md={10}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={12}>
                            <TextField
                                placeholder="Title (En)"
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={titleEn}
                                onChange={(e) => setTitleEn(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        fontSize: "10px",
                                        height: "25px",
                                        borderRadius: "10px",
                                        backgroundColor: "#EBEDF3",
                                        border: "none",
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: 'none',
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <TextField
                                placeholder="Description (En)"
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={descriptionEn}
                                onChange={(e) => setDescriptionEn(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        fontSize: "10px",
                                        height: "40px",
                                        borderRadius: "10px",
                                        backgroundColor: "#EBEDF3",
                                        border: "none",
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: 'none',
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <TextField
                                placeholder="Title (Ar)"
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={titleAr}
                                onChange={(e) => setTitleAr(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        fontSize: "10px",
                                        height: "25px",
                                        borderRadius: "10px",
                                        backgroundColor: "#EBEDF3",
                                        border: "none",
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: 'none',
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <TextField
                                placeholder="Description (Ar)"
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={descriptionAr}
                                onChange={(e) => setDescriptionAr(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        fontSize: "10px",
                                        height: "40px",
                                        borderRadius: "10px",
                                        backgroundColor: "#EBEDF3",
                                        border: "none",
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: 'none',
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box sx={{ backgroundColor: "#EBEDF3", borderRadius: "8px", height: "auto", minHeight: "70px", padding: "0px 20px" }}>
                                <Box sx={{
                                    height: "36px", display: 'flex', justifyContent: 'space-between',
                                    alignItems: 'center', borderRadius: '4px'
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <DoneOutlinedIcon sx={{ fontSize: "12px", color: "#ef7d00" }} />
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            placeholder="Add Feature"
                                            value={feature}
                                            onChange={(e) => setFeature(e.target.value)}
                                            InputProps={{
                                                sx: {
                                                    fontSize: '10px',
                                                    border: 'none',
                                                    color: "#575756"
                                                }
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    border: 'none',
                                                    color: "#575756"
                                                }
                                            }}
                                        />
                                    </Box>
                                    <IconButton onClick={handleAddFeature}>
                                        <AddOutlinedIcon sx={{ fontSize: "15px", color: "#575756" }} />
                                    </IconButton>
                                </Box>
                                <Divider sx={{ margin: "-9px 1px 8px 1px" }} />
                                <Box>
                                    {features.map((feature, index) => (
                                        <React.Fragment key={index}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                                <Typography>
                                                    <DoneOutlinedIcon sx={{ fontSize: "12px", color: "#ef7d00", mr: 0.5 }} />
                                                    {feature}
                                                </Typography>
                                            </Box>
                                            <Divider sx={{ margin: "3px" }} />
                                        </React.Fragment>
                                    ))}
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box sx={{ backgroundColor: "#EBEDF3", borderRadius: "8px", height: "auto", minHeight: "70px", padding: "0px 20px" }}>
                                <Box sx={{
                                    height: "36px", display: 'flex', justifyContent: 'space-between',
                                    alignItems: 'center', borderRadius: '4px'
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <DoneOutlinedIcon sx={{ fontSize: "12px", color: "#ef7d00" }} />
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            placeholder="Feature (Ar)"
                                            value={feature}
                                            onChange={(e) => setFeature(e.target.value)}
                                            InputProps={{
                                                sx: {
                                                    fontSize: '10px',
                                                    border: 'none', color: "#575756"
                                                }
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    border: 'none', color: "#575756"
                                                }
                                            }}
                                        />
                                    </Box>
                                    <IconButton onClick={handleAddFeature}>
                                        <AddOutlinedIcon sx={{ fontSize: "15px", color: "#575756" }} />
                                    </IconButton>
                                </Box>
                                <Divider sx={{ margin: "-9px 1px 8px 1px" }} />
                                <Box>
                                    {features.map((feature, index) => (
                                        <React.Fragment key={index}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                                <Typography>
                                                    <DoneOutlinedIcon sx={{ fontSize: "12px", color: "#ef7d00", mr: 0.5 }} />
                                                    {feature}
                                                </Typography>
                                            </Box>
                                            <Divider sx={{ margin: "3px" }} />
                                        </React.Fragment>
                                    ))}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
});
