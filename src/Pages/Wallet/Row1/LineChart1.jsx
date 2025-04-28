import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{ backgroundColor: '#666', fontSize: '12px', color: '#fff', padding: '5px', borderRadius: '5px' }}>
                {`${payload[0].value}K`}
            </div>
        );
    }
    return null;
};

const LineChart1 = ({ salesData, showLine1, showLine2 }) => {
    // التحقق من وجود البيانات
    if (!salesData) {
        return <div>لا توجد بيانات متاحة</div>;
    }

    // تحويل البيانات إلى مصفوفة وتحويل total_revenue إلى وحدات الآلاف (k)
    const chartData = Object.values(salesData).map((item) => ({
        month_name: item.month_name,
        total_revenue: item.total_revenue / 1000, // تحويل إلى آلاف
    }));

    // console.log('salesData', salesData, 'chartData', chartData);

    return (
        <ResponsiveContainer width="100%" height={180}>
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                <XAxis
                    dataKey="month_name"
                    tick={{ fontSize: 9, angle: -45, textAnchor: 'end' }}
                    tickLine={false}
                    interval={0}
                />
                <YAxis
                    style={{ fontSize: 10 }}
                    domain={[0, 50]} // تعديل النطاق ليناسب القيم المحولة (مثل 20k تصبح 20)
                    ticks={[0, 10, 20, 30, 40, 50]}
                    tickFormatter={(tick) => `${tick}k`}
                    tick={{ fontSize: 9 }}
                    tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                {showLine1 && (
                    <Line
                        type="linear"
                        dataKey="total_revenue"
                        stroke="#707070" // لون مختلف للخط الأول
                        strokeWidth={2}
                        dot={{ fill: 'url(#lineChartGradient2)', r: 5, stroke: 'none', zIndex: 10 }}
                    />
                )}
                {showLine2 && (
                    <Line
                        type="linear"
                        dataKey="total_revenue"
                        stroke="#707070" // لون مختلف للخط الثاني
                        strokeWidth={2}
                        dot={{ fill: 'url(#lineChartGradient1)', r: 5, stroke: 'none', zIndex: 10 }}
                    />
                )}
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

// إضافة قيم افتراضية
LineChart1.defaultProps = {
    showLine1: true,
    showLine2: false, // تعيين false افتراضيًا لتجنب عرض خطين متطابقين
};

export default LineChart1;