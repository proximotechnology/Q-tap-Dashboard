
// import React, { useState } from 'react';
// import { Grid, Divider, Box, Typography, Button, Checkbox, FormControlLabel, ToggleButton, ToggleButtonGroup, FormControl, MenuItem, Select, Paper } from '@mui/material';
// import { styled } from '@mui/system';
// import StraightIcon from '@mui/icons-material/Straight';
// import WbSunnyIcon from '@mui/icons-material/WbSunny';
// import NightlightIcon from '@mui/icons-material/Nightlight';
// import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';



// import Days from '../Menu/Days';
// const StyledButton = styled(Button)(() => ({
//     backgroundColor: '#222240',
//     color: '#fff',
//     padding: '1px 30px',
//     textTransform: "capitalize",
//     borderRadius: "20px",
//     fontSize: "9px",
//     textAlign: "center",
//     justifyContent: "center",
//     '&:hover': {
//         backgroundColor: '#222240',
//     },
// }));

// const ImageBox = styled(Box)(({ imageUrl }) => ({
//     width: "120px",
//     height: "120px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
//     backgroundColor: imageUrl ? "transparent" : "#F1F2F2",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     borderRadius: "50%",
// }));

// const Menu = () => {
//     const [mode, setMode] = React.useState('light');
//     const [design, setDesign] = React.useState('grid');

//     const handleModeChange = (event, newMode) => {
//         if (newMode !== null) {
//             setMode(newMode);
//         }
//     };
//     const handleDesignChange = (event, newDesign) => {
//         if (newDesign !== null) {
//             setDesign(newDesign);
//         }
//     };
//     const [selectedButton, setSelectedButton] = useState(null);

//     const handleButtonClick = (day) => {
//         setSelectedButton(day);
//     };

//     const [times, setTimes] = useState({
//         startTime: '9:00 am',
//         endTime: '5:00 pm'
//     });

//     const handleTimeChange = (event) => {
//         const { name, value } = event.target;
//         setTimes({
//             ...times,
//             [name]: value
//         });
//     };

//     // =====================================================
//     const [logoImage, setLogoImage] = useState(null); // حالة للـ Logo
//     const [bannerImage, setBannerImage] = useState(null); // حالة للـ Banner

//     // رفع الصورة للـ Logo
//     const handleLogoUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const imageUrl = URL.createObjectURL(file);
//             setLogoImage(imageUrl);
//         }
//     };

//     // رفع الصورة للـ Banner
//     const handleBannerUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const imageUrl = URL.createObjectURL(file);
//             setBannerImage(imageUrl);
//         }
//     };

//     return (
//         <Paper style={{ padding: '20px 30px', borderRadius: "10px", marginTop: '16px' }}>
//             <Grid container spacing={2} >

//                 {/* العمود الأول */}
//                 <Grid item xs={4} direction="column" sx={{ padding: '30px' }}>
//                     <Box
//                         mb={5}
//                         sx={{
//                             display: "flex",
//                             flexDirection: "column",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             paddingTop: "20px",
//                         }}
//                     >
//                         <ImageBox imageUrl={logoImage}>
//                             {!logoImage && (
//                                 <span
//                                     className="icon-image-gallery"
//                                     style={{ fontSize: "40px", color: "#AAAAAA" }}
//                                 ></span>
//                             )}
//                         </ImageBox>

//                         <Typography
//                             variant="subtitle1"
//                             sx={{ fontSize: "8px", color: "#AAAAAA", mb: 1, mt: 1 }}
//                         >
//                             Logo 500x500px
//                         </Typography>

//                         <StyledButton variant="contained" component="label">
//                             <StraightIcon sx={{ color: "#ef7d00", fontSize: "16px" }} /> Upload
//                             <input
//                                 type="file"
//                                 accept="image/*"
//                                 hidden
//                                 onChange={handleLogoUpload}
//                             />
//                         </StyledButton>
//                     </Box>

//                     <Box
//                         mb={4}
//                         sx={{
//                             display: 'flex',
//                             flexDirection: 'column',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                         }}
//                     >
//                         <Box
//                             sx={{
//                                 width: "250px",
//                                 height: "125px",
//                                 borderRadius: "10px",
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 textAlign: "center",
//                                 backgroundImage: bannerImage ? `url(${bannerImage})` : "none",
//                                 backgroundColor: bannerImage ? "transparent" : "#F1F2F2",
//                                 backgroundSize: "cover",
//                                 backgroundPosition: "center",
//                             }}
//                         >
//                             {!bannerImage && (
//                                 <span className='icon-image-gallery' style={{ fontSize: "40px", color: "#AAAAAA", }}></span>
//                             )}
//                         </Box>
//                         <Typography
//                             variant="subtitle1"
//                             align='center'
//                             sx={{ fontSize: "8px", color: "#AAAAAA", mt: 1 }}
//                         >
//                             Banner 1000x500px
//                         </Typography>
//                         <StyledButton
//                             variant="contained"
//                             component="label"
//                             sx={{ mt: 1 }}
//                         >
//                             <StraightIcon sx={{ color: "#ef7d00", fontSize: "16px" }} /> Upload
//                             <input
//                                 type="file"
//                                 accept="image/*"
//                                 hidden
//                                 onChange={handleBannerUpload}
//                             />
//                         </StyledButton>
//                     </Box>

