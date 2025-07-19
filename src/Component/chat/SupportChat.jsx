import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

export default function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (message.trim()) {
      console.log('Send message:', message);
      setMessage('');
    }
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 9999 }}>
      {/* Toggle Chat Button */}
      <IconButton
        color="primary"
        onClick={toggleChat}
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          '&:hover': { bgcolor: 'primary.dark' },
          width: 56,
          height: 56,
        }}
      >
        <ChatIcon />
      </IconButton>

      {/* Chat Card */}
      {isOpen && (
        <Card
          sx={{
            mt: 2,
            width: 320,
            boxShadow: 6,
            borderRadius: 2,
          }}
        >
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6">Support Chat</Typography>

            <Box
              sx={{
                bgcolor: '#f1f1f1',
                height: 160,
                overflowY: 'auto',
                p: 1,
                borderRadius: 1,
                fontSize: 14,
              }}
            >
              <Typography color="text.secondary">Support: Hello! How can I help you?</Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button variant="contained" onClick={handleSend}>
                Send
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
