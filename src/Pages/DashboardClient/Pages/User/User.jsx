import { Box } from '@mui/system'
import React from 'react'
import UserTable from './UserTable'
import StaffTable from './StaffTable'

export const User = () => {
    return (
        <Box>
            <UserTable />
            <StaffTable />
        </Box>
    )
}
