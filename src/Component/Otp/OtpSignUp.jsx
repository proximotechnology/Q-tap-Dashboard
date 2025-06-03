import React, { useState } from 'react';
import { Box, Button, IconButton, Typography, TextField } from "@mui/material";
import { styled, useTheme } from '@mui/system';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookF, faXTwitter, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from 'react-i18next';
import Language from '../dashboard/TopBar/Language';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import axios from 'axios';
import { toast } from 'react-toastify';
import {BASE_URL} from '../../utils/constants'
export const OtpSignUp = () => {
    const theme = useTheme();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const Divider2 = styled(Box)({
        width: '20%',
        height: '5px',
        backgroundColor: theme.palette.orangePrimary.main,
        borderRadius: "20px",
        display: "flex",
        margin: "0 auto",
    });

    const handleOtpSubmit = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.post(`${BASE_URL}verfiy_email`, {
                otp,
                user_type: "qtap_clients"
            });
            if (response.data.status === true) {
                toast.success(response.data.message);
                navigate('/welcome');
            } else {
                setError(t('invalidOtp'));
                toast.error(t('invalidOtp'));
            }
        } catch (err) {
            setError(t('otpVerificationFailed'));
            toast.error(t('otpVerificationFailed'));
            console.error('OTP verification error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative",
            }}
        >
            <Box
                sx={{
                    color: theme.palette.text.primary,
                    textAlign: "center",
                    zIndex: 1,
                    width: "300px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <img src="/assets/qtap.svg" alt="qtap" style={{ width: "200px", height: "60px", marginBottom: "10px" }} />

                <Divider2 my={10} />

                <Typography variant="h6" sx={{ fontSize: "16px", mb: 3, mt: 10 }}>
                    {t("verifyEmail")}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: 'column', alignItems: "center", width: "100%" }}>
                    <TextField
                        variant="outlined"
                        placeholder={t("enterOtp")}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        sx={{
                            mb: 2,
                            width: "100%",
                            '& .MuiInputBase-input': {
                                color: theme.palette.text.primary,
                                backgroundColor: ' white',
                                opacity:.8, 
                                border:'none',
                                borderRadius:"10px"
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.grey[300],
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.orangePrimary.main,
                            },
                            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.orangePrimary.main,
                            },
                            // Change label color on focus
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: theme.palette.orangePrimary.main,
                            },
                        }}
                        inputProps={{
                            style: { textAlign: 'center' },
                            maxLength: 6,
                        }}
                    />

                    {error && (
                        <Typography variant="body2" sx={{ color: 'red', mb: 2 }}>
                            {error}
                        </Typography>
                    )}

                    <Button
                        variant="contained"
                        onClick={handleOtpSubmit}
                        disabled={loading || otp.length !== 6}
                        sx={{
                            width: "100%",
                            mb: 3,
                            backgroundColor: theme.palette.orangePrimary.main,
                            '&:hover': {
                                backgroundColor: theme.palette.orangePrimary.main,
                            },
                            '&.Mui-disabled': {
                                backgroundColor: theme.palette.orangePrimary.main,
                                opacity: 0.6,
                            },
                        }}
                    >
                        {loading ? t("verifying") : t("verify")}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};