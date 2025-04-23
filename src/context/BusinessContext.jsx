// import React, { createContext, useState, useContext } from 'react';

// const BusinessContext = createContext();

// export const BusinessProvider = ({ children }) => {
//     const [businessData, setBusinessData] = useState({
//         businessName: '',
//         website: '',
//         businessEmail: '',
//         businessPhone: '',
//         country: '',
//         city: '',
//         mode: 'light',
//         design: 'grid',
//         format: '',
//         currency: '',
//         workingHours: {
//             selectedDays: ['Sa', 'Su'],
//             currentDay: 'Sunday',
//             fromTime: '9:00 am',
//             toTime: '5:00 pm',
//         },
//         callWaiter: '',
//         paymentTime:'',
//         tableCount: '',
//         paymentMethods: [],
//         servingWays: [],
//     });

//     const [branches, setBranches] = useState([]);
//     const [selectedBranch, setSelectedBranch] = useState(null);

//     const updateBusinessData = (newData) => {
//         if (selectedBranch !== null) {
//             setBranches((prevBranches) => {
//                 const updatedBranches = [...prevBranches];
//                 updatedBranches[selectedBranch] = { ...updatedBranches[selectedBranch], ...newData };
//                 return updatedBranches;
//             });
//         } else {
//             setBusinessData((prevData) => ({
//                 ...prevData,
//                 ...newData,
//             }));
//         }
//     };

//     const addBranch = () => {
//         const newBranch = { ...businessData };
//         setBranches((prevBranches) => [...prevBranches, newBranch]);
//     };

//     const selectBranch = (index) => {
//         setSelectedBranch(index);
//         if (branches[index]) {
//             setBusinessData(branches[index]);
//         }
//     };

//     console.log("businessData" , businessData);
    
//     return (
//         <BusinessContext.Provider
//             value={{
//                 businessData,
//                 branches,
//                 setBranches,
//                 selectedBranch,
//                 updateBusinessData,
//                 addBranch,
//                 selectBranch,
//             }}
//         >
//             {children}
//         </BusinessContext.Provider>
//     );
// };

// export const useBusinessContext = () => {
//     const context = useContext(BusinessContext);
//     if (!context) {
//         throw new Error('useBusinessContext must be used within a BusinessProvider');
//     }
//     return context;
// };



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
        callWaiter: '',
        paymentTime: '',
        tableCount: '',
        paymentMethods: [],
        servingWays: []
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
            setBusinessData((prevData) => {
                let updatedServingWays = prevData.servingWays || [];
                
                // Handle servingWays incrementally
                if (newData.servingWays && Array.isArray(newData.servingWays)) {
                    // Create a Set of current servingWays for uniqueness
                    const currentSet = new Set(updatedServingWays);
                    // Add new selections
                    newData.servingWays.forEach((service) => currentSet.add(service));
                    // Convert back to array, removing services not in newData.servingWays
                    updatedServingWays = Array.from(currentSet).filter((service) =>
                        newData.servingWays.includes(service) || !prevData.servingWays.includes(service)
                    );
                }

                return {
                    ...prevData,
                    ...Object.fromEntries(
                        Object.entries(newData).filter(([key, value]) => 
                            key !== 'servingWays' && value !== undefined && value !== null
                        )
                    ),
                    servingWays: updatedServingWays
                };
            });
        }
    };

    const addBranch = () => {
        const newBranch = {
            ...businessData,
            servingWays: businessData.servingWays || []
        };
        setBranches((prevBranches) => [...prevBranches, newBranch]);
        clearBusinessData();
    };

    const updateLastBranch = (newData) => {
        setBranches((prevBranches) => {
            if (prevBranches.length === 0) return prevBranches;
            const updatedBranches = [...prevBranches];
            updatedBranches[updatedBranches.length - 1] = {
                ...updatedBranches[updatedBranches.length - 1],
                ...Object.fromEntries(
                    Object.entries(newData).filter(([_, value]) => value !== undefined && value !== null)
                )
            };
            console.log("Updated last branch with:", updatedBranches[updatedBranches.length - 1]);
            return updatedBranches;
        });
    };

    const selectBranch = (index) => {
        setSelectedBranch(index);
        if (branches[index]) {
            setBusinessData(branches[index]);
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
            callWaiter: '',
            paymentTime: '',
            tableCount: '',
            paymentMethods: [],
            servingWays: []
        });
        setSelectedBranch(null);
    };

    // console.log("businessData:", businessData, "branches:", branches);

    return (
        <BusinessContext.Provider
            value={{
                businessData,
                branches,
                setBranches,
                selectedBranch,
                updateBusinessData,
                addBranch,
                updateLastBranch,
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