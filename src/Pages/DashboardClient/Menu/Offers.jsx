import React, { useState } from 'react';
import { Box, Typography, Card, CardMedia } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Slider from "react-slick"; 
import { offersData } from './data/offersData';
import "slick-carousel/slick/slick.css";  
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from 'react-i18next';

const OfferCard = ({ offer }) => (
    <Card sx={{
        cursor: "pointer",
        display: 'flex',
        width: "88%", 
        borderRadius: '0px 10px 10px 10px',
        padding: '10px',
        alignItems: 'center',
        maxWidth: 340,
        position: 'relative',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: "#fff",
        justifyContent: 'space-between'
    }}>
        <CardMedia
            component="img"
            image={offer.image}
            alt={offer.name}
            sx={{
                width: 100,
                height: 100,
                borderRadius: '10px',
                objectFit: 'cover'
            }}
        />
        <Box sx={{ flex: 1, padding: "0px 10px", marginTop: "10px" }}>
            <Box
                sx={{
                    backgroundColor: '#222240',
                    color: 'white',
                    padding: '5px',
                    borderRadius: '10%',
                    width: '40px',
                    height: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: '0px',
                    right: '-10px'
                }}
            >
                <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>{offer.discount}
                    <span style={{ color: '#ef7d00' }}>%</span>
                </Typography>
            </Box>
            <Typography variant="h1" sx={{ fontSize: "12px", fontWeight: "900", color: "#575756" }}>
                {offer.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ fontSize: "9px", mb: 1, marginTop: "5px" }}>
                {offer.description}
            </Typography>
            <Box sx={{ marginTop: "15px", display: "flex", justifyContent: "space-between" }}>
                <Box>
                    <Typography variant="h6" sx={{ color: "gray", padding: "0", fontSize: "9px", textDecoration: 'line-through' }}>
                        <span style={{ color: "#ef7d00", fontWeight: "bold", fontSize: "10px" }}>{offer.oldPrice} </span>
                        <span>EGP</span>
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: "12px", fontWeight: 'bold', color: '#ef7d00' }}>
                        {offer.newPrice} <span style={{ color: "gray", fontSize: "8px" }}>EGP</span>
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: "10px", height: "10px",
                        backgroundColor: '#ef7d00',
                        color: 'white',
                        borderRadius: '50%',
                        padding: "6px",
                        marginTop: "10px",
                        display: "flex",
                        cursor: "pointer",
                        textAlign: "center", justifyContent: "center", alignItems: "center"
                    }}>
                    <AddIcon sx={{ fontSize: "13px" }} />
                </Box>
            </Box>
        </Box>
    </Card>
);

const Offers = ({ isItemSelected }) => {
    const [activeSlide, setActiveSlide] = useState(0); 

    const settings = {
        dots: true,  
        infinite: true,
        speed: 500,
        slidesToShow: isItemSelected ? 3 : 4,
        slidesToScroll: 1,  
        arrows: false,  
        beforeChange: (current, next) => setActiveSlide(next),  
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: isItemSelected ? 3 : 4,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                }
            }
        ],
        appendDots: dots => (
            <div>
                <ul style={{
                    margin: "0px", 
                    padding: "0px", 
                    display: "flex", 
                    justifyContent: "center",
                }}> 
                    {dots.slice(0, 3)}
                </ul>
            </div>
        ),
        customPaging: i => (
            <div
                style={{
                    width: "9px",
                    height:"9px",
                    borderRadius: "50%",
                    backgroundColor: i === activeSlide ? "#ef7d00" : "#d3d3d3",   
                    margin: "15px 0px",
                    cursor: "pointer",
                }}
            />
        ),
        
    };

    const { t } = useTranslation();
    return (
        <Box sx={{ padding: '0px 15px', marginTop: "15px" ,width:isItemSelected ?"75%":"100%" , transition: 'width 0.1s ease',
        position:"relative" , left:"2%"}}>
            <Typography variant='h5'
                sx={{ fontSize: "15px", fontWeight: "bold", marginBottom: "20px", color: "#575756" }}>
                <span style={{ padding: "2px 0px", borderBottom: "2px solid #ef7d00", }}>{t("special")}</span> {t("offers")}
            </Typography>

            <Slider {...settings}>
                {offersData.map((offer) => (
                    <OfferCard key={offer.id} offer={offer} />
                ))}
            </Slider>
        </Box>
    );
};

export default Offers;
