import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';

import { Cart1 } from './Cart1';
import Cart2 from './Cart2';
import { Cart3 } from './Cart3';

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Cart4 } from './Cart4';
import { useTranslation } from 'react-i18next';

export const Row1 = () => {
    const {t} = useTranslation();
    return (
        <Box sx={{ flexGrow: 1, padding: '0px 20px 20px 20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                    <Card sx={{ borderRadius: '20px' }}>
                        <CardContent>
                            <Box display={"flex"} justifyContent={"space-between"}>
                                <Typography variant="subtitle1" color="#575756">{t("client")}</Typography>
                                <PersonAddAlt1OutlinedIcon sx={{ color: "#D8E0E0 ",fontSize: '27px' }} />
                            </Box>
                            <Typography variant="body2" sx={{ color:"#ef7d00" ,fontSize:"20px"}}>1.234</Typography>

                            <Cart1 /> 
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <Card sx={{ borderRadius: '20px' }}>
                        <CardContent>
                            <Box display={"flex"} justifyContent={"space-between"}>
                                <Typography variant="subtitle1" color="text.secondary">{t("totalOrders")}</Typography>
                                <span class="icon-shopping-bag" style={{color:"#D8E0E0",fontSize:"22px"}}></span>
                            </Box >
                            <Typography  variant="body2" sx={{ color:"#ef7d00" ,fontSize:"20px"}}>5.564</Typography>

                            <Cart2 />
                            
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <Card sx={{ borderRadius: '20px' }}>
                        <CardContent>
                            <Box display={"flex"} justifyContent={"space-between"}>
                                <Typography variant="subtitle1" color="text.secondary">{t("affiliateUsers")}</Typography>
                                <span class="icon-social" style={{color:"#D8E0E0",fontSize:"22px"}}></span>
                            </Box >
                            <Typography  variant="body2" sx={{ color:"#ef7d00" ,fontSize:"20px"}}>5.564</Typography>
                            <Cart3 />

                        </CardContent>
                    </Card>
                </Grid>


                <Grid item xs={12} sm={3}>
                    <Card sx={{ borderRadius: '20px' }}>
                        <CardContent>
                            <Box display={"flex"} justifyContent={"space-between"}>
                                <Typography variant="subtitle1" color="text.secondary">{t("performance")}</Typography>
                                <TrendingUpIcon sx={{ color: "#d4d0d0 ", padding: "3px", fontSize: '23px', border: "1px solid #d4d0d0", borderRadius: "6px" }} />
                            </Box>
                            <Cart4/> 
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </Box>
    )
}