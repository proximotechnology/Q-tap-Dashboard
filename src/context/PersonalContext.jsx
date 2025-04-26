import React, { createContext, useState, useContext, useEffect } from 'react';

const PersonalContext = createContext();

export const PersonalProvider = ({ children }) => {
    const [personalData, setPersonalData] = useState({
        fullName: '',
        phone: '',
        email: '',
        month: '',
        day: '',
        year: '',
        country: '',
        password: '',
        confirmPassword: '',
        img: '',
        website: '',

        pricing_way: '',
        pricing_id: '',
        payment_method: 'cash',
        discount_id: '',
    });

    const updatePersonalData = (newData) => {
        setPersonalData((prevData) => ({
            ...prevData,
            ...newData,
        }));
    };

    const clearPersonalData = () => {
        setPersonalData({
            fullName: '',
            phone: '',
            email: '',
            month: '',
            day: '',
            year: '',
            country: '',
            password: '',
            confirmPassword: '',
            img: '',
            website: '',

            pricing_way: '',
            pricing_id: '',
            payment_method: '',
            discount_id: '',
        });
    };

    // console.log("context personalData" , personalData);
    

    return (
        <PersonalContext.Provider value={{ personalData, updatePersonalData, clearPersonalData, setPersonalData }}>
            {children}
        </PersonalContext.Provider>
    );
};

export const usePersonalContext = () => {
    const context = useContext(PersonalContext);
    if (!context) {
        throw new Error('usePersonalContext must be used within a PersonalProvider');
    }
    return context;
};