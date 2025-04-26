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
        mode: 'white',
        design: 'grid',
        format: '',
        currency: '',
        workingHours: {
            selectedDays: ['Sa', 'Su'],
            currentDay: 'Sunday',
            fromTime: '9:00 am',
            toTime: '5:00 pm'
        },
        callWaiter: 'inactive',
        paymentTime: 'after',
        tableCount: '',
        paymentMethods: [],
        servingWays: []
    });

    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState(null);

    const updateBusinessData = (newData) => {
        if (selectedBranch !== null && branches[selectedBranch]) {
            setBranches((prevBranches) => {
                const updatedBranches = [...prevBranches];
                updatedBranches[selectedBranch] = { ...updatedBranches[selectedBranch], ...newData };
                console.log('Updated branches:', updatedBranches);
                return updatedBranches;
            });
        } else {
            setBusinessData((prevData) => {
                console.log('Updating businessData:', { ...prevData, ...newData });
                return { ...prevData, ...newData };
            });
        }
    };

    const addBranch = () => {
        const newBranch = { ...businessData };
        setBranches((prevBranches) => {
            const updatedBranches = [...prevBranches, newBranch];
            console.log('Added branch:', updatedBranches);
            return updatedBranches;
        });
        clearBusinessData();
    };

    const selectBranch = (index) => {
        setSelectedBranch(index);
        if (branches[index]) {
            setBusinessData(branches[index]);
            console.log('Selected branch:', branches[index]);
        }
    };

    const clearBusinessData = () => {
        setBusinessData({
            businessName: '',
            website: '',
            businessEmail: '',
            businessPhone: '',
            country: '',
            city: '',
            mode: 'white',
            design: 'grid',
            format: '',
            currency: '',
            workingHours: {
                selectedDays: ['Sa', 'Su'],
                currentDay: 'Sunday',
                fromTime: '9:00 am',
                toTime: '5:00 pm'
            },
            callWaiter: 'inactive',
            paymentTime: 'after',
            tableCount: '',
            paymentMethods: [],
            servingWays: []
        });
        setSelectedBranch(null);
        console.log('Cleared businessData');
    };

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
                clearBusinessData
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