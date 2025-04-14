import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const DashboardDataContext = createContext();

const fetchWithRetry = async (url, options, maxRetries = 5, initialDelay = 1000) => {
    let attempt = 0;
    let delay = initialDelay;

    while (attempt < maxRetries) {
        try {
            const response = await axios(url, options);
            return response; // Return the response on success
        } catch (error) {
            if (error.response && error.response.status === 429) {
                console.warn(`Rate limit hit. Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2; // Exponential backoff
                attempt++;
            } else {
                throw error; // Rethrow non-rate-limiting errors
            }
        }
    }
    throw new Error('Max retries reached. Could not fetch data.');
};

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
            const response = await fetchWithRetry(
                `https://highleveltecknology.com/Qtap/api/Sales/${id}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    },
                    data: {}
                }
            );
            if (response.data) {
                setSalesData(response.data);
                console.log('Fetched sales data:', response.data);
            }
        } catch (error) {
            console.error('Error fetching sales data:', error);
        }
    };

    const getSalesVolumeDashboard = async (id) => {
        try {
            const response = await fetchWithRetry(
                `https://highleveltecknology.com/Qtap/api/Sales_by_days/${id}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    },
                    data: {}
                }
            );
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
            const response = await fetchWithRetry(
                `https://highleveltecknology.com/Qtap/api/Performance/${id}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    },
                    data: {}
                }
            );
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
            const response = await fetchWithRetry(
                `https://highleveltecknology.com/Qtap/api/dashboard`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    },
                    data: {}
                }
            );
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
            const response = await fetchWithRetry(
                `https://highleveltecknology.com/Qtap/api/Deposits/${id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    }
                }
            );
            if (response.data) {
                setDepositsData(response.data);
                console.log('Fetched Deposits Data:', response.data);
            }
        } catch (error) {
            console.error('Error fetching Deposits Data:', error);
        }
    };
    const getWithdrawals = async (id) => {
        try {
            const response = await fetchWithRetry(
                `https://highleveltecknology.com/Qtap/api/withdraw/${id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    }
                }
            );
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
            const response = await fetchWithRetry(
                `https://highleveltecknology.com/Qtap/api/wallet/${id}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    },
                    data: {}
                }
            );
            if (response.data) {
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