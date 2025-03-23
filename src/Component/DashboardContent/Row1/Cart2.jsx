import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: '#fff', border: '1px solid #ccc', padding: '0px 5px', fontSize: '10px', borderRadius: '5px' }}>
          <p>{`${payload[0].payload.name}: ${payload[0].value / 1000}k`}</p>
        </div>
      );
    }
    return null;
  };
const data = [
    { name: 'Jan', value: 300000 },
    { name: 'Feb', value: 200000 },
    { name: 'Mar', value: 100000 },
    { name: 'Apr', value: 50000 },
    { name: 'May', value: 150000 },
    { name: 'Jun', value: 250000 },
];
const Cart2 = () => {
    return (
        <ResponsiveContainer width="100%" height={115}>
            <BarChart 
                data={data}
                layout="vertical"
                margin={{ top:5, right:10, left:-30, bottom: -15}}
            >
                <XAxis type="number"  tickFormatter={(tick) => `${tick / 1000}k`} 
                  tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />

                <YAxis dataKey="name" type="category"  tick={{ fontSize: 8 }} 
                interval={0} axisLine={false} tickLine={false} />

                <Tooltip contentStyle={{ fontSize: '10px' }} 
                  content={<CustomTooltip />}   
                  cursor={{ fill: 'transparent' }}/>

                
                <Bar dataKey="value" fill="#000000" background={{ fill: '#d3d3d3' }} barSize={5} 
                radius={[10, 10, 10, 10]}    />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default Cart2;
