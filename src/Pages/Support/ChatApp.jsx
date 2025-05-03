
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Grid, Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Paper, TextField, IconButton, Typography, Divider, Badge } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Menu, MenuItem } from '@mui/material';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import axios from 'axios';
import Pusher from 'pusher-js';
import './chat.css';

const ChatApp = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  // Fetch customers from API
  const fetchCustomers = useCallback(async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('https://api.qutap.co/api/customer_info', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers(response.data.customer_info.map(customer => ({
        ...customer,
        hasNewMessage: false,
        lastMessageTime: customer.created_at,
      })));
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  }, []);

  // Fetch chat messages for selected customer
  const fetchMessages = useCallback(async (customerId) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`https://api.qutap.co/api/chat?customer_id=${customerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const allMessages = [
        ...(response.data.customer || []).map(msg => ({
          ...msg,
          sender: msg.sender_type === 'customer' ? 'customer' : 'me',
        })),
        ...(response.data.support || []).map(msg => ({
          ...msg,
          sender: msg.sender_type === 'support' ? 'me' : 'customer',
        })),
      ].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      setMessages(allMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, []);

  // Send message
  const handleSendMessage = useCallback(async () => {
    if (!selectedCustomer || !messageInput.trim()) return;
    try {
      const token = localStorage.getItem('adminToken');
      const payload = {
        sender_id: localStorage.getItem("adminId") ,
        receiver_id: selectedCustomer.id,
        sender_type: 'support',
        message: messageInput,
      };
      await axios.post('https://api.qutap.co/api/chat', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(prev => [
        ...prev,
        {
          message: messageInput,
          sender: 'me',
          created_at: new Date().toISOString(),
        },
      ]);
      setCustomers(prev =>
        prev.map(c =>
          c.id === selectedCustomer.id
            ? { ...c, lastMessageTime: new Date().toISOString() }
            : c
        )
      );
      setMessageInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, [selectedCustomer, messageInput]);

  // Select customer and fetch their messages
  const handleSelectCustomer = useCallback((customer) => {
    setSelectedCustomer(customer);
    fetchMessages(customer.id);
    setCustomers(prev =>
      prev.map(c =>
        c.id === customer.id ? { ...c, hasNewMessage: false } : c
      )
    );
  }, [fetchMessages]);

  // Pusher setup for real-time updates
  useEffect(() => {
    const pusher = new Pusher('63b495891d2c3cff9d36', { cluster: 'eu' });
    const channel = pusher.subscribe('notify-channel');

    channel.bind('form-submitted', (data) => {
      console.log('Pusher event received:', data); // Debugging log
      if (data?.type === 'chat') {
        const newMessage = data.message;
        if (newMessage.sender_type === 'customer') {
          // Ensure message is added to the correct customer's chat
          if (selectedCustomer && newMessage.sender_id === selectedCustomer.id) {
            setMessages(prev => [
              ...prev,
              {
                ...newMessage,
                sender: 'customer',
              },
            ]);
          }
          setCustomers(prev => {
            const updated = prev.map(c =>
              c.id === newMessage.sender_id
                ? {
                  ...c,
                  hasNewMessage: c.id !== selectedCustomer?.id,
                  lastMessageTime: newMessage.created_at,
                }
                : c
            );
            return updated;
          });
        }
      } else if (data?.type === 'customer_added') {
        const newCustomer = data.customer;
        console.log('New customer received:', newCustomer); // Debugging log
        setCustomers(prev => {
          // Prevent duplicate customers
          if (prev.find(c => c.id === newCustomer.id)) {
            return prev;
          }
          return [
            {
              ...newCustomer,
              hasNewMessage: false,
              lastMessageTime: newCustomer.created_at,
            },
            ...prev,
          ];
        });
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [selectedCustomer]);

  // Initial fetch
  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  // Sort customers by last message time
  const sortedCustomers = useMemo(() => {
    return [...customers].sort((a, b) =>
      new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
    );
  }, [customers]);

  // Menu handlers
  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  return (
    <Paper sx={{ height: '70vh', borderRadius: '20px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px 20px', justifyContent: "start" }}>
        <Typography variant='body2' sx={{ fontSize: '12px', color: '#363535fa' }}>
          Live Chat
        </Typography>
        <IconButton title='reload if new customer send message' onClick={fetchCustomers} sx={{ color: '#363535fa' }}>
          <RefreshIcon sx={{ fontSize: '18px' }} />
        </IconButton>
      </Box>

      <Grid container sx={{ height: 'calc(70vh - 60px)' }}>
        <Grid item width='30%' sx={{ height: '100%' }}>
          <List sx={{ maxHeight: '100%', overflowY: 'auto' }}>
            {sortedCustomers.map((customer) => (
              <ListItem
                button
                key={customer.id}
                onClick={() => handleSelectCustomer(customer)}
                sx={{
                  fontSize: '12px',
                  padding: '3px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  '&:hover': { backgroundColor: '#f7f7f7fa' },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ListItemAvatar>
                    <Badge
                      color='error'
                      variant='dot'
                      invisible={!customer.hasNewMessage}
                    >
                      <Avatar
                        sx={{
                          backgroundColor: selectedCustomer?.id === customer.id ? '#ef7d00' : '#AAAAAA',
                          width: 35,
                          height: 35,
                        }}
                      >
                        <PersonOutlineOutlinedIcon sx={{ fontSize: '18px' }} />
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography sx={{ fontSize: '11px', color: '#575756' }}>{customer.name}</Typography>}
                    secondary={<Typography sx={{ fontSize: '8px', color: 'gray', marginLeft: '10px' }}>{customer.email}</Typography>}
                  />
                </Box>
                <Typography
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    fontSize: '8px',
                    textAlign: 'right',
                  }}
                >
                  <span style={{ color: '#AAAAAA' }}>
                    {new Date(customer.lastMessageTime).toLocaleDateString()}
                  </span>
                  <span style={{ color: '#AAAAAA' }}>
                    {new Date(customer.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </Typography>
              </ListItem>
            ))}
          </List>
        </Grid>

        <Divider
          orientation='vertical'
          flexItem
          sx={{ borderRightWidth: 1, borderColor: '#d3d3d3', height: '100%' }}
        />

        <Grid item width='65%' sx={{ height: '100%' }}>
          {selectedCustomer ? (
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box sx={{ padding: '0px 20px', flexGrow: 1, overflowY: 'auto' }}>
                <Box display='flex' justifyContent='space-between'>
                  <Typography sx={{ color: '#3c3d3d', fontSize: '12px' }}>{selectedCustomer.name}</Typography>
                  <Box>
                    <LocalPhoneIcon sx={{ fontSize: '20px', color: '#3c3d3d', margin: '0px 13px', cursor: 'pointer' }} />
                    <PersonOutlineOutlinedIcon sx={{ fontSize: '20px', color: '#3c3d3d', cursor: 'pointer' }} onClick={handleOpenMenu} />
                  </Box>
                </Box>
                <Divider />
                {messages.map((msg, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: msg.sender === 'me' ? '#E57C00' : '#F1F1F1',
                        color: msg.sender === 'me' ? 'white' : 'black',
                        padding: '6px 20px',
                        margin: '3px 0px',
                        width: '50%',
                        maxWidth: '70%',
                        fontSize: '12px',
                        borderRadius: msg.sender === 'me' ? '30px 30px 0px 30px' : '30px 30px 30px 0px',
                      }}
                    >
                      {msg.message}
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
                  padding: '20px 40px',
                  width: '100%',
                  gap: 1,
                  margin: '0 auto',
                }}
              >
                <TextField
                  fullWidth
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder='Type your message'
                  InputProps={{
                    sx: {
                      height: '30px',
                      borderRadius: '20px',
                      backgroundColor: '#EBEDF3',
                      fontSize: '12px',
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                      display: 'flex',
                      alignItems: 'center',
                    },
                  }}
                />
                <IconButton onClick={handleSendMessage} sx={{ color: '#ef7d00' }}>
                  <span className='icon-send-message' style={{ fontSize: '18px', WebkitTextFillColor: '#ef7d00' }}></span>
                </IconButton>
              </Box>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <IconButton>
                <WhatsAppIcon sx={{ color: 'gray', fontSize: '55px' }} />
              </IconButton>
              <Typography variant='body1' sx={{ fontSize: '16px', color: 'gray' }}>
                Select a chat to start messaging.
              </Typography>
            </Box>
          )}
        </Grid>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          PaperProps={{ sx: { minWidth: '100px' } }}
        >
          <MenuItem>
            <PersonOutlineOutlinedIcon sx={{ fontSize: 16, color: '#575756', marginRight: '10px' }} />
            <Box>
              <Typography sx={{ fontSize: '10px', color: '#575756' }}>Name:</Typography>
              <Typography sx={{ fontSize: '10px', color: 'gray' }}>{selectedCustomer ? selectedCustomer.name : 'Name'}</Typography>
            </Box>
          </MenuItem>
          <MenuItem>
            <LocalPhoneOutlinedIcon sx={{ fontSize: 15, marginRight: '10px' }} />
            <Box>
              <Typography sx={{ fontSize: '10px', color: '#575756' }}>Mobile:</Typography>
              <Typography sx={{ fontSize: '10px', color: 'gray' }}>{selectedCustomer ? selectedCustomer.phone : 'Mobile'}</Typography>
            </Box>
          </MenuItem>
          <MenuItem>
            <MailOutlineIcon sx={{ fontSize: 15, marginRight: '10px' }} />
            <Box>
              <Typography sx={{ fontSize: '10px', color: '#575756' }}>Email:</Typography>
              <Typography sx={{ fontSize: '10px', color: 'gray' }}>{selectedCustomer ? selectedCustomer.email : 'Email'}</Typography>
            </Box>
          </MenuItem>
          <MenuItem>
            <AddLocationAltOutlinedIcon sx={{ fontSize: 15, marginRight: '10px' }} />
            <Box>
              <Typography sx={{ fontSize: '10px', color: '#575756' }}>Address:</Typography>
              <Typography sx={{ fontSize: '10px', color: 'gray' }}>{selectedCustomer ? selectedCustomer.address : 'Address'}</Typography>
            </Box>
          </MenuItem>
        </Menu>
      </Grid>
    </Paper>
  );
};

export default ChatApp;