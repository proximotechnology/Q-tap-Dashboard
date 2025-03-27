// import { Divider, MenuItem, TextField, Typography } from '@mui/material'
// import { Box } from '@mui/system'
// import React, { useState } from 'react'


// export const PaymentInfo = ({
//     selectedOption,
//     setSelectedOption,
//     bankName,
//     setBankName,
//     accountNumber,
//     setAccountNumber,
//     accountName,
//     setAccountName
// }) => {

//   const handleSelect = (option) => {
//     setSelectedOption(option);
//   };

//   const options = [
//     { label: "Bank", icon: <img src='/assets/bank.svg' alt='bank icon' style={{width:"25px" ,height:"25"}}/>  },
//     { label: "D.Wallet", icon:<span class="icon-wallet1" style={{fontSize:"22px"}}> </span> },
//     { label: "Card", icon:<img src='/assets/card.svg' alt='card icon' style={{width:"25px" ,height:"25"}}/> },
//   ];

//   const renderFields = () => {
//     switch (selectedOption) {
//       case "Bank":
//         return (
//           <>
//             <Typography variant='body2' sx={{ fontSize: "8px", color: "gray" }}>Name</Typography>
//             <TextField
//               fullWidth
//               variant="outlined"
//               sx={{ mb: 2 }}
//               InputProps={{
//                 sx: {
//                   borderRadius: "5px",
//                   height: "30px", fontSize: "12px", color: "gray", width: "85%"
//                 }
//               }}
//               value={bankName}
//               onChange={(e) => setBankName(e.target.value)}
//             />

//             <Typography variant='body2' sx={{ fontSize: "8px", color: "gray" }}>IBAN</Typography>
//             <TextField
//               fullWidth
//               variant="outlined"
//               sx={{ mb: 2 }}
//               InputProps={{
//                 sx: {
//                   borderRadius: "5px",
//                   height: "30px", fontSize: "12px", color: "gray", width: "85%"
//                 }
//               }}
//               value={accountNumber}
//               onChange={(e) => setAccountNumber(e.target.value)}
//             />

//             <Typography variant='body2' sx={{ fontSize: "8px", color: "gray" }}>Bank</Typography>
//             <TextField
//               select
//               fullWidth
//               InputProps={{
//                 sx: {
//                   borderRadius: "5px",
//                   fontSize: "12px",
//                   color: "gray",
//                   height: "30px", width: "85%"
//                 }
//               }}
//             >
//               <MenuItem value="nbe" sx={{ fontSize: "11px", color: "gray", padding: "0px 20px" }}>NBE</MenuItem>
//               <Divider sx={{ width: "90%", marginLeft: "10px" }} />
//               <MenuItem value="cib" sx={{ fontSize: "11px", color: "gray", padding: "0px 20px" }}>CIB</MenuItem>
//               <Divider sx={{ width: "90%", marginLeft: "10px" }} />
//               <MenuItem value="fab" sx={{ fontSize: "11px", color: "gray", padding: "0px 20px" }}>FAB</MenuItem>
//             </TextField>

//             <Typography variant='body2' sx={{ fontSize: "8px", color: "gray", marginTop: "8px" }}>Address</Typography>
//             <TextField
//               fullWidth
//               variant="outlined"
//               sx={{ mb: 2 }}
//               InputProps={{
//                 sx: {
//                   borderRadius: "5px",
//                   height: "30px", fontSize: "12px", color: "gray", width: "85%"
//                 }
//               }}
//               value={accountName}
//               onChange={(e) => setAccountName(e.target.value)}
//             />
//           </>
//         );
//       case "D.Wallet":
//         return (
//           <>
//             <Typography variant='body2' sx={{ fontSize: "8px", color: "gray" }}>Name</Typography>
//             <TextField
//               fullWidth
//               variant="outlined"
//               sx={{ mb: 2 }}
//               InputProps={{
//                 sx: {
//                   borderRadius: "5px",
//                   height: "30px", fontSize: "12px", color: "gray", width: "85%"
//                 }
//               }}
//               value={bankName}
//               onChange={(e) => setBankName(e.target.value)}
//             />

