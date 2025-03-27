
import React, { useState } from 'react';
import { Box, Menu, MenuItem, Divider } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { useTranslation } from 'react-i18next';


export const Language = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const open = Boolean(anchorEl);
    const {i18n} = useTranslation()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log("open")

    };

    const handleClose = (language) => {
        if (language) {
            setSelectedLanguage(language);
            i18n.changeLanguage(language)
        }
        setAnchorEl(null);
        console.log("close")
    };


    const getLanguageIcon = () => {
        if (selectedLanguage === 'ar') {
            return <LanguageOutlinedIcon sx={{ width: "22px", color: "#E57C00", height: "22px", }} />

        } else if (selectedLanguage === 'en') {
            return <span class="icon-translation" style={{ width: "22px", color: "#E57C00", height: "22px", }}></span>
        }
        return <LanguageOutlinedIcon sx={{ fontSize: "22px", color: "#E57C00", marginRight: '1px' }} />;
    };

    return (
        <Box sx={{ cursor: "pointer", display: "flex", alignItems: "center" }} >
            <Box onClick={handleClick} sx={{ display: "flex", alignItems: "center" }}>
                {getLanguageIcon()}
                <KeyboardArrowDownIcon sx={{ fontSize: "15px", color: "#575756" }} />
            </Box>

            <Menu disableScrollLock
                anchorEl={anchorEl}
                open={open}
                onClose={() => handleClose(null)}
                sx={{ padding: "2px" }}

            >
                <MenuItem onClick={() => handleClose('en')} >
                    <span class="icon-translation" style={{ width: "23px", height: "23px", marginRight: '8px' }}></span>
                    <span style={{ fontSize: "12px", color: "#575756" }}>English</span>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => handleClose('ar')}>
                    <LanguageOutlinedIcon sx={{ width: "25px", height: "25px", marginRight: '8px' }} />
                    <span style={{ fontSize: "12px", color: "#575756" }}>Arabic</span>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default Language;
