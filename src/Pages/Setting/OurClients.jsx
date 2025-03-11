// import { Paper, Typography, Box, IconButton, CircularProgress } from '@mui/material';
// import React, { forwardRef, useImperativeHandle, useState } from 'react';
// import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { toast } from 'react-toastify';
// import PropTypes from 'prop-types';

// const OurClients = forwardRef((props, ref) => {
//     const [clients, setClients] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);

//     const validateImage = (file) => {
//         const maxSize = 5 * 1024 * 1024; // 5MB
//         const validTypes = ['image/jpeg', 'image/png', 'image/gif'];

//         if (!validTypes.includes(file.type)) {
//             toast.error('Please upload a valid image file (JPEG, PNG, or GIF)');
//             return false;
//         }

//         if (file.size > maxSize) {
//             toast.error('Image size should be less than 5MB');
//             return false;
//         }

//         return true;
//     };

//     const handleImageUpload = (event) => {
//         const file = event.target.files[0];
//         if (!file) return;

//         if (!validateImage(file)) return;

//         const reader = new FileReader();
//         reader.onloadend = () => {
//             setClients([...clients, {
//                 img: reader.result,
//                 title: file.name,
//                 id: Date.now() // Add unique ID for each client
//             }]);
//         };
//         reader.onerror = () => toast.error('Error reading file');
//         reader.readAsDataURL(file);
//     };

//     const handleRemoveClient = (id) => {
//         setClients(clients.filter(client => client.id !== id));
//     };

//     const handleSave = async () => {
//         if (clients.length === 0) {
//             toast.error("Please add at least one client image!");
//             return;
//         }

//         setIsLoading(true);

//         try {
//             const formData = {
//                 img: clients.map(client => client.img),
//                 title: clients.map(client => client.title)
//             };

//             console.log("formData", formData);

//             const response = await fetch('https://highleveltecknology.com/Qtap/api/settings/our-clients', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem("adminToken")}`
//                 },
//                 body: JSON.stringify(formData)
//             });

//             const data = await response.json();
//             console.log("data", data);

//             if (!response.ok) {
//                 throw new Error(data.error || 'Something went wrong');
//             }

//             toast.success("Clients Saved Successfully");
//             setClients([]); // Clear after successful save

//         } catch (error) {
//             toast.error(error.message);
//             console.error('Error:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useImperativeHandle(ref, () => ({
//         saveClients: handleSave,
//     }));

//     return (
//         <Paper sx={{ width: "100%", borderRadius: "20px", padding: "20px 30px" }}>
//             <Typography variant='body2' sx={{ color: "#cacacaf1", fontSize: "11px", mb: 2 }}>
//                 W:500px H:500px
//             </Typography>

//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
//                 {clients.map((client) => (
//                     <Box
//                         key={client.id}
//                         sx={{
//                             position: 'relative',
//                             width: "120px",
//                             height: "120px",
//                         }}
//                     >
//                         <Box
//                             sx={{
//                                 width: "100%",
//                                 height: "100%",
//                                 borderRadius: "50%",
//                                 overflow: "hidden",
//                                 backgroundColor: "#eeeeeef1",
//                             }}
//                         >
//                             <img
//                                 src={client.img}
//                                 alt={client.title}
//                                 style={{
//                                     width: '100%',
//                                     height: '100%',
//                                     objectFit: 'cover'
//                                 }}
//                             />
//                         </Box>
//                         <IconButton
//                             size="small"
//                             sx={{
//                                 position: 'absolute',
//                                 top: -8,
//                                 right: -8,
//                                 backgroundColor: '#fff',
//                                 '&:hover': { backgroundColor: '#f5f5f5' }
//                             }}
//                             onClick={() => handleRemoveClient(client.id)}
//                         >
//                             <DeleteIcon fontSize="small" />
//                         </IconButton>
//                     </Box>
//                 ))}

//                 <Box
//                     sx={{
//                         width: "120px",
//                         height: "120px",
//                         borderRadius: "50%",
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         backgroundColor: "#eeeeeef1",
//                         cursor: isLoading ? "not-allowed" : "pointer",
//                         opacity: isLoading ? 0.7 : 1
//                     }}
//                     onClick={() => !isLoading && document.getElementById('client-image-upload').click()}
//                 >
//                     {isLoading ? (
//                         <CircularProgress size={24} />
//                     ) : (
//                         <AddIcon sx={{ fontSize: "30px", color: "gray" }} />
//                     )}
//                 </Box>

