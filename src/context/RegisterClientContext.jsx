import React, { createContext, useState, useContext } from 'react';

const RegisterClientContext = createContext();

export const useRegisterClient = () => useContext(RegisterClientContext);

export const RegisterClientProvider = ({ children }) => {
    const [clientData, setClientData] = useState({
        personalInfo: {
            fullName: '',
            phone: '',
            email: '',
            month: '',
            day: '',
            year: '',
            country: '',
            password: '',
            confirmPassword: '',
            image: ''
        },
        businessInfo: {
            contactInfo: {
                businessPhone: '',
                businessEmail: '',
                facebook: '',
                twitter: '',
                instagram: '',
                address: '',
                website: ''
            },
            businessName: '',
            country: '',
            city: '',
            currency: '',
            businessType: '',
            menuDefaultLanguage: '',
            numberOfTables: '',
            selectedBranch: 'branch1',
            mode: 'white',
            design: 'grid',
            selectedDays: ['Sa', 'Su'],
            currentDay: 'Sunday',
            fromTime: '9:00 am',
            toTime: '5:00 pm',
            servingWays: {
              dine_in: false,
                take_away: false,
                delivery: false
            },
            paymentMethods: {
                cash: false,
                digitalWallet: false,
                card: false
            },
            paymentTime: {
                beforeServing: false,
                afterServing: false
            },
            callWaiter: false
        }
    });

   
  

    return (
        <RegisterClientContext.Provider value={{ clientData, setClientData }}>
            {children}
        </RegisterClientContext.Provider>
    );
};