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

const Cart2 = ({ Total_Orders }) => {
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    if (Total_Orders) {
      const orderArray = Object.values(Total_Orders);
      setOrders(orderArray);
    } else {
      setOrders([]);
    }
  }, [Total_Orders]);
  // console.log("Total_Orders", orders);

  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart
        data={orders}
        layout="vertical"
        margin={{ top: 5, right: 10, left: -30, bottom: -15 }}
      >
        <XAxis type="number" tickFormatter={(tick) => `${tick / 1000}k`}
          tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />

        <YAxis dataKey="month_name" type="category" tick={{ fontSize: 8 }}
          interval={0} axisLine={false} tickLine={false} />

        <Tooltip contentStyle={{ fontSize: '10px' }}
          content={<CustomTooltip />}
          cursor={{ fill: 'transparent' }} />


        <Bar dataKey="total_order" fill="#000000" background={{
          fill: '#d3d3d3',
          radius: [10, 10, 10, 10] // Adding radius to the background
        }} barSize={5}
          radius={[10, 10, 10, 10]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Cart2;
