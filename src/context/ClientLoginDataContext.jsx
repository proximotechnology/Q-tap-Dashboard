import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const ClientLoginData = createContext();

export const ClientLoginDataProvider = ({ children }) => {
    const [clientData, setClientData] = useState([])
    const [areaData, setAreaData] = useState([])
    const [tableDataRes, setTableDataRes] = useState([]);


    const getAreaData = async () => {
        try {
            const response = await axios.get('https://api.qutap.co/api/area', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('clientToken')}`
                }
            });

            if (response.data) {
                setAreaData(response.data);
                // console.log('Fetched Area:', response.data);
            }
        } catch (error) {
            // console.error('Error fetching Area data:', error);
        }
    };
    const getClientData = async () => {
        try {
            const response = await axios.get('https://api.qutap.co/api/get_info', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('clientToken')}`
                }
            });

            if (response.data) {
                setClientData(response.data);
                // console.log('Fetched client:', response.data);
            }
        } catch (error) {
            // console.error('Error fetching client data:', error);
        }
    };
    //========================================== get Table data 

    const getTableDataRes = async () => {
        try {
            const response = await axios.get('https://api.qutap.co/api/tables', {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('clientToken')}`
                }
            })

            // console.log("Table data response ", response);
            if (response.data) {
                setTableDataRes(response.data.tables);
            }

        } catch (error) {
            // console.log("error Table data ", error);

        }

    }

    useEffect(() => {
        // getClientData();
        // getAreaData();
        // getTableDataRes();
    }, []);


    return (
        <ClientLoginData.Provider value={{
            clientData, setClientData,
            areaData, setAreaData, getAreaData, getClientData
            , tableDataRes, setTableDataRes, getTableDataRes
        }}>
            {children}
        </ClientLoginData.Provider>
    );
};

