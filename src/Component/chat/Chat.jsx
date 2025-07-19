import {
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';


export default  Chat = ({ }) => {
    const handleSend = () => {
        if (message.trim()) {
            console.log('Send message:', message);
            setMessage('');
        }
    };
    const [message, setMessage] = useState('');

    return (
        <Card sx={{ width: 320, boxShadow: 6, borderRadius: 2 }}>
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
                    <Typography color="text.secondary">
                        Support: Hello! How can I help you?
                    </Typography>
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
    )

}