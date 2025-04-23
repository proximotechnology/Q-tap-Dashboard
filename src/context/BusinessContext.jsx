import React, { createContext, useState, useContext } from 'react';

const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
    const [businessData, setBusinessData] = useState({
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
        callWaiter: '',
        paymentTime:'',
        tableCount: '',
        paymentMethods: [],
        servingWays: [],
    });

    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState(null);

    const updateBusinessData = (newData) => {
        if (selectedBranch !== null) {
            setBranches((prevBranches) => {
                const updatedBranches = [...prevBranches];
                updatedBranches[selectedBranch] = { ...updatedBranches[selectedBranch], ...newData };
                return updatedBranches;
            });
        } else {
            setBusinessData((prevData) => ({
                ...prevData,
                ...newData,
            }));
        }
    };

    const addBranch = () => {
        const newBranch = { ...businessData };
        setBranches((prevBranches) => [...prevBranches, newBranch]);
    };

    const selectBranch = (index) => {
        setSelectedBranch(index);
        if (branches[index]) {
            setBusinessData(branches[index]);
        }
    };

    console.log("businessData" , businessData);
    
    return (
        <BusinessContext.Provider
            value={{
                businessData,
                branches,
                setBranches,
                selectedBranch,
                updateBusinessData,
                addBranch,
                selectBranch,
            }}
        >
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