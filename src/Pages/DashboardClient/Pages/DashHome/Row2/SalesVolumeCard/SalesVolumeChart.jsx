import { Box } from '@mui/material'
import React from 'react'


import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area } from "recharts";
const data = [
    { name: "W1", value: 200 },
    { name: "W2", value: 300 },
    { name: "W3", value: 130 },
    { name: "W4", value: 180 },
    { name: "W5", value: 300 },
    { name: "W6", value: 130 },
    { name: "W7", value: 200 },
];

const SalesVolumeChart = () => {


    return (
        <Box sx={{ height: "150px", width: '100%' }}>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 90 }}>
                    <XAxis dataKey="name" tickLine={false} tick={{ fontSize: 10 }} />
                    <YAxis tickFormatter={(tick) => `${tick}k`} tick={{ fontSize: 10 }}
                        tickLine={false} interval={0} />


                    <Area
                        type="monotone"
                        dataKey="value"
                        fill="#d3d3d3"    // لون التعبئة للمنطقة
                        stroke="#d3d3d3"  // لون الحافة
                        strokeWidth={1}    // عرض حافة المنطقة
                        fillOpacity={0.5}  // تعيين شفافية التعبئة
                    />

                    <Line
                        type="linear"
                        dataKey="value"
                        stroke="#ef7d00"
                        strokeWidth={2}
                        dot={false}
                        connectNulls={true}
                    />


                    <Tooltip formatter={(value) => `${value}k`} />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    )
}
export default SalesVolumeChart;
