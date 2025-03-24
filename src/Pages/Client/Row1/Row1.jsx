import React from 'react';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { Paper, Typography, Box } from '@mui/material';
import { PieChart, Pie, Cell } from 'recharts';
import { useTranslation } from 'react-i18next';

const data01 = [{ name: 'Free', value: 50 }, { name: 'Remaining', value: 50 }];
const data02 = [{ name: 'Starter', value: 25 }, { name: 'Remaining', value: 75 }];
const data03 = [{ name: 'Pro', value: 10 }, { name: 'Remaining', value: 90 }];

const COLORS = ['#ef7d00', '#AD4181', '#2EA6F7'];



export const Row1 = () => {
    const {t} = useTranslation()

    return (
        <Box sx={{ padding: "0 20px" }}>
            <Paper elevation={3} sx={{ padding: "20px 40px", borderRadius: 5 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography variant="h6" color="#575756" fontSize="17px"
                            display={"flex"} textAlign={"center"} alignItems={"center"}>
                            <Box component="span">
                                <PersonAddAltOutlinedIcon sx={{ marginRight: 1, fontSize: "35px", color: "#D8E0E0" }} />
                            </Box>
                            {t("client")}
                        </Typography>

                        <Typography variant="h3" sx={{ fontSize: "28px", color: "#E57C00", marginLeft: "40px" }}>
                            1.234
                        </Typography>
                    </Box>


                    <Box display={"flex"} justifyContent="center" alignItems="center">
                        <Box sx={{ display: "flex" }} gap={2}>
                            <PieChart width={110} height={110}>
                                <defs>
                                    <linearGradient id="gradientFree" x1="0" y1="0" x2="100%" y2="0">
                                        <stop offset="0%" stopColor="rgb(255, 194, 133)" />
                                        <stop offset="100%" stopColor="#ef7d00" /> {/* Lighter shade of orange */}
                                    </linearGradient>
                                </defs>
                                <Pie
                                    data={data01}
                                    cx={50}
                                    cy={50}
                                    innerRadius={33}
                                    outerRadius={48}
                                    fill="#D8E0E0"
                                    paddingAngle={0}
                                >
                                    <Cell fill="url(#gradientFree)" />
                                    <Cell fill="#D8E0E0" />
                                </Pie>
                                <text x={55} y={57} textAnchor="middle" dominantBaseline="middle" fill={COLORS[0]} fontSize="18">{data01[0].value}%</text>
                            </PieChart>

                            <PieChart width={110} height={110}>
                                <defs>
                                    <linearGradient id="gradientStarter" x1="0" y1="0" x2="100%" y2="0">
                                        <stop offset="0%" stopColor="rgb(255, 174, 216)" />
                                        <stop offset="100%" stopColor="#AD4181" /> {/* Lighter shade of purple */}
                                    </linearGradient>
                                </defs>
                                <Pie
                                    data={data02}
                                    cx={50}
                                    cy={50}
                                    innerRadius={33}
                                    outerRadius={48}
                                    fill="#D8E0E0"
                                    paddingAngle={0}
                                >
                                    <Cell fill={`url(#gradientStarter)`} />
                                    <Cell fill="#d3d3d3" />
                                </Pie>
                                <text x={55} y={57} textAnchor="middle" dominantBaseline="middle" fill={COLORS[1]} fontSize="18">{data02[0].value}%</text>
                            </PieChart>

                            <PieChart width={110} height={110}>
                                <defs>
                                    <linearGradient id="gradientPro" x1="0" y1="0" x2="100%" y2="0">
                                        <stop offset="0%" stopColor="rgb(170, 214, 243)" />
                                        <stop offset="100%" stopColor="#2EA6F7" /> {/* Lighter shade of blue */}
                                    </linearGradient>
                                </defs>
                                <Pie
                                    data={data03}
                                    cx={50}
                                    cy={50}
                                    innerRadius={33}
                                    outerRadius={48}
                                    fill="#D8E0E0"
                                    paddingAngle={0}
                                >
                                    <Cell fill={`url(#gradientPro)`} />
                                    <Cell fill="#d3d3d3" />
                                </Pie>
                                <text x={55} y={57} textAnchor="middle" dominantBaseline="middle" fill={COLORS[2]} fontSize="18">{data03[0].value}%</text>
                            </PieChart>
                        </Box>
                    </Box>

                    <Box sx={{ marginRight: "70px" }}>
                        <Box display={"flex"} textAlign={"center"} alignItems={"center"} >
                            <Box component="span" sx={{
                                background: 'linear-gradient(to right, #ef7d00,rgb(248, 203, 158))',
                                width: '22px', borderRadius: "20px", height: '10px', display: 'inline-block', marginRight: '8px'
                            }} />
                            <Typography variant="body2" sx={{ fontSize: "10px", color: "gray" }}>{t("free")}</Typography>
                        </Box>


                        <Box display={"flex"} textAlign={"center"} alignItems={"center"} margin={"4px 0px"}>
                            <Box component="span" sx={{
                                background: 'linear-gradient(to right, #AD4181,rgb(255, 174, 216))',
                                width: '22px', borderRadius: "20px", height: '10px', display: 'inline-block', marginRight: '8px'
                            }} />
                            <Typography variant="body2" sx={{ fontSize: "10px", color: "gray" }}>{t("starter")}</Typography>
                        </Box>

                        <Box display={"flex"} textAlign={"center"} alignItems={"center"}>
                            <Box component="span" sx={{
                                background: 'linear-gradient(to right, #2EA6F7,rgb(170, 214, 243))',
                                width: '22px', borderRadius: "20px", height: '10px', display: 'inline-block', marginRight: '8px'
                            }} />
                            <Typography variant="body2" sx={{ fontSize: "10px", color: "gray" }}>{t("pro")}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}
