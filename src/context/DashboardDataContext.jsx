import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const DashboardDataContext = createContext();

export const DashboardDataProvider = ({ children }) => {
    const [salesData, setSalesData] = useState([]);
    const [salesVolumeData, setSalesVolumeData] = useState([]);
    const [performanceData, setPerformanceData] = useState([]);
    const [dashboardData, setDashboardData] = useState([]);
    const [depositsData, setDepositsData] = useState([]);
    const [withdrawalsData, setWithdrawalsData] = useState([]);
    const [walletChartTwoData, setWalletChartTwoData] = useState([]);


    const getSalesDashboard = async (id) => {
        try {
            const response = await axios.post(`https://highleveltecknology.com/Qtap/api/Sales/${id}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });
            if (response.data) {
                setSalesData(response.data); // تعيين البيانات الصحيحة
                // console.log('Fetched sales data:', response.data);

            }
        } catch (error) {
            console.error('Error fetching sales data:', error);
        }
    };
    const getSalesVolumeDashboard = async (id) => {
        try {
            const response = await axios.post(`https://highleveltecknology.com/Qtap/api/Sales_by_days/${id}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });
            if (response.data) {
                setSalesVolumeData(response.data); // تعيين البيانات الصحيحة
                // console.log('Fetched sales volume data:', response.data);

            }
        } catch (error) {
            console.error('Error fetching sales volume data:', error);
        }
    };
    const getPerformanceDashboard = async (id) => {
        try {
            const response = await axios.post(`https://highleveltecknology.com/Qtap/api/Performance/${id}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });
            if (response.data) {
                setPerformanceData(response.data); // تعيين البيانات الصحيحة
                // console.log('Fetched Performance Data :', response.data);

            }
        } catch (error) {
            console.error('Error fetching Performance Data :', error);
        }
    };
    const getDashboard = async () => {
        try {
            const response = await axios.post(`https://highleveltecknology.com/Qtap/api/dashboard`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });
            if (response.data) {
                setDashboardData(response.data); // تعيين البيانات الصحيحة
                // console.log('Fetched dashboard Data :', response.data);

            }
        } catch (error) {
            console.error('Error fetching dashboard Data :', error);
        }
    };
    const getDeposits = async (id) => {
        try {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                console.error('Authorization token is missing');
                return;
            }
            const response = await axios.get(`https://highleveltecknology.com/Qtap/api/Deposits/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data) {
                setDepositsData(response.data); // تعيين البيانات الصحيحة
                console.log('Fetched Deposits Data :', response.data);

            }
        } catch (error) {
            console.error('Error fetching Deposits Data :', error);
        }
    };
    const getWithdrawals = async (id) => {
        try {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                console.error('Authorization token is missing');
                return;
            }
            const response = await axios.get(`https://highleveltecknology.com/Qtap/api/withdraw/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data) {
                setWithdrawalsData(response.data); // تعيين البيانات الصحيحة
                console.log('Fetched Withdrawals Data :', response.data);

            }
        } catch (error) {
            console.error('Error fetching Withdrawals Data :', error);
        }
    };
    const getWalletChartTwo = async (id) => {
        try {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                console.error('Authorization token is missing');
                return;
            }
            let response;
            try {
                response = await axios.post(`https://highleveltecknology.com/Qtap/api/wallet/${id}`, {}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.status === 401) {
                    console.error('Unauthorized: Invalid or expired token');
                    return;
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error('Unauthorized: Invalid or expired token');
                } else {
                    throw error;
                }
            }
            if (response && response.data) {
                setWalletChartTwoData(response.data); // تعيين البيانات الصحيحة
                console.log('Fetched wallet chart two Data :', response.data);

            }
        } catch (error) {
            console.error('Error fetching wallet chart two Data :', error);
        }
    };


    return (
        <DashboardDataContext.Provider value={{
            salesData, setSalesData, getSalesDashboard,
            salesVolumeData, setSalesVolumeData, getSalesVolumeDashboard,
            performanceData, setPerformanceData, getPerformanceDashboard,
            dashboardData, setDashboardData, getDashboard,
            depositsData, setDepositsData, getDeposits,
            withdrawalsData, setWithdrawalsData, getWithdrawals,
            walletChartTwoData, setWalletChartTwoData, getWalletChartTwo
        }}>
            {children}
        </DashboardDataContext.Provider>
    );
};