//                 </Grid>

//                 <Divider orientation="vertical" flexItem />

//                 {/* العمود الثاني */}
//                 <Grid item xs={4}>
//                     <Box
//                         sx={{
//                             display: 'flex',
//                             flexDirection: "column",
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             padding: "20px 0px"
//                         }}
//                     >
//                         <Box
//                             sx={{
//                                 display: 'flex',
//                                 justifyContent: 'space-between',
//                                 width: '80%',
//                             }}
//                         >
//                             <Grid container spacing={1}>
//                                 <Typography variant="h3"
//                                     sx={{ fontSize: "13px", width: "100%", fontWeight: "500", color: "gray" }}
//                                 >
//                                     Default Mode
//                                 </Typography>
//                                 <ToggleButtonGroup
//                                     value={mode}
//                                     exclusive
//                                     onChange={handleModeChange}
//                                 >
//                                     <ToggleButton
//                                         value="light"
//                                         sx={{
//                                             padding: "5px 8px",
//                                             backgroundColor: mode === "light" ? "#E57C00" : "AAAAAA",
//                                             color: mode === "light" ? "#FFFFFF" : "gray"
//                                         }}
//                                     >
//                                         <WbSunnyIcon sx={{ fontSize: "30px", color: mode === "light" ? "#E57C00" : "#AAAAAA" }} />
//                                     </ToggleButton>

//                                     <ToggleButton
//                                         value="dark"
//                                         sx={{
//                                             padding: "5px 8px",
//                                             backgroundColor: mode === "dark" ? "#E57C00" : "inherit",
//                                             color: mode === "dark" ? "#FFFFFF" : "gray"
//                                         }}
//                                     >
//                                         <NightlightIcon sx={{ fontSize: "30px", color: mode === "dark" ? "#E57C00" : "#AAAAAA" }} />
//                                     </ToggleButton>
//                                 </ToggleButtonGroup>
//                             </Grid>

//                             <Divider orientation="vertical" flexItem
//                                 sx={{ height: "50px", marginRight: "25px", width: "1px", backgroundColor: "orange" }} />

//                             <Grid container spacing={1}>
//                                 <Typography variant="h6"
//                                     sx={{ fontSize: "13px", width: "100%", fontWeight: "500", color: "gray" }}
//                                 >
//                                     Menu Design
//                                 </Typography>
//                                 <ToggleButtonGroup
//                                     value={design}
//                                     exclusive
//                                     onChange={handleDesignChange}
//                                 >
//                                     <ToggleButton
//                                         value="grid"
//                                         sx={{
//                                             padding: "5px 8px",
//                                             backgroundColor: design === "grid" ? "#E57C00" : "inherit",
//                                             color: design === "grid" ? "#E57C00" : "inherit"
//                                         }}
//                                     >
//                                         <span class='icon-grid' style={{ fontSize: "30px", color: design === "grid" ? "#E57C00" : "#AAAAAA" }} />
//                                     </ToggleButton>
//                                     <ToggleButton
//                                         value="list"
//                                         sx={{
//                                             padding: "5px 8px",
//                                             backgroundColor: design === "list" ? "#E57C00" : "inherit",
//                                             color: design === "list" ? "#E57C00" : "inherit"
//                                         }}
//                                     >
//                                         <span class='icon-list' style={{ fontSize: "30px", color: design === "list" ? "#E57C00" : "#AAAAAA" }} />
//                                     </ToggleButton>
//                                 </ToggleButtonGroup>
//                             </Grid>
//                         </Box>
//                         <Divider sx={{ backgroundColor: "#f4f6fc", height: "2px", margin: "15px" }} flexItem />

//                         <Box >
//                             <Typography variant="body1" sx={{ display: "flex", fontSize: "12px", color: "gray" }}  >
//                                 <span class="icon-waiter" style={{ fontSize: "17px", marginRight: "10px" }}></span> Serving Ways</Typography>
//                             <Box display="flex" justifyContent="space-around" >
//                                 <FormControlLabel
//                                     control={
//                                         <Checkbox
//                                             defaultChecked
//                                             sx={{
//                                                 '& .MuiSvgIcon-root': { fontSize: 19 },
//                                                 color: "gray",
//                                                 '&.Mui-checked': {
//                                                     color: "#ef7d00",
//                                                 }
//                                             }}
//                                         />
//                                     }
//                                     label="Dine In"
//                                     sx={{
//                                         '& .MuiTypography-root': {
//                                             fontSize: "11px", color: "gray"
//                                         }
//                                     }}
//                                 />
//                                 <FormControlLabel
//                                     control={
//                                         <Checkbox
//                                             sx={{
//                                                 '& .MuiSvgIcon-root': { fontSize: 18 },
//                                                 color: "gray",
//                                                 '&.Mui-checked': {
//                                                     color: "#ef7d00",
//                                                 }
//                                             }}
//                                         />
//                                     }
//                                     label="Takeaway"
//                                     sx={{
//                                         '& .MuiTypography-root': {
//                                             fontSize: "11px", color: "gray"
//                                         }
//                                     }}
//                                 />
//                                 <FormControlLabel
//                                     control={
//                                         <Checkbox
//                                             sx={{
//                                                 '& .MuiSvgIcon-root': { fontSize: 18 },
//                                                 color: "gray",
//                                                 '&.Mui-checked': {
//                                                     color: "#ef7d00",
//                                                 }
//                                             }}
//                                         />
//                                     }
//                                     label="Delivery"
//                                     sx={{
//                                         '& .MuiTypography-root': {
//                                             fontSize: "11px", color: "gray"
//                                         }
//                                     }}
//                                 />
//                             </Box>
//                         </Box>

