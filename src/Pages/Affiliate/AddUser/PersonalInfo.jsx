// import React from 'react';
// import { Grid, Typography, Divider, FormControl, OutlinedInput, InputAdornment, MenuItem, Select } from '@mui/material';
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
// import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
// import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
// import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
// import { Box } from '@mui/system';
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// export const PersonalInfo = ({
//     fullName,
//     setFullName,
//     phone,
//     setPhone,
//     email,
//     setEmail,
//     month,
//     setMonth,
//     day,
//     setDay,
//     year,
//     setYear,
//     country,
//     setCountry,
//     password,
//     setPassword,
//     confirmPassword,
//     setConfirmPassword,
//     selectedImage,
//     setSelectedImage,
//     selectedOption,
//     setSelectedOption
// }) => {

//     const handleImageChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             setSelectedImage(file);
//         }
//     };

//     return (
//         <Grid container spacing={2} justifyContent="center">
//             <Grid item xs={12} md={3} sx={{ marginRight: "40px" }}>
//                 <Box sx={{ textAlign: 'center' }}>
//                     <Box sx={{
//                         width: '100%',
//                         height: '100%',
//                         borderRadius: '50%',
//                         overflow: 'hidden',
//                         position: 'relative',
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                     }}>
//                         <img
//                             src={selectedImage ? URL.createObjectURL(selectedImage) : "/images/User.jpg"}
//                             alt="user"
//                             width={"200px"} height={"180px"}
//                         />
//                         <Box
//                             component="label"
//                             htmlFor="image-upload"
//                             sx={{
//                                 position: 'absolute',
//                                 bottom: 0,
//                                 width: '100%',
//                                 height: '18%',
//                                 backgroundColor: '#4b4a4a',
//                                 display: 'flex',
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 color: 'white',
//                                 cursor: 'pointer'
//                             }}
//                         >
//                             <input
//                                 type="file"
//                                 id="image-upload"
//                                 accept="image/*"
//                                 onChange={handleImageChange}
//                                 style={{ display: 'none' }}
//                             />
//                             <EditOutlinedIcon sx={{ color: "white", fontSize: '20px' }} />
//                         </Box>
//                     </Box>
//                     <Typography variant="body2" sx={{ fontSize: "15px", color: "#575756", marginTop: "8px" }}>
//                         {fullName || 'User01'}
//                     </Typography>
//                 </Box>
//             </Grid>

//             <Grid item xs={12} md={6}>
//                 <Typography variant="body2" sx={{ fontSize: "12px" }} color="#575756" gutterBottom>
//                     Personal Info...........
//                 </Typography>
//                 <Divider sx={{ width: "30%", borderBottom: "4px solid #ef7d00", marginBottom: "18px" }} />

//                 <FormControl variant="outlined" fullWidth>
//                     <OutlinedInput
//                         value={fullName}
//                         onChange={(e) => setFullName(e.target.value)}
//                         startAdornment={
//                             <InputAdornment position="start">
//                                 <PersonOutlinedIcon sx={{ fontSize: "20px" }} />
//                             </InputAdornment>
//                         }
//                         placeholder="Full Name"
//                         required
//                         sx={{ borderRadius: '6px', marginBottom: "18px", height: '33px', fontSize: "11px" }}
//                     />
//                 </FormControl>

//                 <FormControl variant="outlined" fullWidth>
//                     <OutlinedInput
//                         value={phone}
//                         onChange={(e) => setPhone(e.target.value)}
//                         startAdornment={
//                             <InputAdornment position="start">
//                                 <PhoneOutlinedIcon sx={{ fontSize: "20px" }} />
//                             </InputAdornment>
//                         }
//                         placeholder="Mobile Number"
//                         required
//                         sx={{ borderRadius: '6px', marginBottom: "18px", height: '33px', fontSize: "11px" }}
//                     />
//                 </FormControl>

//                 <FormControl variant="outlined" fullWidth>
//                     <OutlinedInput
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         type="email"
//                         startAdornment={
//                             <InputAdornment position="start">
//                                 <MailOutlinedIcon sx={{ fontSize: "20px" }} />
//                             </InputAdornment>
//                         }
//                         placeholder="Email"
//                         required
//                         sx={{ borderRadius: '6px', marginBottom: "18px", height: '33px', fontSize: "11px" }}
//                     />
//                 </FormControl>

