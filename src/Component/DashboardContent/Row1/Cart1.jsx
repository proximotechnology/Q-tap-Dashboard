import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell } from 'recharts';

const data01 = [{ name: 'Free', value: 50 }, { name: 'Remaining', value: 50 }];
const data02 = [{ name: 'Starter', value: 25 }, { name: 'Remaining', value: 75 }];
const data03 = [{ name: 'Pro', value: 10 }, { name: 'Remaining', value: 90 }];

const COLORS = ['#ef7d00', '#AD4181', '#2EA6F7'];

export const Cart1 = () => {
    const { t } = useTranslation();
    return (
        <>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Box sx={{ display: "flex" }}>
                    {/* First Pie Chart - Free */}
                    <PieChart width={70} height={70}>
                        <defs>
                            <linearGradient id="gradientFree" x1="0" y1="0" x2="100%" y2="0">
                                <stop offset="0%" stopColor="rgb(255, 194, 133)" />
                                <stop offset="100%" stopColor="#ef7d00" /> {/* Lighter shade of orange */}
                            </linearGradient>
                        </defs>
                        <Pie
                            data={data01}
                            cx={35}
                            cy={35}
                            innerRadius={20}
                            outerRadius={30}
                            fill="#D8E0E0"
                            paddingAngle={0}
                        >
                            <Cell fill="url(#gradientFree)" />
                            <Cell fill="#D8E0E0" />
                        </Pie>
                        <text
                            x={40}
                            y={42}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#ef7d00"
                            fontSize="13"
                        >
                            {data01[0].value}%
                        </text>
                    </PieChart>

                    {/* Second Pie Chart - Starter */}
                    <PieChart width={70} height={70}>
                        <defs>
                            <linearGradient id="gradientStarter" x1="0" y1="0" x2="100%" y2="0">
                                <stop offset="0%" stopColor="rgb(255, 174, 216)" />
                                <stop offset="100%" stopColor="#AD4181" /> {/* Lighter shade of purple */}
                            </linearGradient>
                        </defs>
                        <Pie
                            data={data02}
                            cx={35}
                            cy={35}
                            innerRadius={20}
                            outerRadius={30}
                            fill="#D8E0E0"
                            paddingAngle={0}
                        >
                            <Cell fill="url(#gradientStarter)" />
                            <Cell fill="#D8E0E0" />
                        </Pie>
                        <text
                            x={40}
                            y={42}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#AD4181"
                            fontSize="13"
                        >
                            {data02[0].value}%
                        </text>
                    </PieChart>

                    {/* Third Pie Chart - Pro */}
                    <PieChart width={70} height={70}>
                        <defs>
                            <linearGradient id="gradientPro" x1="0" y1="0" x2="100%" y2="0">
                                <stop offset="0%" stopColor="rgb(170, 214, 243)" />
                                <stop offset="100%" stopColor="#2EA6F7" /> {/* Lighter shade of blue */}
                            </linearGradient>
                        </defs>
                        <Pie
                            data={data03}
                            cx={35}
                            cy={35}
                            innerRadius={20}
                            outerRadius={30}
                            fill="#D8E0E0"
                            paddingAngle={0}
                        >
                            <Cell fill="url(#gradientPro)" />
                            <Cell fill="#D8E0E0" />
                        </Pie>
                        <text
                            x={40}
                            y={42}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#2EA6F7"
                            fontSize="13"
                        >
                            {data03[0].value}%
                        </text>
                    </PieChart>
                </Box>
            </Box>

            <Box marginTop="6px" justifyContent="left" sx={{ paddingLeft: "20px" }}>
                <Box display="flex" textAlign="center" alignItems="center">
                    <Box
                        component="span"
                        sx={{
                            background: 'linear-gradient(to right, #ef7d00,rgb(248, 203, 158))',
                            width: '15px',
                            borderRadius: "20px",
                            height: '6px',
                            display: 'inline-block',
                            marginRight: '8px'
                        }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "9px" }}>
                        {t("free")}
                    </Typography>
                </Box>

                <Box display="flex" textAlign="center" alignItems="center">
                    <Box
                        component="span"
                        sx={{
                            background: 'linear-gradient(to right, #AD4181,rgb(255, 174, 216))',
                            width: '15px',
                            borderRadius: "20px",
                            height: '6px',
                            display: 'inline-block',
                            marginRight: '8px'
                        }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "9px" }}>
                        {t("starter")}
                    </Typography>
                </Box>

                <Box display="flex" textAlign="center" alignItems="center">
                    <Box
                        component="span"
                        sx={{
                            background: 'linear-gradient(to right, #2EA6F7,rgb(170, 214, 243))',
                            width: '15px',
                            borderRadius: "20px",
                            height: '6px',
                            display: 'inline-block',
                            marginRight: '8px'
                        }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "9px" }}>
                        {t("pro")}
                    </Typography>
                </Box>
            </Box>
        </>
    );
};