//                 <input
//                     type="file"
//                     id="client-image-upload"
//                     accept="image/*"
//                     style={{ display: 'none' }}
//                     onChange={handleImageUpload}
//                 />
//             </Box>
//         </Paper>
//     );
// });

// OurClients.propTypes = {
//     ref: PropTypes.oneOfType([
//         PropTypes.func,
//         PropTypes.shape({ current: PropTypes.instanceOf(Element) })
//     ])
// };

// export default OurClients;


import { Paper, Typography, Box, IconButton, CircularProgress } from '@mui/material';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const OurClients = forwardRef((props, ref) => {
    const [clients, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const validateImage = (file) => {
        const maxSize = 5 * 1024 * 1024; // 5MB
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];

        if (!validTypes.includes(file.type)) {
            toast.error('Please upload a valid image file (JPEG, PNG, or GIF)');
            return false;
        }

        if (file.size > maxSize) {
            toast.error('Image size should be less than 5MB');
            return false;
        }

        return true;
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!validateImage(file)) return;

        setClients([...clients, {
            id: Date.now(), // Unique ID for each client
            img: file, // Store the file object directly
            title: file.name,
        }]);
    };

    const handleRemoveClient = (id) => {
        setClients(clients.filter(client => client.id !== id));
    };

    const handleSave = async () => {
        if (clients.length === 0) {
            toast.error("Please add at least one client image!");
            return;
        }

        setIsLoading(true);

        try {
            const formData = new FormData();

            // Append each client's image and title to FormData
            clients.forEach(client => {
                if (client.img) {
                    // Append image file directly to FormData
                    formData.append('img[]', client.img); // Send file in the correct format
                }

                if (client.title) {
                    // Append title directly as plain text
                    formData.append('title[]', client.title); // Send title as string
                }
            });

            const response = await fetch('https://highleveltecknology.com/Qtap/api/settings/our-clients', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("adminToken")}`,
                },
                body: formData
            });

            const data = await response.json();
            console.log("data", data);

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            toast.success("Clients Saved Successfully");
            setClients([]); // Clear after successful save

        } catch (error) {
            toast.error(error.message);
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useImperativeHandle(ref, () => ({
        saveClients: handleSave,
    }));

    return (
        <Paper sx={{ width: "100%", borderRadius: "20px", padding: "20px 30px" }}>
            <Typography variant='body2' sx={{ color: "#cacacaf1", fontSize: "11px", mb: 2 }}>
                W:500px H:500px
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2  ,padding: "20px 20px"}}>
                {clients.map((client) => (
                    <Box
                        key={client.id}
                        sx={{
                            position: 'relative',
                            width: "120px",
                            height: "120px",
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "50%",
                                overflow: "hidden",
                                backgroundColor: "#eeeeeef1",
                            }}
                        >
                            <img
                                src={URL.createObjectURL(client.img)} // Display image from File object
                                alt={client.title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        </Box>
                        <IconButton
                            size="small"
                            sx={{
                                position: 'absolute',
                                top: -8,
                                right: -8,
                                backgroundColor: '#fff',
                                '&:hover': { backgroundColor: '#f5f5f5' }
                            }}
                            onClick={() => handleRemoveClient(client.id)}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                ))}

                <Box
                    sx={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#eeeeeef1",
                        cursor: isLoading ? "not-allowed" : "pointer",
                        opacity: isLoading ? 0.7 : 1
                    }}
                    onClick={() => !isLoading && document.getElementById('client-image-upload').click()}
                >
                    {isLoading ? (
                        <CircularProgress size={24} />
                    ) : (
                        <AddIcon sx={{ fontSize: "50px", fontWeight: "bolder", color: "gray", opacity: 0.5 }} />
                    )}
                </Box>

                <input
                    type="file"
                    id="client-image-upload"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                />
            </Box>
        </Paper>
    );
});

OurClients.propTypes = {
    ref: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ])
};

export default OurClients;
