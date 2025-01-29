import { forwardRef, useImperativeHandle, useState } from 'react';
import { Box, TextField, IconButton, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';

const URLInput = ({ label, setVideoUrl, value }) => (
    <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        mb={1}
    >
        <Typography textAlign="center" variant="body2" mb={1} sx={{ fontSize: "11px", color: "#575756" }}>
            {label}
        </Typography>
        <TextField
            variant="outlined"
            placeholder="Past Url Here"
            value={value}
            onChange={(e) => setVideoUrl(e.target.value)}
            fullWidth
            InputProps={{
                sx: {
                    borderRadius: '20px',
                    backgroundColor: '#EBEDF3',
                    height: '25px',
                    fontSize: '10px',
                    padding: '0 10px',
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                },
            }}
        />
    </Box>
);

export const Videos = forwardRef((props, ref) => {
    const [urls, setUrls] = useState(["Main", "Vid01"]);  
    const [videoUrls, setVideoUrls] = useState({});

    const addUrlInput = () => {
        const newLabel = `Vid${urls.length}`;  
        setUrls([...urls, newLabel]);
    };

    const handleUrlChange = (label, value) => {
        setVideoUrls(prev => ({
            ...prev,
            [label]: value
        }));
    };

    const handleSave = () => {
        const validUrls = Object.values(videoUrls)
            .filter(url => url.trim() !== '')
            .join(',');
        
        if (!validUrls) {
            toast.error("Please add at least one video URL!");
            return;
        }

        const bundleData = {
            video: validUrls
        };

        fetch('https://highleveltecknology.com/Qtap/api/settings/videos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            },
            body: JSON.stringify(bundleData)
        })
        .then(async response => {
            const data = await response.json();
            console.log("data ", data);
            if (!response.ok) {
                throw new Error(data.error || 'Failed to save videos');
            }
            return data;
        })
        .then(data => {
            toast.success('Video added successfully!');
        })
        .catch(error => {
            console.error('Error saving videos:', error);
            toast.error(error.message || "Failed to save videos!");
        });
    };
    // send handleSave to parent component
    useImperativeHandle(ref, () => ({
        saveVideos: handleSave,
      }));

    return (
        <Paper sx={{ width: "100%", borderRadius: "20px", height: "400px", padding: "20px 30px" }}>
            <Typography variant='body2' sx={{ color: "#cacacaf1", fontSize: "11px" }}>W:1500px H:500px</Typography>

            <Box display="flex" flexDirection="column" alignItems="center" p={3}>
                {urls.map((label, index) => (
                    <URLInput 
                        key={index} 
                        label={label}
                        value={videoUrls[label] || ''}
                        setVideoUrl={(value) => handleUrlChange(label, value)}
                    />
                ))}

                <IconButton onClick={addUrlInput}>
                    <AddIcon fontSize="large" sx={{ color: 'grey' }} />
                </IconButton>
            </Box>
        </Paper>
    );
});
