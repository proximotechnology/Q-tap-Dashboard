// import React, { useState } from "react";
// import { Avatar, Box, Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Popover, Typography } from "@mui/material";
// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import { useNavigate } from "react-router";
// import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
// import { AppBar, Toolbar } from '@mui/material';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import { ItemDetails } from './ItemDetails';
// import { VariantsTable } from './VariantsTable';
// import { ExtrasTable } from './ExtrasTable';
// import { DeliveredFooter } from "../../DeliveryRiders/DeliveredFooter";


// export const AddItem = () => {
//     const navigate = useNavigate();

//     const [anchorElUser, setAnchorElUser] = useState(null);
//     const openUserPopover = Boolean(anchorElUser);

//     const handleUserClick = (event) => {
//         setAnchorElUser(event.currentTarget);
//     };

//     const handleUserClose = () => {
//         setAnchorElUser(null);
//     };
//     return (
//         <Box sx={{ backgroundColor: "#f4f6fc" }}>
//             {/*  top Bar  */}
//             <AppBar position="static" style={{ padding: "20px 20px", backgroundColor: '#222240', zIndex: 3, boxShadow: 'none' }}>
//                 <Toolbar style={{ display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
//                     <IconButton
//                         onClick={() => { navigate('/menu'); }}
//                         edge="start" color="inherit" aria-label="back">
//                         <ArrowBackIosNewIcon sx={{ fontSize: "20px" }} />
//                     </IconButton>

//                     <Box
//                         aria-describedby={openUserPopover ? 'simple-popover' : undefined}
//                         onClick={handleUserClick}
//                         sx={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "3px" }}>
//                         <IconButton color="inherit" sx={{
//                             backgroundColor: '#ef7d00', borderRadius: '30%', padding: '5px',
//                             '&:hover': {
//                                 backgroundColor: '#ef7d00',
//                             }
//                         }}>
//                             <PersonOutlineOutlinedIcon sx={{ fontSize: "20px", color: "white" }} />
//                         </IconButton>
//                         <Typography variant="body1" sx={{ fontSize: "13px", color: "ef7d00" }}>Admin</Typography>
//                         <KeyboardArrowDownIcon sx={{ fontSize: "18px", color: "ef7d00" }} />
//                     </Box>
//                     <Popover disableScrollLock
//                         id={openUserPopover ? 'simple-popover' : undefined}
//                         open={openUserPopover}
//                         anchorEl={anchorElUser}
//                         onClose={handleUserClose}
//                         anchorOrigin={{
//                             vertical: 'bottom',
//                             horizontal: 'left',
//                         }}
//                     >
//                         <Box sx={{ width: 200, padding: '10px' }}>
//                             <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: '20px', gap: '10px' }}>
//                                 <Avatar sx={{ bgcolor: '#ef7d00', width: 40, height: 40 }}>
//                                     <PersonOutlineOutlinedIcon sx={{ fontSize: "22px" }} />
//                                 </Avatar>
//                                 <Box>
//                                     <Typography variant="h6" sx={{ fontSize: "14px" }}>User01</Typography>
//                                     <Typography variant="body2" sx={{ fontSize: "12px" }} color="textSecondary">Mail@mail.com</Typography>
//                                 </Box>
//                             </Box>
//                             <Divider />

//                             <List>
//                                 <Box
//                                     onClick={() => navigate('/')}
//                                     sx={{
//                                         cursor: "pointer",
//                                         backgroundColor: "#222240",
//                                         color: "white",
//                                         marginBottom: "10px",
//                                         borderRadius: "30px",
//                                         display: "flex",
//                                         alignItems: "center",
//                                         textAlign: "center",
//                                         justifyContent: "center",
//                                         width: "80%",
//                                         padding: "5px 0px",
//                                         margin: "0 auto",
//                                     }}>

//                                     <span class="icon-home-icon-silhouette" style={{ color: "#ef7d00", marginRight: "5px", fontSize: "15px" }} ></span>
//                                     <Typography style={{ color: "white", fontSize: "11px", textTransform: "capitalize" }}>
//                                         Home
//                                     </Typography>
//                                 </Box>

//                                 <ListItem sx={{ cursor: "pointer" }} oonClick={handleUserClose}>
//                                     <ListItemIcon>
//                                         <img src="/assets/setting.svg" alt="icon" style={{ width: "16px", height: "16px" }} />
//                                     </ListItemIcon>
//                                     <ListItemText primary="Edit Profile"
//                                         primaryTypographyProps={{
//                                             sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: "-30px" }
//                                         }} />
//                                 </ListItem>

