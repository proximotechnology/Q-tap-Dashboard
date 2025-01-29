import React from 'react'

import {Grid } from '@mui/material';
import { Box } from '@mui/system';
import { BarChart1 } from '../../../Pages/DashboardClient/Pages/DashHome/Row2/BarChart1';
import SalesVolumeCard from '../../../Pages/DashboardClient/Pages/DashHome/Row2/SalesVolumeCard/SalesVolumeCard';
import { ClientsLog } from './ClientsLog';


export const Row2 = () => {
  return (
    <Box sx={{  padding: '5px 20px 20px 20px' }}>
    <Grid container spacing={3}>
      <Grid item xs={12} md={7}>
        <BarChart1 />
        <SalesVolumeCard /> 
      </Grid>

      <Grid item xs={12} md={5}>
        <ClientsLog/>
      </Grid>
    </Grid>
  </Box>
  )
}
