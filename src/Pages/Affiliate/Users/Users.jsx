import React, { useEffect, useState } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Menu, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { useNavigate } from 'react-router';
import * as XLSX from 'xlsx';
import axios from 'axios';

export const Users = () => {
    const navigate = useNavigate();
    const [activeUsers, setActiveUsers] = useState([]);
    const [inactiveUsers, setInactiveUsers] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event, user) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(user);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedUser(null);
    };

    const getUsers = async () => {
        try {
            const response = await axios.get('https://highleveltecknology.com/Qtap/api/affiliate', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });

            if (response.data.success) {
                setActiveUsers(response.data.affiliates_active || []);
                setInactiveUsers(response.data.affiliates_inactive || []);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // active users
    const handleActiveUsers = async (userId) => {
        try {
            const response = await axios.post(`https://highleveltecknology.com/Qtap/api/qtap_affiliate/${userId}`, {
                status: "active"
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            })
            getUsers();
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    const exportToExcel = () => {
        const allUsers = [...activeUsers, ...inactiveUsers];
        const worksheet = XLSX.utils.json_to_sheet(allUsers);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
        XLSX.writeFile(workbook, "users.xlsx");
    };

    useEffect(() => {
        getUsers();
    }, []);

    const allUsers = [...activeUsers, ...inactiveUsers];

    return (
        <Box>
            <Paper sx={{ padding: "15px", borderRadius: 5, height: '80vh' }}>
                <Box display="flex" justifyContent="space-between" textAlign="center" alignItems="center" mb={1}>
                    <Typography variant="h5" color="#575756" sx={{ display: 'flex', fontSize: "14px", alignItems: 'center' }}>
                        <Box sx={{ fill: "#D8E0E0" }}>
                            <img src="/assets/Clients.svg" alt="icon" style={{
                                filter: "invert(86%) sepia(7%) saturate(400%) hue-rotate(125deg) brightness(95%) contrast(92%)"
                                , width: "22px", height: "23px", marginRight: "10px"
                            }} />
                        </Box>
                        Users
                    </Typography>
                    <Box>
                        <IconButton>
                            <span className="icon-magnifier" style={{ fontSize: "16px" }}></span>
                        </IconButton>

                        <Button
                            onClick={() => navigate('/add-user')}
                            sx={{ color: '#E57C00', textTransform: 'capitalize', fontSize: "12px" }}
                        >
                            Add<AddIcon sx={{ color: "#575756", fontSize: "10px" }} />
                        </Button>

                        <Button
                            onClick={exportToExcel}
                            sx={{ color: '#E57C00', textTransform: 'capitalize', fontSize: "11px" }}
                        >
                            Export <ArrowForwardIosOutlinedIcon sx={{ color: "#575756", fontSize: "10px" }} />
                        </Button>
                    </Box>
                </Box>

                <TableContainer>
                    <Table sx={{ borderCollapse: 'separate', borderSpacing: '0 5px' }}>
                        <TableHead>
                            <TableRow sx={{ height: "20px" }}>
                                {["Name", "ID", "Email", "Status", ""].map((header) => (
                                    <TableCell
                                        key={header}
                                        sx={{
                                            fontSize: "10px",
                                            padding: "0px 10px",
                                            borderBottom: "none",
                                            textAlign: "left",
                                            color: "#575756",
                                        }}
                                    >
                                        {header}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {allUsers.map((user, index) => (
                                <TableRow
                                    key={user.id}
                                    sx={{
                                        height: "20px",
                                        backgroundColor: index % 2 === 0 ? '#EBEDF3' : 'white',
                                        '& td:first-of-type': {
                                            borderTopLeftRadius: '20px',
                                            borderBottomLeftRadius: '20px',
                                        },
                                        '& td:last-of-type': {
                                            borderTopRightRadius: '20px',
                                            borderBottomRightRadius: '20px',
                                        },
                                    }}
                                >
                                    <TableCell sx={{ fontSize: '10px', padding: "0px 8px", borderBottom: "none" }}>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <span style={{
                                                backgroundColor: "white",
                                                borderRadius: "50%",
                                                display: 'inline-flex',
                                                justifyContent: 'center',
                                                alignItems: "center",
                                                marginRight: '5px',
                                                width: "22px",
                                                height: "22px",
                                                color: "#686666",
                                            }}>
                                                {user.img ? (
                                                    <img
                                                        src={`https://highleveltecknology.com/Qtap/${user.img}`}
                                                        alt={user.name}
                                                        style={{
                                                            width: "22px",
                                                            height: "22px",
                                                            borderRadius: "50%",
                                                            objectFit: "cover"
                                                        }}
                                                    />
                                                ) : (
                                                    <PersonOutlineOutlinedIcon sx={{ fontSize: "15px" }} />
                                                )}
                                            </span>
                                            {user.name}
                                        </Box>
                                    </TableCell>

                                    <TableCell sx={{ fontSize: '10px', padding: "0px 8px", borderBottom: "none" }}>
                                        #{user.id}
                                    </TableCell>

                                    <TableCell sx={{ fontSize: '10px', padding: "0px 8px", borderBottom: "none" }}>
                                        {user.email}
                                    </TableCell>

                                    <TableCell sx={{ fontSize: '11px', padding: "0px 8px", borderBottom: "none"  }}>
                                        <span
                                            onClick={() => handleActiveUsers(user.id)}
                                         style={{
                                            backgroundColor: user.status === 'active' ? '#ef7d00' : '#575756',
                                            color: 'white',
                                            borderRadius: '30px',
                                            padding: "3px 10px",
                                            cursor: "pointer"
                                        }}>
                                            {user.status}
                                        </span>
                                    </TableCell>

                                    <TableCell sx={{ padding: "0px 8px", borderBottom: "none" }}>
                                        <IconButton onClick={(e) => handleClick(e, user)}>
                                            <DragHandleIcon sx={{ color: 'gray', fontSize: '16px' }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            width: 90,
                            boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.1)",
                        },
                    }}
                >
                    <Box onClick={handleClose} sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton>
                            <img src="/assets/setting.svg" alt="icon" style={{ width: "16px", height: "16px" }} />
                        </IconButton>
                        <Typography variant="body2" sx={{ color: "#575756", fontSize: "10px" }}>Edit</Typography>
                    </Box>
                    <Box onClick={handleClose} sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton>
                            <span className="icon-delete" style={{ fontSize: "15px" }}></span>
                        </IconButton>
                        <Typography variant="body2" sx={{ color: "#575756", fontSize: "10px" }}>Delete</Typography>
                    </Box>
                </Menu>
            </Paper>
        </Box>
    );
};
