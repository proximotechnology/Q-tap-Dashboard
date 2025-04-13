import React, { useState } from "react";
import { Grid, Typography, Button, IconButton, Divider, } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, display, minHeight, styled, useTheme } from "@mui/system";
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import Language from "../dashboard/TopBar/Language";

const ImageContainer = styled(Box)({
    backgroundImage: 'url(/images/logoClient.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    minHeight: "100vh",

    '::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(3px)',
        zIndex: 1,
        minHeight: "100vh",
    },
});


const TextOverlay = styled(Box)({
    textAlign: 'center',
    color: 'white',
    marginTop: "100px",
    zIndex: 2,
});

export const LogoClient = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const branches = [t("branch") + "1", t("branch") + "2", t("branch") + "3"]
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState(null);

    const handleClick = (id) => {
        setSelectedId(id);
    };
    return (
        <Grid item xs={12} md={6} sx={{ width: "100%", }}>
            <ImageContainer >
                <Box sx={{ display: "flex", justifyContent: "space-between", zIndex: '4', padding: { xs: "10px", md: "30px" }, alignItems: "center" }}>
                    <Box>
                        <IconButton onClick={() => navigate('/')}>
                            <ArrowBackIosNewIcon sx={{ color: "white", fontSize: "22px" }} />
                        </IconButton>
                    </Box>

                    <Box sx={{
                        display: "flex", flexDirection: "row", textAlign: "center",
                        alignItems: "center",
                    }}>
                        <Typography onClick={() => navigate('/delivery-riders')}
                            variant="body1" sx={{ display: "flex", alignItems: "center", flexDirection: "row", marginRight: { xs: "10px", md: "50px" }, cursor: "pointer" }}>

                            <span class="icon-fast-shipping" style={{ fontSize: "25px", marginRight: "4px", color: theme.palette.orangePrimary.main }}> </span>

                            <Typography style={{ fontSize: "13px", color: "white", }}>
                                <span style={{ borderBottom: "1px solid white" }}>{t("deliveryRiders")}</span></Typography>
                        </Typography>

                        <Language />
                    </Box>

                </Box>

                <TextOverlay sx={{ width: "100%" }}>
                    <Typography variant="h4" style={{ fontSize: "22px", color: "white" }}>
                        {t("شعار الأعمال")}
                    </Typography>

                    {/* User Roles */}
                    <Grid container marginTop={"30px"}
                        sx={{ flexWrap: "wrap", gap: { xs: 3, sm: 3, md: 3 }, justifyContent: "center" }} >

                        <Grid item xs={3} sm={2}
                            onClick={() => navigate('/admin-login')}
                            sx={{
                                display: "flex", flexDirection: "column", justifyContent: "center",
                                alignItems: "center", cursor: "pointer"
                            }}>
                            <img src="/assets/admin.svg" alt="" style={{ width: "100px", height: "100px" }} />
                            <Typography sx={{ fontSize: { xs: "12px", sm: "14px" }, color: "white", marginTop: "16px" }}>
                                {t("admin")}
                            </Typography>
                        </Grid>

                        <Grid item xs={3} sm={2}
                            onClick={() => navigate('/menu-client')}
                            sx={{
                                display: "flex", flexDirection: "column", justifyContent: "center",
                                alignItems: "center", cursor: "pointer"
                            }}>
                            <img src="/assets/pos.svg" alt="" style={{ width: "100px", height: "100px" }} />
                            <Typography sx={{ fontSize: { xs: "12px", sm: "14px" }, color: "white", marginTop: "16px" }}>
                                {t("pos")}
                            </Typography>
                        </Grid>

                        <Grid item xs={3} sm={2}
                            onClick={() => navigate('/order-body')}
                            sx={{
                                display: "flex", flexDirection: "column", justifyContent: "center",
                                alignItems: "center", cursor: "pointer"
                            }}>
                            <img src="/assets/kitchen.svg" alt="" style={{ width: "100px", height: "100px" }} />
                            <Typography sx={{ fontSize: { xs: "12px", sm: "14px" }, color: "white", marginTop: "16px" }}>
                                {t("kitchen")}
                            </Typography>
                        </Grid>
                    </Grid>


                    {/* Branch Selector */}
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex", flexDirection: "row",
                            textAlign: "center", marginTop: "50px",
                        }}
                    >
                        <Divider orientation="vertical" style={{ backgroundColor: 'white', height: '55px' }} />

                        {branches.map((branch, index) => (
                            <Grid
                                key={index} item
                                sx={{ color: selectedId === index ? '#f18035' : 'inherit', }}
                                onClick={() => handleClick(index)}
                            >
                                <Box sx={{
                                    width: 60, height: 50, cursor: "pointer",
                                    marginTop: selectedId === index ? "-20px" : "0px"
                                }}>
                                    <span class="icon-store"
                                        style={{
                                            fontSize: selectedId === index ? 46 : 35,
                                            background: selectedId === index ? 'linear-gradient(to right, #F8A812, #CF7205)' : 'transparent',
                                            WebkitBackgroundClip: selectedId === index ? 'text' : 'unset',
                                            WebkitTextFillColor: selectedId === index ? 'transparent' : '#ffffff',
                                            color: selectedId === index ? 'inherit' : '#ffffff',
                                        }}
                                    >
                                    </span>
                                    <Typography
                                        sx={{ fontSize: selectedId === index ? "11px" : "9px", color: selectedId === index ? '#f18035' : 'white', textAlign: "center" }}>
                                        {branch}
                                    </Typography>
                                </Box>

                            </Grid>
                        ))}

                        <Divider orientation="vertical" style={{ backgroundColor: 'white', height: '55px' }} />

                    </Grid>

                </TextOverlay>

                <Box sx={{ zIndex: 2 , marginTop:'auto' }}>
                    <Box sx={{
                        zIndex: "4", display: "flex", justifyContent: "space-between", padding: "20px",
                        alignItems: "center", width: "90%", bottom: "0"
                    }}  >
                        <Box >
                            <img src="/assets/qtapwhite.svg" alt="logo Qtap" style={{ width: "85px" }} />
                        </Box>

                        <Box>
                            <Button
                                startIcon={<ModeCommentIcon sx={{ color: "#f47b2a" }} />}
                                style={{
                                    color: "white",
                                    textTransform: "capitalize", fontSize: "11px",
                                }} >
                                {t("help")}
                            </Button>
                        </Box>
                    </Box>
                </Box>

            </ImageContainer>
        </Grid >

    );
};