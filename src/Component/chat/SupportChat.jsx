import { useState } from 'react';
import {
    Box,
    IconButton,
    useTheme
} from '@mui/material';

import { UserInfoForm } from './UserInfoForm';

export default function SupportChat() {
    const [isOpen, setIsOpen] = useState(false);


    const toggleChat = () => {
        setIsOpen(!isOpen);
    };


    return (
        <>
            {/* Button renders inline in header */}
            <IconButton color="inherit" onClick={toggleChat} sx={{
                marginRight: "30px"
            }}>
                <img
                    src="/images/help.jpg"
                    alt="icon"
                    style={{ width: "20px", height: "20px", }}
                />
            </IconButton>

            {/* Floating Chat Panel */}
            {isOpen && (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 16,
                        right: 16,
                        zIndex: 1300, // above app bar
                    }}
                >

                    <UserInfoForm toggleChat={toggleChat} />
                    {/* <Chat /> */}
                </Box>
            )}
        </>
    );
}