//             <Typography variant='body2' sx={{ fontSize: "8px", color: "gray" }}>Wallet No.</Typography>
//             <TextField
//               fullWidth
//               variant="outlined"
//               sx={{ mb: 2 }}
//               InputProps={{
//                 sx: {
//                   borderRadius: "5px",
//                   height: "30px", fontSize: "12px", color: "gray", width: "85%"
//                 }
//               }}
//               value={accountNumber}
//               onChange={(e) => setAccountNumber(e.target.value)}
//             />
//               <Typography variant='body2' sx={{ fontSize: "8px", color: "gray" }}>Courier</Typography>
//             <TextField
//               select
//               fullWidth
//               InputProps={{
//                 sx: {
//                   borderRadius: "5px",
//                   fontSize: "12px",
//                   color: "gray",
//                   height: "30px", width: "85%"
//                 }
//               }}
//             >
//               <MenuItem value="nbe" sx={{ fontSize: "11px", color: "gray", padding: "0px 20px" }}>Afaf</MenuItem>
//               <Divider sx={{ width: "90%", marginLeft: "10px" }} />
//               <MenuItem value="cib" sx={{ fontSize: "11px", color: "gray", padding: "0px 20px" }}>Ahmed</MenuItem>
//               <Divider sx={{ width: "90%", marginLeft: "10px" }} />
//               <MenuItem value="fab" sx={{ fontSize: "11px", color: "gray", padding: "0px 20px" }}>Shimaa</MenuItem>
//             </TextField>

//           </>
//         );
//       case "Card":
//         return (
//           <>
//             <Typography variant='body2' sx={{ fontSize: "8px", color: "gray" }}>Name</Typography>
//             <TextField
//               fullWidth
//               variant="outlined"
//               sx={{ mb: 2 }}
//               InputProps={{
//                 sx: {
//                   borderRadius: "5px",
//                   height: "30px", fontSize: "12px", color: "gray", width: "85%"
//                 }
//               }}
//               value={bankName}
//               onChange={(e) => setBankName(e.target.value)}
//             />

//             <Typography variant='body2' sx={{ fontSize: "8px", color: "gray" }}>Card No.</Typography>
//             <TextField
//               fullWidth
//               variant="outlined"
//               sx={{ mb: 2 }}
//               InputProps={{
//                 sx: {
//                   borderRadius: "5px",
//                   height: "30px", fontSize: "12px", color: "gray", width: "85%"
//                 }
//               }}
//               value={accountNumber}
//               onChange={(e) => setAccountNumber(e.target.value)}
//             />

//             <Typography variant='body2' sx={{ fontSize: "8px", color: "gray" }}>Bank</Typography>
//             <TextField
//               select
//               fullWidth
//               InputProps={{
//                 sx: {
//                   borderRadius: "5px",
//                   fontSize: "12px",
//                   color: "gray",
//                   height: "30px", width: "85%"
//                 }
//               }}
//             >
//               <MenuItem value="nbe" sx={{ fontSize: "11px", color: "gray", padding: "0px 20px" }}>NBE</MenuItem>
//               <Divider sx={{ width: "90%", marginLeft: "10px" }} />
//               <MenuItem value="cib" sx={{ fontSize: "11px", color: "gray", padding: "0px 20px" }}>CIB</MenuItem>
//               <Divider sx={{ width: "90%", marginLeft: "10px" }} />
//               <MenuItem value="fab" sx={{ fontSize: "11px", color: "gray", padding: "0px 20px" }}>FAB</MenuItem>
//             </TextField>

//             <Typography variant='body2' sx={{ fontSize: "8px", color: "gray", marginTop: "8px" }}>Address</Typography>
//             <TextField
//               fullWidth
//               variant="outlined"
//               sx={{ mb: 2 }}
//               InputProps={{
//                 sx: {
//                   borderRadius: "5px",
//                   height: "30px", fontSize: "12px", color: "gray", width: "85%"
//                 }
//               }}
//               value={accountName}
//               onChange={(e) => setAccountName(e.target.value)}
//             />
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <Box padding={"0px 50px"}>
//       <Typography variant="body2" sx={{ fontSize: "12px" }} color="#575756" gutterBottom>
//         Payment Info.......
//       </Typography>
//       <Divider sx={{ borderRadius:"30px",width: "18%", borderBottom: "4px solid #ef7d00", marginBottom: "18px" }} />
//       <Box sx={{ display: "flex", justifyContent: "space-between", width: "50%", marginTop: "30px" }}>
//         {options.map((option) => (
//           <Box key={option.label} sx={{ textAlign: "center" }}>
//             <Box
//               onClick={() => handleSelect(option.label)}
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 textAlign: "center",
//                 width: "45px",
//                 height: "45px",
//                 borderRadius: "8px",
//                 border: "1px solid #c9c6c6fa", cursor: "pointer",
//                 borderColor: selectedOption === option.label ? "#ef7d00" : "#D3D3D3",
                 
