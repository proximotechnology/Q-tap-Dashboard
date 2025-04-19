import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';


const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{ backgroundColor: '#666', fontSize: "12px", color: '#fff', padding: '5px', borderRadius: '5px' }}>
                {`${payload[0].value}K`}
            </div>
        );
    }
    return null;
};

const LineChart1 = ({ salesData , showLine1, showLine2 }) => {
    const clicks = salesData?.clicksPerMonth || [];
    const users = salesData?.users_count_by_month || [];

    const chartData = clicks.map((clickItem, index) => ({
        month: clickItem.month_name,
        clicks: clickItem.clicks_count,
        users: users[index]?.users_count || 0
    }));
    return (
        <ResponsiveContainer width="100%" height={180}>
            <LineChart data={chartData ? Object.values(chartData) : []} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 9, angle: -45, textAnchor: 'end'  }} tickLine={false} interval={0} />

                <YAxis style={{ fontSize: 10 }} domain={[0, 500]} ticks={[0, 100, 200, 300, 400, 500]} tickFormatter={(tick) => tick === 0 ? `${tick / 1} ` : `${tick / 1} k`}
                    tick={{ fontSize: 9 }} tickLine={false} />

                <Tooltip content={<CustomTooltip />} />
                {showLine1  && (<Line type="linear" dataKey="clicks" stroke="#575756" strokeWidth={2} dot={{ fill: 'url(#lineChartGradient2)', r: 5, stroke: 'none', zIndex: 10 }} />)}
                {showLine2 && (<Line type="linear" dataKey="users" stroke="#575756" strokeWidth={2} dot={{ fill: 'url(#lineChartGradient1)', r: 5, stroke: 'none', zIndex: 10 }} />)}
                <defs>
                    <linearGradient id="lineChartGradient1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgb(250, 160, 214)" />
                        <stop offset="100%" stopColor="#AD4081" />
                    </linearGradient>
                    <linearGradient id="lineChartGradient2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgb(163, 215, 255)" />
                        <stop offset="100%" stopColor="#2DA0F6" />
                    </linearGradient>
                </defs>
            </LineChart>
        </ResponsiveContainer>
    );
};

export default LineChart1;
