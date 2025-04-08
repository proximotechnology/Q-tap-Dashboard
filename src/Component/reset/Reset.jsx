import { Box, Button, InputAdornment, TextField, Typography, useTheme } from '@mui/material'
import React from 'react'

import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';


export const Reset = () => {
    const navigate = useNavigate();
    const theme = useTheme()

    const { t } = useTranslation();
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{
                padding: 2,
            }}
        >

            <Typography variant="body2"
                sx={{
                    fontSize: "13px", color: theme.palette.secondaryColor.main, margin: "50px 0px 8px 0px", letterSpacing: "12px",
                    fontFamily: "serif"
                }}>
                {t("resetPassword")}
            </Typography>

            <Box
                sx={{
                    borderBottom: "3px solid #E57C00",
                    width: { lg: "85%", md: "50%", xs: "50%" },
                    marginBottom: 5
                }}
            />


            <Typography variant="body1" sx={{ color: "#AAAAAA", width: "58%", marginBottom: 4, fontSize: "12px", textAlign: 'center' }}>
                {t("resetPassReciveInstructions")}
            </Typography>

            <TextField
                variant="outlined"
                placeholder={t("email")}
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start" >
                            <MarkunreadOutlinedIcon sx={{ fontSize: "16px" }} />
                        </InputAdornment>
                    ),
                    sx: {
                        border: "1px solid gray",
                        height: "35px",
                        fontSize: "10px",
                        borderRadius: '50px',
                        '& fieldset': { border: 'none' },
                    }
                }}
                sx={{ marginBottom: 2, maxWidth: 400 }}
            />

            <Button
                variant="contained"
                fullWidth
                sx={{
                    maxWidth: 400,
                    borderRadius: '50px',
                    backgroundColor: theme.palette.bluePrimary.main,
                    textTransform: 'none',
                    padding: "8px 0", fontSize: "12px",
                    '&:hover': {
                        backgroundColor: theme.palette.secondaryColor.main,
                    },
                    color: "#fff"
                }}
                endIcon={<ArrowRightOutlinedIcon sx={{ color: "white", fontSize: "18px" }} />}
                onClick={() => navigate('/reset-password')}
            >
                {t("send")}
            </Button>
        </Box>
    )
}
