
import { SetupPage } from '../Business-info/SetupPage';
import { Branches } from './Branches';
import React, { useEffect, } from 'react';
import { Box, Grid, useTheme } from '@mui/material';
import Language from '../dashboard/TopBar/Language';

export const BranchesPage = () => {
    const theme = useTheme()
    let isDarkMode = theme.palette.mode === "dark"
    return (
        <Grid
            container
            sx={{
                backgroundColor: theme.palette.bodyColor.white_333, backgroundImage: isDarkMode ? 'none' : 'url(/images/Rectangle.png)',
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
                        insetInlineEnd: '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        zIndex: 10000
                    }}
                >
                    <img
                        src="/images/help.jpg"
                        alt="icon"
                        style={{ width: "20px", height: "20px", marginRight: "30px" }}
                    />

                    <Language />
                </Box>

                <Branches />
            </Grid>
        </Grid>
    );
};