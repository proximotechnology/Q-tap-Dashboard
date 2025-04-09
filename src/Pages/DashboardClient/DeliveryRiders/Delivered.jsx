import { Box } from '@mui/system'
import React from 'react'
import { DeliveredHeader } from './DeliveredHeader'
import { DeliveredFooter } from './DeliveredFooter'
import { DeliveredBody } from './DeliveredBody/DeliveredBody'

export const Delivered = () => {
    return (

        <Box sx={{ backgroundColor: "#EBEDF3", position:'relative'}}>
            <DeliveredHeader />
            <DeliveredBody /> 
            <DeliveredFooter />

        </Box>
    )
}
