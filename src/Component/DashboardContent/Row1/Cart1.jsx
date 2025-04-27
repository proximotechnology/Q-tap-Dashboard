import { Typography } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell } from 'recharts';

export const Cart1 = ({ Client }) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const COLORS = [theme.palette.orangePrimary.main, '#AD4181', '#2EA6F7'];
    const [clients, setClients] = React.useState([]);

    React.useEffect(() => {
        let isMounted = true; // Flag to prevent setting state if component is unmounted
        const fetchClients = async () => {
            if (isMounted && Client) {
                const clientArray = Object.values(Client).filter(client => client.id !== 11); // استبعاد العنصر "test" إذا لزم الأمر
                setClients(clientArray);
                console.log(clients);
                
            } else if (isMounted) {
                setClients([]);
            }
        };
        fetchClients();
        return () => {
            isMounted = false; // Cleanup to prevent setting state after unmount
        };
    }, [Client]);

    // تحويل النسب المئوية إلى قيم عددية (إزالة % وحساب المتبقي)
    const freeData = clients[0] ? [
        { name: 'Free', value: parseFloat(clients[0].percentage) },
        { name: 'Remaining', value: 100 - parseFloat(clients[0].percentage) }
    ] : [{ name: 'Free', value: 0 }, { name: 'Remaining', value: 100 }];

    const starterData = clients[1] ? [
        { name: 'Starter', value: parseFloat(clients[1].percentage) },
        { name: 'Remaining', value: 100 - parseFloat(clients[1].percentage) }
    ] : [{ name: 'Starter', value: 0 }, { name: 'Remaining', value: 100 }];

    const proData = clients[2] ? [
        { name: 'Pro', value: parseFloat(clients[2].percentage) },
        { name: 'Remaining', value: 100 - parseFloat(clients[2].percentage) }
    ] : [{ name: 'Pro', value: 0 }, { name: 'Remaining', value: 100 }];

    return (
        <>
            <Box display="flex" alignItems="center" marginTop="15px">
                <Box sx={{ display: "flex" }} marginX='auto'>
                    {/* First Pie Chart - Free */}
                    <PieChart width={78} height={78}>
                        <defs>
                            <linearGradient id="gradientFree" x1="0" y1="0" x2="100%" y2="0">
                                <stop offset="0%" stopColor={theme.palette.chart.orangeLight} />
                                <stop offset="100%" stopColor={theme.palette.chart.orange} />
                            </linearGradient>
                        </defs>
                        <Pie
                            data={freeData}
                            cx={39}
                            cy={39}
                            innerRadius={20}
                            outerRadius={32}
                            fill="#D8E0E0"
                            paddingAngle={0}
                        >
                            <Cell fill="url(#gradientFree)" stroke={theme.palette.orangePrimary.main} strokeWidth={.2} cornerRadius={5} />
                            <Cell fill="#D8E0E0" />
                        </Pie>
                        <text
                            x={45}
                            y={45}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill={theme.palette.orangePrimary.main}
                            fontSize="13"
                        >
                            {clients[0] ? `${parseInt(clients[0].percentage)}%` : "0%"}
                        </text>
                    </PieChart>

                    {/* Second Pie Chart - Starter */}
                    <PieChart width={78} height={78}>
                        <defs>
                            <linearGradient id="gradientStarter" x1="0" y1="0" x2="100%" y2="0">
                                <stop offset="0%" stopColor={theme.palette.chart.pinkLight} />
                                <stop offset="100%" stopColor={theme.palette.chart.pink} />
                            </linearGradient>
                        </defs>
                        <Pie
                            data={starterData}
                            cx={39}
                            cy={39}
                            innerRadius={20}
                            outerRadius={32}
                            fill="#D8E0E0"
                            paddingAngle={0}
                        >
                            <Cell fill="url(#gradientStarter)" stroke="#AD4181" strokeWidth={.2} cornerRadius={5} />
                            <Cell fill="#D8E0E0" />
                        </Pie>
                        <text
                            x={45}
                            y={45}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#AD4181"
                            fontSize="13"
                        >
                            {clients[1] ? `${parseInt(clients[1].percentage)}%` : "0%"}
                        </text>
                    </PieChart>

                    {/* Third Pie Chart - Pro */}
                    <PieChart width={78} height={78}>
                        <defs>
                            <linearGradient id="gradientPro" x1="0" y1="0" x2="100%" y2="0">
                                <stop offset="0%" stopColor="rgb(170, 214, 243)" />
                                <stop offset="100%" stopColor="#2EA6F7" />
                            </linearGradient>
                        </defs>
                        <Pie
                            data={proData}
                            cx={39}
                            cy={39}
                            innerRadius={20}
                            outerRadius={32}
                            fill="#D8E0E0"
                            paddingAngle={0}
                        >
                            <Cell fill="url(#gradientPro)" stroke="#2EA6F7" strokeWidth={2} cornerRadius={5} />
                            <Cell fill="#D8E0E0" />
                        </Pie>
                        <text
                            x={45}
                            y={45}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#2EA6F7"
                            fontSize="13"
                        >
                            {clients[2] ? `${parseInt(clients[2].percentage)}%` : "0%"}
                        </text>
                    </PieChart>
                </Box>
            </Box>

            <Box marginTop="20px" justifyContent="left" sx={{ paddingLeft: "20px" }}>
                <Box display="flex" textAlign="center" alignItems="center">
                    <Box
                        component="span"
                        sx={{
                            background: 'linear-gradient(to right, #ef7d00, rgb(248, 203, 158))',
                            width: '15px',
                            borderRadius: "20px",
                            height: '6px',
                            display: 'inline-block',
                            marginRight: '8px',
                        }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "9px" }}>
                        {clients[0]?.name}
                    </Typography>
                </Box>

                <Box display="flex" textAlign="center" alignItems="center">
                    <Box
                        component="span"
                        sx={{
                            background: 'linear-gradient(to right, #AD4181, rgb(255, 174, 216))',
                            width: '15px',
                            borderRadius: "20px",
                            height: '6px',
                            display: 'inline-block',
                            margin: "5px 8px 5px 0"
                        }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "9px" }}>
                        {clients[1]?.name}
                    </Typography>
                </Box>

                <Box display="flex" textAlign="center" alignItems="center">
                    <Box
                        component="span"
                        sx={{
                            background: 'linear-gradient(to right, #2EA6F7, rgb(170, 214, 243))',
                            width: '15px',
                            borderRadius: "20px",
                            height: '6px',
                            display: 'inline-block',
                            marginRight: '8px'
                        }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "9px" }}>
                        {clients[2]?.name}
                    </Typography>
                </Box>
            </Box>
        </>
    );
};