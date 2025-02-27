// // import React, { useContext, useEffect, useState } from 'react';
// // import { Grid, Typography, Button, Box, IconButton, Divider, FormControl, OutlinedInput, InputAdornment, MenuItem, Select, Paper } from '@mui/material';

// // import AddIcon from '@mui/icons-material/Add';
// // import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// // import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
// // import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
// // import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
// // import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
// // import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
// // import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
// // import TableBarIcon from '@mui/icons-material/TableBar';
// // import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
// // import { ClientLoginData } from '../../../../context/ClientLoginDataContext';

// // const ProfilePage = () => {


// //     const [fullName, setFullName] = useState('');
// //     const [phone, setPhone] = useState('');
// //     const [email, setEmail] = useState('');
// //     const [month, setMonth] = useState('');
// //     const [day, setDay] = useState('');
// //     const [year, setYear] = useState('');
// //     const [country, setCountry] = useState('');
// //     const [city, setCity] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [confirmPassword, setConfirmPassword] = useState('');
// //     const allClientData = localStorage.getItem("allClientData")

// //     useEffect(()=>{
// //         console.log(JSON.parse(allClientData));

// //     },[])

// //     return (
// //         <Paper elevation={3} style={{ padding: '20px 30px', borderRadius: "10px", marginTop: '16px' }}>

// //             <Box elevation={3} sx={{ paddingTop: "15px" }}>
// //                 <Grid container spacing={3} justifyContent={"space-between"} >

// //                     <Box display="flex" justifyContent="space-around" paddingTop={"20px"}>
// //                         {/* عمود الصورة */}
// //                         <Grid item xs={12} sm={4} md={3} lg={2} container justifyContent="center" alignItems="flex-start">
// //                             <Box textAlign="center" position="relative">
// //                                 <Box sx={{
// //                                     width: '90%',
// //                                     height: '90%',
// //                                     borderRadius: '50%',
// //                                     position: 'relative',
// //                                     overflow: 'hidden',
// //                                     display: 'flex',
// //                                     justifyContent: 'center',
// //                                     alignItems: 'center',
// //                                     textAlign: 'center',
// //                                 }}>
// //                                     <img src="/images/User.jpg" alt="user" width="100%" />
// //                                     <Box sx={{
// //                                         position: 'absolute',
// //                                         bottom: 0,
// //                                         width: '100%',
// //                                         height: '18%',
// //                                         backgroundColor: '#4b4a4a',
// //                                         display: 'flex',
// //                                         justifyContent: 'center',
// //                                         alignItems: 'center',
// //                                         textAlign: 'center',
// //                                         color: 'white',
// //                                         fontSize: '8px',
// //                                     }}>
// //                                         <EditOutlinedIcon sx={{ color: "white", fontSize: '20px' }} />
// //                                     </Box>
// //                                 </Box>
// //                                 <Typography variant="body2" sx={{ fontSize: "14px", color: "#3b3a3a", marginTop: "8px" }}>
// //                                     User01
// //                                 </Typography>
// //                             </Box>
// //                         </Grid>

// //                         {/* Personal Infoعمود الـ   */}
// //                         <Grid item xs={12} sm={4} md={4} lg={4} justifyContent="center" alignItems="center" >
// //                             <Typography variant="body2" sx={{ fontSize: "13px" }} color="#3b3a3a" gutterBottom>
// //                                 Personal Info
// //                             </Typography>
// //                             <Divider sx={{ width: "28%", borderRadius: "30px", borderBottom: "3px solid #ef7d00", marginBottom: "18px" }} />

// //                             <FormControl variant="outlined" fullWidth >
// //                                 <OutlinedInput
// //                                     id="outlined-fullname"
// //                                     startAdornment={
// //                                         <InputAdornment position="start">
// //                                             <PersonOutlinedIcon sx={{ fontSize: "18px" }} />
// //                                         </InputAdornment>
// //                                     }
// //                                     required
// //                                     value={fullName}
// //                                     onChange={(e) => setFullName(e.target.value)}
// //                                     placeholder="Full Name"
// //                                     sx={{ borderRadius: '6px', marginBottom: "18px", height: '33px', fontSize: "10px" }}
// //                                 />
// //                             </FormControl>

// //                             <FormControl variant="outlined" fullWidth  >
// //                                 <OutlinedInput
// //                                     id="outlined-phone"
// //                                     startAdornment={
// //                                         <InputAdornment position="start">
// //                                             <PhoneOutlinedIcon sx={{ fontSize: "18px" }} />
// //                                         </InputAdornment>
// //                                     }
// //                                     placeholder="Mobile Number"
// //                                     required
// //                                     value={phone}
// //                                     onChange={(e) => setPhone(e.target.value)}
// //                                     sx={{ borderRadius: '6px', marginBottom: "18px", height: '33px', fontSize: "10px" }}
// //                                 />
// //                             </FormControl>

// //                             <FormControl variant="outlined" fullWidth >
// //                                 <OutlinedInput
// //                                     id="outlined-email"
// //                                     type="email"
// //                                     startAdornment={
// //                                         <InputAdornment position="start">
// //                                             <MailOutlinedIcon sx={{ fontSize: "18px" }} />
// //                                         </InputAdornment>
// //                                     }
// //                                     required
// //                                     value={email}
// //                                     onChange={(e) => setEmail(e.target.value)}
// //                                     placeholder="Email"
// //                                     sx={{ borderRadius: '6px', marginBottom: "18px", height: '33px', fontSize: "10px" }}
// //                                 />
// //                             </FormControl>

// //                             <FormControl variant="outlined" fullWidth >
// //                                 <OutlinedInput
// //                                     placeholder='Website'
// //                                     startAdornment={
// //                                         <InputAdornment position="start">
// //                                             <LanguageOutlinedIcon sx={{ fontSize: "18px" }} />
// //                                         </InputAdornment>
// //                                     }
// //                                     required
// //                                     sx={{
// //                                         borderRadius: '10px', height: "35px", fontSize: "10px", marginBottom: "18px",
// //                                         '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
// //                                             outline: 'none',
// //                                         },
// //                                     }}
// //                                 />
// //                             </FormControl>

