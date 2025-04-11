import React from 'react'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import {useColorMode} from '../context/ThemeModeProvider'
import { Box, useTheme } from '@mui/system';
import { Switch } from '@mui/material';
const DarkModeSwitch = () => {
    const { toggleColorMode, mode } = useColorMode();
    const theme = useTheme();
    return (
        <Box sx={{ marginInlineEnd: "20px", display: "flex", justifyContent: "center", textAlign: "center", alignItems: "center" }}>
            <LightModeOutlinedIcon onClick={toggleColorMode}
                sx={{ fontSize: "20px", fill: mode === 'light' ? '#ff9800' : '#575756' }} />
            <Switch
                checked={mode === 'light'}
                onChange={toggleColorMode}
                sx={{
                    margin: "0px -10px !important",
                    transform: 'scale(0.8)', // تصغير الحجم العام
                    '& .MuiSwitch-switchBase': {
                        padding: -1, // تصغير القاعدة
                    },
                    '& .MuiSwitch-thumb': {
                        width: 18, // تصغير النقطة
                        height: 18,
                        color: theme.palette.orangePrimary.main,
                    },
                    '& .MuiSwitch-track': {
                        borderRadius: 12,
                        height: 15,
                        width: 50, // تصغير المسار
                    },
                    '& .MuiSwitch-switchBase.Mui-checked': {
                        color: theme.palette.orangePrimary.main,
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: "#D8E0E0",
                    },
                }}
            />
            <DarkModeOutlinedIcon onClick={toggleColorMode}
                sx={{ fontSize: "20px", fill: mode === 'dark' ? '#ff9800' : '#575756' }} />
        </Box>
    )
}

export default DarkModeSwitch