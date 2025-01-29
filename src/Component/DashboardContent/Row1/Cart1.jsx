
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { PieChart, Pie, Cell } from 'recharts';

const data01 = [{ name: 'Free', value: 50 }, { name: 'Remaining', value: 50 }];
const data02 = [{ name: 'Starter', value: 25 }, { name: 'Remaining', value: 75 }];
const data03 = [{ name: 'Pro', value: 10 }, { name: 'Remaining', value: 90 }];

const COLORS = ['#ef7d00', '#AD4181', '#2EA6F7'];

export const Cart1 = () => {
    return (
        <>
            <Box display={"flex"} justifyContent="center" alignItems="center" >
                <Box sx={{ display: "flex" }}>
                    <PieChart width={70} height={70}>
                        <Pie
                            data={data01}
                            cx={35}
                            cy={35}
                            innerRadius={20}
                            outerRadius={30}
                            fill="#D8E0E0"
                            paddingAngle={0}
                        >
                            <Cell fill={COLORS[0]} />
                            <Cell fill="#D8E0E0" />
                            <Cell fill="#d3d3d3" />
                        </Pie>
                        <text x={40} y={42} textAnchor="middle" dominantBaseline="middle" fill={COLORS[0]} fontSize="13">{data01[0].value}%</text>
                    </PieChart>

                    <PieChart width={70} height={70}>
                        <Pie
                            data={data02}
                            cx={35}
                            cy={35}
                            innerRadius={20}
                            outerRadius={30}
                            fill="#D8E0E0"
                            paddingAngle={0}
                        >
                            <Cell fill={COLORS[1]} />
                            <Cell fill="#D8E0E0" />
                            <Cell fill="#d3d3d3" />
                        </Pie>
                        <text x={40} y={42} textAnchor="middle" dominantBaseline="middle" fill={COLORS[1]} fontSize="13">{data02[0].value}%</text>
                    </PieChart>

                    <PieChart width={70} height={70}>
                        <Pie
                            data={data03}
                            cx={35}
                            cy={35}
                            innerRadius={20}
                            outerRadius={30}
                            fill="#D8E0E0"
                            paddingAngle={0}
                        >
                            <Cell fill={COLORS[2]} />
                            <Cell fill="#D8E0E0" />
                            <Cell fill="#d3d3d3" />
                        </Pie>
                        <text x={40} y={42} textAnchor="middle" dominantBaseline="middle" fill={COLORS[2]} fontSize="13">{data03[0].value}%</text>
                    </PieChart>
                </Box>
            </Box>
            
            <Box marginTop="6px" justifyContent="left" sx={{ paddingLeft: "20px" }}>
                <Box display={"flex"} textAlign={"center"} alignItems={"center"} >
                    <Box component="span" sx={{ backgroundColor: COLORS[0], width: '15px', borderRadius: "20px", height: '6px', display: 'inline-block', marginRight: '8px' }} />
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "9px" }}>Free</Typography>
                </Box>


                <Box display={"flex"} textAlign={"center"} alignItems={"center"}>
                    <Box component="span" sx={{ backgroundColor: COLORS[1], width: '15px', borderRadius: "20px", height: '6px', display: 'inline-block', marginRight: '8px' }} />
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "9px" }}>Starter</Typography>
                </Box>
                <Box display={"flex"} textAlign={"center"} alignItems={"center"}>
                    <Box component="span" sx={{ backgroundColor: COLORS[2], width: '15px', borderRadius: "20px", height: '6px', display: 'inline-block', marginRight: '8px' }} />
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "9px" }}>Pro</Typography>
                </Box>
            </Box>
        </>
    )
}