// //                             <Grid container alignItems="center" sx={{ marginBottom: "18px" }}>
// //                                 <Grid item xs={12} sm={12} md={12} lg={12}>
// //                                     <Grid container alignItems="center" sx={{ color: "grey", marginTop: "5px" }} >
// //                                         <CalendarMonthOutlinedIcon sx={{ marginRight: 1, fontSize: "15px" }} />
// //                                         <Typography variant="body1" sx={{ fontSize: "12px" }}>Date of Birth:</Typography>
// //                                     </Grid>
// //                                 </Grid>
// //                                 <Grid item xs={4}>
// //                                     <FormControl fullWidth>
// //                                         <Select
// //                                             id="outlined-country"
// //                                             value={month}
// //                                             onChange={(e) => setMonth(e.target.value)}
// //                                             displayEmpty
// //                                             sx={{ borderRadius: '6px', height: '33px', fontSize: "10px", color: "gray", marginRight: "5px" }}
// //                                         >
// //                                             <MenuItem value="" disabled sx={{ fontSize: "12px", color: "gray" }}>
// //                                                 Month
// //                                             </MenuItem>
// //                                             <MenuItem value="01" sx={{ fontSize: "12px", color: "gray" }}>01</MenuItem>
// //                                             <MenuItem value="02" sx={{ fontSize: "12px", color: "gray" }}>02</MenuItem>
// //                                             <MenuItem value="03" sx={{ fontSize: "12px", color: "gray" }}>03</MenuItem>
// //                                             <MenuItem value="04" sx={{ fontSize: "12px", color: "gray" }}>04</MenuItem>
// //                                             <MenuItem value="05" sx={{ fontSize: "12px", color: "gray" }}>05</MenuItem>
// //                                             <MenuItem value="06" sx={{ fontSize: "12px", color: "gray" }}>06</MenuItem>
// //                                             <MenuItem value="07" sx={{ fontSize: "12px", color: "gray" }}>07</MenuItem>
// //                                             <MenuItem value="08" sx={{ fontSize: "12px", color: "gray" }}>08</MenuItem>
// //                                             <MenuItem value="09" sx={{ fontSize: "12px", color: "gray" }}>09</MenuItem>
// //                                             <MenuItem value="10" sx={{ fontSize: "12px", color: "gray" }}>10</MenuItem>
// //                                             <MenuItem value="11" sx={{ fontSize: "12px", color: "gray" }}>11</MenuItem>
// //                                             <MenuItem value="12" sx={{ fontSize: "12px", color: "gray" }}>12</MenuItem>
// //                                         </Select>
// //                                     </FormControl>
// //                                 </Grid>

// //                                 <Grid item xs={4}>
// //                                     <FormControl fullWidth>

// //                                         <Select
// //                                             id="outlined-country"
// //                                             value={day}
// //                                             onChange={(e) => setDay(e.target.value)}
// //                                             displayEmpty
// //                                             sx={{ borderRadius: '6px', height: '33px', fontSize: "10px", color: "gray", marginRight: "5px" }}
// //                                         >
// //                                             <MenuItem value="" disabled >
// //                                                 Day
// //                                             </MenuItem>
// //                                             {[...Array(31).keys()].map((i) => (
// //                                                 <MenuItem key={i + 1} value={i + 1} sx={{ fontSize: "12px", color: "gray" }}>
// //                                                     {String(i + 1).padStart(2, '0')}
// //                                                 </MenuItem>
// //                                             ))}
// //                                         </Select>
// //                                     </FormControl>
// //                                 </Grid>

// //                                 <Grid item xs={4}>
// //                                     <FormControl fullWidth>
// //                                         <Select
// //                                             id="outlined-country"
// //                                             value={year}
// //                                             onChange={(e) => setYear(e.target.value)}
// //                                             displayEmpty
// //                                             sx={{ borderRadius: '6px', height: '33px', fontSize: "10px", color: "gray" }}
// //                                         >
// //                                             <MenuItem value="" disabled sx={{ fontSize: "12px", color: "gray" }} >
// //                                                 Year
// //                                             </MenuItem>
// //                                             {Array.from({ length: 2025 - 1089 + 1 }, (_, i) => (
// //                                                 <MenuItem key={i + 1089} value={i + 1089} sx={{ fontSize: "12px", color: "gray" }}>
// //                                                     {i + 1089}
// //                                                 </MenuItem>
// //                                             ))}
// //                                         </Select>
// //                                     </FormControl>
// //                                 </Grid>
// //                             </Grid>

// //                             <FormControl variant="outlined" fullWidth >
// //                                 <Select
// //                                     id="outlined-country"
// //                                     value={country}
// //                                     onChange={(e) => setCountry(e.target.value)}
// //                                     displayEmpty
// //                                     sx={{ marginBottom: "18px", borderRadius: '6px', height: '33px', fontSize: "10px", color: "gray" }}
// //                                     startAdornment={
// //                                         <InputAdornment position="start">
// //                                             <img src="/assets/location.svg" alt='location icon'
// //                                                 style={{ width: "18px", height: "16px" }} />
// //                                         </InputAdornment>
// //                                     }
// //                                     MenuProps={{
// //                                         disableScrollLock: true,
// //                                     }}

// //                                 >
// //                                     <MenuItem value="" disabled sx={{ fontSize: "12px", color: "gray" }}>Country</MenuItem>
// //                                     <MenuItem value="US" sx={{ fontSize: "12px", color: "gray" }}>United States</MenuItem>
// //                                     <MenuItem value="CA" sx={{ fontSize: "12px", color: "gray" }}>Canada</MenuItem>
// //                                     <MenuItem value="UK" sx={{ fontSize: "12px", color: "gray" }}>United Kingdom</MenuItem>
// //                                 </Select>
// //                             </FormControl>

// //                             <FormControl variant="outlined" fullWidth  >
// //                                 <OutlinedInput
// //                                     id="outlined-password"
// //                                     type='password'
// //                                     value={password}
// //                                     onChange={(e) => setPassword(e.target.value)}
// //                                     startAdornment={
// //                                         <InputAdornment position="start">
// //                                             <span class="icon-padlock" style={{ fontSize: "16px" }} ></span>
// //                                         </InputAdornment>
// //                                     }
// //                                     placeholder="Password"
// //                                     sx={{ borderRadius: '6px', marginBottom: "18px", height: '33px', fontSize: "10px" }}
// //                                 />
// //                             </FormControl>

// //                             <FormControl variant="outlined" fullWidth  >
// //                                 <OutlinedInput
// //                                     id="outlined-confirm-password"
// //                                     type='password'
// //                                     value={confirmPassword}
// //                                     onChange={(e) => setConfirmPassword(e.target.value)}
// //                                     startAdornment={
// //                                         <InputAdornment position="start">
// //                                             <span class="icon-padlock" style={{ fontSize: "16px" }} ></span>
// //                                         </InputAdornment>
// //                                     }
// //                                     placeholder="Confirm Password"
// //                                     sx={{ marginBottom: "18px", borderRadius: '10px', height: '33px', fontSize: "12px" }}
// //                                 />
// //                             </FormControl>
// //                         </Grid>

