import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', value1: 310, value2: 400 },
    { name: 'Feb', value1: 400, value2: 350 },
    { name: 'Mar', value1: 350, value2: 300 },
    { name: 'Apr', value1: 300, value2: 450 },
    { name: 'May', value1: 450, value2: 200 },
    { name: 'Jun', value1: 200, value2: 400 },
    { name: 'Jul', value1: 400, value2: 310 },
    { name: 'Aug', value1: 310, value2: 300 },
    { name: 'Sep', value1: 200, value2: 350 },
    { name: 'Oct',},
    { name: 'Nov',},
    { name: 'Des',},


];

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{ backgroundColor: '#666', fontSize:"12px",color: '#fff', padding: '5px', borderRadius: '5px' }}>
                {`${payload[0].value}K`}
            </div>
        );
    }
    return null;
};

const LineChart1 = () => {
    return (
        <ResponsiveContainer width="100%" height={180}>
            <LineChart data={data} margin={{ top:5, right: 20, left: 0, bottom: 0}}>
                <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 9 }}  tickLine={false} interval={0} />


                <YAxis domain={[0, 500]} ticks={[0, 100, 200, 300, 400, 500]}  tickFormatter={(tick) => `${tick / 1}k`} 
                    tick={{ fontSize: 9 }}  tickLine={false}/>

                <Tooltip content={<CustomTooltip />} />

                <Line type="linear" dataKey="value1" stroke="#575756" strokeWidth={2} dot={{ fill: '#2DA0F6', r: 5}} />
                <Line type="linear" dataKey="value2" stroke="#575756" strokeWidth={2} dot={{ fill: '#AD4081', r: 5}} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default LineChart1;
