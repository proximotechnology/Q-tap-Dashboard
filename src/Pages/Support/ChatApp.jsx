import React, { useState } from 'react';
import { Grid, Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Paper, TextField, IconButton, Typography, Divider } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Menu, MenuItem } from '@mui/material';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import './chat.css';


const messagesData = [
    { id: 5, name: "Mostafa Adel", address: "tanta", mobile: "0111111111", email: "mostafa@gmail.com", avatarColor: "gray", lastMessage: "Lorem ipsum dolor sit amet.", time: "08:30pm", date: '20/02/2024' },
    { id: 1, name: "Mohamed said", address: "tanta", mobile: "02222222222", email: "Mohamed@gmail.com", avatarColor: "#ef7d00", lastMessage: "Lorem ipsum dolor sit amet.", time: "03:30pm", date: '20/02/2024' },
    { id: 2, name: "walaa Badwy", address: "tanta", mobile: "03333333333", email: "walaa@gmail.com", avatarColor: "gray", lastMessage: "Lorem ipsum dolor sit amet.", time: "04:30pm", date: '20/02/2024' },
    { id: 3, name: "Shimaa Nossier", address: "tanta", mobile: "0444444444", email: "Shimaa@gmail.com", avatarColor: "gray", lastMessage: "Lorem ipsum dolor sit amet.", time: "01:30pm", date: '20/02/2024' },
    { id: 4, name: "Afaf Nossier", address: "tanta", mobile: "055555555", email: "Afaf@gmail.com", avatarColor: "gray", lastMessage: "Lorem ipsum dolor sit amet.", time: "03:30pm", date: '20/02/2024' },
    { id: 6, name: "Ahmed Nossier", address: "tanta", mobile: "0666666666", email: "Ahmed@gmail.com", avatarColor: "gray", lastMessage: "Lorem ipsum dolor sit amet.", time: "05:30pm", date: '20/02/2024' },
];