// //                         <Box item xs={1} sx={{ display: { xs: 'none', sm: 'block' } }}>
// //                             <Divider orientation="vertical" sx={{ backgroundColor: '#f4f6fc', width: '2px', height: "100%" }} />
// //                         </Box>{/*  الخط الفاصل  */}

// //                         {/* عمود الـ Business Info */}
// //                         <Grid item xs={12} sm={4} md={5} lg={4} justifyContent="center" alignItems="center" >
// //                             <Typography variant="body2" sx={{ fontSize: "13px" }} color="#3b3a3a" gutterBottom>
// //                                 Business Info
// //                             </Typography>
// //                             <Divider sx={{ width: "28%", borderRadius: "30px", borderBottom: "3px solid #ef7d00", marginBottom: "18px" }} />

// //                             <FormControl variant="outlined" fullWidth  >
// //                                 <OutlinedInput
// //                                     id="outlined-fullname"
// //                                     startAdornment={
// //                                         <InputAdornment position="start">
// //                                             <StorefrontOutlinedIcon sx={{ fontSize: "18px" }} />
// //                                         </InputAdornment>
// //                                     }
// //                                     required
// //                                     placeholder="Business Name"
// //                                     sx={{ borderRadius: '6px', marginBottom: "10px !important", height: '33px', fontSize: "10px" }}
// //                                 />
// //                             </FormControl>

// //                             <Box sx={{ display: "flex", justifyContent: "space-around", marginBottom: "10px" }}>
// //                                 <FormControl variant="outlined" fullWidth width="100%" >
// //                                     <OutlinedInput
// //                                         id="outlined-fullname"
// //                                         startAdornment={
// //                                             <InputAdornment position="start">
// //                                                 <PhoneOutlinedIcon sx={{ fontSize: "20px" }} />
// //                                             </InputAdornment>
// //                                         }
// //                                         required
// //                                         placeholder="Business Phone"
// //                                         sx={{ borderRadius: '6px', height: '33px', fontSize: "10px" }}
// //                                     />
// //                                 </FormControl>
// //                                 <IconButton>
// //                                     <AddIcon />
// //                                 </IconButton>
// //                             </Box>

// //                             <FormControl variant="outlined" fullWidth width="100%" >
// //                                 <OutlinedInput
// //                                     id="outlined-fullname"
// //                                     startAdornment={
// //                                         <InputAdornment position="start">
// //                                             <MailOutlinedIcon sx={{ fontSize: "18px" }} />
// //                                         </InputAdornment>
// //                                     }
// //                                     MenuProps={{
// //                                         disableScrollLock: true,
// //                                     }}
// //                                     required
// //                                     placeholder="Business Email"
// //                                     type='email'
// //                                     sx={{ borderRadius: '6px', marginBottom: "10px", height: '33px', fontSize: "10px" }}
// //                                 />
// //                             </FormControl>

// //                             <Box display="flex" justifyContent="space-between" width="100%" marginBottom="10px">
// //                                 <FormControl variant="outlined" sx={{ width: '48%' }}>
// //                                     <Select
// //                                         id="outlined-country"
// //                                         value={country}
// //                                         onChange={(e) => setCountry(e.target.value)}
// //                                         displayEmpty
// //                                         sx={{ borderRadius: '6px', height: '33px', fontSize: "10px", color: "gray" }}
// //                                         startAdornment={
// //                                             <InputAdornment position="start">
// //                                                 <img src="/assets/location.svg" alt='location icon'
// //                                                     style={{ width: "18px", height: "16px" }} />
// //                                             </InputAdornment>
// //                                         }
// //                                         MenuProps={{
// //                                             disableScrollLock: true,
// //                                         }}
// //                                     >
// //                                         <MenuItem value="" disabled sx={{ fontSize: "12px ", color: "gray" }}>
// //                                             Country
// //                                         </MenuItem>
// //                                         <MenuItem value="US" sx={{ fontSize: "12px ", color: "gray" }}>United States</MenuItem>
// //                                         <MenuItem value="CA" sx={{ fontSize: "12px ", color: "gray" }}>Canada</MenuItem>
// //                                         <MenuItem value="UK" sx={{ fontSize: "12px ", color: "gray" }}>United Kingdom</MenuItem>
// //                                     </Select>
// //                                 </FormControl>

// //                                 <FormControl variant="outlined" sx={{ width: '48%' }}>
// //                                     <Select
// //                                         id="outlined-city"
// //                                         value={city}
// //                                         onChange={(e) => setCity(e.target.value)}
// //                                         displayEmpty
// //                                         sx={{ borderRadius: '6px', height: '33px', fontSize: "10px", color: "gray" }}
// //                                         startAdornment={
// //                                             <InputAdornment position="start">
// //                                                 <img src="/assets/location.svg" alt='location icon'
// //                                                     style={{ width: "18px", height: "16px" }} />
// //                                             </InputAdornment>
// //                                         }
// //                                         MenuProps={{
// //                                             disableScrollLock: true,
// //                                         }}
// //                                     >
// //                                         <MenuItem value="" disabled sx={{ fontSize: "12px ", color: "gray" }}>City</MenuItem>
// //                                         <MenuItem value="NY" sx={{ fontSize: "12px ", color: "gray" }}>New York</MenuItem>
// //                                         <MenuItem value="LA" sx={{ fontSize: "12px ", color: "gray" }}>Los Angeles</MenuItem>
// //                                         <MenuItem value="CHI" sx={{ fontSize: "12px ", color: "gray" }}>Chicago</MenuItem>
// //                                     </Select>
// //                                 </FormControl>
// //                             </Box>

// //                             <Box display="flex" alignItems="center" marginBottom="10px" >
// //                                 <Button variant="contained" fullWidth
// //                                     sx={{
// //                                         textTransform: "capitalize", backgroundColor: "#222240", color: "white",
// //                                         borderRadius: "6px", fontSize: "9px", height: "35px",
// //                                         '&:hover': {
// //                                             backgroundColor: "#322240",
// //                                         }
// //                                     }}>
// //                                     <span class="icon-map-1" style={{ fontSize: "20px", marginRight: "10px" }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span></span>
// //                                     Pin Your Location
// //                                 </Button>
// //                             </Box>

