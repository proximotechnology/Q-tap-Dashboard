import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const AffiliateClientContext = createContext();

export const AffiliateClientProvider = ({ children }) => {
    const [affiliates, setAffiliates] = useState([]);
    const [clients, setClients] = useState([]);

    const getAffiliateData = async (id) => {
        try {
            const response = await axios.get(`https://api.qutap.co/api/get_affiliate_info/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });

            if (response.data) {
                setAffiliates(Array.isArray(response.data) ? response.data : [response.data]); // Handle both array and single object
                console.log('Fetched affiliate:', response.data);
            }
        } catch (error) {
            console.error('Error fetching affiliate data:', error);
        }
    };
    const getClientData = async (id) => {
        try {
            const response = await axios.get(`https://api.qutap.co/api/get_client_info/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });
            console.log("response", response);

            if (response.data) {
                setClients(Array.isArray(response.data) ? response.data : [response.data]);
                console.log('Fetched client:', response.data);
            }
        } catch (error) {
            console.error('Error fetching client data:', error);
        }
    };
    // useEffect(() => {
    //     getClientData(250)
    //     getAffiliateData(36)
    // }, [])

    return (
        <AffiliateClientContext.Provider value={{
            affiliates,
            setAffiliates,
            getAffiliateData,
            clients,
            setClients,
            getClientData,
        }}>
            {children}
        </AffiliateClientContext.Provider>
    );
};