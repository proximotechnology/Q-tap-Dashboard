import { useState } from 'react';
import {
    Box,
    IconButton,
    useTheme
} from '@mui/material';

import { UserInfoForm } from './UserInfoForm';
import { usePlanPricingStore } from '../../store/zustand-store/user-chat-data-store';
import ChatCard from './ChatCard';

export default function SupportChat() {
    const [isOpen, setIsOpen] = useState(false);


    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const { isLoged } = usePlanPricingStore()
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

                    {
                        isLoged ?
                            <ChatCard />
                            :
                            <UserInfoForm toggleChat={toggleChat} />
                    }
                </Box>
            )}
        </>
    );
}