// //                             <FormControl variant="outlined" sx={{ width: '100%', marginBottom: "10px" }}>
// //                                 <Select
// //                                     id="outlined-Currency"
// //                                     value={country}
// //                                     onChange={(e) => setCountry(e.target.value)}
// //                                     displayEmpty
// //                                     sx={{ borderRadius: '6px', height: '33px', fontSize: "10px", color: "gray" }}
// //                                     startAdornment={
// //                                         <InputAdornment position="start">
// //                                             <img src="/assets/revenue.svg" alt="icon" style={{ width: "16px", height: "16px" }} />,
// //                                         </InputAdornment>
// //                                     }
// //                                     MenuProps={{
// //                                         disableScrollLock: true,
// //                                     }}
// //                                 >
// //                                     <MenuItem value="" disabled >
// //                                         Currency
// //                                     </MenuItem>
// //                                     <MenuItem value="US" sx={{ fontSize: "12px", color: "gray" }}>United States</MenuItem>
// //                                     <MenuItem value="CA" sx={{ fontSize: "12px", color: "gray" }}>Canada</MenuItem>
// //                                     <MenuItem value="UK" sx={{ fontSize: "12px", color: "gray" }}>United Kingdom</MenuItem>
// //                                 </Select>
// //                             </FormControl>

// //                             <FormControl variant="outlined" sx={{ width: '100%', marginBottom: "10px" }}>
// //                                 <Select
// //                                     id="outlined-BusinessType"
// //                                     value={country}
// //                                     onChange={(e) => setCountry(e.target.value)}
// //                                     displayEmpty
// //                                     sx={{ borderRadius: '6px', height: '33px', fontSize: "10px", color: "gray" }}
// //                                     startAdornment={
// //                                         <InputAdornment position="start">
// //                                             <span class="icon-briefcase" style={{ fontSize: "16px" }} />
// //                                         </InputAdornment>
// //                                     }
// //                                     MenuProps={{
// //                                         disableScrollLock: true,
// //                                     }}
// //                                 >
// //                                     <MenuItem value="" disabled >
// //                                         Business Type
// //                                     </MenuItem>
// //                                     <MenuItem value="restaurant" sx={{ fontSize: "12px", color: "gray" }}>Restaurant </MenuItem>
// //                                     <MenuItem value="cafe" sx={{ fontSize: "12px", color: "gray" }}>Cafe</MenuItem>
// //                                     <MenuItem value="cloud" sx={{ fontSize: "12px", color: "gray" }}>Cloud kitchens</MenuItem>
// //                                     <MenuItem value="fast" sx={{ fontSize: "12px", color: "gray" }}>Fast Food</MenuItem>
// //                                     <MenuItem value="truck" sx={{ fontSize: "12px", color: "gray" }}>Food Truck</MenuItem>
// //                                     <MenuItem value="Bakery" sx={{ fontSize: "12px", color: "gray" }}>Bakery Store</MenuItem>
// //                                     <MenuItem value="Pastry" sx={{ fontSize: "12px", color: "gray" }}>Pastry Store</MenuItem>
// //                                     <MenuItem value="Fruits" sx={{ fontSize: "12px", color: "gray" }}>Fruits Store</MenuItem>
// //                                     <MenuItem value="Bakery" sx={{ fontSize: "12px", color: "gray" }}>Retail Store</MenuItem>

// //                                 </Select>
// //                             </FormControl>

// //                             <FormControl variant="outlined" sx={{ width: '100%', marginBottom: "10px" }}>
// //                                 <Select
// //                                     id="outlined-MenuDefaultLanguage"
// //                                     value={country}
// //                                     onChange={(e) => setCountry(e.target.value)}
// //                                     displayEmpty
// //                                     sx={{ borderRadius: '6px', height: '33px', fontSize: "10px", color: "gray" }}
// //                                     startAdornment={
// //                                         <InputAdornment position="start">
// //                                             <LanguageOutlinedIcon sx={{ fontSize: "18px" }} />
// //                                         </InputAdornment>
// //                                     }
// //                                     MenuProps={{
// //                                         disableScrollLock: true,
// //                                     }}
// //                                 >
// //                                     <MenuItem value="" disabled >
// //                                         Menu Default Language
// //                                     </MenuItem>
// //                                     <MenuItem value="US" sx={{ fontSize: "12px", color: "gray" }}>1 </MenuItem>
// //                                     <MenuItem value="CA" sx={{ fontSize: "12px", color: "gray" }}>2</MenuItem>
// //                                     <MenuItem value="UK" sx={{ fontSize: "12px", color: "gray" }}>3</MenuItem>
// //                                 </Select>
// //                             </FormControl>

// //                             <FormControl variant="outlined" sx={{ width: '100%', marginBottom: "10px" }}>
// //                                 <Select
// //                                     id="outlined-MenuDefaultLanguage"
// //                                     value={country}
// //                                     onChange={(e) => setCountry(e.target.value)}
// //                                     displayEmpty
// //                                     sx={{ borderRadius: '6px', height: '33px', fontSize: "10px", color: "gray" }}
// //                                     startAdornment={
// //                                         <InputAdornment position="start">
// //                                             <TableBarIcon sx={{ fontSize: "18px" }} />
// //                                         </InputAdornment>
// //                                     }
// //                                     MenuProps={{
// //                                         disableScrollLock: true,
// //                                     }}
// //                                 >
// //                                     <MenuItem value="" disabled sx={{ fontSize: "12px", color: "gray" }}>
// //                                         How Many Table Do You Have
// //                                     </MenuItem>
// //                                     <MenuItem value="US" sx={{ fontSize: "12px", color: "gray" }}>1 </MenuItem>
// //                                     <MenuItem value="CA" sx={{ fontSize: "12px", color: "gray" }}>2</MenuItem>
// //                                     <MenuItem value="UK" sx={{ fontSize: "12px", color: "gray" }}>3</MenuItem>
// //                                     <MenuItem value="UK" sx={{ fontSize: "12px", color: "gray" }}>4</MenuItem>
// //                                     <MenuItem value="UK" sx={{ fontSize: "12px", color: "gray" }}>6</MenuItem>

// //                                 </Select>
// //                             </FormControl>

// //                             <Divider sx={{ width: "100%", borderBottom: "1px solid #9d9d9c", marginBottom: "18px" }} />

// //                             <Typography variant='body2' sx={{ fontSize: "10px", color: "gray", display: "flex" }}>
// //                                 <span class="icon-price-tag" style={{ fontSize: "17px", marginRight: "6px" }} /> Bundle</Typography>