//                 <Grid container alignItems="center" sx={{ marginBottom: "18px" }}>
//                     <Grid item xs={12} sm={12} md={12} lg={12}>
//                         <Grid container alignItems="center" sx={{ color: "grey", marginTop: "5px" }} >
//                             <CalendarMonthOutlinedIcon sx={{ marginRight: "6px", fontSize: "13px" }} />
//                             <Typography variant="body1" sx={{ fontSize: "12px" }}>Date of Birth:</Typography>
//                         </Grid>
//                     </Grid>
//                     <Grid item xs={4}>
//                         <FormControl fullWidth>
//                             <Select
//                                 id="outlined-country"
//                                 value={month}
//                                 onChange={(e) => setMonth(e.target.value)}
//                                 displayEmpty
//                                 sx={{ borderRadius: '6px', height: '33px', fontSize: "10px", color: "gray", marginRight: "5px" }}
//                             >
//                                 <MenuItem value="" disabled >
//                                     Month
//                                 </MenuItem>
//                                 <MenuItem value="01" sx={{ fontSize: "10px", color: "gray" }}>01</MenuItem>
//                                 <MenuItem value="02" sx={{ fontSize: "10px", color: "gray" }}>02</MenuItem>
//                                 <MenuItem value="03" sx={{ fontSize: "10px", color: "gray" }}>03</MenuItem>
//                                 <MenuItem value="04" sx={{ fontSize: "10px", color: "gray" }}>04</MenuItem>
//                                 <MenuItem value="05" sx={{ fontSize: "10px", color: "gray" }}>05</MenuItem>
//                                 <MenuItem value="06" sx={{ fontSize: "10px", color: "gray" }}>06</MenuItem>
//                                 <MenuItem value="07" sx={{ fontSize: "10px", color: "gray" }}>07</MenuItem>
//                                 <MenuItem value="08" sx={{ fontSize: "10px", color: "gray" }}>08</MenuItem>
//                                 <MenuItem value="09" sx={{ fontSize: "10px", color: "gray" }}>09</MenuItem>
//                                 <MenuItem value="10" sx={{ fontSize: "10px", color: "gray" }}>10</MenuItem>
//                                 <MenuItem value="11" sx={{ fontSize: "10px", color: "gray" }}>11</MenuItem>
//                                 <MenuItem value="12" sx={{ fontSize: "10px", color: "gray" }}>12</MenuItem>
//                             </Select>
//                         </FormControl>
//                     </Grid>

//                     <Grid item xs={4}>
//                         <FormControl fullWidth>

//                             <Select
//                                 id="outlined-country"
//                                 value={day}
//                                 onChange={(e) => setDay(e.target.value)}
//                                 displayEmpty
//                                 sx={{ borderRadius: '6px', height: '33px', fontSize: "10px", color: "gray", marginRight: "5px" }}
//                             >
//                                 <MenuItem value="" disabled >
//                                     Day
//                                 </MenuItem>
//                                 {[...Array(31).keys()].map((i) => (
//                                     <MenuItem key={i + 1} value={i + 1} sx={{ fontSize: "10px", color: "gray" }}>
//                                         {String(i + 1).padStart(2, '0')}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </Grid>

//                     <Grid item xs={4}>
//                         <FormControl fullWidth>
//                             <Select
//                                 id="outlined-country"
//                                 value={year}
//                                 onChange={(e) => setYear(e.target.value)}
//                                 displayEmpty
//                                 sx={{ borderRadius: '6px', height: '33px', fontSize: "10px", color: "gray" }}
//                             >
//                                 <MenuItem value="" disabled>
//                                     Year
//                                 </MenuItem>
//                                 {Array.from({ length: 2025 - 1994 + 1 }, (_, i) => (
//                                     <MenuItem key={i + 1994} value={i + 1994} sx={{ fontSize: "10px", color: "gray" }}>
//                                         {i + 1994}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </Grid>
//                 </Grid>

