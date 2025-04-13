import { Box } from '@mui/system'
import React from 'react'
import UserOptions from './UserOptions'
import Language from './dashboard/TopBar/Language'
import DarkModeSwitch from './DarkModeSwitch'
import { Grid } from '@mui/material'



const SidebarExtraMobileSection = ({ customSX = {} }) => {
    return (
        <Box sx={{ display: { xs: 'flex', sm: 'none' }, ...customSX }}>
            <Grid container>
                <Grid item xs={12} justifyContent={'center'}>
                <UserOptions customSX={{ justifyContent:'center' }} />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <Language />
                    <DarkModeSwitch />
                </Grid>


            </Grid>

        </Box>
    )
}

export default SidebarExtraMobileSection