// //                             <Box display="flex" alignItems="center" justifyContent="flex-start" mb={2}>
// //                                 <Button variant="outlined"
// //                                     sx={{
// //                                         border: "1px solid gray ", textTransform: "capitalize", color: "gray", padding: "1px 20px",
// //                                         borderRadius: "6px", fontSize: "11px",
// //                                     }}
// //                                 ><CheckOutlinedIcon sx={{ fontSize: '18px', marginRight: "6px", color: "#ef7d00" }} />
// //                                     Pro</Button>

// //                                 <Button variant="contained"
// //                                     sx={{
// //                                         backgroundColor: "#222240", textTransform: "capitalize", color: "white", padding: "3px 20px",
// //                                         borderRadius: "8px", marginLeft: "10px", fontSize: "11px",
// //                                         '&:hover': {
// //                                             backgroundColor: "#322240",
// //                                         }
// //                                     }}
// //                                 >Change Bundle</Button>
// //                             </Box>
// //                         </Grid>
// //                     </Box>


// //                     {/* زرار الحفظ */}
// //                     <Grid item xs={12} container justifyContent="center">
// //                         <Button variant="contained"
// //                             sx={{
// //                                 textTransform: "capitalize", color: "white", padding: "3px 55px",
// //                                 borderRadius: "20px", marginLeft: "15%", marginBottom: "20px", backgroundColor: "#E57C00",
// //                                 '&:hover': {
// //                                     backgroundColor: "#E57C00",
// //                                 }
// //                             }}
// //                             size="large">
// //                             <CheckOutlinedIcon sx={{ fontSize: '18px', marginRight: "6px", color: "white" }} />
// //                             Save
// //                         </Button>
// //                     </Grid>
// //                 </Grid>
// //             </Box >
// //         </Paper>
// //     );
// // };

// // export default ProfilePage;
/////////////////////////////////////////////////////////////////
import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography, Button, Box, IconButton, Divider, FormControl, OutlinedInput, InputAdornment, MenuItem, Select, Paper } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import TableBarIcon from '@mui/icons-material/TableBar';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { toast } from 'react-toastify';
import { ClientLoginData } from '../../../../context/ClientLoginDataContext';