//                 <FormControl variant="outlined" fullWidth>
//                     <Select
//                         value={country}
//                         onChange={(e) => setCountry(e.target.value)}
//                         displayEmpty
//                         sx={{ marginBottom: "18px", borderRadius: '6px', height: '33px', fontSize: "10px", color: "gray" }}
//                         startAdornment={
//                             <InputAdornment position="start">
//                                 <span className="icon-location-pin" style={{ fontSize: "16px" }} />
//                             </InputAdornment>
//                         }
//                     >
//                         <MenuItem value="" disabled>Country</MenuItem>
//                         <MenuItem value="syria" sx={{ fontSize: "10px", color: "gray" }}>Syria</MenuItem>
//                         <MenuItem value="US" sx={{ fontSize: "10px", color: "gray" }}>United States</MenuItem>
//                         <MenuItem value="CA" sx={{ fontSize: "10px", color: "gray" }}>Canada</MenuItem>
//                         <MenuItem value="UK" sx={{ fontSize: "10px", color: "gray" }}>United Kingdom</MenuItem>
//                     </Select>
//                 </FormControl>
//                 <FormControl variant="outlined" fullWidth>
//                     <OutlinedInput
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         startAdornment={
//                             <InputAdornment position="start">
//                                 <span className="icon-padlock" style={{ fontSize: "16px" }} />
//                             </InputAdornment>
//                         }
//                         placeholder="Password"
//                         required
//                         sx={{ borderRadius: '6px', marginBottom: "18px", height: '33px', fontSize: "10px" }}
//                     />
//                 </FormControl>

//                 <FormControl variant="outlined" fullWidth>
//                     <OutlinedInput
//                         type="password"
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                         startAdornment={
//                             <InputAdornment position="start">
//                                 <span className="icon-padlock" style={{ fontSize: "16px" }} />
//                             </InputAdornment>
//                         }
//                         placeholder="Confirm Password"
//                         required
//                         sx={{ marginBottom: "18px", borderRadius: '10px', height: '33px', fontSize: "12px" }}
//                     />
//                 </FormControl>

//                 <FormControl fullWidth>
//                     <Select
//                         value={selectedOption || "Winter Campaign"}
//                         onChange={(e) => setSelectedOption(e.target.value)}
//                         displayEmpty
//                         IconComponent={ArrowDropDownIcon}
//                         sx={{
//                             backgroundColor: "#1A1A3B",
//                             borderRadius: "25px",
//                             color: "#ef7d00",
//                             fontSize: "12px",
//                             height: "32px",
//                             textAlign: "center",
//                             "& .MuiOutlinedInput-notchedOutline": {
//                                 borderColor: "transparent",
//                             },
//                             "&:hover .MuiOutlinedInput-notchedOutline": {
//                                 borderColor: "transparent",
//                             },
//                             "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                                 borderColor: "transparent",
//                             },
//                             "& .MuiSelect-icon": {
//                                 color: "white",
//                             },
//                         }}
//                     >
//                         <MenuItem value="Winter Campaign" sx={{ fontSize: "12px", color: "#3f3e3efa" }}>Winter Campaign</MenuItem>
//                         <MenuItem value="Spring Campaign" sx={{ fontSize: "12px", color: "#3f3e3efa" }}>Spring Campaign</MenuItem>
//                         <MenuItem value="Summer Campaign" sx={{ fontSize: "12px", color: "#3f3e3efa" }}>Summer Campaign</MenuItem>
//                     </Select>
//                 </FormControl>
//             </Grid>
//         </Grid>
//     );
// };



import React from 'react';
import { Grid, Typography, Divider, FormControl, OutlinedInput, InputAdornment, MenuItem, Select } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { Box } from '@mui/system';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTranslation } from 'react-i18next';

export const PersonalInfo = ({
  fullName,
  setFullName,
  phone,
  setPhone,
  email,
  setEmail,
  month,
  setMonth,
  day,
  setDay,
  year,
  setYear,
  country,
  setCountry,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  selectedImage,
  setSelectedImage,
  selectedOption,
  setSelectedOption,
  errors
}) => {
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };
  const {t} = useTranslation()
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={3} sx={{ marginRight: "40px" }}>
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <img
              src={selectedImage ? URL.createObjectURL(selectedImage) : "/images/User.jpg"}
              alt="user"
              width={"200px"} height={"180px"}
            />
            <Box
              component="label"
              htmlFor="image-upload"
              sx={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: '18%',
                backgroundColor: '#4b4a4a',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              <EditOutlinedIcon sx={{ color: "white", fontSize: '20px' }} />
            </Box>
          </Box>
          <Typography variant="body2" sx={{ fontSize: "15px", color: "#575756", marginTop: "8px" }}>
            {fullName || 'User01'}
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography variant="body2" sx={{ fontSize: "12px" }} color="#575756" gutterBottom>
          Personal Info...........
        </Typography>
        <Divider sx={{ width: "30%", borderBottom: "4px solid #ef7d00", marginBottom: "18px" }} />

        <FormControl variant="outlined" fullWidth>
          <OutlinedInput
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            startAdornment={<InputAdornment position="start"><PersonOutlinedIcon sx={{ fontSize: "20px" }} /></InputAdornment>}
            placeholder={t("fullName")}
            required
            sx={{ borderRadius: '6px', marginBottom: "18px", height: '33px', fontSize: "11px" }}
            error={!!errors.fullName}
          />
        </FormControl>

        <FormControl variant="outlined" fullWidth>
          <OutlinedInput
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            startAdornment={<InputAdornment position="start"><PhoneOutlinedIcon sx={{ fontSize: "20px" }} /></InputAdornment>}
            placeholder={t("mobileNumber")}
            required
            sx={{ borderRadius: '6px', marginBottom: "18px", height: '33px', fontSize: "11px" }}
            error={!!errors.phone}
          />
        </FormControl>

        <FormControl variant="outlined" fullWidth>
          <OutlinedInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            startAdornment={<InputAdornment position="start"><MailOutlinedIcon sx={{ fontSize: "20px" }} /></InputAdornment>}
            placeholder={t("email")}
            required
            sx={{ borderRadius: '6px', marginBottom: "18px", height: '33px', fontSize: "11px" }}
            error={!!errors.email}
          />
        </FormControl>

        <Grid container alignItems="center" sx={{ marginBottom: "18px" }}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid container alignItems="center" sx={{ color: "grey", marginTop: "5px" }}>
              <CalendarMonthOutlinedIcon sx={{ marginRight: "6px", fontSize: "13px" }} />
              <Typography variant="body1" sx={{ fontSize: "12px" }}>{t("dateOfBirth")}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <Select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                displayEmpty
                sx={{ borderRadius: '6px', height: '33px', fontSize: "10px", color: "gray", marginRight: "5px" }}
                error={!!errors.birthDate}
              >
                <MenuItem value="" disabled>{t(month)}</MenuItem>
                {["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"].map(m => (
                  <MenuItem key={m} value={m} sx={{ fontSize: "10px", color: "gray" }}>{m}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <Select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                displayEmpty
                sx={{ borderRadius: '6px', height: '33px', fontSize: "10px", color: "gray", marginRight: "5px" }}
                error={!!errors.birthDate}
              >
                <MenuItem value="" disabled>{t("day")}</MenuItem>
                {[...Array(31).keys()].map(i => (
                  <MenuItem key={i + 1} value={String(i + 1).padStart(2, '0')} sx={{ fontSize: "10px", color: "gray" }}>
                    {String(i + 1).padStart(2, '0')}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <Select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                displayEmpty
                sx={{ borderRadius: '6px', height: '33px', fontSize: "10px", color: "gray" }}
                error={!!errors.birthDate}
              >
                <MenuItem value="" disabled>{t("year")}</MenuItem>
                {Array.from({ length: 2025 - 1994 + 1 }, (_, i) => 1994 + i).map(y => (
                  <MenuItem key={y} value={y} sx={{ fontSize: "10px", color: "gray" }}>{y}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <FormControl variant="outlined" fullWidth>
          <Select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            displayEmpty
            sx={{ marginBottom: "18px", borderRadius: '6px', height: '33px', fontSize: "10px", color: "gray" }}
            startAdornment={<InputAdornment position="start"><span className="icon-location-pin" style={{ fontSize: "16px" }} /></InputAdornment>}
            error={!!errors.country}
          >
            <MenuItem value="" disabled>Country</MenuItem>
            <MenuItem value="syria" sx={{ fontSize: "10px", color: "gray" }}>Syria</MenuItem>
            <MenuItem value="US" sx={{ fontSize: "10px", color: "gray" }}>United States</MenuItem>
            <MenuItem value="CA" sx={{ fontSize: "10px", color: "gray" }}>Canada</MenuItem>
            <MenuItem value="UK" sx={{ fontSize: "10px", color: "gray" }}>United Kingdom</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" fullWidth>
          <OutlinedInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            startAdornment={<InputAdornment position="start"><span className="icon-padlock" style={{ fontSize: "16px" }} /></InputAdornment>}
            placeholder={t("pasword")}
            sx={{ borderRadius: '6px', marginBottom: "18px", height: '33px', fontSize: "10px" }}
            error={!!errors.password}
          />
        </FormControl>

        <FormControl variant="outlined" fullWidth>
          <OutlinedInput
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            startAdornment={<InputAdornment position="start"><span className="icon-padlock" style={{ fontSize: "16px" }} /></InputAdornment>}
            placeholder={t("confirmPass")}
            sx={{ marginBottom: "18px", borderRadius: '10px', height: '33px', fontSize: "12px" }}
            error={!!errors.confirmPassword}
          />
        </FormControl>

        <FormControl fullWidth>
          <Select
            value={selectedOption || "Winter Campaign"}
            onChange={(e) => setSelectedOption(e.target.value)}
            displayEmpty
            IconComponent={ArrowDropDownIcon}
            sx={{
              backgroundColor: "#1A1A3B",
              borderRadius: "25px",
              color: "#ef7d00",
              fontSize: "12px",
              height: "32px",
              textAlign: "center",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "transparent" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "transparent" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "transparent" },
              "& .MuiSelect-icon": { color: "white" },
            }}
          >
            <MenuItem value="Winter Campaign" sx={{ fontSize: "12px", color: "#3f3e3efa" }}>{t("winterCampaign")}</MenuItem>
            <MenuItem value="Spring Campaign" sx={{ fontSize: "12px", color: "#3f3e3efa" }}>{t("springCampaign")}</MenuItem>
            <MenuItem value="Summer Campaign" sx={{ fontSize: "12px", color: "#3f3e3efa" }}>{t("summerCampaign")}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};