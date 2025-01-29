
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { PieChart, Pie, Cell } from 'recharts';

const data01 = [{ name: 'Pro', value: 10 }, { name: 'Remaining', value: 90 }];

const COLORS = ['#30ADF8', "#D8E0E0"]

export const Chart2 = () => {
    return (
        <Box display={"flex"} justifyContent="space-between" alignItems="center" 
        padding={"0px 15px"}  >

            <Box >
                <Box display={"flex"} textAlign={"center"} alignItems={"center"} >
                    <Box component="span" sx={{ backgroundColor: COLORS[1], width: '15px', borderRadius: "20px", height: '6px', display: 'inline-block', marginRight: '8px' }} />
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "8px", color: "gray" }}>Orders</Typography>
                </Box>


                <Box display={"flex"} textAlign={"center"} alignItems={"center"} marginTop={"5px"}>
                    <Box component="span" sx={{ backgroundColor: COLORS[0], width: '15px', borderRadius: "20px", height: '6px', display: 'inline-block', marginRight: '8px' }} />
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "8px", color: "gray" }}>Visits</Typography>
                </Box>
            </Box>

            <PieChart width={110} height={110}>
                <Pie
                    data={data01}
                    cx={55}
                    cy={55}
                    innerRadius={33}
                    outerRadius={50}
                    fill="#D8E0E0"
                    paddingAngle={0}
                >
                    <Cell fill={COLORS[0]} />
                    <Cell fill="#D8E0E0" />
                    <Cell fill="#d3d3d3" />
                </Pie>
                <text x={60} y={60} textAnchor="middle" dominantBaseline="middle" fill={COLORS[0]} fontSize="18">{data01[0].value}%</text>
            </PieChart>


        </Box >
    )
}
