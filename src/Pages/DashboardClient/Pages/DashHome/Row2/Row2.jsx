import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

import { UsersLog } from './UsersLog'
import { BarChart1 } from './BarChart1'
import SalesVolumeCard from './SalesVolumeCard/SalesVolumeCard'


export const Row2 = () => {
  return (
    <Box sx={{ paddingTop: '20px'  }}>
    <Grid container spacing={3}>
      <Grid item xs={12} md={7}>
        <BarChart1 />
        <SalesVolumeCard /> 
      </Grid>

      <Grid item xs={12} md={5}>
        <UsersLog />
      </Grid>

      
    </Grid>
  </Box>
  )
}
