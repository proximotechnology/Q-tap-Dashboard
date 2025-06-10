import React from 'react'

import { Grid, Typography, Box, Button } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import { useTranslation } from 'react-i18next';


/* 2 backgroundColor


text 
:theme.palette.text.fixedWhite
*/
const QtapLogo = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const ImageContainer = styled(Box)({
        backgroundImage: 'url(/images/Qtop1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: "100%",
        display: 'flex',
        justifyContent: 'center',
        height: "100vh",
        alignItems: 'center',
        position: 'relative',
        borderRadius: "0% 8% 8% 0% ",
        '::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 1,
            borderRadius: "0% 8% 8% 0% ",
        },
    });
    const TextOverlay = styled(Box)({
        position: 'absolute',
        zIndex: 2,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'start',
        color: theme.palette.text.fixedWhite,
        padding: '20px',
    });
    const Divider = styled(Box)({
        width: '18%',
        height: '4px',
        backgroundColor: theme.palette.orangePrimary.main,
        margin: '40px 0px 20px 0px',
        borderRadius: "20px"

    });

    return (


        <ImageContainer sx={{ position: 'relative', height: '100%', minHeight: '100vh' }}>

            <Button
                disableRipple
                sx={{
                    position: "absolute", top: "40px", left: "10%", color: theme.palette.text.fixedWhite, zIndex: "8",
                    '&:hover': {
                        backgroundColor: 'transparent', // Removes default hover bg
                        color: theme.palette.text.orange, // Replace with desired hover color (e.g., "#ff0000")
                    },
                }}
                onClick={() => {
                    window.location.href = "https://qutap.co/";
                }} >
                <ChevronLeftOutlinedIcon sx={{ fontSize: "33px", }} />
            </Button>
            <TextOverlay sx={{ width: "80%" }}>

                <Typography variant="h1" sx={{ width: "80%", fontSize: "29px", fontWeight: "600", wordSpacing: "3px" }}>
                    {t("qtapLogoPageTitle")}
                </Typography>


                <Divider />
                <Typography variant="body1" sx={{ fontSize: "11px", width: "70%", color: `${theme.palette.text.fixedWhite} !important` }} >
                    {t("qtapLogoPageParagraph")}
                </Typography>
            </TextOverlay>

        </ImageContainer>


    )
}

export default QtapLogo;