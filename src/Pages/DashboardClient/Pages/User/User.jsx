import { Box } from '@mui/system'
import { useState } from 'react'
import UserTable from './UserTable'
import StaffTable from './StaffTable'
import axios from 'axios'
import { BASE_URL } from '../../../../utils/helperFunction'

export const User = () => {
    const [userStaff, setUserStaff] = useState([]);
    // Fetch user staff data
    const getUserStaff = async () => {
        const fetchWithRetry = async (retries, delay) => {
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
                if (error.response?.status === 429 && retries > 0) {
                    console.log(`Retrying... attempts left: ${retries}`);
                    setTimeout(() => fetchWithRetry(retries - 1, delay * 2), delay);
                } else {
                    console.log("error userStaff data ", error);
                }
            }
        };

        fetchWithRetry(3, 1000); // Retry up to 3 times with an initial delay of 1 second
    };

    return (
        <Box>
            <UserTable getUserStaff={getUserStaff} userStaff={userStaff} />
            <StaffTable getUserStaff={getUserStaff} userStaff={userStaff} />
        </Box>
    )
}
