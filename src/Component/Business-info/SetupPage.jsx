import { Box, Grid, styled, Typography, useTheme } from '@mui/material'
import React from 'react'
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

const ImageContainer = styled(Box)({
    backgroundImage: 'url(/images/setup.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',

    '::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1,

    },
});

const TextOverlay = styled(Box)({
    position: 'absolute',
    zIndex: 2,
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'left',
    color: 'white',
    padding: '20px',
});


const Divider = styled(Box)({
    width: '18%',
    height: '3px',
    backgroundColor: ' #ffffff;',
    borderRadius: "20px"

});

export const SetupPage = () => {
    const theme = useTheme()
    const navigate = useNavigate();
    const {t} = useTranslation()

    return (

        <Grid container item xs={12} md={4} >
            <ImageContainer sx={{ width: '90%' }} >
                <ChevronLeftOutlinedIcon onClick={() => navigate('/')}
                    sx={{ position: "absolute", top: "40px", left: "10%", color: "white", fontSize: "33px", zIndex: "8" }} />

                <TextOverlay sx={{ width: { xs: "90%", sm: "75%", md: "60%" }, margin: "0 auto" }}>

                    <Typography variant="body1" sx={{
                        fontSize: "33px",
                        color: theme.palette.orangePrimary.main
                    }}>
                        {t("setup")}
                    </Typography>
                    <Divider />
                    <Typography sx={{ fontSize: "11px", color: '#F1F2F2', marginTop: 4 }}>
                        {t("lorm")}
                    </Typography>
                </TextOverlay>

                <Box sx={{position: "absolute", bottom: "30px", left: "10%", zIndex: "8"}}>
                    <img src="/assets/qtapwhite.svg" alt="logo setup" style={{width:"90px" ,height:"25px"}} />
                </Box>
            </ImageContainer>
        </Grid>


    )
}