const ChatApp = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [messageInput, setMessageInput] = useState('');

    const handleSelectChat = (chat) => {
        setSelectedChat(chat);
    };
    const handleSendMessage = () => {
        if (selectedChat && messageInput.trim()) {
            const updatedMessages = [
                ...(selectedChat.messages ? selectedChat.messages : []),
                {
                    text: messageInput,
                    time: new Date().toLocaleTimeString(),
                    sender: "me"
                }
            ];
            setSelectedChat({ ...selectedChat, messages: updatedMessages });
            setMessageInput('');
        }
    };

    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <Paper sx={{ height: "70vh", borderRadius: "20px" }}>
            <Typography variant='body2' sx={{ fontSize: "12px", padding: "20px", color: "#363535fa" }}>
                Live Chat
            </Typography>

            <Grid container>
                <Grid item width="30%">
                    <List>
                        {messagesData.map((user) => (
                            <ListItem
                                button
                                key={user.id}
                                onClick={() => handleSelectChat(user)}
                                sx={{
                                    fontSize: "12px",
                                    padding: "3px 20px",
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    '&:hover': {
                                        backgroundColor: "#f7f7f7fa"
                                    }
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <ListItemAvatar>
                                        <Avatar sx={{
                                            backgroundColor: selectedChat?.id === user.id ? "#ef7d00" : "#AAAAAA",
                                            width: 35, height: 35,
                                        }}>
                                            <PersonOutlineOutlinedIcon sx={{ fontSize: "18px" }} />
                                            {/* {user.name.charAt(0)} */}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={<Typography sx={{ fontSize: "11px", color: "#575756" }}>{user.name}</Typography>}
                                        secondary={<Typography sx={{ fontSize: "8px", color: "gray", marginLeft: "10px" }}>{user.lastMessage}</Typography>}
                                    />
                                </Box>
                                <Typography
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        fontSize: '8px',
                                        textAlign: 'right'
                                    }}
                                >
                                    <span style={{ color: "#AAAAAA" }}>{user.date}</span>
                                    <span style={{ color: "#AAAAAA" }}>{user.time}</span>
                                </Typography>

                            </ListItem>
                        ))}
                    </List>
                </Grid>

                <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                        borderRightWidth: 1,
                        borderColor: '#d3d3d3', height: "55vh "
                    }}
                />

                <Grid item width="65%">
                    {selectedChat ? (
                        <Box sx={{
                            height: 'calc(70vh - 70px)', display: 'flex',
                            flexDirection: 'column', justifyContent: 'space-between',
                        }}>
                            <Box sx={{ padding: "0px 20px", flexGrow: 1, overflowY: 'auto', }}>
                                <Box display={"flex"} justifyContent={"space-between"}>
                                    <Typography sx={{ color: "#3c3d3d", fontSize: "12px" }}>
                                        {selectedChat ? selectedChat.name : "Name"}
                                    </Typography>

                                    
                                    <Box>
                                        <span class="icon-magnifier" sx={{ fontSize: "20px", color: "#3c3d3d", cursor: "pointer" }} ></span>
                                        <LocalPhoneIcon sx={{ fontSize: "20px", color: "#3c3d3d", margin: "0px 13px", cursor: "pointer" }} />
                                        <PersonOutlineOutlinedIcon sx={{ fontSize: "20px", color: "#3c3d3d", cursor: "pointer" }} onClick={handleOpenMenu} />
                                    </Box>
                                </Box>
                                <Divider />

                                {selectedChat.messages && selectedChat.messages.map((msg, index) => (
                                    <Box key={index} sx={{ display: 'flex', justifyContent: msg.sender === 'me' ? 'flex-end' : 'flex-start' }}>

                                        <Box sx={{
                                            bgcolor: msg.sender === 'me' ? '#E57C00' : '#F1F1F1',
                                            color: msg.sender === 'me' ? 'white' : 'black', 
                                            padding: "6px 20px",

                                            margin: "3px 0px",width:"50% ",
                                            maxWidth: "70%", fontSize: "12px",

                                            borderRadius: msg.sender === 'me'? '30px 30px 0px 30px'
                                            :'30px 30px 30px 0px' ,
                                        }}>
                                            {msg.text}
                                        </Box>
                                    </Box>
                                ))}
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    padding: "20px 40px",
                                    width: '100%',
                                    gap: 1,
                                    margin: '0 auto', 
                                }}
                            >
                                <IconButton edge="start" sx={{ color: "#ef7d00" }}>
                                    <span class="icon-plus" style={{ fontSize: "22px", WebkitTextFillColor: "#ef7d00"}}>
                                        <span class="path1" ></span><span style={{WebkitTextFillColor: "white"}} class="path2"></span></span>
                                </IconButton>

                                <IconButton edge="start" sx={{ color: "#ef7d00" }}>
                                    <span class="icon-image" style={{ fontSize: "22px" }}></span>
                                </IconButton>

                                <TextField
                                    fullWidth
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    placeholder="Type your message"
                                    InputProps={{
                                        sx: {
                                            height: '30px',
                                            borderRadius: '20px',
                                            backgroundColor: '#EBEDF3',
                                            fontSize: '12px',
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                border: 'none',
                                            },
                                            display: 'flex',
                                            alignItems: 'center',
                                        },
                                    }}
                                />

                                <IconButton onClick={handleSendMessage} sx={{ color: "#ef7d00" }}>
                                    <span class="icon-send-message" style={{ fontSize: "18px", WebkitTextFillColor: "#ef7d00" }}></span>
                                </IconButton>
                            </Box>

                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                            <IconButton><WhatsAppIcon sx={{ color: "gray", fontSize: "55px" }} /> </IconButton>
                            <Typography variant='body1' sx={{ fontSize: "16px", color: "gray" }}>Select a chat to start messaging.</Typography>
                        </Box>
                    )}
                </Grid>


                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                    PaperProps={{
                        sx: {
                            minWidth: '100px',
                            
                        }
                    }}
                >
                    <MenuItem>
                        <PersonOutlineOutlinedIcon sx={{ fontSize: 16, color: '#575756', marginRight: '10px' }} />
                        <Box>
                            <Typography sx={{ fontSize: '10px', color: '#575756' }}>Name:</Typography>
                            <Typography sx={{ fontSize: '10px', color: 'gray' }}>{selectedChat ? selectedChat.name : "Name"}</Typography>
                        </Box>
                    </MenuItem>
                    <MenuItem>
                        <LocalPhoneOutlinedIcon sx={{ fontSize: 15, marginRight: '10px' }} />
                        <Box>
                            <Typography sx={{ fontSize: '10px', color: '#575756' }}>Mobile:</Typography>
                            <Typography sx={{ fontSize: '10px', color: 'gray' }}>{selectedChat ? selectedChat.mobile : "Mobile"}</Typography>
                        </Box>
                    </MenuItem>
                    <MenuItem>
                        <MailOutlineIcon sx={{ fontSize: 15, marginRight: '10px' }} />
                        <Box>
                            <Typography sx={{ fontSize: '10px', color: '#575756' }}>Email:</Typography>
                            <Typography sx={{ fontSize: '10px', color: 'gray' }}>{selectedChat ? selectedChat.email : "Email"}</Typography>
                        </Box>
                    </MenuItem>
                    <MenuItem>
                        <AddLocationAltOutlinedIcon sx={{ fontSize: 15, marginRight: '10px' }} />
                        <Box>
                            <Typography sx={{ fontSize: '10px', color: '#575756' }}>Address:</Typography>
                            <Typography sx={{ fontSize: '10px', color: 'gray' }}>{selectedChat ? selectedChat.address : "Address"}</Typography>
                        </Box>
                    </MenuItem>
                </Menu>

            </Grid>
        </Paper>
    );
};

export default ChatApp;