//                         <Divider sx={{ backgroundColor: "#f4f6fc", height: "2px", margin: "15px" }} flexItem />

//                         <Box sx={{
//                             display: 'flex', justifyContent: "space-around",
//                             width: '100%'
//                         }}>
//                             <FormControlLabel
//                                 control={
//                                     <Checkbox

//                                         sx={{
//                                             '& .MuiSvgIcon-root': { fontSize: 18 },
//                                             color: "gray",
//                                             '&.Mui-checked': {
//                                                 color: "#ef7d00",
//                                             }
//                                         }}
//                                     />
//                                 }

//                                 label={
//                                     <Box sx={{
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                     }}>
//                                         <span className='icon-hand-up'
//                                             style={{ fontSize: 16, color: '#222240', marginRight: "10px" }} ></span>

//                                         <Typography sx={{ fontSize: "13px", color: "gray" }}>
//                                             Activate Call Waiter
//                                         </Typography>
//                                     </Box>
//                                 }
//                                 sx={{
//                                     display: 'flex',
//                                     alignItems: "center",
//                                     '& .MuiTypography-root': {
//                                         fontSize: "14px",
//                                         color: "gray"
//                                     }
//                                 }}
//                             />
//                             <Box></Box>
//                         </Box>

//                         <Divider sx={{ backgroundColor: "#f4f6fc", height: "2px", margin: "10px" }} flexItem />

//                         <Box >
//                             <Typography variant="body1" sx={{ display: "flex", fontSize: "11px", color: "gray" }}  >
//                                 Payment Method</Typography>
//                             <Box display="flex"  justifyContent="center"  >
//                                 <FormControlLabel
//                                     control={
//                                         <Checkbox

//                                             sx={{
//                                                 '& .MuiSvgIcon-root': { fontSize: 16 },
//                                                 color: "gray",
//                                                 '&.Mui-checked': {
//                                                     color: "#ef7d00",
//                                                 }
//                                             }}
//                                         />
//                                     }
//                                     label={
//                                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                             <img src='/assets/cash.svg' alt="cash icon" style={{ width: '12px',height:"12px", marginRight: '4px' }}></img>
//                                             <span>Card</span>
//                                         </Box>
//                                     }
//                                     sx={{
//                                         '& .MuiTypography-root': {
//                                             fontSize: "10px", color: "gray"
//                                         }
//                                     }}
//                                 />
//                                 <FormControlLabel
//                                     control={
//                                         <Checkbox

//                                             sx={{
//                                                 '& .MuiSvgIcon-root': { fontSize: 16 },
//                                                 color: "gray",
//                                                 '&.Mui-checked': {
//                                                     color: "#ef7d00",
//                                                 }
//                                             }}
//                                         />
//                                     }
//                                     label={
//                                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                             <span class="icon-wallet" style={{ fontSize: 15, marginRight: '4px' }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span></span>
//                                             <span>Digital Wallet</span>
//                                         </Box>
//                                     }
//                                     sx={{
//                                         '& .MuiTypography-root': {
//                                             fontSize: "10px", color: "gray"
//                                         }
//                                     }}
//                                 />
//                                 <FormControlLabel
//                                     control={
//                                         <Checkbox

//                                             sx={{
//                                                 '& .MuiSvgIcon-root': { fontSize: 16 },
//                                                 color: "gray",
//                                                 '&.Mui-checked': {
//                                                     color: "#ef7d00",
//                                                 }
//                                             }}
//                                         />
//                                     }
//                                     label={
//                                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                             <img src='/assets/cardColor.svg' alt="card icon" 
//                                             style={{ width: '12px',height:"12px", marginRight: '4px' }}></img>
//                                             <span>Card</span>
//                                         </Box>
//                                     }
//                                     sx={{
//                                         '& .MuiTypography-root': {
//                                             fontSize: "10px", color: "gray",
//                                         }
//                                     }}
//                                 />
//                             </Box>
//                         </Box>

//                         <Divider sx={{ backgroundColor: "#f4f6fc", height: "2px", margin: "12px" }} flexItem />

//                         <Box >
//                             <Typography variant="body1" sx={{ display: "flex", fontSize: "12px", color: "gray" }}  >
//                                 Payment Time  </Typography>

