
import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { Box, Button, Grid, TextField, Paper, Typography, IconButton, Divider, CircularProgress } from '@mui/material';
import StraightIcon from '@mui/icons-material/Straight';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import AddIcon from "@mui/icons-material/Add";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const FeatureSection = ({ section, updateSection, index }) => {
    const [feature, setFeature] = useState('');
    const fileInputRef = useRef(null);
    const {t} = useTranslation()
    const handleAddFeature = () => {
        if (feature.trim()) {
            updateSection(index, { ...section, features: [...section.features, feature.trim()] });
            setFeature('');
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateSection(index, { ...section, imgFile: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileInputClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <Grid container spacing={2} sx={{ padding: '10px 30px', marginBottom: '10px' }}>
            {/* Same Grid layout as before */}
            <Grid item xs={12} md={2} textAlign="center">
                <Box sx={{ width: '130px', height: '95px', backgroundColor: "#EBEDF3", borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {section.imgFile ? (
                        <img src={section.imgFile} alt="Uploaded" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }} />
                    ) : (
                        <Typography color="gray">{t("noImage")}</Typography>
                    )}
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "start" }}>
                    <Typography variant="subtitle1" sx={{ fontSize: "10px", color: "gray", margin: '5px 10px' }}>
                       {t("image")} {index + 1}
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<StraightIcon sx={{ fontSize: "8px", color: "#ef7d00" }} />}
                        sx={{
                            backgroundColor: '#222240', fontSize: "11px", padding: "1px 20px", borderRadius: "20px", textTransform: "capitalize",
                            color: 'white', '&:hover': { backgroundColor: '#222244d3' }
                        }}
                        onClick={handleFileInputClick}
                    >
                        {t("upload")}
                    </Button>
                </Box>
                <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageUpload} />
            </Grid>

            <Grid item xs={12} md={10}>
                <Grid container spacing={1}>
                    <Grid item xs={12}><TextField placeholder={t("titleEn")} fullWidth variant="outlined" size="small" value={section.titleEn} onChange={(e) => updateSection(index, { ...section, titleEn: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { fontSize: "10px", height: "25px", borderRadius: "10px", backgroundColor: "#EBEDF3", border: "none" }, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }} /></Grid>
                    <Grid item xs={12}><TextField placeholder={t("descriptionEn")} fullWidth variant="outlined" size="small" value={section.descriptionEn} onChange={(e) => updateSection(index, { ...section, descriptionEn: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { fontSize: "10px", height: "40px", borderRadius: "10px", backgroundColor: "#EBEDF3", border: "none" }, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }} /></Grid>
                    <Grid item xs={12}><TextField placeholder={t("titleAr")} fullWidth variant="outlined" size="small" value={section.titleAr} onChange={(e) => updateSection(index, { ...section, titleAr: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { fontSize: "10px", height: "25px", borderRadius: "10px", backgroundColor: "#EBEDF3", border: "none" }, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }} /></Grid>
                    <Grid item xs={12}><TextField placeholder={t("descriptionAr")} fullWidth variant="outlined" size="small" value={section.descriptionAr} onChange={(e) => updateSection(index, { ...section, descriptionAr: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { fontSize: "10px", height: "40px", borderRadius: "10px", backgroundColor: "#EBEDF3", border: "none" }, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }} /></Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ backgroundColor: "#EBEDF3", borderRadius: "8px", minHeight: "70px", padding: "0px 20px" }}>
                            <Box sx={{ height: "36px", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <DoneOutlinedIcon sx={{ fontSize: "12px", color: "#ef7d00" }} />
                                    <TextField variant="outlined" fullWidth placeholder={t("addFeature")} value={feature} onChange={(e) => setFeature(e.target.value)} InputProps={{ sx: { fontSize: '10px', border: 'none', color: "#575756" } }} sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }} />
                                </Box>
                                <IconButton onClick={handleAddFeature}><AddOutlinedIcon sx={{ fontSize: "15px", color: "#575756" }} /></IconButton>
                            </Box>
                            <Divider sx={{ margin: "-9px 1px 8px 1px" }} />
                            <Box>
                                {section.features.map((feat, idx) => (
                                    <React.Fragment key={idx}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography><DoneOutlinedIcon sx={{ fontSize: "12px", color: "#ef7d00", mr: 0.5 }} />{feat}</Typography>
                                        </Box>
                                        <Divider sx={{ margin: "3px" }} />
                                    </React.Fragment>
                                ))}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ backgroundColor: "#EBEDF3", borderRadius: "8px", minHeight: "70px", padding: "0px 20px" }}>
                            <Box sx={{ height: "36px", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <DoneOutlinedIcon sx={{ fontSize: "12px", color: "#ef7d00" }} />
                                    <TextField variant="outlined" fullWidth placeholder={t("addFeature")} value={feature} onChange={(e) => setFeature(e.target.value)} InputProps={{ sx: { fontSize: '10px', border: 'none', color: "#575756" } }} sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }} />
                                </Box>
                                <IconButton onClick={handleAddFeature}><AddOutlinedIcon sx={{ fontSize: "15px", color: "#575756" }} /></IconButton>
                            </Box>
                            <Divider sx={{ margin: "-9px 1px 8px 1px" }} />
                            <Box>
                                {section.features.map((feat, idx) => (
                                    <React.Fragment key={idx}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography><DoneOutlinedIcon sx={{ fontSize: "12px", color: "#ef7d00", mr: 0.5 }} />{feat}</Typography>
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
    );
};

export const Features = forwardRef((props, ref) => {
    const [sections, setSections] = useState([{
        features: [],
        titleEn: '',
        descriptionEn: '',
        titleAr: '',
        descriptionAr: '',
        imgFile: null
    }]);
    const [isSaving, setIsSaving] = useState(false);

    const addFeat = () => {
        setSections([...sections, {
            features: [],
            titleEn: '',
            descriptionEn: '',
            titleAr: '',
            descriptionAr: '',
            imgFile: null
        }]);
    };
    const {t} = useTranslation()
    const updateSection = (index, updatedSection) => {
        setSections(sections.map((section, i) => i === index ? updatedSection : section));
    };

    const sendRequest = (section) => {
        // Validate required fields
        if (!section.titleEn || !section.titleAr) {
            toast.error(t("bothEnArTitleReq"));
            setIsSaving(false);
            return;
        }
        if (!section.descriptionEn || !section.descriptionAr) {
            toast.error(t("bothEnArDescReq"));
            setIsSaving(false);
            return;
        }
        if (section.features.length === 0) {
            toast.error(t("atleastOneFeatureReq"));
            setIsSaving(false);
            return;
        }

        const requestData = {
            titles: [section.titleEn, section.titleAr],
            descriptions: [section.descriptionEn, section.descriptionAr],
            features: [section.features],
            img: section.imgFile ? [section.imgFile] : []
        };

        return axios({
            method: 'post',
            url: 'https://highleveltecknology.com/Qtap/api/settings/features',
            data: requestData,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("adminToken")}`,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        });
    };

    const handleSave = async () => {
        const hasInvalidSection = sections.some(section =>
            !section.titleEn || !section.titleAr ||
            !section.descriptionEn || !section.descriptionAr ||
            section.features.length === 0 ||
            !section.imgFile
        );

        if (hasInvalidSection) {
            toast.error(t("plFillAllField"));
            return;
        }

        setIsSaving(true);

        try {
            // Send each section sequentially
            for (const section of sections) {
                await sendRequest(section)
                    .then(response => {
                        if (response.data.error) {
                            throw new Error(response.data.error);
                        }
                    })
                    .catch(error => {
                        throw error;
                    });
            }

            toast.success(t("featureAddSucc"));
            setSections([{
                features: [],
                titleEn: '',
                descriptionEn: '',
                titleAr: '',
                descriptionAr: '',
                imgFile: null
            }]);
        } catch (error) {
            console.error("Full error object:", error);
            if (error.response && error.response.data) {
                toast.error(error.response.data.error || t("featureAddErr"));
            } else {
                toast.error(error.message || t("featureAddErr"));
            }
        } finally {
            setIsSaving(false);
        }
    };

    useImperativeHandle(ref, () => ({
        saveFeatures: handleSave,
    }));

    return (
        <Paper sx={{ padding: "10px 0", borderRadius: "20px", position: 'relative' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ padding: "0px 30px" }}>
                <Typography variant="h6" sx={{ color: "gray", fontSize: "10px" }}>
                    W:780px H:500px
                </Typography>
                <IconButton onClick={addFeat} sx={{ textAlign: "center" }}>
                    <AddIcon fontSize="large" sx={{ color: "grey" }} />
                </IconButton>
            </Box>
            {isSaving && (
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)', zIndex: 1000, borderRadius: "20px" }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <CircularProgress sx={{ color: "#ef7d00" }} />
                        <Typography sx={{ mt: 2, color: '#222240' }}>{t("saving")}</Typography>
                    </Box>
                </Box>
            )}
            {sections.map((section, index) => (
                <FeatureSection
                    key={index}
                    section={section}
                    updateSection={updateSection}
                    index={index}
                />
            ))}
        </Paper>
    );
});