//                 '&:hover': {
//                   borderColor: "#ef7d00",
//                 }
//               }}
//             >
//               <Box
//                 sx={{
//                   color: selectedOption === option.label ? "#ef7d00" : "grey",
//                 }}
//               >
//                 {React.cloneElement(option.icon, )}
//               </Box>
//             </Box>
//             <Typography
//               sx={{
//                 marginTop: "5px",
//                 fontSize: "10px", color: "gray"
//               }}
//             >
//               {option.label}
//             </Typography>
//           </Box>
//         ))}
//       </Box>

//       <Box sx={{ flex: 1, width: "65%", marginTop: "30px" }}>
//         {renderFields()}
//       </Box>
//     </Box>
//   );
// };


import { Divider, MenuItem, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
export const PaymentInfo = ({
  selectedOption,
  setSelectedOption,
  bankName,
  setBankName,
  accountNumber,
  setAccountNumber,
  accountName,
  setAccountName,
  errors
}) => {
  const {t} = useTranslation();
  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const options = [
    { label: "Bank", icon: <img src='/assets/bank.svg' alt='bank icon' style={{ width: "25px", height: "25px" }} /> },
    { label: "D.Wallet", icon: <span className="icon-wallet1" style={{ fontSize: "22px" }}></span> },
    { label: "Card", icon: <img src='/assets/card.svg' alt='card icon' style={{ width: "25px", height: "25px" }} /> },
  ];

  const renderFields = () => {
    switch (selectedOption) {
      case "Bank":
        return (
          <>
            <Typography variant='body2' sx={{ fontSize: "8px", color: "gray" }}>{t("name")}</Typography>
            <TextField
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              InputProps={{ sx: { borderRadius: "5px", height: "30px", fontSize: "12px", color: "gray", width: "85%" } }}
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              error={!!errors.bankName}
            />

            <Typography variant='body2' sx={{ fontSize: "8px", color: "gray" }}>{t("iban")}</Typography>
            <TextField
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              InputProps={{ sx: { borderRadius: "5px", height: "30px", fontSize: "12px", color: "gray", width: "85%" } }}
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              error={!!errors.accountNumber}
            />

            <Typography variant='body2' sx={{ fontSize: "8px", color: "gray" }}>{t("Bank")}</Typography>
            <TextField
              select
              fullWidth
              InputProps={{ sx: { borderRadius: "5px", fontSize: "12px", color: "gray", height: "30px", width: "85%" } }}
            >
              <MenuItem value="nbe" sx={{ fontSize: "11px", color: "gray", padding: "0px 20px" }}>NBE</MenuItem>
              <Divider sx={{ width: "90%", marginLeft: "10px" }} />
              <MenuItem value="cib" sx={{ fontSize: "11px", color: "gray", padding: "0px 20px" }}>CIB</MenuItem>
              <Divider sx={{ width: "90%", marginLeft: "10px" }} />
              <MenuItem value="fab" sx={{ fontSize: "11px", color: "gray", padding: "0px 20px" }}>FAB</MenuItem>
            </TextField>

            <Typography variant='body2' sx={{ fontSize: "8px", color: "gray", marginTop: "8px" }}>{t("address")}</Typography>
            <TextField
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              InputProps={{ sx: { borderRadius: "5px", height: "30px", fontSize: "12px", color: "gray", width: "85%" } }}
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              error={!!errors.accountName}
            />
          </>
        );
      case "D.Wallet":
        return (
          <>
            <Typography variant='body2' sx={{ fontSize: "8px", color: "gray" }}>{t("name")}</Typography>
            <TextField
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              InputProps={{ sx: { borderRadius: "5px", height: "30px", fontSize: "12px", color: "gray", width: "85%" } }}
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              error={!!errors.bankName}
            />
            <Typography variant='body2' sx={{ fontSize: "8px", color: "gray" }}>{t("walletNo")}</Typography>
            <TextField
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              InputProps={{ sx: { borderRadius: "5px", height: "30px", fontSize: "12px", color: "gray", width: "85%" } }}
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              error={!!errors.accountNumber}
            />
            <Typography variant='body2' sx={{ fontSize: "8px", color: "gray" }}>{t("courier")}</Typography>
            <TextField
              select
              fullWidth
              InputProps={{ sx: { borderRadius: "5px", fontSize: "12px", color: "gray", height: "30px", width: "85%" } }}
            >
              <MenuItem value="afaf" sx={{ fontSize: "11px", color: "gray", padding: "0px 20px" }}>Afaf</MenuItem>
              <Divider sx={{ width: "90%", marginLeft: "10px" }} />
              <MenuItem value="ahmed" sx={{ fontSize: "11px", color: "gray", padding: "0px 20px" }}>Ahmed</MenuItem>
              <Divider sx={{ width: "90%", marginLeft: "10px" }} />
              <MenuItem value="shimaa" sx={{ fontSize: "11px", color: "gray", padding: "0px 20px" }}>Shimaa</MenuItem>
            </TextField>
          </>
        );
      case "Card":
        return (
          <>
            <Typography variant='body2' sx={{ fontSize: "8px", color: "gray" }}>{t("name")}</Typography>
            <TextField
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              InputProps={{ sx: { borderRadius: "5px", height: "30px", fontSize: "12px", color: "gray", width: "85%" } }}
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              error={!!errors.bankName}
            />
            <Typography variant='body2' sx={{ fontSize: "8px", color: "gray" }}>{t("cardNo")}</Typography>
            <TextField
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              InputProps={{ sx: { borderRadius: "5px", height: "30px", fontSize: "12px", color: "gray", width: "85%" } }}
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              error={!!errors.accountNumber}
            />
            <Typography variant='body2' sx={{ fontSize: "8px", color: "gray" }}>{t("Bank")}</Typography>
            <TextField
              select
              fullWidth
              InputProps={{ sx: { borderRadius: "5px", fontSize: "12px", color: "gray", height: "30px", width: "85%" } }}
            >
              <MenuItem value="nbe" sx={{ fontSize: "11px", color: "gray", padding: "0px 20px" }}>NBE</MenuItem>
              <Divider sx={{ width: "90%", marginLeft: "10px" }} />
              <MenuItem value="cib" sx={{ fontSize: "11px", color: "gray", padding: "0px 20px" }}>CIB</MenuItem>
              <Divider sx={{ width: "90%", marginLeft: "10px" }} />
              <MenuItem value="fab" sx={{ fontSize: "11px", color: "gray", padding: "0px 20px" }}>FAB</MenuItem>
            </TextField>
            <Typography variant='body2' sx={{ fontSize: "8px", color: "gray", marginTop: "8px" }}>{t("address")}</Typography>
            <TextField
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              InputProps={{ sx: { borderRadius: "5px", height: "30px", fontSize: "12px", color: "gray", width: "85%" } }}
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              error={!!errors.accountName}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box padding={"0px 50px"}>
      <Typography variant="body2" sx={{ fontSize: "12px" }} color="#575756" gutterBottom>
        {t("paymentInfo")}
      </Typography>
      <Divider sx={{ borderRadius: "30px", width: "18%", borderBottom: "4px solid #ef7d00", marginBottom: "18px" }} />
      <Box sx={{ display: "flex", justifyContent: "space-between", width: "50%", marginTop: "30px" }}>
        {options.map((option) => (
          <Box key={option.label} sx={{ textAlign: "center" }}>
            <Box
              onClick={() => handleSelect(option.label)}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                width: "45px",
                height: "45px",
                borderRadius: "8px",
                border: "1px solid #c9c6c6fa",
                cursor: "pointer",
                borderColor: selectedOption === option.label ? "#ef7d00" : "#D3D3D3",
                '&:hover': { borderColor: "#ef7d00" }
              }}
            >
              <Box sx={{ color: selectedOption === option.label ? "#ef7d00" : "grey" }}>
                {option.icon}
              </Box>
            </Box>
            <Typography
              sx={{
                marginTop: "5px",
                fontSize: "10px", color: "gray"
              }}
            >
              {t(option.label)}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ flex: 1, width: "65%", marginTop: "30px" }}>
        {renderFields()}
      </Box>
    </Box>
  );
};