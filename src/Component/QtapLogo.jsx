import React from 'react'

import { Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';


const ImageContainer = styled(Box)({
    backgroundImage: 'url(/images/Qtop1.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
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
    textAlign: 'left',
    color: 'white',
    padding: '20px',
});
const Divider = styled(Box)({
    width: '18%',
    height: '4px',
    backgroundColor: '#ef7d00',
    margin: '40px 0px 20px 0px',
    borderRadius: "20px"

});
const QtapLogo = () => {

    return (

        <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
            <ImageContainer>
                    <ChevronLeftOutlinedIcon sx={{ position:"absolute",top:"40px",left:"10%",color: "white", fontSize: "33px", zIndex: "8" }} />
                <TextOverlay sx={{ width: "80%" }}>

                    <Typography variant="h1" sx={{ width: "80%", fontSize: "27px", fontWeight: "500", wordSpacing: "3px" }}>
                        Your Business in your pocket now .
                    </Typography>


                    <Divider />
                    <Typography variant="body1" sx={{ fontSize: "11px", width: "70%",color:"#F1F2F2" }} >
                    Create a Smart menu Suitable for any type of business, Engage more with your customers. Create a Smart menu Suitable for any type of business, Engage more with your customers. Create a Smart menu Suitable for any type of business, Engage more with your customers. 
                    </Typography>
                </TextOverlay>

            </ImageContainer>
        </Grid>

    )
}

export default QtapLogo;