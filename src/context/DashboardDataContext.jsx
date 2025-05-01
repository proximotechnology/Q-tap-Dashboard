import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { BASE_URL } from '../utils/helperFunction';

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

    //// ================================================= START ADMIN DASHBOARD ===================================================
    const getSalesDashboard = async (id) => {
        try {
            const response = await fetchWithRetry(
                `${BASE_URL}Sales/${id}`,
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
                // console.log('Fetched sales data:', response.data);
            }
        } catch (error) {
            console.error('Error fetching sales data:', error);
        }
    };

    const getSalesVolumeDashboard = async (id) => {
        try {
            const response = await fetchWithRetry(
                `${BASE_URL}Sales_by_days/${id}`,
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
                `${BASE_URL}Performance/${id}`,
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
                `${BASE_URL}dashboard`,
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
                `${BASE_URL}Deposits/${id}`,
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
                `${BASE_URL}withdraw/${id}`,
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
                `${BASE_URL}wallet/${id}`,
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
                // console.log('Fetched wallet chart two Data :', response.data);
            }
        } catch (error) {
            console.error('Error fetching wallet chart two Data :', error);
        }
    };
    //// ================================================= END ADMIN DASHBOARD ===================================================

    const [salesClientData, setSalesClientData] = useState([]);
    const [salesVolumeClientData, setSalesVolumeClientData] = useState([]);
    const [dashboardClientData, setDashboardClientData] = useState([]);
    const [performanceClientData, setPerformanceClientData] = useState([]);
    // const [depositsData, setDepositsData] = useState([]);
    // const [withdrawalsData, setWithdrawalsData] = useState([]);
    const [walletChartClientData, setWalletChartClientData] = useState([]);
    const [walletClientData, setWalletClientData] = useState([]);
    const [customerLog, setCustomerLog] = useState([]);



    //// ================================================= START CLIENT DASHBOARD ===================================================
    const getSalesClientDashboard = async (id) => {
        try {
            const response = await fetchWithRetry(
                `${BASE_URL}Sales_restaurant/${id}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('clientToken')}`
                    },
                    data: {}
                }
            );
            if (response.data) {
                setSalesClientData(response.data);
                // console.log('Fetched sales data:', response.data);
            }
        } catch (error) {
            console.error('Error fetching sales data:', error);
        }
    };

    const getSalesVolumeClientDashboard = async (id) => {
        try {
            const response = await fetchWithRetry(
                `${BASE_URL}Sales_by_days_restaurant/${id}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('clientToken')}`
                    },
                    data: {}
                }
            );
            if (response.data) {
                setSalesVolumeClientData(response.data); // تعيين البيانات الصحيحة
                // console.log('Fetched sales volume data:', response.data);
            }
        } catch (error) {
            console.error('Error fetching sales volume data:', error);
        }
    };

    const getClientDashboard = async (id) => {
        try {
            const response = await fetchWithRetry(
                `${BASE_URL}dashboard/${id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('clientToken')}`
                    },
                    data: {}
                }
            );
            if (response.data) {
                setDashboardClientData(response.data); // تعيين البيانات الصحيحة
                // console.log('Fetched dashboard Data :', response.data);
            }
        } catch (error) {
            console.error('Error fetching dashboard Data :', error);
        }
    };
    const getPerformanceClientDashboard = async (id) => {
        try {
            const response = await fetchWithRetry(
                `${BASE_URL}Performance/${id}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('clientToken')}`
                    },
                    data: {}
                }
            );
            if (response.data) {
                setPerformanceClientData(response.data); // تعيين البيانات الصحيحة
                // console.log('Fetched Performance Data :', response.data);
            }
        } catch (error) {
            console.error('Error fetching Performance Data :', error);
        }
    };
    const getWalletData = async (id) => {
        try {
            const response = await fetchWithRetry(
                `${BASE_URL}wallet_restaurant/${localStorage.getItem("selectedBranch")}/${id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('clientToken')}`
                    },
                    data: {}
                }
            );
            if (response.data) {
                setWalletClientData(response.data); // تعيين البيانات الصحيحة
                console.log('Fetched Performance Data :', response.data);
            }
        } catch (error) {
            console.error('Error fetching Performance Data :', error);
        }
    };

    const getCustomerLog = async (id) => {
        try {
            const response = await fetchWithRetry(
                `${BASE_URL}Customer_log/${localStorage.getItem("selectedBranch")}/${id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('clientToken')}`
                    }
                }
            );
            if (response.data) {
                setCustomerLog(response.data);
                console.log('Fetched Customer Log Data:', response.data);
            }
        } catch (error) {
            console.error('Error fetching Customer Log Data:', error);
        }
    };
    // const getWithdrawals = async (id) => {
    //     try {
    //         const response = await fetchWithRetry(
    //             `${BASE_URL}withdraw/${id}`,
    //             {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    //                 }
    //             }
    //         );
    //         if (response.data) {
    //             setWithdrawalsData(response.data); // تعيين البيانات الصحيحة
    //             console.log('Fetched Withdrawals Data :', response.data);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching Withdrawals Data :', error);
    //     }
    // };

    const getClientWalletChart = async (id) => {
        try {
            const response = await fetchWithRetry(
                `${BASE_URL}Sales_restaurant/${id}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('clientToken')}`
                    },
                    data: {}
                }
            );
            if (response.data) {
                setWalletChartClientData(response.data); // تعيين البيانات الصحيحة
                // console.log('Fetched wallet chart Client Data :', response.data);
            }
        } catch (error) {
            console.error('Error fetching wallet chart Client Data :', error);
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
            walletChartTwoData, setWalletChartTwoData, getWalletChartTwo,
            //========== CLIENT DASHBOARD
            salesClientData, setSalesClientData, getSalesClientDashboard,
            salesVolumeClientData, setSalesVolumeClientData, getSalesVolumeClientDashboard,
            dashboardClientData, setDashboardClientData, getClientDashboard,
            performanceClientData, setPerformanceClientData, getPerformanceClientDashboard,
            walletClientData, setWalletClientData, getWalletData,
            customerLog, setCustomerLog, getCustomerLog,
            walletChartClientData, setWalletChartClientData, getClientWalletChart

        }}>
            {children}
        </DashboardDataContext.Provider>
    );
};