const ProfilePage = () => {
    // Personal Info State
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Business Info State
    const [businessName, setBusinessName] = useState('');
    const [businessPhone, setBusinessPhone] = useState('');
    const [businessEmail, setBusinessEmail] = useState('');
    const [businessCountry, setBusinessCountry] = useState('');
    const [businessCity, setBusinessCity] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [businessFormat, setBusinessFormat] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [menuDesign, setMenuDesign] = useState('');
    const [defaultMode, setDefaultMode] = useState('');
    const [paymentTime, setPaymentTime] = useState('');
    const [callWaiter, setCallWaiter] = useState('');

    // Get data from localStorage
    const allClientData = localStorage.getItem("allClientData");
    // const { clientData } = useContext(ClientLoginData);
    const selectedBranch = localStorage.getItem("selectedBranch");
    const { user } = JSON.parse(allClientData);

    useEffect(() => {
        if (allClientData) {
            const { user, brunches } = JSON.parse(allClientData);
            const [year, month, day] = user.birth_date.split('-');

            // Populate Personal Info
            setFullName(user.name || '');
            setPhone(user.mobile || '');
            setEmail(user.email || '');
            setMonth(month || '');
            setDay(day || '');
            setYear(year || '');
            setCountry(user.country || '');
            setPassword(user.password || '');
            setConfirmPassword(user.confirmPassword || '');

            // Populate Business Info
            if (selectedBranch) {
                const branch = brunches.find(b => b.id === parseInt(selectedBranch));
                if (branch) {
                    setBusinessName(branch.business_name || '');
                    setBusinessPhone(branch.business_phone || '');
                    setBusinessEmail(branch.business_email || '');
                    setBusinessCountry(branch.business_country || '');
                    setBusinessCity(branch.business_city || '');
                    setLatitude(branch.latitude || '555.668848');
                    setLongitude(branch.longitude || '222.4684684');
                    setBusinessFormat(branch.business_format || '');
                    setPaymentMethod(branch.payment_method || '');
                    setMenuDesign(branch.menu_design || '');
                    setDefaultMode(branch.default_mode || '');
                    setPaymentTime(branch.payment_time || '');
                    setCallWaiter(branch.call_waiter || '');
                }
            }
        }
    }, [allClientData, selectedBranch]);

    // Handle Save Button Click
    const handleSave = async (id) => {
        const updatedData = {
            brunch_id: selectedBranch,
            // Personal Info
            name: fullName,
            mobile: phone,
            email: email,
            birth_date: `${year}-${month}-${day}`,
            country: country,
            password: password,
            img: "",
            // Business Info
            business_name: businessName,
            business_country: businessCountry,
            business_city: businessCity,
            latitude: '555.668848',
            longitude: '222.4684684',
            currency_id: "1",
            business_format: businessFormat,
            tables_number: defaultMode,
            contact_info: {
                business_phone: [businessPhone],
                business_email: [businessEmail],
                facebook: [""],
                twitter: [""],
                instagram: [""],
                address: [""],
                website: [website],
            },
        };
        console.log("updated  data", updatedData);

        try {
            const response = await fetch(`https://highleveltecknology.com/Qtap/api/clients_update_profile/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("clientToken")}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                toast.success('Profile updated successfully!');
            } else {
                toast.error('Failed to update profile.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while updating the profile.');
        }
    };
    return (
        <Paper elevation={3} style={{ padding: '20px 30px', borderRadius: "10px", marginTop: '16px' }}>
            <Box elevation={3} sx={{ paddingTop: "15px" }}>
                <Grid container spacing={3} justifyContent={"space-between"}>
                    <Box display="flex" justifyContent="space-around" paddingTop={"20px"}>
                        {/* Profile Image Column */}
                        <Grid item xs={12} sm={4} md={3} lg={2} container justifyContent="center" alignItems="flex-start">
                            <Box textAlign="center" position="relative">
                                <Box sx={{
                                    width: '90%',
                                    height: '90%',
                                    borderRadius: '50%',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}>
                                    <img src="/images/User.jpg" alt="user" width="100%" />
                                    <Box sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        width: '100%',
                                        height: '18%',
                                        backgroundColor: '#4b4a4a',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        color: 'white',
                                        fontSize: '8px',
                                    }}>
                                        <EditOutlinedIcon sx={{ color: "white", fontSize: '20px' }} />
                                    </Box>
                                </Box>
                                <Typography variant="body2" sx={{ fontSize: "14px", color: "#3b3a3a", marginTop: "8px" }}>
                                    User01
                                </Typography>
                            </Box>
                        </Grid>

                        {/* Personal Info Column */}
                        <Grid item xs={12} sm={4} md={4} lg={4} justifyContent="center" alignItems="center">
                            <Typography variant="body2" sx={{ fontSize: "13px" }} color="#3b3a3a" gutterBottom>
                                Personal Info
                            </Typography>
                            <Divider sx={{ width: "28%", borderRadius: "30px", borderBottom: "3px solid #ef7d00", marginBottom: "18px" }} />

                            <FormControl variant="outlined" fullWidth>
                                <OutlinedInput
                                    id="outlined-fullname"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <PersonOutlinedIcon sx={{ fontSize: "18px" }} />
                                        </InputAdornment>
                                    }
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Full Name"
                                    sx={{ borderRadius: '6px', marginBottom: "18px", height: '33px', fontSize: "10px" }}
                                />
                            </FormControl>

                            <FormControl variant="outlined" fullWidth>
                                <OutlinedInput
                                    id="outlined-phone"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <PhoneOutlinedIcon sx={{ fontSize: "18px" }} />
                                        </InputAdornment>
                                    }
                                    placeholder="Mobile Number"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    sx={{ borderRadius: '6px', marginBottom: "18px", height: '33px', fontSize: "10px" }}
                                />
                            </FormControl>

                            <FormControl variant="outlined" fullWidth>
                                <OutlinedInput
                                    id="outlined-email"
                                    type="email"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <MailOutlinedIcon sx={{ fontSize: "18px" }} />
                                        </InputAdornment>
                                    }
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    sx={{ borderRadius: '6px', marginBottom: "18px", height: '33px', fontSize: "10px" }}
                                />
                            </FormControl>

                            <FormControl variant="outlined" fullWidth>
                                <OutlinedInput
                                    placeholder='Website'
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <LanguageOutlinedIcon sx={{ fontSize: "18px" }} />
                                        </InputAdornment>
                                    }
                                    required
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                    sx={{
                                        borderRadius: '10px', height: "35px", fontSize: "10px", marginBottom: "18px",
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            outline: 'none',
                                        },
                                    }}
                                />
                            </FormControl>

                            <Grid container alignItems="center" sx={{ marginBottom: "18px" }}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Grid container alignItems="center" sx={{ color: "grey", marginTop: "5px" }}>
                                        <CalendarMonthOutlinedIcon sx={{ marginRight: 1, fontSize: "15px" }} />
                                        <Typography variant="body1" sx={{ fontSize: "12px" }}>Date of Birth:</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <Select
                                            id="outlined-month"
                                            value={month}
                                            onChange={(e) => setMonth(e.target.value)}
                                            displayEmpty
                                            sx={{ borderRadius: '6px', height: '33px', fontSize: "10px", color: "gray", marginRight: "5px" }}
                                        >
                                            <MenuItem value="" disabled sx={{ fontSize: "12px", color: "gray" }}>
                                                Month
                                            </MenuItem>
                                            <MenuItem value="01" sx={{ fontSize: "12px", color: "gray" }}>01</MenuItem>
                                            <MenuItem value="02" sx={{ fontSize: "12px", color: "gray" }}>02</MenuItem>
                                            <MenuItem value="03" sx={{ fontSize: "12px", color: "gray" }}>03</MenuItem>
                                            <MenuItem value="04" sx={{ fontSize: "12px", color: "gray" }}>04</MenuItem>
                                            <MenuItem value="05" sx={{ fontSize: "12px", color: "gray" }}>05</MenuItem>
                                            <MenuItem value="06" sx={{ fontSize: "12px", color: "gray" }}>06</MenuItem>
                                            <MenuItem value="07" sx={{ fontSize: "12px", color: "gray" }}>07</MenuItem>
                                            <MenuItem value="08" sx={{ fontSize: "12px", color: "gray" }}>08</MenuItem>
                                            <MenuItem value="09" sx={{ fontSize: "12px", color: "gray" }}>09</MenuItem>
                                            <MenuItem value="10" sx={{ fontSize: "12px", color: "gray" }}>10</MenuItem>
                                            <MenuItem value="11" sx={{ fontSize: "12px", color: "gray" }}>11</MenuItem>
                                            <MenuItem value="12" sx={{ fontSize: "12px", color: "gray" }}>12</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <Select
                                            id="outlined-day"
                                            value={day}
                                            onChange={(e) => setDay(e.target.value)}
                                            displayEmpty
                                            sx={{ borderRadius: '6px', height: '33px', fontSize: "10px", color: "gray", marginRight: "5px" }}
                                        >
                                            <MenuItem value="" disabled>
                                                Day
                                            </MenuItem>
                                            {[...Array(31).keys()].map((i) => (
                                                <MenuItem key={i + 1} value={i + 1} sx={{ fontSize: "12px", color: "gray" }}>
                                                    {String(i + 1).padStart(2, '0')}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <Select
                                            id="outlined-year"
                                            value={year}
                                            onChange={(e) => setYear(e.target.value)}
                                            displayEmpty
                                            sx={{ borderRadius: '6px', height: '33px', fontSize: "10px", color: "gray" }}
                                        >
                                            <MenuItem value="" disabled sx={{ fontSize: "12px", color: "gray" }}>
                                                Year
                                            </MenuItem>
                                            {Array.from({ length: 2025 - 1089 + 1 }, (_, i) => (
                                                <MenuItem key={i + 1089} value={i + 1089} sx={{ fontSize: "12px", color: "gray" }}>
                                                    {i + 1089}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <FormControl variant="outlined" fullWidth>
                                <Select
                                    id="outlined-country"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    displayEmpty
                                    sx={{ marginBottom: "18px", borderRadius: '6px', height: '33px', fontSize: "10px", color: "gray" }}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <img src="/assets/location.svg" alt='location icon'
                                                style={{ width: "18px", height: "16px" }} />
                                        </InputAdornment>
                                    }
                                    MenuProps={{
                                        disableScrollLock: true,
                                    }}
                                >
                                    <MenuItem value="" disabled sx={{ fontSize: "12px", color: "gray" }}>Country</MenuItem>
                                    <MenuItem value="US" sx={{ fontSize: "12px", color: "gray" }}>United States</MenuItem>
                                    <MenuItem value="CA" sx={{ fontSize: "12px", color: "gray" }}>Canada</MenuItem>
                                    <MenuItem value="UK" sx={{ fontSize: "12px", color: "gray" }}>United Kingdom</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl variant="outlined" fullWidth>
                                <OutlinedInput
                                    id="outlined-password"
                                    type='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <span className="icon-padlock" style={{ fontSize: "16px" }}></span>
                                        </InputAdornment>
                                    }
                                    placeholder="Password"
                                    sx={{ borderRadius: '6px', marginBottom: "18px", height: '33px', fontSize: "10px" }}
                                />
                            </FormControl>

                            <FormControl variant="outlined" fullWidth>
                                <OutlinedInput
                                    id="outlined-confirm-password"
                                    type='password'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <span className="icon-padlock" style={{ fontSize: "16px" }}></span>
                                        </InputAdornment>
                                    }
                                    placeholder="Confirm Password"
                                    sx={{ marginBottom: "18px", borderRadius: '10px', height: '33px', fontSize: "12px" }}
                                />
                            </FormControl>
                        </Grid>

                        <Box item xs={1} sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Divider orientation="vertical" sx={{ backgroundColor: '#f4f6fc', width: '2px', height: "100%" }} />
                        </Box>

                        {/* Business Info Column */}
                        <Grid item xs={12} sm={4} md={5} lg={4} justifyContent="center" alignItems="center">
                            <Typography variant="body2" sx={{ fontSize: "13px" }} color="#3b3a3a" gutterBottom>
                                Business Info
                            </Typography>
                            <Divider sx={{ width: "28%", borderRadius: "30px", borderBottom: "3px solid #ef7d00", marginBottom: "18px" }} />

                            <FormControl variant="outlined" fullWidth>
                                <OutlinedInput
                                    id="outlined-business-name"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <StorefrontOutlinedIcon sx={{ fontSize: "18px" }} />
                                        </InputAdornment>
                                    }
                                    required
                                    value={businessName}
                                    onChange={(e) => setBusinessName(e.target.value)}
                                    placeholder="Business Name"
                                    sx={{ borderRadius: '6px', marginBottom: "10px !important", height: '33px', fontSize: "10px" }}
                                />
                            </FormControl>

                            <Box sx={{ display: "flex", justifyContent: "space-around", marginBottom: "10px" }}>
                                <FormControl variant="outlined" fullWidth width="100%">
                                    <OutlinedInput
                                        id="outlined-business-phone"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <PhoneOutlinedIcon sx={{ fontSize: "20px" }} />
                                            </InputAdornment>
                                        }
                                        required
                                        value={businessPhone}
                                        onChange={(e) => setBusinessPhone(e.target.value)}
                                        placeholder="Business Phone"
                                        sx={{ borderRadius: '6px', height: '33px', fontSize: "10px" }}
                                    />
                                </FormControl>
                                <IconButton>
                                    <AddIcon />
                                </IconButton>
                            </Box>

                            <FormControl variant="outlined" fullWidth width="100%">
                                <OutlinedInput
                                    id="outlined-business-email"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <MailOutlinedIcon sx={{ fontSize: "18px" }} />
                                        </InputAdornment>
                                    }
                                    required
                                    value={businessEmail}
                                    onChange={(e) => setBusinessEmail(e.target.value)}
                                    placeholder="Business Email"
                                    type='email'
                                    sx={{ borderRadius: '6px', marginBottom: "10px", height: '33px', fontSize: "10px" }}
                                />
                            </FormControl>

                            <Box display="flex" justifyContent="space-between" width="100%" marginBottom="10px">
                                <FormControl variant="outlined" sx={{ width: '48%' }}>
                                    <Select
                                        id="outlined-business-country"
                                        value={businessCountry}
                                        onChange={(e) => setBusinessCountry(e.target.value)}
                                        displayEmpty
                                        sx={{ borderRadius: '6px', height: '33px', fontSize: "10px", color: "gray" }}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <img src="/assets/location.svg" alt='location icon'
                                                    style={{ width: "18px", height: "16px" }} />
                                            </InputAdornment>
                                        }
                                        MenuProps={{
                                            disableScrollLock: true,
                                        }}
                                    >
                                        <MenuItem value="" disabled sx={{ fontSize: "12px ", color: "gray" }}>
                                            Country
                                        </MenuItem>
                                        <MenuItem value="US" sx={{ fontSize: "12px ", color: "gray" }}>United States</MenuItem>
                                        <MenuItem value="CA" sx={{ fontSize: "12px ", color: "gray" }}>Canada</MenuItem>
                                        <MenuItem value="UK" sx={{ fontSize: "12px ", color: "gray" }}>United Kingdom</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl variant="outlined" sx={{ width: '48%' }}>
                                    <Select
                                        id="outlined-business-city"
                                        value={businessCity}
                                        onChange={(e) => setBusinessCity(e.target.value)}
                                        displayEmpty
                                        sx={{ borderRadius: '6px', height: '33px', fontSize: "10px", color: "gray" }}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <img src="/assets/location.svg" alt='location icon'
                                                    style={{ width: "18px", height: "16px" }} />
                                            </InputAdornment>
                                        }
                                        MenuProps={{
                                            disableScrollLock: true,
                                        }}
                                    >
                                        <MenuItem value="" disabled sx={{ fontSize: "12px ", color: "gray" }}>City</MenuItem>
                                        <MenuItem value="NY" sx={{ fontSize: "12px ", color: "gray" }}>New York</MenuItem>
                                        <MenuItem value="LA" sx={{ fontSize: "12px ", color: "gray" }}>Los Angeles</MenuItem>
                                        <MenuItem value="CHI" sx={{ fontSize: "12px ", color: "gray" }}>Chicago</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            <Box display="flex" alignItems="center" marginBottom="10px">
                                <Button variant="contained" fullWidth
                                    sx={{
                                        textTransform: "capitalize", backgroundColor: "#222240", color: "white",
                                        borderRadius: "6px", fontSize: "9px", height: "35px",
                                        '&:hover': {
                                            backgroundColor: "#322240",
                                        }
                                    }}>
                                    <span className="icon-map-1" style={{ fontSize: "20px", marginRight: "10px" }}></span>
                                    Pin Your Location
                                </Button>
                            </Box>

                            <FormControl variant="outlined" sx={{ width: '100%', marginBottom: "10px" }}>
                                <Select
                                    id="outlined-currency"
                                    value={businessFormat}
                                    onChange={(e) => setBusinessFormat(e.target.value)}
                                    displayEmpty
                                    sx={{ borderRadius: '6px', height: '33px', fontSize: "10px", color: "gray" }}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <img src="/assets/revenue.svg" alt="icon" style={{ width: "16px", height: "16px" }} />
                                        </InputAdornment>
                                    }
                                    MenuProps={{
                                        disableScrollLock: true,
                                    }}
                                >
                                    <MenuItem value="" disabled>
                                        Currency
                                    </MenuItem>
                                    <MenuItem value="US" sx={{ fontSize: "12px", color: "gray" }}>United States</MenuItem>
                                    <MenuItem value="CA" sx={{ fontSize: "12px", color: "gray" }}>Canada</MenuItem>
                                    <MenuItem value="UK" sx={{ fontSize: "12px", color: "gray" }}>United Kingdom</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl variant="outlined" sx={{ width: '100%', marginBottom: "10px" }}>
                                <Select
                                    id="outlined-business-type"
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    displayEmpty
                                    sx={{ borderRadius: '6px', height: '33px', fontSize: "10px", color: "gray" }}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <span className="icon-briefcase" style={{ fontSize: "16px" }} />
                                        </InputAdornment>
                                    }
                                    MenuProps={{
                                        disableScrollLock: true,
                                    }}
                                >
                                    <MenuItem value="" disabled>
                                        Business Type
                                    </MenuItem>
                                    <MenuItem value="restaurant" sx={{ fontSize: "12px", color: "gray" }}>Restaurant</MenuItem>
                                    <MenuItem value="cafe" sx={{ fontSize: "12px", color: "gray" }}>Cafe</MenuItem>
                                    <MenuItem value="cloud" sx={{ fontSize: "12px", color: "gray" }}>Cloud kitchens</MenuItem>
                                    <MenuItem value="fast" sx={{ fontSize: "12px", color: "gray" }}>Fast Food</MenuItem>
                                    <MenuItem value="truck" sx={{ fontSize: "12px", color: "gray" }}>Food Truck</MenuItem>
                                    <MenuItem value="Bakery" sx={{ fontSize: "12px", color: "gray" }}>Bakery Store</MenuItem>
                                    <MenuItem value="Pastry" sx={{ fontSize: "12px", color: "gray" }}>Pastry Store</MenuItem>
                                    <MenuItem value="Fruits" sx={{ fontSize: "12px", color: "gray" }}>Fruits Store</MenuItem>
                                    <MenuItem value="Retail" sx={{ fontSize: "12px", color: "gray" }}>Retail Store</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl variant="outlined" sx={{ width: '100%', marginBottom: "10px" }}>
                                <Select
                                    id="outlined-menu-language"
                                    value={menuDesign}
                                    onChange={(e) => setMenuDesign(e.target.value)}
                                    displayEmpty
                                    sx={{ borderRadius: '6px', height: '33px', fontSize: "10px", color: "gray" }}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <LanguageOutlinedIcon sx={{ fontSize: "18px" }} />
                                        </InputAdornment>
                                    }
                                    MenuProps={{
                                        disableScrollLock: true,
                                    }}
                                >
                                    <MenuItem value="" disabled>
                                        Menu Default Language
                                    </MenuItem>
                                    <MenuItem value="1" sx={{ fontSize: "12px", color: "gray" }}>1</MenuItem>
                                    <MenuItem value="2" sx={{ fontSize: "12px", color: "gray" }}>2</MenuItem>
                                    <MenuItem value="3" sx={{ fontSize: "12px", color: "gray" }}>3</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl variant="outlined" sx={{ width: '100%', marginBottom: "10px" }}>
                                <Select
                                    id="outlined-tables"
                                    value={defaultMode}
                                    onChange={(e) => setDefaultMode(e.target.value)}
                                    displayEmpty
                                    sx={{ borderRadius: '6px', height: '33px', fontSize: "10px", color: "gray" }}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <TableBarIcon sx={{ fontSize: "18px" }} />
                                        </InputAdornment>
                                    }
                                    MenuProps={{
                                        disableScrollLock: true,
                                    }}
                                >
                                    <MenuItem value="" disabled sx={{ fontSize: "12px", color: "gray" }}>
                                        How Many Tables Do You Have
                                    </MenuItem>
                                    <MenuItem value="1" sx={{ fontSize: "12px", color: "gray" }}>1</MenuItem>
                                    <MenuItem value="2" sx={{ fontSize: "12px", color: "gray" }}>2</MenuItem>
                                    <MenuItem value="3" sx={{ fontSize: "12px", color: "gray" }}>3</MenuItem>
                                    <MenuItem value="4" sx={{ fontSize: "12px", color: "gray" }}>4</MenuItem>
                                    <MenuItem value="6" sx={{ fontSize: "12px", color: "gray" }}>6</MenuItem>
                                </Select>
                            </FormControl>

                            <Divider sx={{ width: "100%", borderBottom: "1px solid #9d9d9c", marginBottom: "18px" }} />

                            <Typography variant='body2' sx={{ fontSize: "10px", color: "gray", display: "flex" }}>
                                <span className="icon-price-tag" style={{ fontSize: "17px", marginRight: "6px" }} /> Bundle</Typography>

                            <Box display="flex" alignItems="center" justifyContent="flex-start" mb={2}>
                                <Button variant="outlined"
                                    sx={{
                                        border: "1px solid gray ", textTransform: "capitalize", color: "gray", padding: "1px 20px",
                                        borderRadius: "6px", fontSize: "11px",
                                    }}
                                ><CheckOutlinedIcon sx={{ fontSize: '18px', marginRight: "6px", color: "#ef7d00" }} />
                                    Pro</Button>

                                <Button variant="contained"
                                    sx={{
                                        backgroundColor: "#222240", textTransform: "capitalize", color: "white", padding: "3px 20px",
                                        borderRadius: "8px", marginLeft: "10px", fontSize: "11px",
                                        '&:hover': {
                                            backgroundColor: "#322240",
                                        }
                                    }}
                                >Change Bundle</Button>
                            </Box>
                        </Grid>
                    </Box>

                    {/* Save Button */}
                    <Grid item xs={12} container justifyContent="center">
                        <Button
                            variant="contained"
                            sx={{
                                textTransform: "capitalize", color: "white", padding: "3px 55px",
                                borderRadius: "20px", marginLeft: "15%", marginBottom: "20px", backgroundColor: "#E57C00",
                                '&:hover': {
                                    backgroundColor: "#E57C00",
                                }
                            }}
                            size="large"
                            onClick={() => handleSave(user.id)} // Pass user.id to handleSave
                        >
                            <CheckOutlinedIcon sx={{ fontSize: '18px', marginRight: "6px", color: "white" }} />
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default ProfilePage;