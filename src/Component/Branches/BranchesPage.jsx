
import { SetupPage } from '../Business-info/SetupPage';
import { Branches } from './Branches';
import React, { useEffect, } from 'react';
import { Box, Grid, useTheme } from '@mui/material';
import { useBusinessContext } from '../../context/BusinessContext';
import Language from '../dashboard/TopBar/Language';

export const BranchesPage = () => {

    // Access context
    const { branches } = useBusinessContext();

    // Log branches data when the component mounts
    useEffect(() => {
        console.log('BranchesPage branches:', branches);
    }, [branches]);

    return (
        <Grid
            container
            sx={{
                backgroundImage: 'url(/images/Rectangle.png)',
                backgroundSize: '100% 100%',
                width: '100%',
                height: '100vh',
            }}
        >
            <SetupPage />

            <Grid item xs={12} md={8}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: "calc(1rem + 7px)",
                        insetInlineEnd : '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        zIndex:10000
                    }}
                >
                    <img
                        src="/assets/helplogo.svg"
                        alt="icon"
                        style={{ width: '25px', height: '25px', marginRight: '30px' }}
                    />

                    <Language/>
                </Box>

                <Branches />
            </Grid>
        </Grid>
    );
};