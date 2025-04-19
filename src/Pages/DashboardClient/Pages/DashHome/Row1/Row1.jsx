import React from "react";
import { Card, CardContent, Typography, Grid, Box, useTheme } from "@mui/material";

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Chart1 from './Chart1';
import { Chart2 } from "./Chart2";
import { useTranslation } from "react-i18next";
import { Cart3 } from "./Cart3";

export default function Dashboard({ dashboardClientData }) {
    const { t } = useTranslation();
    const theme = useTheme();
    // console.log("Dashboard dataaa:", dashboardClientData);

    return (
        <Grid container spacing={2} >

            <Grid item xs={12} md={6} >
                <Card sx={{ padding: "0px 10px", borderRadius: '20px', height: "230px" }}>
                    <CardContent>
                        <Box display={"flex"} justifyContent={"space-between"}>
                            <Typography variant="subtitle1" color="text.secondary">{t("totalOrders")}</Typography>
                            <span class="icon-shopping-bag" style={{ color: "#D8E0E0", fontSize: "25px" }}></span>
                        </Box >
                        <Typography variant="body2" sx={{ color: theme.palette.orangePrimary.main, fontSize: "20px" }}>{dashboardClientData?.total_orders}</Typography>

                        <Chart1 dashboardClientData={dashboardClientData} />
                    </CardContent>
                </Card>
            </Grid>

            {/* Card 2: Customers */}
            <Grid item xs={12} md={3}>
                <Card sx={{ padding: "0px 10px", borderRadius: '20px', height: "230px" }}>
                    <CardContent>
                        <Box display={"flex"} justifyContent={"space-between"}>
                            <Typography variant="subtitle1" color="text.secondary">{t("customersVisit")}</Typography>
                            <span class="icon-show" style={{ color: "#D8E0E0", fontSize: "25px" }}></span>
                        </Box >
                        <Typography variant="body2" sx={{ color: theme.palette.orangePrimary.main, fontSize: "20px" }}>{dashboardClientData?.Customers_Visits_count}</Typography>
                        <Chart2 dashboardClientData={dashboardClientData} />

                    </CardContent>
                </Card>
            </Grid>


            {/* Card 3: Performance */}
            <Grid item xs={12} md={3}>
                <Card sx={{ padding: "0px 10px", borderRadius: '20px', height: "230px" }}>
                    <CardContent>
                        <Box display={"flex"} justifyContent={"space-between"}>
                            <Typography variant="subtitle1" color="text.secondary">{t("performance")}</Typography>
                            <TrendingUpIcon sx={{ color: "#d4d0d0 ", padding: "3px", fontSize: '23px', border: "1px solid #d4d0d0", borderRadius: "6px" }} />
                        </Box>
                        <Cart3 dashboardClientData={dashboardClientData} />
                    </CardContent>
                </Card>
            </Grid>

        </Grid>
    );
}
