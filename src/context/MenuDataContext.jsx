import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { BASE_URL } from '../utils/helperFunction';

export const MenuDataContext = createContext();

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

export const MenuDataProvider = ({ children }) => {
    const [menuData, setMenuData] = useState([]);


    const getMenuData = async (branchNumber) => {
        try {
            const response = await fetchWithRetry(
                `${BASE_URL}menu/${branchNumber}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {}
                }
            );
            if (response.data) {
                setMenuData(response.data.data);
                console.log('Fetched menu data:', response.data.data);
            }
        } catch (error) {
            console.error('Error fetching menu data:', error);
        }
    };



    return (
        <MenuDataContext.Provider value={{
            menuData,
            setMenuData,
            getMenuData,
        }}>
            {children}
        </MenuDataContext.Provider>
    );
};