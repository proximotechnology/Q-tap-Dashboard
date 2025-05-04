import { Box } from '@mui/system'
import React, { useState } from 'react'
import UserTable from './UserTable'
import StaffTable from './StaffTable'
import axios from 'axios'
import { BASE_URL } from '../../../../utils/helperFunction'

export const User = () => {
    const [userStaff, setUserStaff] = useState([]);
    // Fetch user staff data
    const getUserStaff = async () => {
        try {

            const response = await axios.get(`${BASE_URL}resturant_users/${localStorage.getItem("selectedBranch")}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('clientToken')}`
                }
            });

            if (response.data) {
                setUserStaff(response.data.resturant_users || []);

            }
            console.log("userStaff data response ", response.data);
        } catch (error) {
            console.log("error userStaff data ", error);
        }
    };

    return (
        <Box>
            <UserTable getUserStaff={getUserStaff} userStaff={userStaff} />
            <StaffTable userStaff={userStaff} />
        </Box>
    )
}
