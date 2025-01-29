
import { Menu, MenuItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { PieChart, Pie, Cell } from 'recharts';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const data01 = [{ name: 'Subscriptions', value: 20 }, { name: 'Remaining', value: 80 }];
const data02 = [{ name: 'Order', value: 10 }, { name: 'Remaining', value: 90 }];


const COLORS = ['#ef7d00', '#AD4181'];

export const Cart4 = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedYear, setSelectedYear] = useState('2023-2024'); 

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget); 
    };

    const handleClose = (year) => {
        if (year) {
            setSelectedYear(year); 
        }
        setAnchorEl(null); 
    };

    const years = ["2021-2022",'2022-2023', '2023-2024', '2024-2025'];  
    return (
        <>
            <Box display={"flex"} justifyContent="center" alignItems="center"  >
                <Box sx={{ display: "flex" }}>

                    <PieChart width={120} height={120}>
                        <Pie
                            data={data01}
                            cx={60}
                            cy={60}
                            innerRadius={30}
                            outerRadius={45}
                            fill="#D8E0E0"
                            paddingAngle={0}
                        >
                            <Cell fill={COLORS[0]} />
                            <Cell fill="#D8E0E0" />
                            <Cell fill="#d3d3d3" />
                        </Pie>
                        <rect
                            x={45}
                            y={45}
                            width={40}
                            height={40}
                            fill={COLORS[0]}
                            rx={50}
                        />
                        <text x={65} y={65} textAnchor="middle" dominantBaseline="middle"
                            fill="white" fontSize="14">
                            {data01[0].value}%
                        </text>
                    </PieChart>


                    <PieChart width={120} height={120}>
                        <Pie
                            data={data02}
                            cx={60}
                            cy={60}
                            innerRadius={30}
                            outerRadius={45}
                            fill="#D8E0E0"
                            paddingAngle={0}
                        >
                            <Cell fill={COLORS[1]} />
                            <Cell fill="#D8E0E0" />
                            <Cell fill="#d3d3d3" />
                        </Pie>
                        <rect
                            x={45}
                            y={45}
                            width={40}
                            height={40}
                            fill={COLORS[1]}
                            rx={50}
                        />
                        <text x={65} y={65} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="14">
                            {data02[0].value}%
                        </text>
                    </PieChart>
                </Box>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"} paddingRight={"10px"}>
                <Box justifyContent="left" sx={{ paddingLeft: "20px" }}>
                    <Box display={"flex"} textAlign={"center"} alignItems={"center"} >
                        <Box component="span" sx={{ backgroundColor: COLORS[0], width: '15px', borderRadius: "20px", height: '6px', display: 'inline-block', marginRight: '8px' }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "9px", color: "gray" }}>Subscriptions</Typography>
                    </Box>

                    <Box display={"flex"} textAlign={"center"} alignItems={"center"}>
                        <Box component="span" sx={{ backgroundColor: COLORS[1], width: '15px', borderRadius: "20px", height: '6px', display: 'inline-block', marginRight: '8px' }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "9px", color: "gray" }}>Order</Typography>
                    </Box>

                </Box>

                <Box>
                    <Typography variant="body2" color="text.secondary"
                        onClick={handleClick} 
                        sx={{
                            cursor: "pointer", display: "flex", textAlign: "end", alignItems: "end", fontSize: "10px",
                            color: "#575756", marginTop: "10px", marginLeft: "20px"
                        }}>
                        {selectedYear} <KeyboardArrowDownOutlinedIcon sx={{ fontSize: "12px", marginLeft: "4px", color: "#575756" }} />
                    </Typography>
                    <Menu disableScrollLock
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => handleClose(null)}
                    >
                        {years.map((year) => (
                            <> 
                            <MenuItem key={year} sx={{fontSize:"10px"  ,color:"gray"}}
                            onClick={() => handleClose(year)}>
                                {year}
                            </MenuItem> 
                            </>
                        ))}
                    </Menu>
                </Box>
            </Box>
        </>
    )
}