//                             <Box display="flex" justifyContent="left"  >
//                                 <FormControlLabel
//                                     control={
//                                         <Checkbox

//                                             sx={{
//                                                 '& .MuiSvgIcon-root': { fontSize: 20 },
//                                                 color: "gray",
//                                                 '&.Mui-checked': {
//                                                     color: "#ef7d00",
//                                                 }
//                                             }}
//                                         />
//                                     }
//                                     label="Before Serving"
//                                     sx={{
//                                         '& .MuiTypography-root': {
//                                             fontSize: "13px", color: "gray"
//                                         }
//                                     }}
//                                 />
//                                 <FormControlLabel
//                                     control={
//                                         <Checkbox
//                                             sx={{
//                                                 '& .MuiSvgIcon-root': { fontSize: 20 },
//                                                 color: "gray",
//                                                 '&.Mui-checked': {
//                                                     color: "#ef7d00",
//                                                 }
//                                             }}
//                                         />
//                                     }
//                                     label="After Serving "
//                                     sx={{
//                                         '& .MuiTypography-root': {
//                                             fontSize: "13px", color: "gray"
//                                         }
//                                     }}
//                                 />
//                             </Box>

//                         </Box>

//                     </Box>

//                 </Grid >

//                 <Divider orientation="vertical" flexItem />

//                 {/* العمود الثالث */}
//                 <Grid item xs={3}  >
//                     <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, padding: "10px 0px" }}>
//                     <span class="icon-working-hour"  style={{ fontSize: "18px" ,marginRight: '10px', }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span></span>
//                         <Typography variant="h6" sx={{ fontSize: '13px', color: 'gray' }}>
//                             Working Hours
//                         </Typography>
//                     </Box>

//                     {Days.map((item) => (
//                         <Box
//                             key={item.day}
//                             sx={{
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 borderRadius: 2,
//                             }}
//                         >
//                             <Button
//                                 key={item.day}
//                                 sx={{
//                                     color: selectedButton === item.day ? '#FFA500' : '#9d9d9c',
//                                     minWidth: 30 ,
//                                     height: 30,
//                                     borderRadius: 2,
//                                     marginRight: 2,
//                                     marginBottom: "20px",
//                                     fontSize:"13px", 
//                                     border: `1px solid ${selectedButton === item.day ? '#ef7d00' : '#9d9d9c'}`,
//                                 }}
//                                 onClick={() => handleButtonClick(item.day)}
//                             >
//                                 {item.day}
//                             </Button>

//                             {/* Time Selectors */}
//                             <Box sx={{ marginLeft: 2, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
//                                 <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
//                                     <Typography sx={{ fontSize: '11px', color: '#BDBDBD', marginRight: 1 }}>To:</Typography>
//                                     <FormControl variant="outlined" size="small" sx={{ minWidth: 70 }}>
//                                         <Select
//                                             name="endTime"
//                                             value={times.endTime}
//                                             onChange={handleTimeChange}
//                                             sx={{ fontSize: '10px', color: "gray" }}
//                                             MenuProps={{
//                                                 disableScrollLock: true,
//                                             }}     
//                                         >
//                                             <MenuItem value="5:00 pm" sx={{ fontSize: "13px", color: "gray" }}>5:00 pm</MenuItem>
//                                             <MenuItem value="6:00 pm" sx={{ fontSize: "13px", color: "gray" }}>6:00 pm</MenuItem>
//                                             <MenuItem value="7:00 pm" sx={{ fontSize: "13px", color: "gray" }}>7:00 pm</MenuItem>
//                                         </Select>
//                                     </FormControl>
//                                 </Box>

//                                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                     <Typography sx={{ fontSize: '11px', color: '#BDBDBD', marginRight: 1 }}>From:</Typography>
//                                     <FormControl variant="outlined" size="small" sx={{ minWidth: 70 }}>
//                                         <Select disableScrollLock
//                                             name="startTime" 
//                                             value={times.startTime}
//                                             onChange={handleTimeChange}
//                                             sx={{ fontSize: '10px', color: "gray" }}
//                                             MenuProps={{
//                                                 disableScrollLock: true,
//                                             }}     
//                                         >
//                                             <MenuItem value="9:00 am" sx={{ fontSize: "13px", color: "gray" }}>9:00 am</MenuItem>
//                                             <MenuItem value="8:00 am" sx={{ fontSize: "13px", color: "gray" }}>8:00 am</MenuItem>
//                                             <MenuItem value="7:00 am" sx={{ fontSize: "13px", color: "gray" }}>7:00 am</MenuItem>
//                                         </Select>
//                                     </FormControl>
//                                 </Box>
//                             </Box>
//                         </Box>
//                     ))}
//                 </Grid>

//             </Grid >

//             <Box textAlign="center" mt={2}>
//                 <Button sx={{
//                     fontSize: "13px", padding: "3px 50px",
//                     borderRadius: "20px", backgroundColor: "#ef7d00", color: "white", textTransform: "capitalize",
//                 }}
//                     startIcon={<CheckOutlinedIcon />}>Save</Button>
//             </Box>
//         </Paper>
//     );
// };

