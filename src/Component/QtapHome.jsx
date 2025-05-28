import React, { useEffect, useState } from 'react'
import { Box, Typography, useTheme, } from '@mui/material';
import { SignUpPage } from './signup/SignUPage';
import { LoginPage } from './login/LoginPage';
import { useTranslation } from 'react-i18next';
import { BASE_URL } from '../utils/helperFunction';
import axios from 'axios';

const QtapHome = () => {
    const [selectedTab, setSelectedTab] = useState(
        sessionStorage.getItem('affiliate_code') ? 'signup' : 'login'
    );
    const theme = useTheme();
    const { t } = useTranslation();

    // const params = new URLSearchParams(window.location.search);

    // // هل هناك أي باراميتر في الرابط؟
    // if (params.has("affiliate_code")) {
    //     const value = params.get("affiliate_code");
    //     // خزّن القيمة تحت نفس الاسم
    //     sessionStorage.setItem("affiliate_code", value);
    // } else {
    //     console.log("dont save affiliate code")

    //     // إذا لم يوجد باراميتر affiliate_code → احذفه من sessionStorage
    //     sessionStorage.removeItem("affiliate_code");
    // }

useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.has("affiliate_code")) {
            console.log("send click")
            const code = params.get("affiliate_code");
            sessionStorage.setItem("affiliate_code", code);
            setSelectedTab('signup')
            
            // Check if we already reported this affiliate click
            const clickKey = `affiliate_clicked_${code}`;
            // sessionStorage.removeItem(clickKey)
            if (!sessionStorage.getItem(clickKey)) {
                        console.log("useeffect api")

                // Call API to increase count
                //https://api.qutap.co/api/home_affiliate/4RBNfeOt
                axios.get(`${BASE_URL}home_affiliate/${code}`)
                    .then((res) => {
                        sessionStorage.setItem(clickKey, 'true'); // Mark as reported
                        // console.log(res)
                    })
                    .catch((err) => {
                        console.error('Failed to report affiliate click:', err);
                    });
            }
        } else {
            console.log("dont save affiliate code");
        }
    }, [])


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