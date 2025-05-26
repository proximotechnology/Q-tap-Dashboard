import React, { useState } from 'react'
import { Box, Typography, useTheme, } from '@mui/material';
import { SignUpPage } from './signup/SignUPage';
import { LoginPage } from './login/LoginPage';
import { useTranslation } from 'react-i18next';

const QtapHome = () => {
    const [selectedTab, setSelectedTab] = useState(
        sessionStorage.getItem('affiliate_code') ? 'signup' : 'login'
    );
    const theme = useTheme();
    const { t } = useTranslation();

    const params = new URLSearchParams(window.location.search);

    // هل هناك أي باراميتر في الرابط؟
    if (params.has("affiliate_code")) {
        const value = params.get("affiliate_code");

        // خزّن القيمة تحت نفس الاسم
        sessionStorage.setItem("affiliate_code", value);
    } else {
        // إذا لم يوجد باراميتر affiliate_code → احذفه من sessionStorage
        sessionStorage.removeItem("affiliate_code");
    }




    return (
        <Box>


            <Box display="flex" justifyContent="center" >
                <img src="/assets/qtap.svg" alt="logo Qtap" style={{ width: "250px", height: "40px" }} />
            </Box>

            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                sx={{ margin: selectedTab === 'login' ? "60px 0px 50px 0px" : "10px 0px  60px 0px" }}

            >
                <Box
                    component="div"
                    sx={{
                        width: "30%",
                        textDecoration: 'none',
                    }}
                    onClick={() => setSelectedTab('login')}
                >
                    <Typography
                        variant="body1"
                        sx={{
                            borderBottom: selectedTab === 'login' ? `3px solid ${theme.palette.orangePrimary.main}` : "none",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "11px",
                            color: theme.palette.text.fixedBlack,
                            paddingBottom: "10px",
                            cursor: "pointer",
                        }}
                    >
                        {t("logIn")}
                    </Typography>
                </Box>

                <Box
                    component="div"
                    sx={{
                        width: "30%",
                        textDecoration: 'none',
                    }}
                    onClick={() => setSelectedTab('signup')}
                >
                    <Typography
                        variant="body1"
                        sx={{
                            borderBottom: selectedTab === 'signup' ? `3px solid ${theme.palette.orangePrimary.main}` : "none",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "11px",
                            color: theme.palette.text.fixedBlack,
                            paddingBottom: "10px",
                            cursor: "pointer",
                        }}
                    >

                        {t("signUp")}
                    </Typography>
                </Box>
            </Box>

            <Box >
                        
                {selectedTab === 'login' && <LoginPage />}
                {selectedTab === 'signup' && <SignUpPage />}

            </Box>

        </Box>
    );
};



export default QtapHome; 