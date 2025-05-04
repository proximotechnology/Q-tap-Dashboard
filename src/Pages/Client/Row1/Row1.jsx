import React from 'react';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { Paper, Typography, Box, useTheme } from '@mui/material';
import { PieChart, Pie, Cell } from 'recharts';
import { useTranslation } from 'react-i18next';
import { DashboardDataContext } from '../../../context/DashboardDataContext';

export const Row1 = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const COLORS = [theme.palette.orangePrimary.main, '#AD4181', '#2EA6F7'];
    const [clients, setClients] = React.useState([]);
    const { dashboardData, getDashboard } = React.useContext(DashboardDataContext);
    const { Client } = dashboardData;

    React.useEffect(() => {
        if (!Client) {
            getDashboard();
        } else if (Client) {
            const clientArray = Object.values(Client).filter((client) => client.id !== 11);
            setClients(clientArray);
        } else {
            setClients([]);
        }
    }, [Client, getDashboard]);

    // Prepare chart data
    const freeData = clients[0]
        ? [
            { name: 'Free', value: parseFloat(clients[0].percentage) || 0 },
            { name: 'Remaining', value: 100 - (parseFloat(clients[0].percentage) || 0) },
        ]
        : [{ name: 'Free', value: 0 }, { name: 'Remaining', value: 100 }];

    const starterData = clients[1]
        ? [
            { name: 'Starter', value: parseFloat(clients[1].percentage) || 0 },
            { name: 'Remaining', value: 100 - (parseFloat(clients[1].percentage) || 0) },
        ]
        : [{ name: 'Starter', value: 0 }, { name: 'Remaining', value: 100 }];

    const proData = clients[2]
        ? [
            { name: 'Pro', value: parseFloat(clients[2].percentage) || 0 },
            { name: 'Remaining', value: 100 - (parseFloat(clients[2].percentage) || 0) },
        ]
        : [{ name: 'Pro', value: 0 }, { name: 'Remaining', value: 100 }];

    // Check if data is ready for charts: At least one client with a valid percentage
    const isDataReady = clients.length > 0 && clients.some((client) => client?.percentage != null);

    return (
        <Box sx={{ padding: '0 20px' }}>
            <Paper elevation={3} sx={{ padding: '20px 40px', borderRadius: 5 }}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                        overflow: 'clip',
                        overflowX: 'auto',
                        flexDirection: { xs: 'column', sm: 'row' },
                    }}
                >
                    {/* Client Title and Number (Always Visible) */}
                    <Box>
                        <Typography
                            variant="h6"
                            color={theme.palette.text.gray}
                            fontSize="17px"
                            display="flex"
                            textAlign="center"
                            alignItems="center"
                        >
                            <Box component="span">
                                <PersonAddAltOutlinedIcon
                                    sx={{ marginRight: 1, fontSize: '35px', color: '#D8E0E0' }}
                                />
                            </Box>
                            {t('client')}
                        </Typography>

                        <Typography
                            variant="h3"
                            sx={{
                                fontSize: '28px',
                                color: theme.palette.orangePrimary.main,
                                marginLeft: '40px',
                            }}
                        >
                            {Client?.number_branches_clients || 0}
                        </Typography>
                    </Box>

                    {/* Charts Section (Conditional) */}
                    {isDataReady ? (
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }} gap={2}>
                                {clients[0] && (
                                    <PieChart width={110} height={110}>
                                        <defs>
                                            <linearGradient id="gradientFree" x1="0" y1="0" x2="100%" y2="0">
                                                <stop offset="0%" stopColor="rgb(255, 194, 133)" />
                                                <stop offset="100%" stopColor={theme.palette.orangePrimary.main} />
                                            </linearGradient>
                                        </defs>
                                        <Pie
                                            data={freeData}
                                            cx={50}
                                            cy={50}
                                            innerRadius={33}
                                            outerRadius={48}
                                            fill="#D8E0E0"
                                            paddingAngle={0}
                                        >
                                            <Cell
                                                fill="url(#gradientFree)"
                                                stroke={theme.palette.orangePrimary.main}
                                                strokeWidth={0.2}
                                                cornerRadius={5}
                                            />
                                            <Cell fill="#D8E0E0" />
                                        </Pie>
                                        <text
                                            x={55}
                                            y={57}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            fill={COLORS[0]}
                                            fontSize="18"
                                        >
                                            {clients[0]?.percentage ? `${parseInt(clients[0].percentage)}%` : '0%'}
                                        </text>
                                    </PieChart>
                                )}

                                {clients[1] && (
                                    <PieChart width={110} height={110}>
                                        <defs>
                                            <linearGradient id="gradientStarter" x1="0" y1="0" x2="100%" y2="0">
                                                <stop offset="0%" stopColor="rgb(255, 174, 216)" />
                                                <stop offset="100%" stopColor="#AD4181" />
                                            </linearGradient>
                                        </defs>
                                        <Pie
                                            data={starterData}
                                            cx={50}
                                            cy={50}
                                            innerRadius={33}
                                            outerRadius={48}
                                            fill="#D8E0E0"
                                            paddingAngle={0}
                                        >
                                            <Cell
                                                fill="url(#gradientStarter)"
                                                stroke="#AD4181"
                                                strokeWidth={0.2}
                                                cornerRadius={5}
                                            />
                                            <Cell fill="#d3d3d3" />
                                        </Pie>
                                        <text
                                            x={55}
                                            y={57}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            fill={COLORS[1]}
                                            fontSize="18"
                                        >
                                            {clients[1]?.percentage ? `${parseInt(clients[1].percentage)}%` : '0%'}
                                        </text>
                                    </PieChart>
                                )}

                                {clients[2] && (
                                    <PieChart width={110} height={110}>
                                        <defs>
                                            <linearGradient id="gradientPro" x1="0" y1="0" x2="100%" y2="0">
                                                <stop offset="0%" stopColor="rgb(170, 214, 243)" />
                                                <stop offset="100%" stopColor="#2EA6F7" />
                                            </linearGradient>
                                        </defs>
                                        <Pie
                                            data={proData}
                                            cx={50}
                                            cy={50}
                                            innerRadius={33}
                                            outerRadius={48}
                                            fill="#D8E0E0"
                                            paddingAngle={0}
                                        >
                                            <Cell
                                                fill="url(#gradientPro)"
                                                stroke="#2EA6F7"
                                                strokeWidth={2}
                                                cornerRadius={5}
                                            />
                                            <Cell fill="#d3d3d3" />
                                        </Pie>
                                        <text
                                            x={55}
                                            y={57}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            fill={COLORS[2]}
                                            fontSize="18"
                                        >
                                            {clients[2]?.percentage ? `${parseInt(clients[2].percentage)}%` : '0%'}
                                        </text>
                                    </PieChart>
                                )}
                            </Box>
                        </Box>
                    ) : (
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ minWidth: '330px', height: '110px' }}
                        >
                            <Typography>Loading...</Typography>
                        </Box>
                    )}

                    {/* Legend Section (Conditional) */}
                    {isDataReady ? (
                        <Box sx={{ marginRight: { xs: '0px', sm: '70px' } }}>
                            {clients[0] && (
                                <Box display="flex" textAlign="center" alignItems="center">
                                    <Box
                                        component="span"
                                        sx={{
                                            background: `linear-gradient(to right,${theme.palette.orangePrimary.main},rgb(248, 203, 158))`,
                                            width: '22px',
                                            borderRadius: '20px',
                                            height: '10px',
                                            display: 'inline-block',
                                            marginRight: '8px',
                                        }}
                                    />
                                    <Typography variant="body2" sx={{ fontSize: '10px', color: theme.palette.text.gray }}>
                                        {clients[0]?.name || 'Free'}
                                    </Typography>
                                </Box>
                            )}

                            {clients[1] && (
                                <Box display="flex" textAlign="center" alignItems="center" margin="4px 0px">
                                    <Box
                                        component="span"
                                        sx={{
                                            background: 'linear-gradient(to right, #AD4181,rgb(255, 174, 216))',
                                            width: '22px',
                                            borderRadius: '20px',
                                            height: '10px',
                                            display: 'inline-block',
                                            marginRight: '8px',
                                        }}
                                    />
                                    <Typography variant="body2" sx={{ fontSize: '10px', color: theme.palette.text.gray }}>
                                        {clients[1]?.name || 'Starter'}
                                    </Typography>
                                </Box>
                            )}

                            {clients[2] && (
                                <Box display="flex" textAlign="center" alignItems="center">
                                    <Box
                                        component="span"
                                        sx={{
                                            background: 'linear-gradient(to right, #2EA6F7,rgb(170, 214, 243))',
                                            width: '22px',
                                            borderRadius: '20px',
                                            height: '10px',
                                            display: 'inline-block',
                                            marginRight: '8px',
                                        }}
                                    />
                                    <Typography variant="body2" sx={{ fontSize: '10px', color: theme.palette.text.gray }}>
                                        {clients[2]?.name || 'Pro'}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    ) : (
                        <Box
                            sx={{ marginRight: { xs: '0px', sm: '70px' }, minWidth: '100px', height: '60px' }}
                        ></Box>
                    )}
                </Box>
            </Paper>
        </Box>
    );
};