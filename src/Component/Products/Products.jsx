import { Button, Grid, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import DoneIcon from '@mui/icons-material/Done';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
const Divider = styled(Box)({
    width: '5%',
    height: '3px',
    backgroundColor: '#E57C00',
    borderRadius: "20px",
    marginBottom: "20px"
});

export const Products = () => {
    const navigate = useNavigate();
    const [isSelected, setIsSelected] = useState(false);
    const { t } = useTranslation()
    const handleCardClick = () => {
        setIsSelected(!isSelected);
    };

    const handleNextClick = () => {
        if (isSelected) {
            navigate('/business-info');
        } else {
            toast.error(t("plSelectProduct"));
        }
    };
    return (
        <Box marginTop={"50px"} flexGrow={1}>
            <Typography variant="body1" sx={{ fontSize: "18px", color: "#222240" }}>
                {t("selectProduct")}
            </Typography>
            <Divider />

            <Box onClick={handleCardClick}
                sx={{
                    position: 'relative',
                    width: "110px", height: "200px",
                    backgroundImage: "url(/images/card.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    borderRadius: "10px", margin: "30px", padding: "20px",
                    overflow: "hidden"
                }}>
                {isSelected && (
                    <DoneIcon
                        sx={{
                            color: "#E57C00",
                            fontSize: "26px",
                            position: "relative",
                            top: "-10px",
                            right: "-15px",
                            float: "right",
                        }}
                    />
                )}
                <span class="icon-waiter" style={{ color: "white", fontSize: "30px" }}></span>
                <Typography sx={{ fontSize: "18px", color: "white" }}>{t("digitalMenu")}</Typography>
                <span class="icon-waiter" style={{ color: "white", fontSize: "140px", opacity: .1, position: "absolute", top: "58%", left: '38%' }}></span>
            </Box>

            <Grid item xs={12}>
                <Button
                    variant="contained"
                    sx={{
                        width: '20%',
                        fontSize: "13px",
                        borderRadius: '50px',
                        backgroundColor: "#E57C00",
                        textTransform: 'none',
                        padding: "6px 0",
                        position: "fixed", bottom: "30px",
                        left: "55%",
                        '&:hover': {
                            backgroundColor: "#E57C00",
                        },
                        color: "#fff"
                    }}
                    onClick={handleNextClick}
                >
                    {t("next")}
                    <TrendingFlatIcon sx={{ marginLeft: "8px", fontSize: "18px" }} />
                </Button>
            </Grid>
        </Box>
    )
}
