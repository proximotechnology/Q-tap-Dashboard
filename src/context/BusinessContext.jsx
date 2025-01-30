import React, { createContext, useState, useContext } from 'react';

const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
    const [businessData, setBusinessData] = useState({
        // Basic Business Info
        businessName: '',
        website: '',
        businessEmail: '',
        businessPhone: '',
        
        // Location Info
        country: '',
        city: '',
        
        // Business Settings
        mode: 'light',
        design: 'grid',
        format: '',
        currency: '',
        
        // Working Hours
        workingHours: {
            selectedDays: ['Sa', 'Su'],
            currentDay: 'Sunday',
            fromTime: '9:00 am',
            toTime: '5:00 pm',
        },
        
        // Features
        callWaiter: true,
        
        // Payment Settings
        paymentMethods: {
            cash: true,
            digitalWallet: true,
            card: true
        },
        paymentTime: {
            beforeServing: true,
            afterServing: false
        },
        tableCount: '',
        servingWays: {
            dineIn: true,
            takeaway: true,
            delivery: true
        }
    });

    const updateBusinessData = (newData) => {
        setBusinessData(prevData => ({
            ...prevData,
            ...newData,
            // Ensure nested objects are properly merged
            workingHours: {
                ...prevData.workingHours,
                ...(newData.workingHours || {})
            },
            paymentMethods: {
                ...prevData.paymentMethods,
                ...(newData.paymentMethods || {})
            },
            paymentTime: {
                ...prevData.paymentTime,
                ...(newData.paymentTime || {})
            },
            servingWays: {
                ...prevData.servingWays,
                ...(newData.servingWays || {})
            }
        }));
    };

    const clearBusinessData = () => {
        setBusinessData({
            businessName: '',
            website: '',
            businessEmail: '',
            businessPhone: '',
            country: '',
            city: '',
            mode: 'light',
            design: 'grid',
            format: '',
            currency: '',
            workingHours: {
                selectedDays: ['Sa', 'Su'],
                currentDay: 'Sunday',
                fromTime: '9:00 am',
                toTime: '5:00 pm',
            },
            callWaiter: true,
            paymentMethods: {
                cash: true,
                digitalWallet: true,
                card: true
            },
            paymentTime: {
                beforeServing: true,
                afterServing: false
            },
            tableCount: '',
            servingWays: {
                dineIn: true,
                takeaway: true,
                delivery: true
            }
        });
    };

    // Example of how to access specific data
    const getWorkingHours = () => businessData.workingHours;
    const getPaymentSettings = () => ({
        methods: businessData.paymentMethods,
        timing: businessData.paymentTime
    });

    return (
        <BusinessContext.Provider value={{
            businessData,
            updateBusinessData,
            clearBusinessData,
            getWorkingHours,
            getPaymentSettings
        }}>
            {children}
        </BusinessContext.Provider>
    );
};

export const useBusinessContext = () => {
    const context = useContext(BusinessContext);
    if (!context) {
        throw new Error('useBusinessContext must be used within a BusinessProvider');
    }
    return context;
};