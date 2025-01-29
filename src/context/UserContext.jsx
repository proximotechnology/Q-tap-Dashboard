// import React, { createContext, useState, useContext } from 'react';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//     const [userData, setUserData] = useState({
//         fullName: '',
//         phone: '',
//         email: '',
//         month: '',
//         day: '',
//         year: '',
//         country: '',
//         password: '',
//         confirmPassword: '',
//         user_type: '',
//         mode: 'light',
//         design: 'grid',
//         format: '',
//         currency: '',
//         city: '',
//         businessName: '',
//         website: '',
//         businessEmail: '',
//         businessPhone: '',
//         selectedDays: ['Sa', 'Su'],
//         currentDay: 'Sunday',
//         fromTime: '9:00 am',
//         toTime: '5:00 pm',
//         callWaiter: true,
//         paymentMethods: {
//             cash: true,
//             digitalWallet: true,
//             card: true
//         },
//         paymentTime: {
//             beforeServing: true,
//             afterServing: true
//         }
//     });

//     const updateUserData = (newData) => {
//         setUserData(prevData => ({
//             ...prevData,
//             ...newData
//         }));
//     };

//     React.useEffect(() => {
//         const savedData = localStorage.getItem('userData');
//         if (savedData) {
//             setUserData(JSON.parse(savedData));
//         }
//     }, []);

//     React.useEffect(() => {
//         localStorage.setItem('userData', JSON.stringify(userData));
//     }, [userData]);

//     console.log('Current UserContext State:', userData);

//     return (
//         <UserContext.Provider value={{ userData, updateUserData }}>
//             {children}
//         </UserContext.Provider>
//     );
// };

// export const useUserContext = () => {
//     const context = useContext(UserContext);
//     if (!context) {
//         throw new Error('useUserContext must be used within a UserProvider');
//     }
//     return context;
// };

// export const clearUserContext = () => {
//     localStorage.removeItem('userData');
//     window.location.reload();
// };