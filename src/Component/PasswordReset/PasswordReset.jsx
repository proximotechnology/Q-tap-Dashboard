import { Box, Button, FormControl, IconButton, InputAdornment, OutlinedInput, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useTranslation } from 'react-i18next';


export const PasswordReset = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { t } = useTranslation();
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    const navigate = useNavigate();
    const theme = useTheme()

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{
                padding: 2,
            }}  >
            <Typography variant="body2"
                sx={{
                    fontSize: "13px", color: "#222240", margin: "50px 0px 8px 0px", letterSpacing: "12px",
                    fontFamily: "serif"
                }}>
                {t("resetPassword")}
            </Typography>


            <Box
                sx={{
                    borderBottom: "3px solid #E57C00",
                    width: { lg: "88%", md: "50%", xs: "50%" },
                    marginBottom: 5
                }}
            />

            <Typography variant="body1" sx={{ color: "#AAAAAA", width: "58%", marginBottom: 4, fontSize: "12px", textAlign: 'center' }}>
                {t("enterResetPass")}
            </Typography>


            <Box display="flex" flexDirection="column" alignItems="center"
                sx={{ justifyContent: 'center', width: "95%" }}>

                <FormControl sx={{ width: '100%' }} variant="outlined">
                    <OutlinedInput
                        id="new-password"
                        type={showPassword ? 'text' : 'password'}
                        startAdornment={
                            <InputAdornment position="start">
                                <span class="icon-padlock" style={{ fontSize: "18px" }} />
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOffOutlinedIcon sx={{ fontSize: "18px" }} />
                                        :
                                        <span class="icon-show" style={{ fontSize: "16px" }}></span>
                                    }
                                </IconButton>
                            </InputAdornment>
                        }
                        placeholder={t("newPassword")}
                        sx={{ fontSize: "10px", borderRadius: '50px', paddingRight: 3, height: "35px", marginBottom: "10px" }}
                    />
                </FormControl>

                <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                    <OutlinedInput
                        id="confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        startAdornment={
                            <InputAdornment position="start">
                                <span class="icon-padlock" style={{ fontSize: "18px" }} />
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOffOutlinedIcon sx={{ fontSize: "18px" }} />
                                        :
                                        <span class="icon-show" style={{ fontSize: "16px" }}></span>
                                    }
                                </IconButton>
                            </InputAdornment>
                        }
                        placeholder={t("confirmPass")}
                        sx={{ borderRadius: '50px', paddingRight: 3, height: "35px", fontSize: "10px" }}
                    />
                </FormControl>

                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        mt: 3,
                        maxWidth: 400,
                        borderRadius: '50px',
                        backgroundColor: theme.palette.bluePrimary.main,
                        textTransform: 'none', fontSize: "12px", height: "35px",

                        '&:hover': {
                            backgroundColor: "#222240",
                        },
                        color: "#fff"
                    }}
                    onClick={() => navigate('/')}
                >
                    {t("save")}
                </Button>
            </Box>
        </Box>


    )

}
