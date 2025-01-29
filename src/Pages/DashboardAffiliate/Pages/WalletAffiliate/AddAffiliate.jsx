import { Avatar, Button, Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Popover, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'

import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { useNavigate } from "react-router";
import { PersonalInfo } from './PersonalInfo';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { PaymentInfo } from '../../../Affiliate/AddUser/PaymentInfo';
import Language from '../../../DashboardClient/ComponentDashClient/TopBar/Language'

export const AddAffiliate = () => {
    const navigate = useNavigate();

    const [anchorElUser, setAnchorElUser] = useState(null);
    const openUserPopover = Boolean(anchorElUser);

    const handleUserClick = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleUserClose = () => {
        setAnchorElUser(null);
    };
    return (
        <Box sx={{ backgroundColor: "white", height: "100vh" }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    padding: "0px 60px",
                    justifyContent: "space-between",
                    width: "90%",
                    height: "70px",
                }}>
                <Box>
                    <img src="/images/qtap.PNG" alt='logo' width={"140px"} />
                </Box>

                {/* header */}
                <Box sx={{ display: "flex", alignItems: "center" }} gap={3}>
                    <Language />

                    <Box
                        aria-describedby={openUserPopover ? 'simple-popover' : undefined}
                        onClick={handleUserClick}
                        sx={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "3px" }}>
                        <IconButton color="inherit" sx={{
                            backgroundColor: '#ef7d00', borderRadius: '30%', padding: '5px',
                            '&:hover': {
                                backgroundColor: '#ef7d00',
                            }
                        }}>
                            <PersonOutlineOutlinedIcon sx={{ fontSize: "20px", color: "white" }} />
                        </IconButton>
                        <Typography variant="body1" sx={{ fontSize: "13px", color: "#575756" }}>User01</Typography>
                        <KeyboardArrowDownIcon sx={{ fontSize: "18px", color: "#575756" }} />
                    </Box>
                    <Popover
                        id={openUserPopover ? 'simple-popover' : undefined}
                        open={openUserPopover}
                        anchorEl={anchorElUser}
                        onClose={handleUserClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Box sx={{ width: 200, padding: '10px' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: '20px', gap: '10px' }}>
                                <Avatar sx={{ bgcolor: '#ef7d00', width: 40, height: 40 }}>
                                    <PersonOutlineOutlinedIcon sx={{ fontSize: "22px" }} />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontSize: "14px" }}>User01</Typography>
                                    <Typography variant="body2" sx={{ fontSize: "12px" }} color="textSecondary">Mail@mail.com</Typography>
                                </Box>
                            </Box>
                            <Divider />

                            <List>
                                <Box
                                    onClick={() => navigate('/')}
                                    sx={{
                                        cursor: "pointer",
                                        backgroundColor: "#222240",
                                        color: "white",
                                        marginBottom: "10px",
                                        borderRadius: "30px",
                                        display: "flex",
                                        alignItems: "center",
                                        textAlign: "center",
                                        justifyContent: "center",
                                        width: "80%",
                                        padding: "5px 0px",
                                        margin: "0 auto",
                                    }}>

                                    <span class="icon-home-icon-silhouette" style={{ color: "#ef7d00", marginRight: "5px", fontSize: "15px" }} ></span>
                                    <Typography sx={{ color: "white", fontSize: "11px", textTransform: "capitalize" }}>
                                        Home
                                    </Typography>
                                </Box>

                                <ListItem sx={{ cursor: "pointer" }} oonClick={handleUserClose}>
                                    <ListItemIcon>
                                        <img src="/assets/setting.svg" alt="icon" style={{ width: "16px", height: "16px" }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Edit Profile"
                                        primaryTypographyProps={{
                                            sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: "-30px" }
                                        }} />
                                </ListItem>

                                <ListItem sx={{ cursor: "pointer" }} onClick={handleUserClose}>
                                    <ListItemIcon>
                                        <span class="icon-price-tag" style={{ fontSize: "20px" }}></span>
                                    </ListItemIcon>
                                    <ListItemText primary="My Subscription"
                                        primaryTypographyProps={{
                                            sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: "-30px" }
                                        }} />
                                </ListItem>

                                <ListItem sx={{ cursor: "pointer" }} onClick={handleUserClose}>
                                    <ListItemIcon>
                                        <HelpOutlineOutlinedIcon sx={{ fontSize: "20px" }} />
                                    </ListItemIcon>
                                    <ListItemText primary="FAQ"
                                        primaryTypographyProps={{
                                            sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: "-30px" }
                                        }} />
                                </ListItem>

                                <ListItem sx={{ cursor: "pointer" }} onClick={handleUserClose}>
                                    <ListItemIcon>
                                        <img src="/assets/logout.svg" alt="icon" style={{ width: "16px", height: "16px" }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Logout"
                                        primaryTypographyProps={{
                                            sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: "-30px" }
                                        }} />
                                </ListItem>
                            </List>
                        </Box>
                    </Popover>
                </Box>
            </Box>

            <Divider sx={{ backgroundColor: "#E57C00", border: "none", width: "100%", height: "2px" }} />

            <Box padding={"20px 100px 10px 60px"}>
                <ArrowBackIosOutlinedIcon
                    onClick={() => navigate('/wallet-affiliate')}
                    sx={{ color: "#4b4a4a", cursor: "pointer" }} />
            </Box>

            <Box >
                <Grid container spacing={1}>

                    <Grid item xs={12} md={6}>
                        <PersonalInfo />
                    </Grid>

                    <Box item sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Divider orientation="vertical" sx={{ backgroundColor: '#f4f6fc', width: '1px', height: "100%" }} />
                    </Box>

                    <Grid item xs={12} md={5}>
                        <PaymentInfo />
                    </Grid>
                </Grid>

                <Grid container justifyContent="center" sx={{ marginTop: 3 }}>
                    <Button
                        sx={{
                            width: '180px', textTransform: "capitalize", backgroundColor: "#ef7d00",
                            color: "white", borderRadius: "20px", padding: "4px",
                            '&:hover': {
                                backgroundColor: "#ef7d10",
                            }
                        }}>
                        <CheckOutlinedIcon sx={{ fontSize: "22px", mr: 1 }} /> Save
                    </Button>
                </Grid>
            </Box>

        </Box>
    )
}
