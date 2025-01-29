
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { PieChart, Pie, Cell } from 'recharts';

const data01 = [{ name: 'Pro', value: 10 }, { name: 'Remaining', value: 90 }];

const COLORS = ['#30ACF8', "#D8E0E0"]

export const ChartPie = () => {
    return (
        <Box sx={{padding:"0px 20px"}}>
            <PieChart width={130} height={130}>
                <Pie
                    data={data01}
                    cy={65}
                    cx={65}
                    innerRadius={43}
                    outerRadius={60}
                    fill="#D8E0E0"
                    paddingAngle={0}
                >
                    <Cell fill={COLORS[0]} />
                    <Cell fill="#D8E0E0" />
                    <Cell fill="#d3d3d3" />
                </Pie>
                <text x={60} y={60} textAnchor="middle" dominantBaseline="middle" fill={COLORS[0]} fontSize="18">{data01[0].value}%</text>
            </PieChart>

            <Box sx={{padding:"20px 30px"}}>
                <Box display={"flex"} textAlign={"center"} alignItems={"center"} >
                    <Box component="span" sx={{ backgroundColor: COLORS[1], width: '25px', borderRadius: "20px", height: '8px', display: 'inline-block', marginRight: '8px' }} />
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "8px", color: "#949493" }}>Total Withdrawals</Typography>
                </Box>


                <Box display={"flex"} textAlign={"center"} alignItems={"center"} marginTop={"5px"}>
                    <Box component="span" sx={{ backgroundColor: COLORS[0], width: '25px', borderRadius: "20px", height: '8px', display: 'inline-block', marginRight: '8px' }} />
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "8px", color: "#949493" }}>Total Revenue</Typography>
                </Box>
            </Box>
        </Box >
    )
}
