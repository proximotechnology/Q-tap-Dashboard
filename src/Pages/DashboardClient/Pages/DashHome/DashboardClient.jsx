import React from 'react'
import  Row1  from './Row1/Row1'
import { Row2 } from './Row2/Row2'
import { Box } from '@mui/material'



export const DashboardClient = () => {
  return (
    <Box >
      <Row1 /> 
      <Row2 />
    </Box>
  )
  
}
