import { Box } from '@mui/system'
import React from 'react'
import { Row1 } from './Row1'
import { Row2 } from './Row2'
import { Row3 } from './Row3'

export const DashboardAffiliate = () => {
  return (
    <Box sx={{padding:"0px 20px"}}>
      <Row1/>
      <Row2 /> 
      <Row3/>

    </Box>
  )
}