//                                 <ListItem sx={{ cursor: "pointer" }} onClick={handleUserClose}>
//                                     <ListItemIcon>
//                                         <span class="icon-price-tag" style={{ fontSize: "20px" }}></span>
//                                     </ListItemIcon>
//                                     <ListItemText primary="My Subscription"
//                                         primaryTypographyProps={{
//                                             sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: "-30px" }
//                                         }} />
//                                 </ListItem>

//                                 <ListItem sx={{ cursor: "pointer" }} onClick={handleUserClose}>
//                                     <ListItemIcon>
//                                         <HelpOutlineOutlinedIcon sx={{ fontSize: "20px" }} />
//                                     </ListItemIcon>
//                                     <ListItemText primary="FAQ"
//                                         primaryTypographyProps={{
//                                             sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: "-30px" }
//                                         }} />
//                                 </ListItem>

//                                 <ListItem sx={{ cursor: "pointer" }} onClick={handleUserClose}>
//                                     <ListItemIcon>
//                                         <img src="/assets/logout.svg" alt="icon" style={{ width: "16px", height: "16px" }} />
//                                     </ListItemIcon>
//                                     <ListItemText primary="Logout"
//                                         primaryTypographyProps={{
//                                             sx: { color: '#5D5D5C', fontSize: '12px', marginLeft: "-30px" }
//                                         }} />
//                                 </ListItem>
//                             </List>
//                         </Box>
//                     </Popover>

//                 </Toolbar>
//                 <Typography variant="h6" style={{ flexGrow: 1, fontSize: "20px", textAlign: 'left', color: 'white', marginLeft: "100px" }}>
//                     Add Item
//                 </Typography>
//             </AppBar>

//             <Box sx={{ padding: "0px 70px" }}>
//                 <Grid container spacing={6} justifyContent={"space-around"}>

//                     <Grid item xs={12} md={6}>
//                         <ItemDetails />
//                     </Grid>


//                     <Grid item xs={12} md={6}>
//                         <VariantsTable />
//                         <ExtrasTable />
//                     </Grid>
//                 </Grid>
//             </Box>
//             <DeliveredFooter />
//         </Box>
//     )
// }


import React, { useState } from "react";
import { Avatar, Box, Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Popover, Typography } from "@mui/material";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from "react-router";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { AppBar, Toolbar } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { ItemDetails } from './ItemDetails';
import { VariantsTable } from './VariantsTable';
import { ExtrasTable } from './ExtrasTable';
import { DeliveredFooter } from "../../DeliveryRiders/DeliveredFooter";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
export const AddItem = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get('categoryId');

    console.log(categoryId);
    

    const [anchorElUser, setAnchorElUser] = useState(null);
    const openUserPopover = Boolean(anchorElUser);

    const handleUserClick = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleUserClose = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ backgroundColor: "#f4f6fc" }}>
            {/*  top Bar  */}
            <AppBar position="static" style={{ padding: "20px 20px", backgroundColor: '#222240', zIndex: 3, boxShadow: 'none' }}>
                <Toolbar style={{ display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
                    <IconButton
                        onClick={() => { navigate('/menu'); }}
                        edge="start" color="inherit" aria-label="back">
                        <ArrowBackIosNewIcon sx={{ fontSize: "20px" }} />
                    </IconButton>

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
                        <Typography variant="body1" sx={{ fontSize: "13px", color: "ef7d00" }}>Admin</Typography>
                        <KeyboardArrowDownIcon sx={{ fontSize: "18px", color: "ef7d00" }} />
                    </Box>
                    <Popover disableScrollLock
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
                                    <Typography style={{ color: "white", fontSize: "11px", textTransform: "capitalize" }}>
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

                </Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1, fontSize: "20px", textAlign: 'left', color: 'white', marginLeft: "100px" }}>
                    {t("item.add")}
                </Typography>
            </AppBar>

            <Box sx={{ padding: "0px 70px" }}>
                <Grid container spacing={6} justifyContent={"space-around"}>

                    <Grid item xs={12} md={6}>
                        <ItemDetails categoryId={categoryId} />{/* first component */}
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <VariantsTable />
                        <ExtrasTable />
                    </Grid>
                </Grid>
            </Box>
            <DeliveredFooter />
        </Box>
    )
}