// export default Menu;

import React, { useState, useContext, useEffect } from 'react';
import { Grid, Divider, Box, Typography, Button, Checkbox, FormControlLabel, ToggleButton, ToggleButtonGroup, FormControl, MenuItem, Select, Paper } from '@mui/material';
import { styled } from '@mui/system';
import StraightIcon from '@mui/icons-material/Straight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightIcon from '@mui/icons-material/Nightlight';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { ClientLoginData } from '../../../../context/ClientLoginDataContext'; // تأكد من المسار الصحيح
import Days from '../Menu/Days';
import { toast } from 'react-toastify';

const StyledButton = styled(Button)(() => ({
    backgroundColor: '#222240',
    color: '#fff',
    padding: '1px 30px',
    textTransform: "capitalize",
    borderRadius: "20px",
    fontSize: "9px",
    textAlign: "center",
    justifyContent: "center",
    '&:hover': {
        backgroundColor: '#222240', // Remove hover effect
    },
}));

const ImageBox = styled(Box)(({ imageUrl }) => ({
    width: "120px",
    height: "120px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
    backgroundColor: imageUrl ? "transparent" : "#F1F2F2",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "50%",
}));

const Menu = () => {
    const { clientData } = useContext(ClientLoginData);
    const { qtap_clients } = clientData;
    const [selectedButtons, setSelectedButtons] = useState([]); // Change to array for multiple selections
    const selectedBranch = localStorage.getItem("selectedBranch");

    const existBranch = qtap_clients.brunchs.find(branch => branch.id == selectedBranch) || {};
    const [mode, setMode] = useState(existBranch?.default_mode);
    const [design, setDesign] = useState(existBranch?.menu_design?.toLowerCase() || 'grid');
    const [logoImage, setLogoImage] = useState(existBranch?.logo || null);
    const [bannerImage, setBannerImage] = useState(existBranch?.cover || null);
    const [servingWays, setServingWays] = useState(existBranch?.serving_ways?.map(way => way.name) || []);
    const [tablesNumber, setTablesNumber] = useState(existBranch?.serving_ways?.find(way => way.name === 'dine_in')?.tables_number || '');
    const [workSchedules, setWorkSchedules] = useState(existBranch?.workschedule || []);
    const [paymentServices, setPaymentServices] = useState(existBranch?.payment_services?.map(service => service.name) || []);
    const [callWaiter, setCallWaiter] = useState(existBranch?.call_waiter || 'active');
    const [paymentTime, setPaymentTime] = useState(existBranch?.payment_time || 'before');

    console.log("alll data you want existBranch 30 qtap_clients", existBranch, selectedBranch, qtap_clients)
    // Handle multiple selections for working hours
    const handleButtonClick = (day) => {
        if (selectedButtons.includes(day)) {
            setSelectedButtons(selectedButtons.filter(d => d !== day));
        } else {
            setSelectedButtons([...selectedButtons, day]);
        }
    };

    // Handle save
    const handleSave = async (id) => {
        const updatedData = {
            brunch_id: selectedBranch,
            default_mode: mode,
            menu_design: design,
            serving_ways: servingWays,
            tables_number: tablesNumber,
            workschedules: workSchedules.reduce((acc, schedule) => {
                acc[schedule.day] = [schedule.opening_time, schedule.closing_time];
                return acc;
            }, {}),
            payment_services: paymentServices,
            call_waiter: callWaiter,
            payment_time: paymentTime,
        };
        console.log("updatedData update menu data", updatedData)

        try {
            const response = await fetch(`https://highleveltecknology.com/Qtap/api/clients_update_menu/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("clientToken")}`,
                },
                body: JSON.stringify(updatedData),
            });

            console.log("response update menu data", response)

            if (response.ok) {
                toast.success('Menu updated successfully!');
                console.log(response);

            } else {
                toast.error('Failed to update menu.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while updating the menu.');
        }
    };
    const handleLogoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setLogoImage(imageUrl);
        }
    };

    const handleBannerUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setBannerImage(imageUrl);
        }
    };
    const handleDesignChange = (event, newDesign) => {
        if (newDesign !== null) {
            setDesign(newDesign);
        }
    };

    const handleServingWayChange = (way) => {
        if (servingWays.includes(way)) {
            setServingWays(servingWays.filter(w => w !== way));
        } else {
            setServingWays([...servingWays, way]);
        }
    };

    const handlePaymentServiceChange = (service) => {
        if (paymentServices.includes(service)) {
            setPaymentServices(paymentServices.filter(s => s !== service));
        } else {
            setPaymentServices([...paymentServices, service]);
        }
    };
    const [times, setTimes] = useState({
        startTime: '9:00 am',
        endTime: '5:00 pm'
    });

    const handleTimeChange = (event) => {
        const { name, value } = event.target;
        setTimes({
            ...times,
            [name]: value
        });
    };

    return (
        <Paper style={{ padding: '20px 30px', borderRadius: "10px", marginTop: '16px' }}>
            <Grid container spacing={2}>
                {/* First Column */}
                <Grid item xs={4} direction="column" sx={{ padding: '30px' }}>
                    {/* Logo and Banner Upload */}
                    <Box mb={5} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: "20px" }}>
                        <ImageBox imageUrl={logoImage}>
                            {!logoImage && <span className="icon-image-gallery" style={{ fontSize: "40px", color: "#AAAAAA" }}></span>}
                        </ImageBox>
                        <Typography variant="subtitle1" sx={{ fontSize: "8px", color: "#AAAAAA", mb: 1, mt: 1 }}>Logo 500x500px</Typography>
                        <StyledButton variant="contained" component="label">
                            <StraightIcon sx={{ color: "#ef7d00", fontSize: "16px" }} /> Upload
                            <input type="file" accept="image/*" hidden onChange={handleLogoUpload} />
                        </StyledButton>
                    </Box>

                    <Box mb={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ width: "250px", height: "125px", borderRadius: "10px", display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: "center", backgroundImage: bannerImage ? `url(${bannerImage})` : "none", backgroundColor: bannerImage ? "transparent" : "#F1F2F2", backgroundSize: "cover", backgroundPosition: "center" }}>
                            {!bannerImage && <span className='icon-image-gallery' style={{ fontSize: "40px", color: "#AAAAAA" }}></span>}
                        </Box>
                        <Typography variant="subtitle1" align='center' sx={{ fontSize: "8px", color: "#AAAAAA", mt: 1 }}>Banner 1000x500px</Typography>
                        <StyledButton variant="contained" component="label" sx={{ mt: 1 }}>
                            <StraightIcon sx={{ color: "#ef7d00", fontSize: "16px" }} /> Upload
                            <input type="file" accept="image/*" hidden onChange={handleBannerUpload} />
                        </StyledButton>
                    </Box>
                </Grid>

                <Divider orientation="vertical" flexItem />

                {/* Second Column */}
                <Grid item xs={4}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: "column",
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: "20px 0px"
                        }}
                    >
                        {/* Default Mode and Menu Design */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '80%',
                            }}
                        >
                            <Grid container spacing={1}>
                                <Typography variant="h3"
                                    sx={{ fontSize: "13px", width: "100%", fontWeight: "500", color: "gray" }}
                                >
                                    Default Mode
                                </Typography>
                                <ToggleButtonGroup
                                    value={mode}
                                    exclusive
                                    onChange={(e) => setMode(e.target.value)}
                                >
                                    <ToggleButton
                                        value="white"
                                        sx={{
                                            padding: "5px 8px",
                                            backgroundColor: mode === "white" ? "#E57C00" : "AAAAAA",
                                            color: mode === "white" ? "#FFFFFF" : "gray"
                                        }}
                                    >
                                        <WbSunnyIcon sx={{ fontSize: "30px", color: mode === "white" ? "#E57C00" : "#AAAAAA" }} />
                                    </ToggleButton>

                                    <ToggleButton
                                        value="dark"
                                        sx={{
                                            padding: "5px 8px",
                                            backgroundColor: mode === "dark" ? "#E57C00" : "inherit",
                                            color: mode === "dark" ? "#FFFFFF" : "gray"
                                        }}
                                    >
                                        <NightlightIcon sx={{ fontSize: "30px", color: mode === "dark" ? "#E57C00" : "#AAAAAA" }} />
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>

                            <Divider orientation="vertical" flexItem
                                sx={{ height: "50px", marginRight: "25px", width: "1px", backgroundColor: "orange" }} />

                            <Grid container spacing={1}>
                                <Typography variant="h6"
                                    sx={{ fontSize: "13px", width: "100%", fontWeight: "500", color: "gray" }}
                                >
                                    Menu Design
                                </Typography>
                                <ToggleButtonGroup
                                    value={design}
                                    exclusive
                                    onChange={handleDesignChange}
                                >
                                    <ToggleButton
                                        value="grid"
                                        sx={{
                                            padding: "5px 8px",
                                            backgroundColor: design === "grid" ? "#E57C00" : "inherit",
                                            color: design === "grid" ? "#E57C00" : "inherit"
                                        }}
                                    >
                                        <span class='icon-grid' style={{ fontSize: "30px", color: design === "grid" ? "#E57C00" : "#AAAAAA" }} />
                                    </ToggleButton>
                                    <ToggleButton
                                        value="list"
                                        sx={{
                                            padding: "5px 8px",
                                            backgroundColor: design === "list" ? "#E57C00" : "inherit",
                                            color: design === "list" ? "#E57C00" : "inherit"
                                        }}
                                    >
                                        <span class='icon-list' style={{ fontSize: "30px", color: design === "list" ? "#E57C00" : "#AAAAAA" }} />
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                        </Box>
                        <Divider sx={{ backgroundColor: "#f4f6fc", height: "2px", margin: "15px" }} flexItem />

                        {/* Serving Ways */}
                        <Box >
                            <Typography variant="body1" sx={{ display: "flex", fontSize: "12px", color: "gray" }}  >
                                <span class="icon-waiter" style={{ fontSize: "17px", marginRight: "10px" }}></span> Serving Ways</Typography>
                            <Box display="flex" justifyContent="space-around" >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={servingWays.includes('dine_in')}
                                            onChange={() => handleServingWayChange('dine_in')}
                                            sx={{
                                                '& .MuiSvgIcon-root': { fontSize: 19 },
                                                color: "gray",
                                                '&.Mui-checked': {
                                                    color: "#ef7d00",
                                                }
                                            }}
                                        />
                                    }
                                    label="Dine In"
                                    sx={{
                                        '& .MuiTypography-root': {
                                            fontSize: "11px", color: "gray"
                                        }
                                    }}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={servingWays.includes('take_away')}
                                            onChange={() => handleServingWayChange('take_away')}
                                            sx={{
                                                '& .MuiSvgIcon-root': { fontSize: 18 },
                                                color: "gray",
                                                '&.Mui-checked': {
                                                    color: "#ef7d00",
                                                }
                                            }}
                                        />
                                    }
                                    label="Takeaway"
                                    sx={{
                                        '& .MuiTypography-root': {
                                            fontSize: "11px", color: "gray"
                                        }
                                    }}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={servingWays.includes('delivery')}
                                            onChange={() => handleServingWayChange('delivery')}
                                            sx={{
                                                '& .MuiSvgIcon-root': { fontSize: 18 },
                                                color: "gray",
                                                '&.Mui-checked': {
                                                    color: "#ef7d00",
                                                }
                                            }}
                                        />
                                    }
                                    label="Delivery"
                                    sx={{
                                        '& .MuiTypography-root': {
                                            fontSize: "11px", color: "gray"
                                        }
                                    }}
                                />
                            </Box>
                        </Box>

                        <Divider sx={{ backgroundColor: "#f4f6fc", height: "2px", margin: "15px" }} flexItem />

                        {/* Activate Call Waiter */}
                        <Box sx={{
                            display: 'flex', justifyContent: "space-around",
                            width: '100%'
                        }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={callWaiter === 'active'}
                                        onChange={(e) => setCallWaiter(e.target.checked ? 'active' : 'inactive')}
                                        sx={{
                                            '& .MuiSvgIcon-root': { fontSize: 18 },
                                            color: "gray",
                                            '&.Mui-checked': {
                                                color: "#ef7d00",
                                            }
                                        }}
                                    />
                                }

                                label={
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}>
                                        <span className='icon-hand-up'
                                            style={{ fontSize: 16, color: '#222240', marginRight: "10px" }} ></span>

                                        <Typography sx={{ fontSize: "13px", color: "gray" }}>
                                            Activate Call Waiter
                                        </Typography>
                                    </Box>
                                }
                                sx={{
                                    display: 'flex',
                                    alignItems: "center",
                                    '& .MuiTypography-root': {
                                        fontSize: "14px",
                                        color: "gray"
                                    }
                                }}
                            />
                            <Box></Box>
                        </Box>

                        <Divider sx={{ backgroundColor: "#f4f6fc", height: "2px", margin: "10px" }} flexItem />

                        {/* Payment Method */}
                        <Box >
                            <Typography variant="body1" sx={{ display: "flex", fontSize: "11px", color: "gray" }}  >
                                Payment Method</Typography>
                            <Box display="flex" justifyContent="center"  >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={paymentServices.includes('cash')}
                                            onChange={() => handlePaymentServiceChange('cash')}
                                            sx={{
                                                '& .MuiSvgIcon-root': { fontSize: 16 },
                                                color: "gray",
                                                '&.Mui-checked': {
                                                    color: "#ef7d00",
                                                }
                                            }}
                                        />
                                    }
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <img src='/assets/cash.svg' alt="cash icon" style={{ width: '12px', height: "12px", marginRight: '4px' }}></img>
                                            <span>Cash</span>
                                        </Box>
                                    }
                                    sx={{
                                        '& .MuiTypography-root': {
                                            fontSize: "10px", color: "gray"
                                        }
                                    }}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={paymentServices.includes('wallet')}
                                            onChange={() => handlePaymentServiceChange('wallet')}
                                            sx={{
                                                '& .MuiSvgIcon-root': { fontSize: 16 },
                                                color: "gray",
                                                '&.Mui-checked': {
                                                    color: "#ef7d00",
                                                }
                                            }}
                                        />
                                    }
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <span class="icon-wallet" style={{ fontSize: 15, marginRight: '4px' }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span></span>
                                            <span>Digital Wallet</span>
                                        </Box>
                                    }
                                    sx={{
                                        '& .MuiTypography-root': {
                                            fontSize: "10px", color: "gray"
                                        }
                                    }}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={paymentServices.includes('card')}
                                            onChange={() => handlePaymentServiceChange('card')}
                                            sx={{
                                                '& .MuiSvgIcon-root': { fontSize: 16 },
                                                color: "gray",
                                                '&.Mui-checked': {
                                                    color: "#ef7d00",
                                                }
                                            }}
                                        />
                                    }
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <img src='/assets/cardColor.svg' alt="card icon"
                                                style={{ width: '12px', height: "12px", marginRight: '4px' }}></img>
                                            <span>Card</span>
                                        </Box>
                                    }
                                    sx={{
                                        '& .MuiTypography-root': {
                                            fontSize: "10px", color: "gray",
                                        }
                                    }}
                                />
                            </Box>
                        </Box>

                        <Divider sx={{ backgroundColor: "#f4f6fc", height: "2px", margin: "12px" }} flexItem />

                        {/* Payment Time */}
                        <Box >
                            <Typography variant="body1" sx={{ display: "flex", fontSize: "12px", color: "gray" }}  >
                                Payment Time  </Typography>

                            <Box display="flex" justifyContent="left"  >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={paymentTime === 'before'}
                                            onChange={() => setPaymentTime('before')}
                                            sx={{
                                                '& .MuiSvgIcon-root': { fontSize: 20 },
                                                color: "gray",
                                                '&.Mui-checked': {
                                                    color: "#ef7d00",
                                                }
                                            }}
                                        />
                                    }
                                    label="Before Serving"
                                    sx={{
                                        '& .MuiTypography-root': {
                                            fontSize: "13px", color: "gray"
                                        }
                                    }}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={paymentTime === 'after'}
                                            onChange={() => setPaymentTime('after')}
                                            sx={{
                                                '& .MuiSvgIcon-root': { fontSize: 20 },
                                                color: "gray",
                                                '&.Mui-checked': {
                                                    color: "#ef7d00",
                                                }
                                            }}
                                        />
                                    }
                                    label="After Serving "
                                    sx={{
                                        '& .MuiTypography-root': {
                                            fontSize: "13px", color: "gray"
                                        }
                                    }}
                                />
                            </Box>

                        </Box>

                    </Box>

                </Grid >

                <Divider orientation="vertical" flexItem />

                {/* Third Column */}
               
                <Grid item xs={3}  >
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, padding: "10px 0px" }}>
                        <span class="icon-working-hour" style={{ fontSize: "18px", marginRight: '10px', }}><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span></span>
                        <Typography variant="h6" sx={{ fontSize: '13px', color: 'gray' }}>
                            Working Hours
                        </Typography>
                    </Box>

                    {Days.map((item) => (
                        <Box
                            key={item.day}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: 2,
                            }}
                        >
                            <Button
                                key={item.day}
                                sx={{
                                    color: selectedButtons.includes(item.day) ? '#FFA500' : '#9d9d9c',
                                    minWidth: 30,
                                    height: 30,
                                    borderRadius: 2,
                                    marginRight: 2,
                                    marginBottom: "20px",
                                    fontSize: "13px",
                                    border: `1px solid ${selectedButtons.includes(item.day) ? '#ef7d00' : '#9d9d9c'}`,
                                }}
                                onClick={() => handleButtonClick(item.day)}
                            >
                                {item.day}
                            </Button>

                            {/* Time Selectors */}
                            <Box sx={{ marginLeft: 2, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
                                    <Typography sx={{ fontSize: '11px', color: '#BDBDBD', marginRight: 1 }}>To:</Typography>
                                    <FormControl variant="outlined" size="small" sx={{ minWidth: 70 }}>
                                        <Select
                                            name="endTime"
                                            value={times.endTime}
                                            onChange={handleTimeChange}
                                            sx={{ fontSize: '10px', color: "gray" }}
                                            MenuProps={{
                                                disableScrollLock: true,
                                            }}
                                        >
                                            <MenuItem value="5:00 pm" sx={{ fontSize: "13px", color: "gray" }}>5:00 pm</MenuItem>
                                            <MenuItem value="6:00 pm" sx={{ fontSize: "13px", color: "gray" }}>6:00 pm</MenuItem>
                                            <MenuItem value="7:00 pm" sx={{ fontSize: "13px", color: "gray" }}>7:00 pm</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: '11px', color: '#BDBDBD', marginRight: 1 }}>From:</Typography>
                                    <FormControl variant="outlined" size="small" sx={{ minWidth: 70 }}>
                                        <Select disableScrollLock
                                            name="startTime"
                                            value={times.startTime}
                                            onChange={handleTimeChange}
                                            sx={{ fontSize: '10px', color: "gray" }}
                                            MenuProps={{
                                                disableScrollLock: true,
                                            }}
                                        >
                                            <MenuItem value="9:00 am" sx={{ fontSize: "13px", color: "gray" }}>9:00 am</MenuItem>
                                            <MenuItem value="8:00 am" sx={{ fontSize: "13px", color: "gray" }}>8:00 am</MenuItem>
                                            <MenuItem value="7:00 am" sx={{ fontSize: "13px", color: "gray" }}>7:00 am</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Grid>

            </Grid >

            <Box textAlign="center" mt={2}>
                <Button sx={{
                    fontSize: "13px", padding: "3px 50px", borderRadius: "20px", backgroundColor: "#ef7d00",
                    color: "white", textTransform: "capitalize"
                }}
                    startIcon={<CheckOutlinedIcon />}
                    onClick={() => handleSave(qtap_clients.id)}
                >
                    Save
                </Button>
            </Box>
        </Paper>
    );
};

export default Menu;