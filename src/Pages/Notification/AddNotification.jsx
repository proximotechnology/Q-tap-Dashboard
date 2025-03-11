import React, { useState } from 'react';
import { Box, Modal, TextField, Button, IconButton, Typography, Divider } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { toast } from 'react-toastify';

export const AddNotification = ({ open, handleClose, addNotification }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
 

    // add notification to api
    const handleSend = () => {
        // Validate inputs
        if (!title.trim() || !content.trim()) {
            alert('Please fill in all required fields');
            return;
        }

        const noteData = {
            title: title,
            content: content
        };

        fetch('https://highleveltecknology.com/Qtap/api/note', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            },
            body: JSON.stringify(noteData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Clear the form
                setTitle('');
                setContent('');
                // Close the modal
                handleClose();
                // Optional: Show success message
                // toast.success('Notification sent successfully!');   
            } else {
                toast.error('Failed to send notification');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            toast.error('Error sending notification');
        });
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Box
                    sx={{
                        width: '370px',
                        backgroundColor: 'white',
                        borderRadius: '15px',
                        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
                        padding: '20px',
                        textAlign: 'center',
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant='body1' sx={{ fontSize: "14px", color: "#575756" }}>Send Notification</Typography>
                        <IconButton onClick={handleClose}>
                            <span className="icon-close-1" style={{ fontSize: "14px" }}></span>
                        </IconButton>
                    </Box>
                    <Divider sx={{ marginBottom: "15px", backgroundColor: "#F78E20" }} />
                    <TextField
                        placeholder="Title (En)"
                        variant="outlined"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{ marginBottom: '15px' }}
                        InputProps={{
                            sx: {
                                height: '40px',
                                fontSize: '12px',
                                borderRadius: "6px",
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                    borderBottom:".5px solid rgba(0, 0, 0, 0.1)"
                                },
                            },
                        }}
                    />
                    <TextField
                        placeholder="Aa"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={10}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        sx={{ marginBottom: '15px' }}
                        InputProps={{
                            sx: {
                                fontSize: '12px',
                                borderRadius: "6px",
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                    borderBottom:".5px solid rgba(0, 0, 0, 0.1)"
                                },
                            },
                        }}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            onClick={handleSend}
                            sx={{
                                backgroundColor: '#222240',
                                color: 'white',
                                width: '45%',
                                borderRadius: '30px',
                                textTransform: 'capitalize',
                                padding: '3px 20px',
                                fontSize: '13px',
                                "&:hover": { backgroundColor: '#222240' },
                            }}
                            endIcon={<ArrowRightAltIcon sx={{ color: '#E57C00' }} />}
                        >
                            Send
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};
