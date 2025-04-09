import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const DashboardDataContext = createContext();

export const DashboardDataProvider = ({ children }) => {
    const [salesData, setSalesData] = useState([]);
    const [salesVolumeData, setSalesVolumeData] = useState([]);
    const [performanceData, setPerformanceData] = useState([]);
    const [dashboardData, setDashboardData] = useState([]);
    const [depositsData, setDepositsData] = useState([]);


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
            const response = await axios.get(`https://highleveltecknology.com/Qtap/api/Deposits/${id}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
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

    return (
        <DashboardDataContext.Provider value={{
            salesData, setSalesData, getSalesDashboard,
            salesVolumeData, setSalesVolumeData, getSalesVolumeDashboard,
            performanceData, setPerformanceData, getPerformanceDashboard,
            dashboardData, setDashboardData, getDashboard,
            depositsData, setDepositsData, getDeposits
        }}>
            {children}
        </DashboardDataContext.Provider>
    );
};